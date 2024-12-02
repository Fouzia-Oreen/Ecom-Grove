import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/userSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import image from '../../assets/auth.png'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      // console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

    
  return (
   <div>
     <section className="section__container flex flex-col md:flex-row flex-wrap  gap-6">
       <div className="md:mt-[5rem] flex-1 mb-4">
         <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
         <form onSubmit={submitHandler} className="max-w-[30rem] ">
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
           <div className="mb-4">
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
          {/* submit button */}
           <button
             disabled={isLoading}
             type="submit"
             className="btn auth-btn my-[1rem]"
           >
             {isLoading ? "Signing In..." : "Sign In"}
           </button>
           {isLoading && <Loader />}
         </form>
          {/* point to register */}
           <p className="text-color_5 mt-2">
             New Customer?{" "}
             <Link
               to={redirect ? `/register?redirect=${redirect}` : "/register"}
               className="text-color_6 font-semibold italic hover:underline ml-2 "
             >
               Register
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

export default Login
