import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './index.css';
import AddHeader from './pages/admin/AddHeader.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminRoutes from './pages/admin/AdminRoutes.jsx';
import AllHeaders from './pages/admin/AllHeaders.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';
import BrandList from './pages/admin/BrandList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import OrderList from './pages/admin/OrderList.jsx';
import UpdateHeader from './pages/admin/UpdateHeader.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import UserList from './pages/admin/UserList.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Order from './pages/orders/Order.jsx';
import PlaceOrder from './pages/orders/PlaceOrder.jsx';
import Shipping from './pages/orders/Shipping.jsx';
import Favorites from './pages/products/Favourites.jsx';
import ProductDetails from './pages/products/ProductDetails.jsx';
import Shop from './pages/Shop.jsx';
import TermsAndCondition from './pages/TermsAndCondition.jsx';
import Cart from './pages/users/Cart.jsx';
import Profile from './pages/users/Profile.jsx';
import UserOrder from './pages/users/UserOrders.jsx';
import store from './redux/store.js';
import OfferProducts from './pages/Offer.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />} >
      {/* all routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} /> 
      <Route path="/offers" element={<OfferProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route  path="/terms" element={<TermsAndCondition />} />
      <Route  path="/contact" element={<Contact />} />

      {/* user authenticated routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-orders" element={<UserOrder />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminRoutes />}>
       <Route path="userlist" element={<UserList />} />
      <Route path="categorylist" element={<CategoryList />} />
      <Route path="brandlist" element={<BrandList />} />
       <Route path="addproduct" element={<AddProduct />} />
      <Route path="product/update/:_id" element={<UpdateProduct />} />
      <Route path="allproductslist" element={<AllProducts />} />
      <Route path="header" element={<AddHeader />} />
      <Route path="allheaders" element={<AllHeaders />} />
      <Route path="header/update/:_id" element={<UpdateHeader />} />
      <Route path="orderlist" element={<OrderList />} />
      <Route path="dashboard" element={<AdminDashboard />} />
    </Route>
  </Route>
 
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PayPalScriptProvider>
  <RouterProvider router={router}/>
  </PayPalScriptProvider>
  </Provider>
)
