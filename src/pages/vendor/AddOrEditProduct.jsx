import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FormInput from '../../utils/FormInput';
import * as validator from '../../utils/validators/ProductValidator ';
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
import useAxiosFetchApi from '../../hooks/useFetch';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
const FETCH_CATEGORY_URL = "/vendors/{id}/categories";
const ADD_PRODUCT_INFO_URL = "/products/save";

const AddOrEditProduct = ({currentProduct, productImages, isEdit=false}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const{t, i18n} = useTranslation();
  const tProductInfo = t("productFormInfo")
  const productInputs = validator.translateInputText(tProductInfo)
  const vendorCategoriesUrl = FETCH_CATEGORY_URL.replace("{id}", `${auth.vendorId}`);
  const [state] = useAxiosFetchApi(vendorCategoriesUrl, {}, auth.token);
  const [images, setImages] = useState();
  const categoryList = state.data?.list;
  
  const handleAddOrEditProduct = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    var isValidForm = validator.validateProductBeforeSubmit(formData, images, isEdit);
    if(isValidForm){
      try {
        var vendorId = auth.vendorId;
        var productId = (isEdit?currentProduct.productId:null);
        const fd = new FormData();
        validator.fillProductFormData(fd, formData, images, productId, vendorId)
          const infoResponse = await axiosPrivate.post(ADD_PRODUCT_INFO_URL, fd,
              {headers: {'Accept-Language': i18n.language}}
          );
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
      <ToastContainer/>
      <div>
        <h1 className='font-normal'>{tProductInfo[isEdit?"editProductTitle":"addProductTitle"]}</h1>
        <form className='w-full' onSubmit={handleAddOrEditProduct} method='post'>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            {productInputs.slice(0, 3).map((input) => (
                <FormInput 
                key={input.id}
                {...{...input, 
                  containerstyle: "md:w-[30%] my-4", defaultValue: isEdit?currentProduct[input.name]:""}}
                />
              ))}
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-start">
              <FormInput
              key={productInputs[3].id}
              {...{...productInputs[3], containerstyle: "md:w-[30%] my-4", defaultValue: isEdit?currentProduct[productInputs[3].name]:""}}
              />
              <div className='md:w-[30%] my-4'>
                <label htmlFor={productInputs[4].name} className="text-sm">{productInputs[4].label}</label>
                <select
                key={productInputs[4].id}
                name={productInputs[4].name}
                defaultValue={!isEdit?"":currentProduct.category.categoryId}
                required={productInputs[4].required}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  {categoryList?categoryList.map(data=>{
                    const category=data.category;
                  return <option selected={!isEdit?false:currentProduct.category.categoryId===category.categoryId}
                  key={category.categoryId} value={category.categoryId}>{category.name}</option>
                  }):"No Category Found"}
                </select>
                <p className='text-xs text-red-500 form-error-msg'>{productInputs[4].errorMessage}</p>
              </div>
              <FormInput 
                key={productInputs[5].id}
                onChange={(e)=>{setImages(e.target.files); console.log(JSON.stringify(images))}}
                {...{...productInputs[5],
                  containerstyle: "md:w-[30%] my-4", required: !isEdit && productInputs[5].name==="images"}}
                />
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-start">
            {productInputs.slice(6, 7).map((input) => (
              <FormInput
              key={input.id}
              {...{...input, containerstyle: "md:w-[65%] my-4", defaultValue: isEdit?currentProduct[input.name]:""}}
              />
            ))}
            <button type="submit" className="w-[30%] bg-primary-color text-white px-5 py-2.5 my-10">{tProductInfo[isEdit?"editBtn":"addBtn"]}</button>
          </div>
          {isEdit && 
          <div className="flex flex-col md:flex-row flex-wrap justify-center space-x-3">
            {productImages.map((image) => (<>
              <img className="rounded-xl my-4" width={100} src={`data:image/png;base64, ${image.data}`} alt="Product" />
              </>
            ))}
          </div>}
        </form>
      </div>
    </>
  )
}

export default AddOrEditProduct