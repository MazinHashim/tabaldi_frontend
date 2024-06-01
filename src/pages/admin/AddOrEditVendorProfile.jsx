import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FormInput from '../../utils/FormInput';
import vendorProfile from '../../img/vendor_profile.png'
import * as validator from '../../utils/validators/VendorValidator';
import * as otpValidator from '../../utils/validators/OtpValidator';
import SendOTPModal from '../modals/SendOTPModal';
import axios from '../../apis/axios';
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
const SEND_OTP_URL = "/users/send/otp";
const VENDOR_ADD_USER_URL = "/vendors/add/user";
const VENDOR_ADD_INFO_URL = "/vendors/save";

const AddOrEditVendorProfile = ({currentVendor, vendorImages, isEdit=false, onEdit}) => {
  const [showModal, setShowModal] = useState(false);
  const [ vendor, setVendorData ] = useState();
  const { auth } = useAuth();
  const{t, i18n} = useTranslation();
  const tVendorIfno = t("vendorFormIfno")
  const vendorInputs = validator.translateInputText(tVendorIfno)
  const handleSendOTP = async (e) =>{
      e.preventDefault();
      const data = new FormData(e.target);
      const vendorData = Object.fromEntries(data.entries());

      const isValidForm = validator.validateVendorBeforeSubmit(vendorData);
      if(isValidForm){
        try {
            const response = await axios.post(SEND_OTP_URL,
                JSON.stringify({phone: vendorData.phone, checkExistence: false}),
                { headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json' } });
            
            setVendorData({...vendorData, keyRef: response?.data.keyRef.split(" ").shift()}) // remove split in production
            setShowModal(true)
            toast.success(response?.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
      }
  }
  const handleAddOrEditVendor = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    var isValidForm = false;
    if(isEdit){
      isValidForm = validator.validateVendorBeforeSubmit(formData, isEdit);
    } else {
      isValidForm = otpValidator.validateOtpCodeBeforeSubmit(formData.otpCode);
    }

    if(isValidForm){
      try {
        // userId will initialize after add user response
        var userId = (isEdit?currentVendor.user.userId:null);
        var vendorId = (isEdit?currentVendor.vendorId:null);
        if(!isEdit) {
          const userResponse = await axios.post(VENDOR_ADD_USER_URL,
              JSON.stringify({phone: vendor.phone, email: vendor.email, agreeTermsConditions: true, keyRef: vendor.keyRef, otpCode: formData.otpCode}),
              {headers: { 'Accept-Language': i18n.language,
                'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`}}
          );
          userId = userResponse.data?.userId;
        }
        const fd = new FormData();
        validator.fillVendorFormData(fd, isEdit?formData:vendor, userId, vendorId)
        const infoResponse = await axios.post(VENDOR_ADD_INFO_URL, fd,
            {headers: {'Accept-Language': i18n.language, "Authorization": `Bearer ${auth.token}`}}
        );
        if(!isEdit){ 
          e.target.querySelectorAll('input').forEach(input => {
              input.value = '';
          });
        } else {
          onEdit(infoResponse?.data.vendor);
        }
        setShowModal(false)
        toast.success(infoResponse?.data.message);
        } catch (error) {
        if(!isEdit){
          e.target.querySelectorAll('input').forEach(input => {
            input.value = "";
          });
        }
        toast.error(error.response?.data.message);
        }
    }
  }
  return (
    <>
      <ToastContainer/>
      <SendOTPModal showModal={showModal} setShowModal={setShowModal} onAction={handleAddOrEditVendor}/>
      <div>
        <h1 className='font-normal'>{tVendorIfno[isEdit?"editVendorTitle":"addVendorTitle"]}</h1>
        <form className='w-full' onSubmit={isEdit?handleAddOrEditVendor:handleSendOTP} method='post'>
          <div className="flex flex-col md:flex-row flex-wrap justify-between my-6">
            <FormInput 
            {...{...vendorInputs[0], containerstyle: "md:w-1/4", defaultValue: isEdit?currentVendor.fullName:""}}/>
            <FormInput 
            {...{...vendorInputs[1], containerstyle: "md:w-1/4",
            defaultValue: isEdit?currentVendor.user.phone:"",
            disabled: isEdit}} />
            <FormInput 
            {...{...vendorInputs[2], containerstyle: "md:w-1/4",
            defaultValue: isEdit?currentVendor.user.email:"",
            disabled: isEdit}}/>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between my-6">
              {vendorInputs.slice(3, 6).map((input) => (
                <FormInput 
                key={input.id}
                {...{...input, containerstyle: "md:w-1/4", defaultValue: isEdit?currentVendor[input.name]:""}}
                />
              ))}
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between my-6">
            {vendorInputs.slice(6, 9).map((input) => (
              <FormInput
              // onChange={(e)=>}
              key={input.id}
              {...{...input, containerstyle: "md:w-1/4", required: !isEdit && input.name!=="profileImage"}}
              />
            ))}
          </div>
          {isEdit && 
          <div className="flex flex-col md:flex-row flex-wrap justify-between my-6">
            {vendorInputs.slice(6, 9).map((input) => (
              vendorImages[input.name]?<img key={input.id} className="rounded-xl" width={100} src={vendorImages[input.name].data?`data:image/png;base64, ${vendorImages[input.name].data}`:vendorProfile} alt="Profile" />
                :"Loading..."
            ))}
          </div>}
          <div className='flex flex-col md:flex-row flex-wrap justify-end my-6'>
            <button type="submit" className="w-3/12 bg-primary-color text-white px-5 py-2.5 my-6">{tVendorIfno[isEdit?"editBtn":"addBtn"]}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddOrEditVendorProfile