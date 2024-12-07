import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import { useFetchSubCategoriesQuery } from "../../redux/api/subCategorySlice";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";

import { toast } from "react-toastify";
import SidebarMenu from "./SidebarMenu";


const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();
  const { data: subCategories } = useFetchSubCategoriesQuery();
  const { data: brands } = useFetchBrandsQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("image", image);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("oldPrice", oldPrice);
      productData.append("category", category);
      productData.append("subCategory", subCategory);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image1)
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container">
      <div className="flex ">
        <SidebarMenu />
        <div className="md:w-3/4 p-3">
        <h1 className="text-2xl px-2 font-semibold mb-4">Add Product</h1> 

        {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
        {/* images */}
        <div className="m-3">
            <label className="border-[1px] border-color_3 text-color_6 px-4 block w-full text-center rounded-md cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-color_6"}
              />
            </label>
        </div>

        {/* details */}
        <div className="m-3">
          <div className="flex flex-wrap">
            {/* name */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="p-4 mb-3 rounded-md "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* description */}
            <div className="flex flex-col w-full">
              <label htmlFor="desc">
              Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3  rounded-md w-full "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {/* brand & category */}
            <div className="flex flex-col gap-4 items-center md:gap-12 md:flex-row w-full">
            {/* brand */}
            <div className="flex flex-col w-full">
              <label htmlFor="">Brand</label>
              <select
                placeholder="Choose Brand"
                className="p-4 mb-3 rounded-md border-[1px] border-color_3 focus:outline-none"
                onChange={(e) => setBrand(e.target.value)}
              >
                {brands?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {/* category */}
            <div className="flex flex-col w-full">
              <label htmlFor="">Category</label>
              <select
                placeholder="Choose Category"
                className="p-4 mb-3 rounded-md border-[1px] border-color_3 focus:outline-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {/* sub category */}
            <div className="flex flex-col w-full">
              <label htmlFor="">Sub Category</label>
              <select
                placeholder="Choose SubCategory"
                className="p-4 mb-3 rounded-md border-[1px] border-color_3 focus:outline-none"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {subCategories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            </div>
            {/* prices */}
            <div className="flex flex-col gap-4 items-center md:gap-12 md:flex-row w-full">
            {/* price */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Price</label>
              <input
                type="number"
                className="p-4 mb-3  border rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* old price */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Old Price</label>
              <input
                type="number"
                className="p-4 mb-3  border rounded-md"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
              />
            </div>
            </div>
            {/* quantity & stock  */}
            <div className="flex flex-col gap-4 items-center md:gap-12 md:flex-row w-full">
            {/* quantity */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Quantity</label>
              <input
                type="number"
                className="p-4 mb-3  border rounded-md"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {/* in stock */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Count In Stock</label>
              <input
                type="number"
                className="p-4 mb-3  border rounded-md"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            </div>
          </div>
          {/* submit button */}
          <button
            onClick={handleSubmit}
            className="btn auth-btn mt-6"
          >
            Submit
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;