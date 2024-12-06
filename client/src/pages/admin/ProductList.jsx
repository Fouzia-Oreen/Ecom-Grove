import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import { useFetchBrandsQuery } from "../../redux/api/brandSlice";

import { toast } from "react-toastify";
import AdminMenu from "./SidebarMenu";
import upload from '../../assets/upload_area.png'

const ProductList = () => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();
  const { data: brands } = useFetchBrandsQuery();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      // products-images
      // image1 && productData.append("image1", image1);
      // image2 && productData.append("image2", image2);
      // image3 && productData.append("image3", image3);
      // image4 && productData.append("image4", image4);
      // products-details
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
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
    formData.append("image1", e.target.files[0]);
    formData.append("image2", e.target.files[0]);
    formData.append("image3", e.target.files[0]);
    formData.append("image4", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage1(res.image1)
      setImage2(res.image2)
      setImage3(res.image3)
      setImage4(res.image4)
      setImageUrl(res.image1);
      setImageUrl(res.image2);
      setImageUrl(res.image3);
      setImageUrl(res.image4);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container">
      <div className="flex ">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
        <h1 className="text-2xl px-2 font-semibold mb-4">Add Product</h1> 

          {imageUrl && (
            <div className="text-center ">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
        {/* images */}
        <div className='flex gap-3 m-3'>
        {/* set-image1 */}
        <label htmlFor='image1'>
          <img className='w-22 md:w-40 border-[1px] border-color_3 rounded-md' 
          src={!image1 ? upload : URL.createObjectURL(image1)} alt="image" />
          <input onChange={uploadFileHandler}  type="file"  name="image1" accept="image/*" id="image1" hidden className={!image1 ? "hidden" : "text-color_6"}/>
        </label>
        {/* set-image2 */}
        <label htmlFor='image2'>
          <img className='w-22 md:w-40 border-[1px] border-color_3 rounded-md' 
          src={!image2 ? upload : URL.createObjectURL(image2)} alt="image" />
          <input onChange={uploadFileHandler}  type="file"  name="image2" accept="image/*" id="image2" hidden className={!image2 ? "hidden" : "text-color_6"}/>
        </label>
        {/* set-image3 */}
        <label htmlFor='image3'>
          <img className='w-22 md:w-40 border-[1px] border-color_3 rounded-md' 
          src={!image3 ? upload : URL.createObjectURL(image3)} alt="image" />
          <input onChange={uploadFileHandler}  type="file"  name="image3" accept="image/*" id="image3" hidden className={!image3 ? "hidden" : "text-color_6"}/>
        </label>    
        {/* set-image4 */}
        <label htmlFor='image4'>
          <img className='w-22 md:w-40 border-[1px] border-color_3 rounded-md' 
          src={!image4 ? upload : URL.createObjectURL(image4)} alt="image" />
          <input onChange={uploadFileHandler}  type="file"  name="image4" accept="image/*" id="image4" hidden className={!image4 ? "hidden" : "text-color_6"}/>
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
                  className="p-4 mb-3  border rounded-md "
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
                  className="p-2 mb-3  border rounded-md w-full "
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
                  onChange={(e) => setCategory(e.target.value)}
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