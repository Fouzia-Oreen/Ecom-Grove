/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { useDeleteHeaderMutation, useGetHeaderByIdQuery, useUpdateHeaderMutation } from "../../redux/api/headerSlice";
import {
    useUploadProductImageMutation
} from "../../redux/api/productSlice";
import SidebarMenu from "./SidebarMenu";

const UpdateHeader = () => {
  const params = useParams();

  const { data: headerData } = useGetHeaderByIdQuery(params._id);

  const [image, setImage] = useState(headerData?.image || "");
  const [title, setTitle] = useState(headerData?.title || "");
  const [description, setDescription] = useState(headerData?.description || "");

  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateHeader] = useUpdateHeaderMutation();
  // Define the delete product mutation
  const [deleteHeader] = useDeleteHeaderMutation();

  useEffect(() => {
    if (headerData && headerData._id) {
      setTitle(headerData.title);
      setDescription(headerData.description);
      setImage(headerData.image);
    }
  }, [headerData]);

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
      formData.append("title", title);
      formData.append("description", description);

      // Update product using the RTK Query mutation
      const data = await updateHeader({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allheaders");
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

      const { data } = await deleteHeader(params._id);
      toast.success(`${data.title} is deleted`);
      navigate("/admin/allheaders");
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
          <Title text1={"Update"} text2={"Header"}/>
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
              <label htmlFor="name">Title</label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
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

            </div>
            
            </div>
             {/* buttons */}
            <div className="m-6">
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
       
    </>
  );
};

export default UpdateHeader;