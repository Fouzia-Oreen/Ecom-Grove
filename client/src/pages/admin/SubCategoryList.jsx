import { useState } from "react";
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useFetchSubCategoriesQuery,
  useUpdateSubCategoryMutation,
} from "../../redux/api/subCategorySlice";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import SubCategoryForm from "../../components/SubCategoryForm";
import SidebarMenu from "./SidebarMenu";
import Title from "../../components/Title";

const SubCategoryList = () => {
  const { data: subCategories } = useFetchSubCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleCreateSubCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("SubCategory name is required");
      return;
    }

    try {
      const result = await createSubCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateSubCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("SubCategory name is required");
      return;
    }

    try {
      const result = await updateSubCategory({
        categoryId: selectedSubCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedSubCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubCategory = async () => {
    try {
      const result = await deleteSubCategory(selectedSubCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedSubCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("SubCategory deletion failed. Tray again.");
    }
  };

  return (

    <div className="flex lg:justify-center">
      {/* sidebar - menu */}
      <SidebarMenu />
      <div className="md:py-8 md:px-12 lg:w-[1400px] ">
      <div className="ml-6">
      <Title text1={"Manage"} text2={"SubCategories"}/>
      </div>
        {/* Your admin dashboard content goes here */}
        <div className="">
        <div className="ml-2">
          <SubCategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateSubCategory}
        />
        <hr className="mt-4 bg-color_2 w-full h-[1px]" />
        <div className="flex flex-wrap ">
           {subCategories?.map((subCategory) => (
            <div key={subCategory._id}>
              <button
                className="bg-color_2 px-3 py-1 rounded-full m-2 hover:bg-color_6 hover:text-color_1"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedSubCategory(subCategory);
                    setUpdatingName(subCategory.name);
                  }
                }}
              >
                {subCategory.name} 
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <SubCategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateSubCategory}
            buttonText="Update"
            handleDelete={handleDeleteSubCategory}
          />
        </Modal>
        </div>
      </div>
    </div>       

       </div>
  );
};

export default SubCategoryList;