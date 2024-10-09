import React, { useEffect } from 'react'
import { PiArrowFatLinesLeftFill, PiArrowFatLinesRightFill } from "react-icons/pi";
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
import { ToastContainer } from 'react-toastify';

const HOME_DETAILS_URL = "/details/vendor/home/{id}";

const VendorHome = () => {
  const { auth } = useAuth();
  const homeDetailsUrl = HOME_DETAILS_URL.replace("{id}", `${auth?.vendor?.vendorId}`);
  const [state, setUrl] = useAxiosFetchApi(null, {}, auth?.token);
  const details = state.data?.details;
  const {t, i18n} = useTranslation();
  const tCard = t("vendorCard")
  const tHome= t("vendorHomeInfo")
  useEffect(()=>{
    setUrl(homeDetailsUrl)
  }, [auth?.vendor?.vendorId, homeDetailsUrl, setUrl])
  const homeVendor=auth?.vendor;

  return (
    <div className='flex flex-col mb-6'>
      <ToastContainer />
      <div className='flex justify-between items-center my-4'>
        <div className='flex justify-center items-center'>
          <img src={vendorProfile} alt="vendor" className='rounded-full' width={100}/>
          <div>
            <h2 className='font-medium mx-3'>{homeVendor?.fullName}</h2>
            <span className='px-3 ms-2 text-gray-500 text-sm'>
              {`${tCard['openingTxt']} ${homeVendor?.fopeningTime} - ${tCard['closingTxt']} ${homeVendor?.fclosingTime}`}
            </span>
          </div>
          <span className='px-3 ms-2 rounded-lg bg-gray-600 text-white text-sm'>{homeVendor?.vendorType}</span>
        </div>
        <p className={`px-2 ${homeVendor?.working?"bg-green-700":"bg-red-700"} text-white rounded-lg text-sm inline-block`}>
          {homeVendor?.working?tCard["working"]:tCard["outOfService"]}
        </p>
      </div>
      <hr />
      <div className='flex justify-between items-center text-center my-6'>
        <NavLink to={"/categories"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>1</h2> {tHome["addCatTxt"]}</NavLink>
          {i18n.language==="en"
          ? <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}} />
          : <PiArrowFatLinesLeftFill className='secondary-color' size={40} style={{display:"inline-block"}} />}
        <NavLink to={"/product-info"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>2</h2> {tHome["addProdTxt"]}</NavLink>
          {i18n.language==="en"
          ? <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}} />
          : <PiArrowFatLinesLeftFill className='secondary-color' size={40} style={{display:"inline-block"}} />}
        <NavLink to={"/products"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>3</h2> {tHome["addCharTxt"]}</NavLink>
          {i18n.language==="en"
          ? <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}} />
          : <PiArrowFatLinesLeftFill className='secondary-color' size={40} style={{display:"inline-block"}} />}
        <NavLink to={"/orders"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>4</h2> {tHome["recieveCustTxt"]}</NavLink>
          {i18n.language==="en"
          ? <PiArrowFatLinesRightFill className='secondary-color' size={40} style={{display:"inline-block"}} />
          : <PiArrowFatLinesLeftFill className='secondary-color' size={40} style={{display:"inline-block"}} />}
        <NavLink to={"/orders"} className='border-0 bg-primary-color rounded-xl shadow-lg py-2 px-5 text-white'>
          <h2 className='text-2xl font-medium'>5</h2> {tHome["trackCustTxt"]}</NavLink>
      </div>
      <div className="flex justify-between my-6">
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          :<div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>{tHome["earningTxt"]}</h3>
              <HiCurrencyDollar className='text-green-300' size={45}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.earnings} {t("aedUnit")}</h2>
            <p>{tHome["revenueTxt"]}</p>
          </div>}
        </div>

        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>

            <div className="flex justify-between items-center">
              <h3 className='font-medium'>{tHome["orderTxt"]}</h3>
              <HiMiniShoppingCart className='bg-amber-200 text-white p-1.5 rounded-full' size={40}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.numberOfOrders}</h2>
            {details?.pendingOrders.count>0?<p>
            {tHome["seeTxt"]}
              <strong className='rounded-full bg-info-200 text-lg px-2 mx-2'>
                {details?.pendingOrders.count}
              </strong>
            {tHome["pendingTxt"]}</p>:<p>{tHome["noPendingTxt"]}</p>}
          </div>}
        </div>
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>{tHome["productTxt"]}</h3>
              <FaBoxOpen className='bg-blue-200 text-white p-1.5 rounded-full' size={40}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.numberOfProducts}</h2>
          </div>}
        </div>
      </div>
      <RecentOrdersTable className="my-6" state={state} orders={state.data?.details?.pendingOrders?.orders} title={tHome["pendingTxt"]}/>
      <FrequentProductsTable className="my-6" state={state} title={tHome["freqProdTxt"]} labels={tHome}/>
    </div>
  )
}

export default VendorHome