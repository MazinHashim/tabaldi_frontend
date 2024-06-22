import React, { useEffect } from 'react'
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/appHooks';
import vendorProfile from '../../img/vendor_profile.png'
import { useTranslation } from 'react-i18next';
import useAxiosFetchApi from '../../hooks/useFetch';
import AppLoading from '../../utils/AppLoading';
import { HiCurrencyDollar, HiMiniShoppingCart } from 'react-icons/hi2';
import { FaBoxOpen } from "react-icons/fa";
import RecentOrdersTable from '../admin/RecentOrdersTable';
import FrequentProductsTable from './FrequentProductsTable';

const HOME_DETAILS_URL = "/details/vendor/home/{id}";

const VendorHome = () => {
  const { auth } = useAuth();
  const homeDetailsUrl = HOME_DETAILS_URL.replace("{id}", `${auth.vendorId}`);
  const [state, setUrl] = useAxiosFetchApi(null, {}, auth.token);
  const details = state.data?.details;
  const { i18n} = useTranslation();
  useEffect(()=>{
    setUrl(homeDetailsUrl)
  }, [auth.vendorId, homeDetailsUrl, setUrl])
  return (
    <div className='flex flex-col mb-6'>
      <div className='flex justify-between items-center my-4'>
        <div className='flex justify-center items-center'>
          <img src={vendorProfile} alt="vendor" className='rounded-full' width={100}/>
          <h2 className='font-medium mx-3'>{auth.fullName}</h2>
        </div>
        <h5 className='px-3 rounded-lg bg-gray-600 text-white'>{auth.vendorType}</h5>
      </div>
      <hr />
      <div className='flex justify-between items-center text-center my-6'>
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
      <div className="flex justify-between my-6">
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          :<div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>Earnings</h3>
              <HiCurrencyDollar className='text-green-300' size={45}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.earnings} AED</h2>
            <p>{`Revenue of June`}</p>
          </div>}
        </div>

        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>

            <div className="flex justify-between items-center">
              <h3 className='font-medium'>Orders</h3>
              <HiMiniShoppingCart className='bg-amber-200 text-white p-1.5 rounded-full' size={40}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.numberOfOrders}</h2>
            {details?.pendingOrders.count>0?<p>
            See
              <strong className='rounded-full bg-info-200 text-lg px-2 mx-2'>
                {details?.pendingOrders.count}
              </strong>
            Pending Orders</p>:<p>No Pending Orders</p>}
          </div>}
        </div>
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>Products</h3>
              <FaBoxOpen className='bg-blue-200 text-white p-1.5 rounded-full' size={40}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.numberOfProducts}</h2>
          </div>}
        </div>
      </div>
      <RecentOrdersTable className="my-6" state={state} orders={state.data?.details?.pendingOrders?.orders} title={"Pending Orders"}/>
      <FrequentProductsTable className="my-6" state={state} title={"Most Frequent Products"}/>
    </div>
  )
}

export default VendorHome