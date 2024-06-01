import React, { useEffect, useState } from 'react'
import useAxiosFetchApi from '../../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/appHooks';
import useFetchFileData from '../../apis/useFetchFileData';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../apis/axios';
import VendorCard from './VendorCard';
import AppLoading from '../../utils/AppLoading';
const VENDOR_LIST_URL = "/vendors";
const VENDOR_DELETE_URL = "/vendors/delete";

const VendorsList = () => {

    const { auth } = useAuth();
    const sessionToken = auth.token;
    const{ i18n} = useTranslation();
    const [state, _,setChangeData] = useAxiosFetchApi(VENDOR_LIST_URL, {}, sessionToken);
    const vendorList = state.data?.list;
    const files = useFetchFileData()
    const [vendorImages, setVendorImages] = useState(null);
    
    var profileImages = vendorImages?vendorImages.filter(imgs => imgs.id==="profileImages"):[]
    var identityImages = vendorImages?vendorImages.filter(imgs => imgs.id==="identityImages"):[]
    var licenseImages = vendorImages?vendorImages.filter(imgs => imgs.id==="licenseImages"):[]

    useEffect(()=>{
        const fetchData = async () => {
            if(vendorList && !vendorImages){
                const result = await files({filePaths: [
                    ...vendorList.map((vendor)=>{return {id: "profileImages", path: vendor.profileImage}}),
                    ...vendorList.map((vendor)=>{return {id: "identityImages", path: vendor.identityImage}}),
                    ...vendorList.map((vendor)=>{return {id: "licenseImages", path: vendor.licenseImage}})
                ]});
                setVendorImages(result)}};

        fetchData();
    }, [files, vendorList, vendorImages])
    function handleChangeOnEditVendor(newData){
        const others=vendorList.filter(remain=>remain.vendorId!==newData.vendorId);
        setChangeData([...others, newData])
    }

    async function handleDeleteVendor(id) {
        try{
            const userDeletedResponse = await axios.delete(VENDOR_DELETE_URL+`/${id}`,
                {headers: { 'Accept-Language': i18n.language,
                    'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`}}
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
            return <VendorCard key={vendor.vendorId} vendor={vendor} index={index}
            onDelete={handleDeleteVendor}
            onEdit={handleChangeOnEditVendor}
            profileImages={profileImages}
            identityImages={identityImages}
            licenseImages={licenseImages}
            />})
            }
        </div>
    </>
  )
}

export default VendorsList