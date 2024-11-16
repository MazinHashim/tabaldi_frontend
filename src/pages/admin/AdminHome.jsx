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
import { useNavigate } from 'react-router-dom';
const HOME_DETAILS_URL = "/details/admin/home";
const AdminHome = () => {
  const { auth } = useAuth();
  const{t, i18n} = useTranslation();
  const navigate = useNavigate();
  const tAdmin= t("adminHomeInfo")
  const sessionToken = auth.token;
  const [state] = useAxiosFetchApi(HOME_DETAILS_URL, {}, sessionToken);
  const details = state.data?.details;
  
  return (
    <div className='flex flex-col'>
      <div className='h-60 relative'>
        <img src={i18n.language==="en"?bannerEn:bannerAr} alt={"banner"} className="absolute  bg-primary-color rounded-xl h-52 w-full"/>
        <div className={`absolute banner-shadow-${i18n.dir()} rounded-xl h-52 w-3/4`}></div>
        <div className="absolute z-10 p-10">
          <h1 className='font-normal'>{tAdmin["welcomeTxt"]}</h1>
          <p className='text-white'>{tAdmin["subPargTxt"]}</p>
          <button onClick={()=>navigate("/vendors")} className='bg-secondary-color border-0 my-2 py-2 px-4 rounded-xl text-white'>{tAdmin["viewVendor"]}</button>
        </div>
      </div>
      {/* added superadmin condition */}
      {auth.superAdmin &&
      <div className="flex justify-between">
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          :<div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>{tAdmin["earningTxt"]}</h3>
              <HiCurrencyDollar className='text-green-300' size={45}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.earnings} {t("aedUnit")}</h2>
            <p>{tAdmin["revenueTxt"]}</p>
          </div>}
        </div>

        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>

            <div className="flex justify-between items-center">
              <h3 className='font-medium'>{tAdmin["orderPerDayTxt"]}</h3>
              <HiMiniShoppingCart className='bg-amber-200 text-white p-1.5 rounded-full' size={40}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.newOrdersPerDay}</h2>
            <p>{details?.numberOfOrders} {tAdmin["totalOrdersCount"]}</p>
          </div>}
        </div>
        <div className="flex flex-col w-[30%] p-4 rounded-2xl shadow-lg bg-gray-50 border border-gray-100">
          {state.isLoading && !details
          ? <AppLoading />
          : <div>
            <div className="flex justify-between items-center">
              <h3 className='font-medium'>{tAdmin['customersTxt']}</h3>
              <IoPeopleCircle className='text-blue-300' size={45}/>
            </div>
            <h2 className='font-semibold mt-3'>{details?.numberOfCustomers}</h2>
            <p>{details?.newCustomersPer2Days}+ {tAdmin["inTwoDays"]}</p>
          </div>}
        </div>
      </div>
      }
      <RecentOrdersTable state={state} orders={state.data?.details?.orders} title={tAdmin["pendingTxt"]}/>
      <FrequentCustomersTable state={state} title={tAdmin["freqCustTxt"]} labels={tAdmin}/>
      <FrequentVendorsTable state={state} title={tAdmin["freqVendorTxt"]} labels={tAdmin}/>
    </div>
  )
}

export default AdminHome