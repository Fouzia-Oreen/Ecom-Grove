import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../redux/api/userSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import image from '../../assets/auth.png'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [register, { isLoading }] = useRegisterMutation();
  
    const { userInfo } = useSelector((state) => state.auth);
  
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const res = await register({ name, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success("User successfully registered");
        } catch (err) {
          console.log(err);
          toast.error(err.data.message);
        }
      }
    };
  
  return (
     <div>
     <section className="section__container flex flex-col md:flex-row flex-wrap  gap-6">
       <div className="md:mt-[5rem] flex-1 mb-4">
         <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
         <form onSubmit={submitHandler} className="max-w-[30rem] ">
         <div className="my-[2rem]">
             <label
               htmlFor="name"
               className="block text-sm font-medium text-color_4"
             >
               Full Name
             </label>
             <input
               type="name"
               id="name"
               className="mt-1 p-2 border rounded w-full"
               placeholder="Enter name"
               value={name}
               onChange={(e) => setName(e.target.value)}
             />
           </div>
           <div className="my-[2rem]">
             <label
               htmlFor="email"
               className="block text-sm font-medium text-color_4"
             >
               Email Address
             </label>
             <input
               type="email"
               id="email"
               className="mt-1 p-2 border rounded w-full"
               placeholder="Enter email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
           </div>
           <div className="my-[2rem]">
           <label
               htmlFor="password"
               className="block text-sm font-medium text-color_4"
             >
               Password
             </label>
             <input
               type="password"
               id="password"
               className="mt-1 p-2 border rounded w-full"
               placeholder="Enter password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
           </div>
           <div className="mb-4">
             <label
               htmlFor="confirmPassword"
               className="block text-sm font-medium text-color_4"
             >
               Confirm password
             </label>
             <input
               type="password"
               id="confirmPassword"
               className="mt-1 p-2 border rounded w-full"
               placeholder="Confirm password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
             />
           </div>
          {/* submit button */}
           <button
             disabled={isLoading}
             type="submit"
             className="btn auth-btn my-[1rem]"
           >
             {isLoading ? "Signing Up..." : "Sign Up"}
           </button>
           {isLoading && <Loader />}
         </form>
          {/* point to register */}
           <p className="text-color_5 mt-2">
             New Customer?{" "}
             <Link
               to={redirect ? `/login?redirect=${redirect}` : "/login"}
               className="text-color_6 font-semibold italic hover:underline ml-2 "
             >
              Login
             </Link>
           </p> 
       </div>
       {/* image */}
       <div className='md:mt-[5rem] flex-1 mt-4'>
       <img
         src={image}
         alt=""
         className=""
       />
       </div>

     </section>
   </div>
  )
}

export default Register
