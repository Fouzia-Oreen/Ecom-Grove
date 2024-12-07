import { useState } from "react";
import {
    useCreateSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useFetchSubCategoriesQuery,
} from "../../redux/api/subCategorySlice";

import { toast } from "react-toastify";
import SubCategoryForm from "../../components/SubCategoryForm";
import Modal from "../../components/Modal";
import SidebarMenu from "./SidebarMenu";

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
    <div className=" flex  container">
      {/* <AdminMenu /> */}
      <SidebarMenu />
      <div className="md:w-3/4 p-3">
         <h1 className="text-2xl px-2 font-semibold">Manage SubCategories</h1> 
        <SubCategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateSubCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap ">
          {subCategories?.map((subCategory) => (
            <div key={subCategory._id}>
              <button
                className="submit-btn btn m-2"
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
  );
};

export default SubCategoryList;