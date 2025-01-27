import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/api/userSlice'
import Loader from '../../components/Loader'
import Input from '../../components/Input'
import Title from '../../components/Title'

const Profile = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [phone, setPhone] = useState('')


  const {userInfo} = useSelector(state => state.auth)
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
  
  useEffect(() => {
    setUserName(userInfo.username)
    setEmail(userInfo.email)
    setAddress(userInfo.address)
    setState(userInfo.state)
    setCity(userInfo.city)
    setZipCode(userInfo.zipCode)
    setPhone(userInfo.phone)
  }, [userInfo.username, userInfo.email, userInfo.address, userInfo.state,userInfo.city,userInfo.zipCode,userInfo.phone])

  const dispatch = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
          address,
          city,
          state,
          zipCode,
          phone,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  
  return (
    <div className="container px-4 overflow-hidden">
    <div className="flex flex-col justify-center align-center md:flex md:space-x-4 my-[2rem]">
      <Title text1={"Update"} text2={"Profile"}/>
      <div className="lg:w-[800px] w-full">
        
        <form onSubmit={submitHandler} >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 '>
          <div className="">
            <label className="block text-color_4 mb-1 font-medium">Name</label>
            <Input type="text" placeholder="Enter name" value={username} onChange={(e) => setUserName(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Email</label>
          <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Password</label>
          <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Confirm Password</label>
          <Input type="password" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Address</label>
          <Input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">City</label>
          <Input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">State</label>
          <Input type="text" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">ZipCode</label>
          <Input type="Number" placeholder="Enter zip-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
          </div>

          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Phone</label>
          <Input type="Number" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          </div>
          <div className="flex  gap-6 mt-6">
            <button
              type="submit"
              className="bg-color_6 btn hover:bg-rose-600"
            >
              Update
            </button>
            <Link
              to="/user-orders"
              className="btn add-btn hover:bg-neutral-900"
            >
              My Orders
            </Link>
          </div>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
    </div>
  </div>
)
}

export default Profile
