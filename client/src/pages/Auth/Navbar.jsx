 
 
import { useState } from "react";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowForward, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineLocalPhone, MdOutlineMarkEmailUnread } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/auth/authSlice";

const navlinks =[
    {link:"/", title:"Home"},
    {link:"/about", title:"About"},
    {link:"/shop", title:"Shop"},
    {link:"/contact", title:"Contact"},
]

export const Navbar = () => {
  const {userInfo} = useSelector(state => state.auth)
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
 
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
    <header className="flex flex-col mx-auto">
    {/* notification */}
    <div className=" flex flex-col items-center justify-between bg-color_5   md:flex-row md:px-8 sm:gap-2  p-2 text-color_1 w-full" >
          <Link to='/' className="flex items-center gap-2"><MdOutlineLocalPhone /><span>16 002</span></Link> 
           <p className="font-medium">Big Sale Offers New Arrival</p>
           <Link to='/' className="flex items-center gap-2"><MdOutlineMarkEmailUnread /><span>ecomgrove@gmail.com</span></Link>
    </div>
    {/* nav-menu */}
    <nav  className="flex items-center justify-between py-5 border-b-[1px] border-color_2  md:px-12">
        {/* logo */}
        <Link to='/' className="flex gap-2 pl-4 items-center">
        {/* <img src={logo} alt="logo" className="size-8"/> */}
        <span className="font-bold text-lg  hidden md:block text-color_6">Ecom Grove</span>
        </Link>
        {/* navlinks */}
        <div className="hidden lg:flex gap-5 ">
          {
            navlinks.map((nav) => (
              <NavLink to={nav.link} key={nav.link} className="flex flex-col items-start gap-[2px] text-color_4 hover:text-color_5 transition  duration-300 text-[14px]">
              <p className="font-medium ">{nav.title}</p>
              </NavLink>
            ))
          }
        </div>
        {/* cart & favourite */}
        <div className="flex gap-2">
        <div className="flex items-center gap-2">
        <Link to="/cart" className="flex items-center relative">
        <HiOutlineShoppingCart className="mr-3 text-color_4" size={22}/>
        <p className="absolute right-[5px] bottom-[15px] text-center bg-color_3  size-3.5 rounded-full text-[8px] font-semibold text-color_6">0</p>
        </Link>
        <Link to="/favourite" className="flex items-center relative">
        <IoMdHeartEmpty className="mr-2 text-color_4" size={22}/>
        <p className="absolute right-[2px] bottom-[15px] text-center bg-color_2  size-3.5 rounded-full text-[8px] font-semibold text-color_6">0</p>
        </Link>
        {/* drop-down */}
        <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          {userInfo ? (<span className="">{userInfo.username}</span>) : (<></>)}
          {userInfo && (
            <IoIosArrowDown className={`h-4 w-4 ml-1 ${ dropdownOpen ? "transform rotate-180" : "" }`}/>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-1 space-y-2 bg-color_2 ${
              !userInfo.isAdmin ? "-right-2" : "-top-50"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        </div>
        {/* smmall-view button */}
        <Link onClick={() => setVisible(true)} className="flex items-center md:hidden" >
        <CgMenuLeft className="text-color_5" size={22}/>
        </Link>
        </div>
        {/* signin & signup credintials */}      
        {!userInfo && (
          <div className="md:flex gap-2 hidden ">
              <Link to="/login"><AiOutlineLogin className="text-color_4" size={20} /></Link>
              <Link to="/register" > <AiOutlineUserAdd className="text-color_4" size={20} /></Link>           
          </div>
        )}
        </div>

        {/* open menu on small devices */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-color_2 transition-all ${visible ? 'w-full z-10' : 'w-0'}`}>
            <div className="flex flex-col ">
              <div className="flex items-center  gap-4 p-3 cursor-pointer" onClick={() => setVisible(false)}>
                <p className="text-lg font-medium text-color_4">Back</p>
                <IoIosArrowForward className="size-7 text-color_4" />
              </div>
            {/* mobile benu */}
            {
              navlinks.map((nav) => (
                <NavLink to={nav.link} key={nav.link} className="pt-12 text-center mt-4 text-xl text-color_4" onClick={() => setVisible(false)}>
                <p className="font-bold">{nav.title}</p>
                </NavLink>
              ))
            }
        {!userInfo && (
          <div className="flex gap-6  items-center justify-center mt-16">
              <Link to="/login" className="flex gap-2 btn auth-btn"><AiOutlineLogin  size={22} />Login</Link>
              <Link to="/register" className="flex gap-2 btn auth-btn"><AiOutlineUserAdd  size={22} />Register</Link>
          </div>
        )}
            </div>
        </div>
    </nav>
    </header>

  )
}

{/* <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 15a7 7 0 0 1-5.19-2.32 2.71 2.71 0 0 1 1.7-1 13.11 13.11 0 0 0 1.29-.28 2.32 2.32 0 0 0 .94-.34 1.17 1.17 0 0 0-.27-.7 3.61 3.61 0 0 1-1.32-2.87A3.18 3.18 0 0 1 8 4.07a3.18 3.18 0 0 1 2.86 3.42 3.6 3.6 0 0 1-1.32 2.88 1.13 1.13 0 0 0-.27.69 2.68 2.68 0 0 0 .93.31 10.81 10.81 0 0 0 1.28.23 2.63 2.63 0 0 1 1.78 1A7 7 0 0 1 8 15z"/></svg> */}