import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Unauthorized from './pages/Unauthorized';
import PhoneVerification from './pages/PhoneVerification';
import Login from './pages/Login';
import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import RequiredAuth from './layouts/RequiredAuth';
import UsersList from './pages/vendor/UsersList';
import AdminHome from './pages/admin/AdminHome';
import AddOrEditVendorProfile from './pages/admin/AddOrEditVendorProfile';
import VendorsList from './pages/admin/VendorsList';
import OrdersList from './pages/vendor/CustomerOrdersList';
import OrdersHistoryList from './pages/vendor/OrdersHistoryList';
import ProductsList from './pages/vendor/ProductsList';
import VendorHome from './pages/vendor/VendorHome';
import ProductDetails from './pages/vendor/ProductDetails';
import OrderDetails from './pages/vendor/OrderDetails';
import AddOrEditProduct from './pages/vendor/AddOrEditProduct';
import CategoriesList from './pages/vendor/CategoriesList';
import InvoicesList from './pages/vendor/InvoicesList';
import AdvertisementsList from './pages/admin/AdvertisementsList';
import Policies from './pages/Policies';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<PhoneVerification />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/privacy-and-policy" element={<Policies />} />
      <Route path="/" element={<RequiredAuth routeRole={"SUPERADMIN"}/>}>
        <Route index element={<AdminHome />}/>
        <Route path='admin' element={<AdminHome />}/>
        <Route path='admins/users' element={<UsersList routeRole={"SUPERADMIN"} />}/>
        <Route path='vendors' element={<VendorsList />} />
        <Route path='advertisements' element={<AdvertisementsList />} />
        <Route path='vendors/products' element={<ProductsList routeRole={"SUPERADMIN"}/>}/>
        <Route path='vendors/products/:productId' element={<ProductDetails/>} />
        <Route path='vendors/categories' element={<CategoriesList routeRole={"SUPERADMIN"}/>}/>
        <Route path='vendors/users' element={<UsersList routeRole={"SUPERADMIN"}/>}/>
        <Route path='vendor-info' element={<AddOrEditVendorProfile />} />
        <Route path='orders/pending' element={<OrdersList routeRole={"SUPERADMIN"}/>}/>
        <Route path='orders/pending/:orderId' element={<OrderDetails/>}/>
        <Route path='orders/history' element={<OrdersHistoryList />}/>
          <Route path='orders/history/:orderId' element={<OrderDetails/>}/>
      </Route>

      <Route path="/" element={<RequiredAuth routeRole={"VENDOR"} />}>
        <Route path='vendor' element={<VendorHome />}/>
        <Route path='products' element={<ProductsList/>} />
        <Route path='products/:productId' element={<ProductDetails/>} />
        <Route path='product-info' element={<AddOrEditProduct />}/>
        <Route path='categories' element={<CategoriesList/>}/>
        <Route path='users' element={<UsersList />}/>
        <Route path='orders' element={<OrdersList/>} />
        <Route path='orders/:orderId' element={<OrderDetails/>}/>
        <Route path='invoices' element={<InvoicesList />}/>
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
