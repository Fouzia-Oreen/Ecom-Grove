import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './pages/auth/Navbar';




function App() {
  return (
    <>
    <ToastContainer />
    <Navbar />
      <main className='py-3'>
        <Outlet />
      </main>
    </>
  )
}

export default App
