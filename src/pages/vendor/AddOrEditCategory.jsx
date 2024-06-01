import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FormInput from '../../utils/FormInput';
import * as validator from '../../utils/validators/CategoryValidator';
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
import axios from '../../apis/axios';
const ADD_CATEGORY_INFO_URL = "/categories/save";

const AddOrEditCategory = ({currentCategory, setChangeData, isEdit=false}) => {
  const { auth } = useAuth();
  const{t, i18n} = useTranslation();
  const publishRef = useRef(null);
  const tCategoryInfo = t("categoryFormInfo")
  const categoryInputs = validator.translateInputText(tCategoryInfo)
  
  const handleAddOrEditCategory = async (e)=>{
    e.preventDefault();
    const from = new FormData(e.target);
    const data = Object.fromEntries(from.entries());
    var vendorId = auth.vendorId;
    var categoryId = (isEdit?currentCategory?.categoryId:null);
    const formData = {...data,
      // name:"",
      published: isEdit? null : publishRef.current.value.toLowerCase()==="PUBLISHED".toLowerCase(),
      vendorId, categoryId}
    var isValidForm = validator.validateCategoryBeforeSubmit(formData, isEdit);
    if(isValidForm){
      try {
          const infoResponse = await axios.post(ADD_CATEGORY_INFO_URL, formData,
              {headers: {'Accept-Language': i18n.language, "Authorization": `Bearer ${auth.token}`}}
          );
          setChangeData(infoResponse?.data.category, isEdit)
          if(!isEdit){ 
            e.target.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
          }
          toast.success(infoResponse?.data.message);
        } catch (error) {
        if(!isEdit){
          e.target.querySelectorAll('input').forEach(input => {
            input.value = "";
          });
        }
        toast.error(error.response?.data.message);
        }
    } else {
      toast.error("Invalid Fields");
    }
  }

  return (
    <>
      <div>
        <h1 className='font-normal'>{tCategoryInfo[isEdit?"editCategoryTitle":"addCategoryTitle"]}</h1>
        <form className='w-full' onSubmit={handleAddOrEditCategory} method='post'>
          <div className="flex justify-between">
            {categoryInputs.slice(0, 1).map((input) => {
                return <FormInput 
                key={input.id}
                {...{...input, 
                  containerstyle: `${isEdit?"md:w-[60%]":"md:w-[30%]"} my-4`, defaultValue: isEdit?currentCategory[input.name]:""}}
                />
              })}
            {!isEdit&& <div className='md:w-[30%] my-4'>
                <label htmlFor={"published"} className="text-sm">Select Category Status</label>
                <select
                ref={publishRef}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  <option>Published</option>
                  <option>Unpublished</option>
                </select>
              </div>}
              <button type="submit" className="w-[30%] bg-primary-color text-white px-5 py-2 my-10">{tCategoryInfo[isEdit?"editBtn":"addBtn"]}</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default AddOrEditCategory