import React, { useState } from 'react'
import {HiOutlinePaperClip} from 'react-icons/hi'
import {FaTrash, FaPen} from 'react-icons/fa'
import vendorProfile from '../../img/vendor_profile.png'
import EditVendorModal from '../modals/EditModal';
import AddOrEditVendorProfile from './AddOrEditVendorProfile';
import ConfirmationModal from '../modals/ConfirmationModal';
import InformationModal from '../modals/InformationModal';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const VendorCard = ({vendor, index, onDelete, onEdit, profileImages, identityImages, licenseImages}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showIdentityModal, setShowIdentityModal] = useState(false);
    const{t,} = useTranslation();
    const tCard = t("vendorCard")
  return (
    <>
    <div key={vendor.vendorId} className='flex-col space-y-2 mb-16 w-full lg:w-5/12 shadow-3 p-2 m-2 rounded-xl'>
        <div className='flex justify-between'>
            {profileImages[index]?<img className="rounded-xl" width={100} src={profileImages[index]?.data?`data:image/png;base64, ${profileImages[index]?.data}`:vendorProfile} alt="Profile" />
                :<img className="rounded-xl" width={100} src={vendorProfile} />}
            <div className="flex flex-col items-stretch">
                <div className='mb-1'>
                    <button className='bg-primary-200 mx-1' onClick={()=>setShowIdentityModal(true)}><HiOutlinePaperClip /></button>
                    <button className='bg-green-200 mx-1' onClick={()=>{
                        setShowEditModal(true)}}><FaPen /></button>
                    <button className='bg-red-200 mx-1' onClick={()=>setShowDeleteModal(true)}><FaTrash /></button>
                </div>
                <Link className='bg-green-200 text-sm text-center mx-1' to={"products"} state={{vendor}}>
                View Products</Link>
            </div>
        </div>
        <div className="flex-col space-y-2 justify-self-end">
            <div className="flex justify-between">
                <h3>{vendor.fullName}</h3>
                <h3 className='capitalize'>{vendor.vendorType}</h3>
            </div>
            <div className="text-sm flex justify-between">
                <p>{tCard["maxDeliveQuestion"]}</p>
                <strong className='text-white px-1 bg-slate-400 rounded-lg'>
                    {vendor.maxKilometerDelivery?vendor.maxKilometerDelivery + tCard["kmUnit"]
                    : tCard["notProvided"]}</strong>
            </div>
            <div className="text-sm flex justify-between">
                <p>{tCard["minChargeQuestion"]}</p>
                <strong className='text-white px-1 bg-slate-400 rounded-lg'>
                    {vendor.minChargeLongDistance?vendor.minChargeLongDistance + tCard["aedUnit"]
                    : tCard["notProvided"]}</strong>
            </div>
        </div>
    </div>
    <EditVendorModal showModal={showEditModal} setShowModal={setShowEditModal} target="Vendor">
        <ToastContainer/>
        <AddOrEditVendorProfile key={vendor.vendorId}
        isEdit={true}
        onEdit={onEdit}
        currentVendor={vendor}
        vendorImages={{
            profileImage: profileImages[index],
            identityImage: identityImages[index],
            licenseImage: licenseImages[index]
            
        }} />
    </EditVendorModal>
    <ConfirmationModal
        title={"Confirm Vendor Delete"}
        btnColor={"bg-danger"}
        message={"Are you sure for deleting this vendor?"}
        onAction={()=>{onDelete(vendor.vendorId); setShowDeleteModal(false)}}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}/>
    <InformationModal
        title={"License and Identity Images"}
        btnColor={"bg-info"}
        showModal={showIdentityModal}
        setShowModal={setShowIdentityModal}>
            <div className='flex justify-between'>
                <img className='w-[45%] h-72 rounded-xl' src={licenseImages[index]?.data?`data:image/png;base64, ${licenseImages[index]?.data}`:vendorProfile} alt="license" />
                <img className='w-[45%] h-72 rounded-xl' src={identityImages[index]?.data?`data:image/png;base64, ${identityImages[index]?.data}`:vendorProfile} alt="identity" />
            </div>
        </InformationModal>
    </>
  )
}

export default VendorCard