import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/userSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    const submitHandler = async (e)=> {
      e.preventDefault()
      try {
        const res = await login({email, password}).unwrap()
        console.log(res)
        dispatch(setCredentials({...res}))
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
    
  return (
    <section className='section__container flex flex-wrap '>
      <div className=" mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
                <label htmlFor="email" className='block text-sm font-medium text-dark-2'>Email Address</label>
                <input type="email" id="email" className='mt-1' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="my-[2rem]">
                <label htmlFor="password" className='block text-sm font-medium text-dark-2'>Password</label>
                <input type="password" id="password" className='mt-1' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='add-btn' disabled={isLoading}>{isLoading ? "Signing In..." : "Sign In"}</button>
            {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p>New Customer ? {" "} 
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}className='hover:underline font-medium'> Register</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login
