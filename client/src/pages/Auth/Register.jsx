import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userSlice";

import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import Input from "../../components/Input";
import image from '../../assets/auth.png'

const Register = () => {
  const [username, setName] = useState("");
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
        const res = await register({ username, email, password }).unwrap();
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
  <section className="container grid grid-cols-1 md:grid-cols-2 p-2 gap-40 ">
      <div className="flex-1 ">
        <div className="lg:ml-[6rem] ">
        <Title text1={"Register"} text2={"Now"}/>
        </div>
        <form onSubmit={submitHandler} className="container  w-full lg:w-[450px]">
          <div className="my-[2rem]">
              <label
                htmlFor="name"
                className="block font-medium text-color_4/80"
              >
                Name
              </label>
              <Input id="name" type="text" placeholder="Enter your name ...." onChange={(e) => setName(e.target.value)} value={username} />
          </div>

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

          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block font-medium text-color_4/80 "
            >
              Confirm Password
            </label>
            <Input id="confirmPassword" type="password" placeholder="Enter your confirm password ...." onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="auth-btn btn cursor-pointer]"
          >
            {/* {isLoading ? "Registering..." : "Register"} */}
            {isLoading ? <Loader /> : "Register"}
          </button>
          <div className="mt-4">
          <p className="">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-color_6 font-semibold italic hover:underline"
            >
             {" "} Login
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
  )
}

export default Register
