import React from 'react'
import { HiCurrencyDollar, HiMiniShoppingCart } from "react-icons/hi2";
import { IoPeopleCircle } from "react-icons/io5";
import AppLoading from '../../utils/AppLoading';
import useAxiosFetchApi from '../../hooks/useFetch';
import bannerEn from '../../img/banner-en.png'
import bannerAr from '../../img/banner-ar.png'
import { useAuth } from '../../hooks/appHooks';
import RecentOrdersTable from './RecentOrdersTable';
import FrequentVendorsTable from './FrequentVendorsTable';
import FrequentCustomersTable from './FequentCustomersTable';
import { useTranslation } from 'react-i18next';
const HOME_DETAILS_URL = "/details/admin/home";
const AdminHome = () => {
  const { auth } = useAuth();
  const{ i18n} = useTranslation();
  const sessionToken = auth.token;
  const [state] = useAxiosFetchApi(HOME_DETAILS_URL, {}, sessionToken);
  const details = state.data?.details;
  
  return (
    <div className='flex flex-col'>
      <div className='h-60 relative'>
        <img src={i18n.language==="en"?bannerEn:bannerAr} alt={"banner"} className="absolute  bg-primary-color rounded-xl h-52 w-full"/>
        <div className={`absolute banner-shadow-${i18n.dir()} rounded-xl h-52 w-3/4`}></div>
        <div className="absolute z-10 p-10">
          <h1 className='font-normal'>Welcome Back! Tabaldi Management</h1>
          <p className='text-white'>Tabaldi Management is simple & clean design for developer and designer.</p>
          <button className='bg-secondary-color border-0 my-2 py-2 px-4 rounded-xl text-white'>View Vendors</button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          :<div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>Earnings</h3>
              <HiCurrencyDollar className='text-green-300' size={45}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.earnings} AED</h2>
            <p>Monthly revenue</p>
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
            <p>{details?.newOrdersPerDay}+ New Sales</p>
          </div>}
        </div>
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>Customers</h3>
              <IoPeopleCircle className='text-blue-300' size={45}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.numberOfCustomers}</h2>
            <p>{details?.newCustomersPer2Days}+ in 2 days</p>
          </div>}
        </div>
      </div>
      <RecentOrdersTable state={state} orders={state.data?.details?.orders} title={"Recent Orders"}/>
      <FrequentCustomersTable state={state} title={"Most Frequently Customers"}/>
      <FrequentVendorsTable state={state} title={"Most Frequently Vendors"}/>
    </div>
  )
}

export default AdminHome