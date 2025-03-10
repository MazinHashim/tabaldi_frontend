import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import vendorProfile from '../../img/vendor_profile.png'
import * as validator from '../../utils/validators/VendorValidator';
import { baseURL } from '../../apis/axios';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { ValidationError } from 'yup';
import AppMap from '../../layouts/AppMap';
const VENDOR_ADD_INFO_URL = "/vendors/save";

const AddOrEditVendorProfile = ({currentVendor, isEdit=false, onEdit}) => {
  const{t, i18n} = useTranslation();
  const axiosPrivate = useAxiosPrivate()
  const tVendorInfo = t("vendorFormInfo")
  const [errors, setErrors] = useState();
  const [previewUrls, setPreviewUrls] = useState({});
  const [marker, setMarker] = useState(isEdit?{lat: currentVendor.lat, lng: currentVendor.lng}:null);
  const handleAddOrEditVendor = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    const formDataWithCoord = {...formData, lat: marker?.lat, lng: marker?.lng}
    try {
      await validator.validationSchema(tVendorInfo, isEdit, t("requiredMessage"))
      .validate(formDataWithCoord, {abortEarly: false});
      // userId will initialize after add user response
      var userId = (isEdit?currentVendor.userId:null);
      var vendorId = (isEdit?currentVendor.vendorId:null);
      const fd = new FormData();
      validator.fillVendorFormData(fd, formDataWithCoord, userId, vendorId)
      const infoResponse = await axiosPrivate.post(VENDOR_ADD_INFO_URL, fd,
          {headers: {'Accept-Language': i18n.language}}
      );
      if(!isEdit){ 
        e.target.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
      } else {
        onEdit(infoResponse?.data.vendor);
      }
      toast.success(infoResponse?.data.message);
      } catch (error) {
        if(error instanceof ValidationError){
          console.log(error instanceof ValidationError?"validation error...":error)
          let allErrors = {};
          error?.inner?.forEach((err)=>{
            allErrors[err.path]=err.message;
          })
          setErrors(allErrors)
        } else {
          toast.error(error.response?.data.message);
        }
      }
  }

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);

    const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls({...previewUrls, [event.target.name]: urls[0]});
  };

  return (
    <>
      {!isEdit && <ToastContainer/>}
      {/* <SendOTPModal showModal={showModal} setShowModal={setShowModal} onAction={handleAddOrEditVendor}/> */}
      <div>
        <h1 className='font-normal'>{tVendorInfo[isEdit?"editVendorTitle":"addVendorTitle"]}</h1>
        <form className='w-full' onSubmit={handleAddOrEditVendor} method='post'>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="fullName" className="text-lg">{tVendorInfo.fullName?.label}</label>
              <input type="text" name="fullName" id="fullName" defaultValue={currentVendor?.fullName??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.fullName?.placeholder} />
              {errors?.fullName&&<div className='text-red-600'>{errors?.fullName}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="arFullName" className="text-lg">{tVendorInfo.arFullName?.label}</label>
              <input type="text" name="arFullName" id="arFullName" defaultValue={currentVendor?.arFullName??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.arFullName?.placeholder} />
              {errors?.arFullName&&<div className='text-red-600'>{errors?.arFullName}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="phone" className="text-lg">{tVendorInfo.phone?.label}</label>
              <input type="text" name="phone" id="phone" defaultValue={currentVendor?.userPhone??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.phone?.placeholder}/>
              {errors?.phone&&<div className='text-red-600'>{errors?.phone}</div>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="email" className="text-lg">{tVendorInfo.email?.label}</label>
              <input type="email" name="email" id="email" defaultValue={currentVendor?.userEmail??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.email?.placeholder} />
              {errors?.email&&<div className='text-red-600'>{errors?.email}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="maxKilometerDelivery" className="text-lg">{tVendorInfo.maxKilometerDelivery?.label}</label>
              <input type="number" name="maxKilometerDelivery" id="maxKilometerDelivery" defaultValue={currentVendor?.maxKilometerDelivery??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.maxKilometerDelivery?.placeholder} />
              {errors?.maxKilometerDelivery&&<div className='text-red-600'>{errors?.maxKilometerDelivery}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="minChargeLongDistance" className="text-lg">{tVendorInfo.minChargeLongDistance?.label}</label>
              <input type="number" name="minChargeLongDistance" id="minChargeLongDistance" defaultValue={currentVendor?.minChargeLongDistance??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.minChargeLongDistance?.placeholder}/>
              {errors?.minChargeLongDistance&&<div className='text-red-600'>{errors?.minChargeLongDistance}</div>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="profileImage" className="text-lg">{tVendorInfo.profileImage?.label}</label>
              <input type="file" name="profileImage" id="profileImage" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.profileImage?.placeholder} />
              {errors?.profileImage&&<div className='text-red-600'>{errors?.profileImage}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="identityImage" className="text-lg">{tVendorInfo.identityImage?.label}</label>
              <input type="file" name="identityImage" id="identityImage" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.identityImage?.placeholder}/>
              {errors?.identityImage&&<div className='text-red-600'>{errors?.identityImage}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="licenseImage" className="text-lg">{tVendorInfo.licenseImage?.label}</label>
              <input type="file" name="licenseImage" id="licenseImage" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.licenseImage?.placeholder} />
              {errors?.licenseImage&&<div className='text-red-600'>{errors?.licenseImage}</div>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row flex-wrap justify-between'>
            <div className="md:w-1/4 my-6">
              <label htmlFor="region" className="text-lg">{tVendorInfo.region?.label}</label>
              <select
                name={"region"}
                defaultValue={currentVendor?.region??''}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  {validator.supportedRegions.map(region=>{
                  return <option key={region.id} value={region.value}>{region.name}</option>
                  })}
              </select>
              {errors?.region&&<div className='text-red-600'>{errors?.region}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="openingTime" className="text-lg">{tVendorInfo.openingTime?.label}</label>
              <input type="time" name="openingTime" id="openingTime" defaultValue={currentVendor?.openingTime??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.openingTime?.placeholder}/>
              {errors?.openingTime&&<div className='text-red-600'>{errors?.openingTime}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="closingTime" className="text-lg">{tVendorInfo.closingTime?.label}</label>
              <input type="time" name="closingTime" id="closingTime" defaultValue={currentVendor?.closingTime??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.closingTime?.placeholder} />
              {errors?.closingTime&&<div className='text-red-600'>{errors?.closingTime}</div>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row flex-wrap justify-between items-start my-6'>
            <div className="md:w-1/4 my-6">
              <label htmlFor="vendorType" className="text-lg">{tVendorInfo.vendorType?.label}</label>
              <select
                name={"vendorType"}
                defaultValue={currentVendor?.vendorType??''}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  {validator.supportedVendorType.map(type=>{
                  return <option key={type.id} value={type.value}>{type.name}</option>
                  })}
              </select>
              {errors?.vendorType&&<div className='text-red-600'>{errors?.vendorType}</div>}
            </div>
            <AppMap marker={marker} setMarker={setMarker} />
            {errors?.lat&&<div className='text-red-600'>{errors?.lat}</div>}
            <div className="md:w-1/4">
              <label htmlFor="coverImage" className="text-lg">{tVendorInfo.coverImage?.label}</label>
              <input type="file" name="coverImage" id="coverImage" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tVendorInfo.coverImage?.placeholder} />
              {errors?.coverImage&&<div className='text-red-600'>{errors?.coverImage}</div>}
            </div>
            <button type="submit" className="w-1/4 bg-primary-color text-white px-5 py-2.5 my-6">{tVendorInfo[isEdit?"editBtn":"addBtn"]}</button>
          </div>
          {isEdit && 
          <div className="flex flex-col md:flex-row flex-wrap justify-between my-6">
              {previewUrls.profileImage?<img className="rounded-xl" width={100} src={previewUrls.profileImage} alt="Profile" />
              :currentVendor?.profileImage?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentVendor?.profileImage}`} alt="Profile" />
                :<img className="rounded-xl" width={100} src={vendorProfile} alt='Profile'/>}
              {previewUrls.identityImage?<img className="rounded-xl" width={100} src={previewUrls.identityImage} alt="Identity" />
              :currentVendor?.identityImage?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentVendor?.identityImage}`} alt="Identity" />
                :"Loading..."}
              {previewUrls.licenseImage?<img className="rounded-xl" width={100} src={previewUrls.licenseImage} alt="License" />
              :currentVendor.licenseImage?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentVendor?.licenseImage}`} alt="License" />
                :"Loading..."}
          </div>}
        </form>
      </div>
    </>
  )
}

export default AddOrEditVendorProfile