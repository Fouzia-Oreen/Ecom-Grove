/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import SidebarMenu from "./SidebarMenu";
import Title from "../../components/Title";
import Input from "../../components/Input";

const UpdateProduct = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [oldPrice, setOldPrice] = useState(productData?.oldPrice || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);
  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const { data: brands = [] } = useFetchBrandsQuery();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setOldPrice(productData.oldPrice);
      setCategory(productData.category?._id);
      setBrand(productData.brand?._id);
      setQuantity(productData.quantity);
      setImage(productData.image);
      setStock(productData.countInStock);

    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Item cannot add");
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
      formData.append("brand", brand);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <>
        <div className="flex lg:items-center lg:justify-center">
          <SidebarMenu />
          <div className="md:py-8 md:px-12 lg:w-[1400px] overflow-hidden">
          <div className="ml-6">
          <Title text1={"Update"} text2={"Product"}/>
          </div>

            {image && (
              <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
              </div>
            )}
            <div className="m-3">
              <label className="text-color_6 px-4 block w-full text-center rounded-md cursor-pointer font-bold py-11 mt-1 p-3 border placeholder-color_3 border-color_4/30" >
                {image ? image.name : "Upload image"}
                <input
                 type="file"
                 name="image"
                 accept="image/*"
                 onChange={uploadFileHandler}
                 className={`${!image ? "hidden" : "text-color_6"} border-none` }
               />
              </label>
            </div>
            <div className="m-3">
            <div className="flex flex-wrap">
            {/* name */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="name">Name</label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            {/* description */}
            <div className="flex flex-col w-full mb-4">
            <label htmlFor="desc">
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
              <label htmlFor="">Brand</label>
              <select
                placeholder="Choose Brand"
                className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30"
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
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="">Category</label>
              <select
                placeholder="Choose Category"
                className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
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
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/> 
            </div>
            {/* old price */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Old Price</label>
              <Input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}/> 
            </div>
            {/* quantity */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Quantity</label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>
            {/* in stock */}
            <div className="flex flex-col w-full">
              <label htmlFor="name">Count In Stock</label>
              <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)}/>
            </div>
            </div>
            
            </div>
             {/* buttons */}
            <div className="mt-6">
            <button
                onClick={handleSubmit}
                className="btn bg-green-600 mr-6 "
            >
                Update
            </button>
            <button
                onClick={handleDelete}
                className="btn bg-color_6 "
            >
                Delete
            </button>
            </div>
            </div>
          </div>
        </div> 
    </>
  );
};

export default UpdateProduct;