import React, { useEffect, useState } from 'react'
import useAxiosFetchApi from '../../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/appHooks';
import { ToastContainer, toast } from 'react-toastify';
import VendorCard from './VendorCard';
import AppLoading from '../../utils/AppLoading';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
const VENDOR_LIST_URL = "/vendors";
const VENDOR_DELETE_URL = "/vendors/delete";

const VendorsList = () => {

    const { auth } = useAuth();
    const sessionToken = auth.token;
    const{ i18n} = useTranslation();
    const axiosPrivate = useAxiosPrivate()
    const [state, _,setChangeData] = useAxiosFetchApi(VENDOR_LIST_URL, {}, sessionToken);
    const vendorList = state.data?.list;

    function handleChangeOnEditVendor(newData){
        const others=vendorList.filter(remain=>remain.vendorId!==newData.vendorId);
        setChangeData([...others, newData])
    }

    async function handleDeleteVendor(id) {
        try{
            const userDeletedResponse = await axiosPrivate.delete(VENDOR_DELETE_URL+`/${id}`,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            const afterDelete=vendorList.filter(remain=>remain.vendorId!==id);
            setChangeData(afterDelete)
            toast.success(userDeletedResponse?.data.message);
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    }
  return (
    <>
        <ToastContainer />
        <div className='flex flex-wrap w-full justify-between'>
            {state.isLoading?<div className="w-full h-[70vh] flex justify-center items-center">
            <AppLoading/></div>
            :!state.data.list
            ?<div className='flex justify-center items-center h-[70vh] capitalize'>{state.data.message??state.error.message}</div>
            :vendorList.map((vendor, index)=>{
            return <VendorCard key={vendor.vendorId} vendor={vendor}
            onDelete={handleDeleteVendor}
            onEdit={handleChangeOnEditVendor}
            />})
            }
        </div>
    </>
  )
}

export default VendorsList