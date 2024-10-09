import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as validator from '../../utils/validators/AdvertisementValidator';
import VendorSelect from '../../utils/VendorSelect';
import { baseURL } from '../../apis/axios';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { ValidationError } from 'yup';
import useAxiosFetchApi from '../../hooks/useFetch';
const ADVERTISMENT_ADD_INFO_URL = "/advertisements/save";
const FETCH_VENDORS_URL = "/vendors";

const AddOrEditAdvertisement = ({currentAdvertisement, isEdit=false, onEdit}) => {
  const{t, i18n} = useTranslation();
  const axiosPrivate = useAxiosPrivate()
  const [state] = useAxiosFetchApi(FETCH_VENDORS_URL.concat("?roleName=VENDOR"), {}, null);
  const tAdvertisementInfo = t("advertisementFormIfno")
  const [errors, setErrors] = useState();
  const [previewUrls, setPreviewUrls] = useState({});
  const vendorList = state.data?.list;

  const handleAddOrEditAdvertisement = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    console.log(JSON.stringify(formData));
    try {
      await validator.validationSchema(tAdvertisementInfo, isEdit, formData, t("requiredMessage"))
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
      }
      onEdit(infoResponse?.data.list);
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
          // if(!isEdit){
          //   e.target.querySelectorAll('input').forEach(input => { input.value = ""; });
          // }
          toast.error(error.response?.data.message);
        }
      }
  }

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);

    const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls({...previewUrls, [event.target.name]: urls[0]});
  };
  // const diffInMs = new Date(currentAdvertisement?.expireIn) - new Date(currentAdvertisement?.createdAt);
  // const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  // // const diffInDays = !diffInMs?undefined:Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return (
    <>
      <ToastContainer/>
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
              <label htmlFor="arTitle" className="text-lg">{tAdvertisementInfo.arTitle?.label}</label>
              <input type="text" name="arTitle" id="arTitle" defaultValue={currentAdvertisement?.arTitle??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.arTitle?.placeholder} />
              {errors?.arTitle&&<div className='text-red-600'>{errors?.arTitle}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="subtitle" className="text-lg">{tAdvertisementInfo.subtitle?.label}</label>
              <input type="text" name="subtitle" id="subtitle" defaultValue={currentAdvertisement?.subtitle??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.subtitle?.placeholder}/>
              {errors?.subtitle&&<div className='text-red-600'>{errors?.subtitle}</div>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="arSubtitle" className="text-lg">{tAdvertisementInfo.arSubtitle?.label}</label>
              <input type="text" name="arSubtitle" id="arSubtitle" defaultValue={currentAdvertisement?.arSubtitle??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.arSubtitle?.placeholder}/>
              {errors?.arSubtitle&&<div className='text-red-600'>{errors?.arSubtitle}</div>}
            </div>
            {!currentAdvertisement?.vendor?.vendorId && isEdit?"":
            <div className="md:w-1/4 my-6">
              <label htmlFor="vendorId" className="text-lg">{tAdvertisementInfo.vendorId?.label}</label>
              <VendorSelect currentData={currentAdvertisement}
               vendorList={vendorList} tDataInfo={tAdvertisementInfo} />
              {/* <select
                name={"vendorId"}
                defaultValue={currentAdvertisement?.vendor?.vendorId}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  <option key={0} value={-1}>{tAdvertisementInfo.vendorId?.label}</option>
                  {vendorList?vendorList.map(data=>{
                    const vendor=data;
                  return <option
                  selected={vendor.vendorId===currentAdvertisement?.vendor?.vendorId}
                  key={vendor.vendorId} value={vendor.vendorId}>{vendor.fullName}</option>
                  }):"No Vendor Found"}
                </select> */}
              {errors?.vendorId&&<div className='text-red-600'>{errors?.vendorId}</div>}
            </div>}
            {<div className="md:w-1/4 my-6">
              <label htmlFor="priority" className="text-lg">{tAdvertisementInfo.priority?.label}</label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="replacePriority"
                  name="replacePriority"
                  className="mx-2"
                />
                <label htmlFor="replacePriority" className="text-sm">
                  {tAdvertisementInfo.replacePriority?.label || "Replace existing priority?"}
                </label>
              </div>
              <select
                name={"priority"}
                defaultValue={currentAdvertisement?.priority}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  {validator.adsPriorites.map(data=>{
                    const ads=data;
                  return <option
                  selected={ads.priority===currentAdvertisement?.priority}
                  key={ads.priority} value={ads.priority}>{ads.arName}</option>
                  })}
                </select>
              {errors?.priority&&<div className='text-red-600'>{errors?.priority}</div>}
            </div>}
            {/* <div className="md:w-1/4 my-6">
              <label htmlFor="adsImage2" className="text-lg">{tAdvertisementInfo.adsImage2?.label}</label>
              <input type="file" name="adsImage2" id="adsImage2" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.adsImage2?.placeholder} />
              {errors?.adsImage2&&<div className='text-red-600'>{errors?.adsImage2}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="adsImage3" className="text-lg">{tAdvertisementInfo.adsImage3?.label}</label>
              <input type="file" name="adsImage3" id="adsImage3" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.adsImage3?.placeholder} />
              {errors?.adsImage3&&<div className='text-red-600'>{errors?.adsImage3}</div>}
            </div> */}
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="startTime" className="text-lg">{tAdvertisementInfo.startTime?.label}</label>
              <input type="time" name="startTime" id="startTime" defaultValue={currentAdvertisement?.startTime??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.startTime?.placeholder} />
              {errors?.startTime&&<div className='text-red-600'>{errors?.startTime}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="endTime" className="text-lg">{tAdvertisementInfo.endTime?.label}</label>
              <input type="time" name="endTime" id="endTime" defaultValue={currentAdvertisement?.endTime??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.endTime?.placeholder} />
              {errors?.endTime&&<div className='text-red-600'>{errors?.endTime}</div>}
            </div>
            {currentAdvertisement?.vendor?.vendorId && isEdit?"":
            <div className="md:w-1/4 my-6">
              <label htmlFor="url" className="text-lg">{tAdvertisementInfo.url?.label}</label>
              <input type="url" name="url" id="url" defaultValue={currentAdvertisement?.url??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.url?.placeholder} />
              {errors?.url&&<div className='text-red-600'>{errors?.url}</div>}
            </div>}
          </div>
          <div className='flex flex-col md:flex-row flex-wrap justify-between my-6'>
            <div className="md:w-1/4">
              <label htmlFor="adsImage1" className="text-lg">{tAdvertisementInfo.adsImage1?.label}</label>
              <input type="file" name="adsImage1" id="adsImage1" onChange={handleImagesChange} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.adsImage1?.placeholder} />
              {errors?.adsImage1&&<div className='text-red-600'>{errors?.adsImage1}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="createDate" className="text-lg">{tAdvertisementInfo.createDate?.label}</label>
              <input type="date" name="createDate" id="createDate" defaultValue={currentAdvertisement?.fcreatedDate??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.createDate?.placeholder} />
              {errors?.createDate&&<div className='text-red-600'>{errors?.createDate}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="expireDate" className="text-lg">{tAdvertisementInfo.expireDate?.label}</label>
              <input type="date" name="expireDate" id="expireDate" defaultValue={currentAdvertisement?.fexpireDate??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tAdvertisementInfo.expireDate?.placeholder} />
              {errors?.expireDate&&<div className='text-red-600'>{errors?.expireDate}</div>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row flex-wrap justify-between my-6'>
            {isEdit && (previewUrls.adsImage1?<img className="rounded-lg md:w-3/4 h-60" src={previewUrls.adsImage1} alt="ads1" />
              :currentAdvertisement.adsImage1?<img className="rounded-lg md:w-3/4 h-60" src={`${baseURL}/files/get/file/${currentAdvertisement?.adsImage1}`} alt="ads1" />
                :"Loading...")}
            <div className='md:w-1/4'>
              <button type="submit" className="bg-primary-color text-white w-full py-2.5">{tAdvertisementInfo[isEdit?"editBtn":"addBtn"]}</button>
            </div>
          </div>
          {/* {isEdit && 
          <div className="flex flex-col md:flex-row flex-wrap justify-center my-6">
              {previewUrls.adsImage1?<img className="rounded-xl" width={100} src={previewUrls.adsImage1} alt="ads1" />
              :currentAdvertisement.adsImage1?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentAdvertisement?.adsImage1}`} alt="ads1" />
                :"Loading..."}
              {previewUrls.adsImage2?<img className="rounded-xl" width={100} src={previewUrls.adsImage2} alt="ads2" />
              :currentAdvertisement.adsImage2?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentAdvertisement?.adsImage2}`} alt="ads1" />
                :"Loading..."}
              {previewUrls.adsImage3?<img className="rounded-xl" width={100} src={previewUrls.adsImage3} alt="ads3" />
              :currentAdvertisement.adsImage3?<img className="rounded-xl" width={100} src={`${baseURL}/files/get/file/${currentAdvertisement?.adsImage3}`} alt="ads1" />
                :"Loading..."}
          </div>} */}
        </form>
      </div>
    </>
  )
}
export default AddOrEditAdvertisement