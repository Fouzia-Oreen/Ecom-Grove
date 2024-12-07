import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './index.css';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Profile from './pages/users/Profile.jsx';
import store from './redux/store.js';
import AdminRoutes from './pages/admin/AdminRoutes.jsx';
import UserList from './pages/admin/UserList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import BrandList from './pages/admin/BrandList.jsx';
import SubCategoryList from './pages/admin/SubCategoryList.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* user updated routes */}
      <Route path="" element={<PrivateRoute />}>
       <Route path="/profile" element={<Profile />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminRoutes />}>
       <Route path="userlist" element={<UserList />} />
      <Route path="categorylist" element={<CategoryList />} />
      <Route path="brandlist" element={<BrandList />} />
      <Route path="productlist" element={<ProductList />} />
      <Route path="subcategorylist" element={<SubCategoryList />} />
      <Route path="product/update/:_id" element={<UpdateProduct />} />
      <Route path="allproductslist" element={<AllProducts />} />
      {/*<Route path="productlist/:pageNumber" element={<ProductList />} />
      <Route path="product/update/:_id" element={<ProductUpdate />} />
      <Route path="orderlist" element={<OrderList />} />
      <Route path="dashboard" element={<AdminDashboard />} /> */}
    </Route>



    </Route>
  
  /**
    <Route path="/" element={<App />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route index={true} path="/" element={<Home />} />
    <Route path="/favorite" element={<Favorites />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/shop" element={<Shop />} />

    // {/* Registered users 
    <Route path="" element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/order/:id" element={<Order />} />
    </Route>

    <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserList />} />
      <Route path="categorylist" element={<CategoryList />} />
      <Route path="productlist" element={<ProductList />} />
      <Route path="allproductslist" element={<AllProducts />} />
      <Route path="productlist/:pageNumber" element={<ProductList />} />
      <Route path="product/update/:_id" element={<ProductUpdate />} />
      <Route path="orderlist" element={<OrderList />} />
      <Route path="dashboard" element={<AdminDashboard />} />
    </Route>
    </Route>
  */
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
