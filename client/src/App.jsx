//import Navigation from './pages/Auth/Navigation';
import {ToastContainer} from 'react-toastify'
import {Outlet} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { Navbar } from './pages/Auth/Navbar';



function App() {
  return (
    <>
    <ToastContainer />
    <Navbar />
      {/* <Navigation /> */}

      <main className='py-3'>
        <Outlet />
      </main>
    </>
  )
}

export default App
