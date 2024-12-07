/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import { useFetchSubCategoriesQuery } from "../../redux/api/subCategorySlice";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";
import { toast } from "react-toastify";
import SidebarMenu from "./SidebarMenu";

const UpdateProduct = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [oldPrice, setOldPrice] = useState(productData?.oldPrice || "");

  const [category, setCategory] = useState(productData?.category || "");
  const [subCategory, setSubCategory] = useState(productData?.subCategory || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();
  const { data: subCategories = [] } = useFetchSubCategoriesQuery();
  const { data: brands = [] } = useFetchBrandsQuery();


  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setOldPrice(productData.oldPrice);
      setCategory(productData.category?._id);
      setSubCategory(productData.subCategory?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <SidebarMenu />
          <div className="md:w-3/4 p-3">
            <div className="mb-6"><h1 className="text-xl font-medium">Update / Delete Product</h1> </div>

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto w-full h-[40%]"
                />
              </div>
            )}
            <div className="mb-3">
              <label className="border-[1px] border-color_3 text-color_6 px-4 block w-full text-center rounded-md cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-color_6 w-full"
                />
              </label>
            </div>

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
             {/* buttons */}
            <div className="mt-6">
            <button
                onClick={handleSubmit}
                className="btn bg-green-600 mr-6 border-2 border-green-600"
            >
                Update
            </button>
            <button
                onClick={handleDelete}
                className="btn bg-color_6 border-2 border-color_6"
            >
                Delete
            </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;