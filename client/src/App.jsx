import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './pages/auth/Navbar';
import Footer from './components/Footer';




function App() {
  return (
    <>
    <ToastContainer />
    <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
