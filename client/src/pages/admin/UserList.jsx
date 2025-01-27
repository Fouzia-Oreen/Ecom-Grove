import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaPlus, FaSearch, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Title from "../../components/Title";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} from "../../redux/api/userSlice";
import SidebarMenu from "./SidebarMenu";


const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [editableUserPhone, setEditableUserPhone] = useState("");
  const [editableUserAddress, setEditableUserAddress] = useState("");
  const [updateUser] = useUpdateUserMutation();
  // const [searchTerm, setSearchTerm] = useState("");
   const [searchResult, setSearchResult] = useState('');
  // const [getUserDetails] = useGetUserDetailsQuery

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email, phone, address) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
    setEditableUserPhone(phone);
    setEditableUserAddress(address);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const searchHandler = () => {
    try {
      setSearchResult(
        users.filter((user) =>
          user.username.toLowerCase().includes(searchResult.toLowerCase())
        )
      );
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="flex lg:items-center lg:justify-center gap-3">
      {/* sidebar - menu */}
      <SidebarMenu />
      <div className=" md:px-12 lg:w-[1400px] overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (  
        <div className="flex flex-col gap-6 container">         
          <div className="">
            <div className="grid grid-cols-2 items-center lg:w-full">
            <Title text1={"Users"} text2={"List"} />
              <h2 className="text-end font-semibold text-color_6">Total Users: {users.length}</h2>
            </div>
            {/* search */}
            <div className="flex items-center justify-between mb-4 gap-3 relative w-[340px] lg:w-full">
              <Input  type="text" placeholder="Search by name" onChange={(e)=> e.target.value} value={users.username} />
              <button 
              className="absolute right-0 top-1 bg-color_6 text-white py-[1.05rem] px-6 rounded-r-md"
               onClick={searchHandler}
              >
                <FaSearch />
              </button>
            </div>
          </div>
         {/* table */}
         <div className="overflow-x-auto">
         <table className="border-collapse w-full">
          {/* data */}
          <thead className="w-full border">
            <tr className="mb-[5rem]">
              <th className="text-left pl-4 ">ID</th>
              <th className="text-left pl-4">NAME</th>
              <th className="text-left pl-4">EMAIL</th>
              <th className="text-left pl-4">PHONE</th>
              <th className="text-left pl-4 ">ADDRESS</th>
              <th className="text-left pl-1 ">ADMIN</th>
              <th className="text-left pl-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user._id}>  
            {/* id */}
              <td className="px-1 text-sm pl-4  lg:w-[220px]">{user._id}</td>
            {/* name */}
              <td className=" py-2 pl-4 lg:w-[160px] ">
                {editableUserId === user._id ? (
                  <td className="flex items-center">
                    <input
                      type="text"
                      value={editableUserName}
                      onChange={(e) => setEditableUserName(e.target.value)}
                      className="w-full p-1 border rounded-lg"
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="ml-1 bg-green-500 text-white py-2 px-2 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </td>
                ) : (
                  <td >{user.username}</td>
                )}
              </td>
            {/* email */}
              <td className="py-2 pl-4 lg:w-[200px] ">              
                {editableUserId === user._id ? (
                  <td className="flex items-center">
                    <input
                      type="text"
                      value={editableUserEmail}
                      onChange={(e) => setEditableUserEmail(e.target.value)}
                      className="w-full p-1 border rounded-md "
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="ml-1 bg-green-500 text-color_1 py-2 px-2 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </td>
                ) : (
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                )}
              </td>
            {/* phone */}
              <td className="py-2  pl-4 lg:w-[160px]">              
                {editableUserId === user._id ? (
                  <td className="flex items-center">
                    <input
                      type="text"
                      value={editableUserPhone}
                      onChange={(e) => setEditableUserPhone(e.target.value)}
                      className="w-full p-1 border rounded-md"
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="ml-1 bg-green-500 text-color_1 py-2 px-2 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </td>
                ) : (
                  <td>{user.phone}</td>
                )}
              </td>
            {/* address */}
              <td className="py-2 pl-4 lg:w-[220px] ">              
                {editableUserId === user._id ? (
                  <td className="flex items-center">
                    <input
                      type="text"
                      value={editableUserAddress}
                      onChange={(e) => setEditableUserAddress(e.target.value)}
                      className="p-1 border rounded-md "
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="ml-1 bg-green-500 text-color_1 py-2 px-2 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </td>
                ) : (
                  <td className="w-[200px]">{user.address}</td>
                )}
              </td>
            {/* admin */}
              <td className=" py-2  pl-5 lg:w-[160px] ">
                
                {user.isAdmin ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
            {/* actions */}
              <td className=" py-2 pl-4 lg:w-[160px]">
                {!user.isAdmin && (
                  <td className="flex gap-2">
                    <button
                    className="bg-green-200 p-1  rounded-full"
                      onClick={() =>
                        toggleEdit(user._id, user.name, user.email, user.phone, user.address)
                      }
                    >
                      <FaEdit className="" />
                    </button>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="bg-red-200 p-1  rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </td>        
            </tr>
             ))}
          </tbody>
         </table>
         </div>
          {/* <Pagination
            totalPages={Math.ceil(users.length / 10)}
            currentPage={1}
            onPageChange={(page) => refetch({ page })}
          /> */}
        </div>
      )}
      </div>

    </div>

  );
};

export default UserList;