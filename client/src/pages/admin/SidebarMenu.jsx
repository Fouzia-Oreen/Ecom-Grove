/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, ChevronFirst, ChevronLast, CirclePlus, ListTodo, MoreVertical } from "lucide-react";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { PiPackageBold } from "react-icons/pi";
import { useLogoutMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/auth/authSlice";
import logo from "../../assets/ecom-grove_logo.svg"

export default function SidebarMenu() {
    const { userInfo } = useSelector((state) => state.auth);
    const [expanded, setExpanded] = useState(true);

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
    <nav className=" flex flex-col  border-r-color_3 shadow-sm border-[1px]">
        <div className="p-4 pb-2 flex justify-end items-center">
          <button
            onClick={() => {setExpanded((curr) => !curr) , setActive((curr)=> !curr)}}
            className="p-1.5 rounded-lg bg-color_3 hover:bg-color_4"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        {/* menu-links */}
        <ul className="list-none mt-8">
            <li className="flex p-3 mb-3"  >
              <BarChart3  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex gap-2 items-center
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
               <p>Dashboard</p> 
              </NavLink>
            </li>
            <li className="flex p-3 mb-3 "  >
              <ListTodo  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex  items-center  py-1 
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/categoryList"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
               Add Category
              </NavLink>
            </li>
            <li className="flex p-3 mb-3 "  >
              <ListTodo  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex  items-center  py-1  
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/subcategoryList"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
               Add SubCategory
              </NavLink>
            </li>
            <li className="flex p-3 mb-3 "  >
              <ListTodo  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex  items-center  py-1  
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/brandList"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
               Add Brand
              </NavLink>
            </li>
            <li className="flex p-3 mb-3"  >
              <CirclePlus  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex gap-2 items-center
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
               Add Product
              </NavLink>
            </li>
            <li className="flex p-3 mb-3"  >
              <GoChecklist  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex gap-2 items-center
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li className="flex p-3 mb-3"  >
              <FiUsers  className="mr-2  p-1.5 size-9 rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex gap-2 items-center
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li className="flex p-3 mb-3"  >
              <PiPackageBold  className="mr-2  p-1.5 size-9  rounded-md bg-color_2 text-color_4 "  />
              <NavLink
                className={`
                    flex gap-2 items-center
                    overflow-hidden transition-all  font-semibold ${expanded ? "w-32 ml-3" : "w-0"}
                `}
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "#D7263d" : "",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
        </ul>
        {/* credentials */}
        <div className="border-t flex p-3 items-end lg:mt-40">
          <img
            src={logo}
            alt=""
            className="w-8 h-8"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
                {/* admin */}
              <h4 className="font-semibold ">{userInfo.username}</h4>
              <span className="text-xs text-gray-600">{userInfo.email}</span>
            </div>
            {/* logout */}
            <button
                onClick={logoutHandler}
                size={20}
              ><MoreVertical size={20} onClick={logoutHandler}/>
            </button>
          </div>
        </div>  
    </nav>
  
  )
}
