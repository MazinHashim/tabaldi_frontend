import React, { useState } from 'react'
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
    const{ t, i18n} = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const axiosPrivate = useAxiosPrivate()
    const tVendorInfo = t("vendorFormInfo")
    const [state, _,setChangeData] = useAxiosFetchApi(VENDOR_LIST_URL.concat("?roleName=VENDOR"), {}, sessionToken);
    const vendorList = state.data?.list;
    const queryVendors = vendorList?.filter((data) =>
        // Object.values(data).some((value) =>
        data.fullName?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.arFullName?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.user.phone.includes(searchQuery.toLowerCase())
        // )
    )

    function handleChangeOnEditVendor(newData){
        const others=vendorList.filter(remain=>remain.vendorId!==newData.vendorId);
        setChangeData({list: [...others, newData]})
    }

    async function handleDeleteVendor(id) {
        try{
            const userDeletedResponse = await axiosPrivate.delete(VENDOR_DELETE_URL+`/${id}`,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            const afterDelete=vendorList.filter(remain=>remain.vendorId!==id);
            setChangeData({list: afterDelete})
            toast.success(userDeletedResponse?.data.message);
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    }
  return (
    <>
        <ToastContainer />
        <div className="flex justify-between mb-5 w-full">
            <h2>{tVendorInfo.vendors}</h2>
            <input type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`${t('search')}`} className='p-2 m-2 rounded-lg border w-1/4'/>
        </div>
        <div className='flex flex-wrap w-full justify-between'>
            {state.isLoading?<div className="w-full h-[70vh] flex justify-center items-center">
            <AppLoading/></div>
            :!state.data.list
            ?<div className='flex justify-center items-center h-[70vh] capitalize'>{state.data.message??state.error.message}</div>
            :queryVendors
            .sort((a, b) => {
                if (a.fullName < b.fullName) return -1;
                if (a.fullName > b.fullName) return 1;
                return 0
            })
            .map((vendor)=>{
            return <div key={vendor.vendorId} className='flex w-5/12'>
            <VendorCard vendor={vendor}
            onDelete={handleDeleteVendor}
            onEdit={handleChangeOnEditVendor}
            /></div>})
            }
        </div>
    </>
  )
}

export default VendorsList