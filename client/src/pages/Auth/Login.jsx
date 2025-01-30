import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/userSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import image from '../../assets/auth.png'
import Title from '../../components/Title'
import Input from '../../components/Input'


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
   <div className='lg:h-[70vh] lg:mt-20 flex'>
  <section className="container grid grid-cols-1 md:grid-cols-2 p-2 gap-40  ">
      <div className="flex-1 ">
        <div className="lg:ml-[5rem] ">
        <Title text1={"Please"} text2={"Login"}/>
        </div>
        <form onSubmit={submitHandler} className="container  w-full lg:w-[450px]">

          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block font-medium text-color_4/80"
            >
              Email Address
            </label>
            <Input id="email" type="email" placeholder="Enter your email ...." onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block font-medium text-color_4/80 "
            >
              Password
            </label>
            <Input id="password" type="password" placeholder="Enter your password ...." onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="auth-btn btn cursor-pointer]"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
          <div className="mt-4">
          <p className="">
            Don&apos;t have an account?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-color_6 font-semibold italic hover:underline"
            >
             {" "} Register
            </Link>
          </p>
        </div>

          {/* {isLoading && <Loader />} */}
        </form>
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
