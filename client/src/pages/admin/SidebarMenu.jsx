 import { ListTodo } from "lucide-react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuLayoutList, LuUsers } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { RiApps2AddLine } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/auth/authSlice";

export default function SidebarMenu() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler =  async () => {
      try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/login')
      } catch (error) {
        console.error(error)
      }
    }
  
  
  return (
    <nav className=" flex flex-col  border-r-color_3 shadow-sm border-[1px]  justify-between h-screen  ">
     {/* menu-links */}
     <ul className="p-3 md:pt-20 w-full lg:w-60">
      <li className=" lg:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/dashboard"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <FaRegChartBar className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">Dashboard</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/header"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <MdOutlineCategory className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">Add Header</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/allheaders"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <MdOutlineCategory className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">All Headers</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/categorylist"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <MdOutlineCategory className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">Category</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/subcategoryList"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <RiApps2AddLine className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">SubCategory</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/brandList"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <TbCategoryPlus className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">Brand</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/addproduct"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <IoIosAddCircleOutline className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">Add Product</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/allproductslist"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <LuLayoutList className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">All Products</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/userlist"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <LuUsers className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 "> Users</span>
      </NavLink>
      </li>
      <li className="w-fit md:w-full mb-4">
      <NavLink className=" rounded-md flex items-center gap-3   "
       to="/admin/orderlist"
       style={({ isActive }) => (
        {
          color: isActive ? "#D7263d" : "", 
          backgroundColor: isActive ? "#C0BFC2" : ""
        })}>
      <ListTodo className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
      <span className="hidden md:block font-medium  py-1.5 ">Orders</span>
      </NavLink>
      </li>
     </ul>
      {/* credentials */}
      <div className="border-t-[1px] border-color_2  flex p-3 justify-between ">
          <div className="leading-4 hidden py-1.5 md:block">
            {/* admin */}
            <h4 className="font-semibold ">{userInfo.username}</h4>
            <span className="text-xs text-gray-600">{userInfo.email}</span>
          </div>
          {/* logout */}
          <button
              onClick={logoutHandler}
            ><AiOutlineLogout className="p-1.5 size-9 flex items-center justify-center rounded-md bg-color_2"/>
          </button>
      </div>      
    </nav>
  )
}
