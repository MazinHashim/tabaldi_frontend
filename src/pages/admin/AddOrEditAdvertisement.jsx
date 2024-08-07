import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as validator from '../../utils/validators/AdvertisementValidator';
import SendOTPModal from '../modals/SendOTPModal';
import axios, { baseURL } from '../../apis/axios';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { ValidationError } from 'yup';
import useAxiosFetchApi from '../../hooks/useFetch';
const ADVERTISMENT_ADD_INFO_URL = "/advertisements/save";
const FETCH_VENDORS_URL = "/vendors";

const AddOrEditAdvertisement = ({currentAdvertisement, isEdit=false, onEdit}) => {
  const [showModal, setShowModal] = useState(false);
  const{t, i18n} = useTranslation();
  const axiosPrivate = useAxiosPrivate()
  const [state] = useAxiosFetchApi(FETCH_VENDORS_URL, {}, null);
  const tAdvertisementInfo = t("advertisementFormIfno")
  const [errors, setErrors] = useState();
  const [previewUrls, setPreviewUrls] = useState({});
  const vendorList = state.data?.list;

  const handleAddOrEditAdvertisement = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    try {
      await validator.validationSchema(tAdvertisementInfo, isEdit, t("requiredMessage"))
      .validate(formData, {abortEarly: false});
      var advertisementId = (isEdit?currentAdvertisement.advertisementId:null);
      const fd = new FormData();
      validator.fillAdvertisementFormData(fd, formData, advertisementId)
      const infoResponse = await axiosPrivate.post(ADVERTISMENT_ADD_INFO_URL, fd,
          {headers: {'Accept-Language': i18n.language}}
      );
      if(!isEdit){ 
        e.target.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
      } else {
        onEdit(infoResponse?.data.advertisement);
      }
      setShowModal(false)
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
          if(!isEdit){
            e.target.querySelectorAll('input').forEach(input => { input.value = ""; });
          }
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
      <SendOTPModal showModal={showModal} setShowModal={setShowModal} onAction={handleAddOrEditAdvertisement}/>
      <div>
        <h1 className='font-normal'>{tAdvertisementInfo[isEdit?"editAdvertisementTitle":"addAdvertisementTitle"]}</h1>
        <form className='w-full' onSubmit={handleAddOrEditAdvertisement} method='post'>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="title" className="text-lg">{tAdvertisementInfo.title?.label}</label>
              <input type="text" name="title" id="title" defaultValue={currentAdvertisement?.title??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.title?.placeholder} />
              {errors?.title&&<div className='text-red-600'>{errors?.title}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="subtitle" className="text-lg">{tAdvertisementInfo.subtitle?.label}</label>
              <input type="text" name="subtitle" id="subtitle" defaultValue={currentAdvertisement?.subtitle??''} disabled={isEdit} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.subtitle?.placeholder}/>
              {errors?.subtitle&&<div className='text-red-600'>{errors?.subtitle}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="adsImage" className="text-lg">{tAdvertisementInfo.adsImage?.label}</label>
              <input type="file" name="adsImage" id="adsImage" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.adsImage?.placeholder} />
              {errors?.adsImage&&<div className='text-red-600'>{errors?.adsImage}</div>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="url" className="text-lg">{tAdvertisementInfo.url?.label}</label>
              <input type="url" name="url" id="url" defaultValue={currentAdvertisement?.url??''} disabled={isEdit} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.url?.placeholder} />
              {errors?.url&&<div className='text-red-600'>{errors?.url}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="vendorId" className="text-lg">{tAdvertisementInfo.vendorId?.label}</label>
              <select
                name={"vendorId"}
                defaultValue={currentAdvertisement?.vendor.vendorId}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  <option key={0} value={-1}>{tAdvertisementInfo.vendorId?.label}</option>
                  {vendorList?vendorList.map(data=>{
                    const vendor=data;
                  return <option
                  key={vendor.vendorId} value={vendor.vendorId}>{vendor.fullName}</option>
                  }):"No Vendor Found"}
                </select>
              {errors?.vendorId&&<div className='text-red-600'>{errors?.vendorId}</div>}
            </div>
          </div>
          {isEdit && 
          <div className="flex flex-col md:flex-row flex-wrap justify-between my-6">
              {previewUrls.adsImage?<img className="rounded-xl" width={100} src={previewUrls.adsImage} alt="ads" />
              :currentAdvertisement.adsImage?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentAdvertisement?.adsImage}`} alt="ads" />
                :"Loading..."}
          </div>}
          <div className='flex flex-col md:flex-row flex-wrap justify-end my-6'>
            <button type="submit" className="w-3/12 bg-primary-color text-white px-5 py-2.5 my-6">{tAdvertisementInfo[isEdit?"editBtn":"addBtn"]}</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AddOrEditAdvertisement