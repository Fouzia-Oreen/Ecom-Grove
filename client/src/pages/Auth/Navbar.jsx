/* eslint-disable no-undef */
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { MdOutlineLocalPhone, MdOutlineMarkEmailUnread } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-dark.png';
import { useLoginMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/auth/authSlice";

const navlinks =[
    {link:"/", title:"Home"},
    {link:"/about", title:"About"},
    {link:"/shop", title:"Shop"},
    {link:"/contact", title:"Contact"},
  ]

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {userInfo} = useSelector(state => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [logoutApiCall] = useLoginMutation()
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
    <header className="flex flex-col section__container ">
    {/* notification */}
    <div className=" flex flex-col items-center justify-between bg-dark-4  md:h-[45px] md:flex-row md:px-8 sm:gap-2  p-2 text-white" >
          <Link to='/' className="flex items-center gap-2"><MdOutlineLocalPhone /><span>16 002</span></Link> 
           <p className="font-medium">Big Sale Offers New Arrival</p>
           <Link to='/' className="flex items-center gap-2"><MdOutlineMarkEmailUnread /><span>ecomgrove@gmail.com</span></Link>
    </div>
    {/* nav-menu */}
    <nav  className="flex items-center justify-between py-5 border-b-[1px] border-dark-1  md:px-12 ">
        {/* logo */}
        <div className="flex gap-2 pl-4">
            <img src={logo} alt="logo" className="size-8"/>
            <span className="font-semibold text-lg mt-1 hidden md:block text-light-4">Ecom Grove</span>
        </div>
        {/* navlinks */}
        <ul className="hidden lg:flex gap-5 ">
          {
            navlinks.map((nav) => (
              <NavLink to={nav.link} key={nav.link} className="flex flex-col items-start gap-[2px]">
              <p className="font-medium text-[13px]">{nav.title}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-text-dark hidden" />
              </NavLink>
            ))
          }
        </ul>
        {/* cart & favourite */}
        <div className="flex gap-4">
        <div className="flex items-center gap-2">
        <Link to="/cart" className="flex items-center relative">
        <AiOutlineShoppingCart className="mr-3" size={22}/>
        <p className="absolute right-[5px] bottom-[15px] text-center bg-light-3  size-3.5 rounded-full text-[8px] font-semibold">0</p>
        </Link>
        <Link to="/favourites" className="flex items-center relative">
        <IoHeart className="" size={22}/>
        <p className="absolute right-[-8px] bottom-[15px] text-center bg-light-3  size-3.5 rounded-full text-[8px] font-semibold">0</p>
        </Link>
        <Link onClick={() => setVisible(true)} className="flex items-center md:hidden" >
        <CgMenuLeft className=" text-light-2" size={22}/>
        </Link>
        </div>
        {/* drop-down */}
        <div className="relative">
        <button onChange={toggleDropdown} className="flex items-center text-light-3 focus:outline-none">
          {
            userInfo ? <span>{userInfo.username}</span> : (<></>)
          }
        </button>
      </div>
      {/* buttons */}
      <div className="lg:flex gap-2 hidden ">
      <button>
        <Link to="/login" className="flex items-center btn">
        Login
        </Link>
      </button>
      <button>
        <Link to="/register" className="flex items-center btn">
        Register
        </Link>
      </button>
      </div>
        </div>
            {/* open menu on small devices */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-light-2 transition-all ${visible ? 'w-full z-10' : 'w-0'}`}>
            <div className="flex flex-col ">
              <div className="flex items-center  gap-4 p-3 cursor-pointer" onClick={() => setVisible(false)}>
                <p className="text-lg font-medium">Back</p>
                <IoIosArrowForward className="size-7" />
              </div>
            {/* mobile benu */}
            {
              navlinks.map((nav) => (
                <NavLink to={nav.link} key={nav.link} className=" pt-12 text-center mt-8 text-xl" onClick={() => setVisible(false)}>
                <p className="font-medium ">{nav.title}</p>
                </NavLink>
              ))
            }
            </div>
        </div>
    </nav>
    </header>

  )
}
