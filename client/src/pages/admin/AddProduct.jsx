import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import { useFetchSubCategoriesQuery } from "../../redux/api/subCategorySlice";
import SidebarMenu from "./SidebarMenu";


const AddProduct = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
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
      console.log(data)
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
    console.log(formData)

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res)
      toast.success(res.message);
      setImage(res.image)
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex lg:items-center lg:justify-center">
    {/* sidebar - menu */}
    <SidebarMenu />
    <div className=" md:py-8 md:px-12 lg:w-[1400px]">    
      <div className="ml-6">
      <Title text1={"Add"} text2={"Product"}/>
      </div>
      {/* if you have an image it will show on the imageUrl */}
      {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
      )}
        <div className="m-3">
          <label className="text-color_6 px-4 block w-full text-center rounded-md cursor-pointer font-bold py-11 mt-1 p-3 border placeholder-color_3 border-color_4/30">
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
             <div className="flex flex-col w-full my-6">
               <label htmlFor="name" className="font-semibold text-color_4">Name</label>
               <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            {/* description */}
            <div className="flex flex-col w-full mb-6">
              <label htmlFor="desc" className="font-semibold text-color_4">
              Description
              </label>
              <textarea
                type="text"
                className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {/* brand & category */}
            <div className="flex flex-col gap-4 items-center md:gap-12 md:flex-row w-full mb-4">
            {/* brand */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="" className="font-semibold text-color_4">Brand</label>
              <select
                placeholder="Choose Brand"
                className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30 cursor-pointer"
                onChange={(e) => setBrand(e.target.value)}
              >
                {brands?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            {/* category */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="" className="font-semibold text-color_4">Category</label>
              <select
                placeholder="Choose Category"
                className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30 cursor-pointer"
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
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="" className="font-semibold text-color_4">Sub Category</label>
              <select
                placeholder="Choose SubCategory"
                className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30 cursor-pointer"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {subCategories?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            </div>
            {/* prices */}
            <div className="flex flex-col gap-4 items-center md:gap-12 md:flex-row w-full mb-4">
            {/* price */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="price" className="font-semibold text-color_4">Price</label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/> 
            </div>
            {/* old price */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="oldPrice" className="font-semibold text-color_4">Old Price</label>
              <Input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}/>
            </div>
            {/* quantity */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="quantity" className="font-semibold text-color_4">Quantity</label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>
            {/* in stock */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="stock" className="font-semibold text-color_4">Count In Stock</label>
              <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)}/>
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
  );
};

export default AddProduct;