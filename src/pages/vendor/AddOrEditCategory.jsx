import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as validator from '../../utils/validators/CategoryValidator';
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { ValidationError } from 'yup';
const ADD_CATEGORY_INFO_URL = "/categories/save";

const AddOrEditCategory = ({currentCategory, onChangeData, isEdit=false, userRole}) => {
  const { auth } = useAuth();
  const{t, i18n} = useTranslation();
  const axiosPrivate = useAxiosPrivate()
  const [errors, setErrors] = useState();
  const tCategoryInfo = t("categoryFormInfo")
  
  const handleAddOrEditCategory = async (e)=>{
    e.preventDefault();
    const from = new FormData(e.target);
    const data = Object.fromEntries(from.entries());
    var vendorId = auth.vendorId;
    var categoryId = (isEdit?currentCategory?.categoryId:null);
    const formData = {...data,
      published: isEdit ? currentCategory.published : data.published==="true" ? true : false,
      vendorId, categoryId}
      try {
        console.log(formData)
        await validator.validationSchema(tCategoryInfo, isEdit, userRole, t("requiredMessage"))
        .validate(formData, {abortEarly: false});
        setErrors(null)
        const infoResponse = await axiosPrivate.post(ADD_CATEGORY_INFO_URL, formData,
            {headers: {'Accept-Language': i18n.language}}
        );
        onChangeData(infoResponse?.data.category, isEdit)
        if(!isEdit){ 
          e.target.querySelectorAll('input').forEach(input => {
              input.value = '';
          });
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
          if(!isEdit){
            e.target.querySelectorAll('input').forEach(input => { input.value = ""; });
          }
          toast.error(error.response?.data.message);
          console.log(error)
        }
    }
  }

  return (
    <>
      <div>
        <form className='w-full' onSubmit={handleAddOrEditCategory} method='post'>
          <div className="flex justify-start">
            <div className="md:w-[30%] my-4 mx-2">
              <label htmlFor="name" className="text-lg">{tCategoryInfo.name?.label}</label>
              <input type="text" name="name" id="name" defaultValue={currentCategory?.name??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tCategoryInfo.name?.placeholder} />
              {errors?.name&&<div className='text-red-600'>{errors?.name}</div>}
            </div>
            <div className="md:w-[30%] my-4 mx-2">
              <label htmlFor="arName" className="text-lg">{tCategoryInfo.arName?.label}</label>
              <input type="text" name="arName" id="arName" defaultValue={currentCategory?.arName??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tCategoryInfo.arName?.placeholder} />
              {errors?.arName&&<div className='text-red-600'>{errors?.arName}</div>}
            </div>
            {!isEdit&&userRole==="SUPERADMIN"&&<div className='md:w-[30%] my-4 mx-2'>
                <label htmlFor={"published"} className="text-sm">{tCategoryInfo.published?.label}</label>
                <select
                name='published'
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  <option value={true}>{tCategoryInfo.publishedTxt}</option>
                  <option value={false}>{tCategoryInfo.unpublishedTxt}</option>
                </select>
                {errors?.published&&<div className='text-red-600'>{errors?.published}</div>}
              </div>}
              <button type="submit" className="w-[30%] bg-primary-color text-white px-5 py-2 my-10">{tCategoryInfo[isEdit?"editBtn":"addBtn"]}</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default AddOrEditCategory