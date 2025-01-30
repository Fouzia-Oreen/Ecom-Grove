import { FiMapPin } from "react-icons/fi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import Input from "../components/Input";
import Title from "../components/Title";
import map from '../assets/map.png';

const Contact = () => {
  return (
    <div className="container  min-h-screen">
    <Title text1={'Contact'} text2={"Us"}/>
    <div className=" p-6 flex flex-col lg:flex-row justify-between items-center ">
      <form className="space-y-4 mt-4 ">
        <h2 className="text-color_4 font-medium">Fill Your Credentials</h2>
        <Input  type="text" placeholder="Your Name" required />
        <Input  type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30" required></textarea>
        <button type="submit" className="btn bg-color_6 text-white ">Send Message</button>
      </form>
      <div className="flex items-start flex-col mt-6 ">
      <div className="mt-6 space-y-3 flex items-start flex-col">
        <p className="flex items-center justify-center gap-2 font-semibold">
          <IoMailUnreadOutline className="text-xl text-color_6 font-bold" /> contact@example.com
        </p>
        <p className="flex items-center justify-center gap-2 font-semibold">
          <MdOutlineLocalPhone className="text-xl text-color_6 font-bold" /> +123 456 7890
        </p>
        <p className="flex items-center justify-center gap-2 font-semibold">
          <FiMapPin className="text-xl text-color_6 font-bold" /> 123 Street, City, Country
        </p>
      </div>

      <div className="mt-6">
        <img src={map} alt="" className="h-[20rem] w-[30rem]  border rounded placeholder-color_3 border-color_4/20"/>
      </div>
      </div>
    </div>
  </div>
  )
}

export default Contact
