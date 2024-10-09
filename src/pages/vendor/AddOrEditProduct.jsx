import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as validator from '../../utils/validators/ProductValidator ';
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
import useAxiosFetchApi from '../../hooks/useFetch';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { ValidationError } from 'yup';
import { baseURL } from '../../apis/axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
const FETCH_CATEGORY_URL = "/vendors/{id}/categories";
const ADD_PRODUCT_INFO_URL = "/products/save";

const AddOrEditProduct = ({currentProduct, isEdit=false}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const{t, i18n} = useTranslation();
  const tProductInfo = t("productFormInfo")
  const [state, setUrl] = useAxiosFetchApi(null, {}, auth.token);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [errors, setErrors] = useState();
  const [finalPrice, setFinalPrice] = useState(!currentProduct?
    0 : currentProduct.price + (currentProduct.price / 100) * currentProduct.companyProfit);
  const [price, setPrice] = useState(currentProduct?.price);
  const [profit, setProfit] = useState(currentProduct?.companyProfit);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState({
    opName: '',
    fee: null,
    groupFlag: null
  });

  useEffect(()=>{
    const vendorCategoriesUrl = FETCH_CATEGORY_URL.replace("{id}", `${auth.vendor?.vendorId}`);
    setUrl(vendorCategoriesUrl)
  }, [auth.vendor?.vendorId, setUrl])

  const categoryList = state.data?.list;
  
  const handleAddOrEditProduct = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    const formDataWithOptions = {...formData, options};
    try {
      await validator.validationSchema(tProductInfo, isEdit, formData.companyProfit, t("requiredMessage"))
      .validate(formData, {abortEarly: false});
      var companyProfit = !auth.role
      ? formData.companyProfit
      :currentProduct?.companyProfit;
      var vendorId = auth.vendor?.vendorId;
      var productId = (isEdit?currentProduct.productId:null);
      const fd = new FormData();
      validator.fillProductFormData(fd, formDataWithOptions, images, companyProfit, productId, vendorId)
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
        console.log(error)
      }
    }
  }

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };
  const handleProfitAndPriceChange = (event) => {
    const { name, value } = event.target;
    let newPrice = parseFloat(name==="price"? value : price);
    let newProfit = parseFloat(name==="companyProfit"? value : profit);
    if (name === "price") {
      setPrice(parseFloat(value));
    } else if (name === "companyProfit") {
      setProfit(parseFloat(value));
    }

    const totalPrice = newPrice + (newPrice * newProfit / 100);
    setFinalPrice(Math.round(totalPrice * 2) / 2);
    // setFinalPrice(totalPrice);
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption(prev => ({
      ...prev,
      [name]: value === '' ? null : value
    }));
  };
  const handleDeleteOption = (index) => {
    const afterDelete = options.filter((option, opIndex)=>opIndex!==index)
    setOptions(afterDelete);
  };

  const addOption = () => {
    if(newOption.opName && (newOption.fee || newOption.groupFlag)){
    const { opName, ...restNewOption } = newOption;
    setOptions(prev => [...prev, {...restNewOption, name: newOption.opName.trim()}]);
    setNewOption({ opName: '', fee: null, groupFlag: null });
    }
  };

  return (
    <>
      {!isEdit && <ToastContainer/>}
      <div>
        <h1 className='font-normal'>{tProductInfo[isEdit?"editProductTitle":"addProductTitle"]}</h1>
        <form className='w-full' onSubmit={handleAddOrEditProduct} method='post'>
          <div className="flex flex-col md:flex-row flex-wrap justify-between">
            <div className="md:w-1/4 my-6">
              <label htmlFor="name" className="text-lg">{tProductInfo.name?.label}</label>
              <input type="text" name="name" id="name" defaultValue={currentProduct?.name??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.name?.placeholder} />
              {errors?.name&&<div className='text-red-600'>{errors?.name}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="arName" className="text-lg">{tProductInfo.arName?.label}</label>
              <input type="text" name="arName" id="arName" defaultValue={currentProduct?.arName??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.arName?.placeholder} />
              {errors?.arName&&<div className='text-red-600'>{errors?.arName}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="quantity" className="text-lg">{tProductInfo.quantity?.label}</label>
              <input type="number" name="quantity" id="quantity" defaultValue={currentProduct?.quantity??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.quantity?.placeholder} />
              {errors?.quantity&&<div className='text-red-600'>{errors?.quantity}</div>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-start">
            <div className="md:w-1/4 my-6">
              <label htmlFor="images" className="text-lg">{tProductInfo.images?.label}</label>
              <input type="file" name="images" id="images" className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" multiple placeholder={tProductInfo.images?.placeholder}
              onChange={handleImagesChange}
              />
              {errors?.images&&<div className='text-red-600'>{errors?.images}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="price" className="text-lg">{tProductInfo.price?.label}</label>
              <input type="number" name="price" id="price" defaultValue={Math.round(currentProduct?.price)??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.price?.placeholder}
              onChange={handleProfitAndPriceChange} />
              {<div className='text-red-600'>{finalPrice}</div>}
              {errors?.price&&<div className='text-red-600'>{errors?.price}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="categoryId" className="text-lg">{tProductInfo.categoryId?.label}</label>
              <select
                name={"categoryId"}
                defaultValue={currentProduct?.category.categoryId}
                className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"
                >
                  {categoryList?categoryList.map(data=>{
                    const category=data.category;
                  return <option
                  key={category.categoryId} value={category.categoryId}>{category.name} / {category.arName}</option>
                  }):"No Category Found"}
                </select>
              {errors?.categoryId&&<div className='text-red-600'>{errors?.categoryId}</div>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-start">
            <div className="md:w-1/4 my-6">
              {!auth.role||!isEdit ?<><label htmlFor="companyProfit" className="text-lg">{tProductInfo.companyProfit?.label}</label>
              <input type="number" name="companyProfit" id="companyProfit" defaultValue={currentProduct?.companyProfit??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.companyProfit?.placeholder}
              onChange={handleProfitAndPriceChange} />
              {errors?.companyProfit&&<div className='text-red-600'>{errors?.companyProfit}</div>}
            </>:""}</div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="duration" className="text-lg">{tProductInfo.duration?.label}</label>
              <input type="text" name="duration" id="duration" defaultValue={currentProduct?.duration??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.duration?.placeholder} />
              {errors?.duration&&<div className='text-red-600'>{errors?.duration}</div>}
            </div>
          </div>
          {!isEdit&&<div className='flex flex-col md:flex-row flex-wrap justify-between items-start rounded-lg border border-green-400 p-4'>
            <h3>{tProductInfo["optionHeading"]}</h3>
            <div className="md:w-1/4 my-6">
              <label htmlFor="opName" className="text-lg">{tProductInfo.opName?.label}</label>
              <input type="text" name="opName" id="opName" 
              value={newOption.opName || ''}
              onChange={handleOptionChange}
              className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.opName?.placeholder} />
              {!newOption.opName&& <div className="text-red-600 text-sm mt-1">{tProductInfo["nameRequired"]}</div>}
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="fee" className="text-lg">{tProductInfo.fee?.label}</label>
              <input type="number" name="fee" id="fee" 
              value={newOption.fee || ''}
              onChange={handleOptionChange}
              disabled={!!newOption.groupFlag}
              className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.fee?.placeholder} />
            </div>
            <div className="md:w-1/4 my-6">
              <label htmlFor="groupFlag" className="text-lg">{tProductInfo.groupFlag?.label}</label>
              <input type="text" name="groupFlag" id="groupFlag" 
              value={newOption.groupFlag || ''}
              onChange={handleOptionChange}
              disabled={!!newOption.fee}
              className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.groupFlag?.placeholder||'Group flag (optional)'} />
              {newOption.fee && newOption.groupFlag && (
              <div className="text-red-600 text-sm mt-1">{tProductInfo["oneOfThemRequired"]}.</div>
            )}
            </div>
            <button type="button" onClick={addOption} className="w-[10%] bg-primary-color text-white px-5 py-2.5 my-10">{tProductInfo["addBtn"]}</button>
          </div>}
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-start">
            <div className="md:w-1/3">
              <label htmlFor="description" className="text-lg">{tProductInfo.description?.label}</label>
              <textarea name="description" id="description" defaultValue={currentProduct?.description??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.description?.placeholder}></textarea>
              {errors?.description&&<div className='text-red-600'>{errors?.description}</div>}
            </div>
            <div className="md:w-1/3">
              <label htmlFor="arDescription" className="text-lg">{tProductInfo.arDescription?.label}</label>
              <textarea name="arDescription" id="arDescription" defaultValue={currentProduct?.arDescription??''} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" placeholder={tProductInfo.arDescription?.placeholder}></textarea>
              {errors?.arDescription&&<div className='text-red-600'>{errors?.arDescription}</div>}
            </div>
            <button type="submit" className="w-[30%] bg-primary-color text-white px-5 py-2.5 my-10">{tProductInfo[isEdit?"editBtn":"addBtn"]}</button>
          </div>
          
          <div className="flex flex-col md:flex-row flex-wrap justify-center space-x-3">

          {images
          ? previewUrls.map((img) => (<>
              <img className="rounded-xl mx-1 my-4" width={100} src={`${img}`} alt="Product" /></>))
          : isEdit && currentProduct.images.map((image) => (<>
              <img className="rounded-xl mx-1 my-4" width={100} src={`${baseURL}/files/get/file/${image}`} alt="Product" />
              </>
            ))}
          </div>

          {!isEdit&&<div>
            <h4 className='my-2'>{tProductInfo["addedOptions"]}</h4>
            <ul>
              {options
              .map((option, index) => (
                <span key={index} className='px-2 min-w-16 capitalize bg-secondary-color text-white text-center rounded-lg pl-1 m-5'>
                    <span className='p-1'>{option.name}</span>
                    <span className='bg-white text-black p-1 border border-green-400 rounded-lg text-sm'>
                        {option.fee} {option.groupFlag?option.groupFlag:t("aedUnit")}
                    </span>
                    <span className="p-1 cursor-pointer"
                    onClick={()=>handleDeleteOption(index)}
                    ><IoMdCloseCircleOutline className='inline'/></span>
                </span>
              ))}
            </ul>
          </div>}
        </form>
      </div>
    </>
  )
}

export default AddOrEditProduct