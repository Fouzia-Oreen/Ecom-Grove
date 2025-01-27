import { useState } from "react";
import {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useFetchBrandsQuery,
  useUpdateBrandMutation,
} from "../../redux/api/brandSlice";
import { toast } from "react-toastify";
import BrandForm from "../../components/BrandFrom";
import Modal from "../../components/Modal";
import SidebarMenu from "./SidebarMenu";
import Title from "../../components/Title";

const BrandList = () => {
  const { data: brands } = useFetchBrandsQuery();
  const [name, setName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const handleCreateBrand = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createBrand({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating brand failed, try again.");
    }
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Brand name is required");
      return;
    }

    try {
      const result = await updateBrand({
        categoryId: selectedBrand._id,
        updatedBrand: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedBrand(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      const result = await deleteBrand(selectedBrand._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedBrand(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Tray again.");
    }
  };

  return (
    <div className=" flex  lg:justify-center">
      {/* <AdminMenu /> */}
      <SidebarMenu />
      <div className="md:py-8 md:px-12 lg:w-[1400px]">
      <div className="ml-6">
      <Title text1={"Manage"} text2={"Brands"}/>
      </div>
        <BrandForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateBrand}
        />
        <br />
        <hr />

        <div className="flex flex-wrap ">
          {brands?.map((brand) => (
            <div key={brand._id}>
              <button
                className="bg-color_2 px-3 py-1 rounded-full m-2 hover:bg-color_6 hover:text-color_1"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedBrand(brand);
                    setUpdatingName(brand.name);
                  }
                }}
              >
                {brand.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <BrandForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateBrand}
            buttonText="Update"
            handleDelete={handleDeleteBrand}
          />
        </Modal>
      </div>
    </div>
  );
};

export default BrandList;