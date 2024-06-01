import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Unauthorized from './pages/Unauthorized';
import PhoneVerification from './pages/PhoneVerification';
import Login from './pages/Login';
import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import RequiredAuth from './layouts/RequiredAuth';
import AdminHome from './pages/admin/AdminHome';
import AddOrEditVendorProfile from './pages/admin/AddOrEditVendorProfile';
import VendorsList from './pages/admin/VendorsList';
import OrdersList from './pages/vendor/CustomerOrdersList';
import ProductsList from './pages/vendor/ProductsList';
import VendorHome from './pages/vendor/VendorHome';
import ProductDetails from './pages/vendor/ProductDetails';
import OrderDetails from './pages/vendor/OrderDetails';
import AddOrEditProduct from './pages/vendor/AddOrEditProduct';
import CategoriesList from './pages/vendor/CategoriesList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<PhoneVerification />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<RequiredAuth routeRole={"SUPERADMIN"}/>}>
        <Route index element={<AdminHome />}/>
        <Route path='admin' element={<AdminHome />}/>
        <Route path='vendors' element={<VendorsList />} />
        <Route path='vendor-info' element={<AddOrEditVendorProfile />} />
      </Route>

      <Route path="/" element={<RequiredAuth routeRole={"VENDOR"} />}>
        <Route path='vendor' element={<VendorHome />}/>
        <Route path='products' element={<ProductsList/>} />
        <Route path='product-details' element={<ProductDetails/>} />
        <Route path='product-info' element={<AddOrEditProduct />}/>
        <Route path='categories' element={<CategoriesList/>}/>
        <Route path='orders' element={<OrdersList/>}/>
        <Route path='order-details' element={<OrderDetails/>}/>
        <Route path='invoices' element={<VendorHome />}/>
      </Route>
    </Route>
  ));
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
