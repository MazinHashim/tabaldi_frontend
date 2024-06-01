import React from 'react'
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
import useAxiosFetchApi from '../../hooks/useFetch';

const HOME_DETAILS_URL = "/details/vendor/home";
const VendorHome = () => {
  const { auth } = useAuth();
  const{ i18n} = useTranslation();
  const sessionToken = auth.token;
  const [state] = useAxiosFetchApi(HOME_DETAILS_URL.concat(`/${auth.vendorId}`), {}, sessionToken);
  const details = state.data?.details;
  return (
    <div>
      <div className='flex justify-between items-center text-center'>
        <NavLink to={"/categories"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>1</h2> Add your Categories</NavLink>
          <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}} />
        <NavLink to={"/product-info"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>2</h2> Add your Products</NavLink>
          <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}}/>
        <NavLink to={"/products"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>3</h2> Add Product Characteristics</NavLink>
          <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}}/>
        <NavLink to={"/orders"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>4</h2> Recieve Customers Orders</NavLink>
          <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}}/>
        <NavLink to={"/orders"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>5</h2> Track Customers Orders</NavLink>
      </div>
    </div>
  )
}

export default VendorHome