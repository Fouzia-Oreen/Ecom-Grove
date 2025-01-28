import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { useCreateHeaderMutation, useUploadImageMutation } from "../../redux/api/headerSlice";
import SidebarMenu from "./SidebarMenu";


const AddHeader = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadImageMutation();
  const [createHeader] = useCreateHeaderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headerData = new FormData();
      headerData.append("title", title);
      headerData.append("image", image);
      headerData.append("description", description);

      const { data } = await createHeader(headerData);
      console.log(data)
      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.title} is created`);
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
    <div className="flex lg:justify-center">
    {/* sidebar - menu */}
    <SidebarMenu />
    <div className="  md:px-12 lg:w-[1400px] p-2">    
      <Title text1={"Add"} text2={"Header"}/>

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
             {/* title */}
             <div className="flex flex-col w-full my-6">
               <label htmlFor="title" className="font-semibold text-color_4">Title</label>
               <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
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

export default AddHeader;