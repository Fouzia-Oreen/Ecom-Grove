/* eslint-disable no-unused-vars */
import { useState } from "react"
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { IoHeart } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom'
import './Navigation.css'
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/auth/authSlice";



const Navigation = () => {
  const {userInfo} = useSelector(state => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleDropdown = () => {
    setDropdown(!dropdownOpen)
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const closeSidebar = () => {
    setShowSidebar(false)
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
    <div style={{zIndex:999}} 
    className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 hover:w-[15%] h-[100vh] fixed bg-dark-3 text-white`} id="navigation-container">
      <div className="flex flex-col justify-center space-y-4 ">
        <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineHome className="mr-3 mt-[3rem] text-light-3" size={24}/>
        <span className="hidden nav-item-name mt-[3rem] text-light-3 font-medium text-lg font-header">Home</span>
        </Link>
        <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineShopping className="mr-3 mt-[3rem] text-light-3" size={24}/>
        <span className="hidden nav-item-name mt-[3rem] text-light-3 font-medium text-lg font-header">Shop</span>
        </Link>
        <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineShoppingCart className="mr-3 mt-[3rem] text-light-3" size={24}/>
        <span className="hidden nav-item-name mt-[3rem] text-light-3 font-medium text-lg font-header">Cart</span>
        </Link>
        <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
        <IoHeart className="mr-3 mt-[3rem] text-light-3" size={24}/>
        <span className="hidden nav-item-name mt-[3rem] text-light-3 font-medium text-lg font-header">Favourites</span>
        </Link>
      </div>
      <div className="relative">
        <button onChange={toggleDropdown} className="flex items-center text-light-3 focus:outline-none">
          {
            userInfo ? <span>{userInfo.username}</span> : (<></>)
          }
        </button>
      </div>
    <ul>
      <li>
        <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineLogin className="mr-3 mt-[3rem] text-light-3" size={24}/>
        <span className="hidden nav-item-name mt-[3rem] text-light-3 font-medium text-lg font-header">Login</span>
        </Link>
      </li>
      <li>
        <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineUserAdd className="mr-3 mt-[3rem] text-light-3" size={24}/>
        <span className="hidden nav-item-name mt-[3rem] text-light-3 font-medium text-lg font-header">Register</span>
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default Navigation
