import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPen, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { useProductsData } from '../../hooks/appHooks';
import productProfile from '../../img/vendor_profile.png'
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../modals/ConfirmationModal';
import EditProductModal from '../modals/EditModal';
import AddOrEditProduct from './AddOrEditProduct';
import { ToastContainer, toast } from 'react-toastify';
import * as validator from '../../utils/validators/OptionValidator';
import FormInput from '../../utils/FormInput';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { baseURL } from '../../apis/axios';
import { IoWarningOutline } from 'react-icons/io5';
import ProductImageList from '../../components/ProductImageList.jsx';
import useAxiosFetchApi from '../../hooks/useFetch.js';
const PRODUCTS_ROUTE_URL = "/products";
const PRODUCT_DELETE_URL = "/products/delete";
const ADD_OPTION_INFO_URL = "/options/save"
const OPTION_DELETE_URL = "/options/delete"
const TOGGLE_PUBLISH_URL = "/products/toggle/publish"
const ADD_IIMAGE_URL = "/products/{id}/add-image"
const REMOVE_IIMAGE_URL = "/products/{id}/remove-image"

const ProductDetails = () => {
    // const location = useLocation();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [openedOptionGroup, setOpenedOptionGroup] = useState(null);
    const [newGroup, setIsNewGroup] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const{t, i18n} = useTranslation();
    const { productId } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const tCard = t("vendorCard")
    const pCard = t("productCard")
    const tOptionInfo = t("optionFormInfo")
    const optionInputs = validator.translateInputText(tOptionInfo)
    // const productId=location.state.productId;

    const navigate = useNavigate()
    const { products, setProducts } = useProductsData();
    const [state] = useAxiosFetchApi(PRODUCTS_ROUTE_URL.concat(`/${productId}`), {}, null);
    const selectedProduct = products?.find((prod)=> prod.productId===Number(productId));
    const groups = [...new Set(selectedProduct?.options
    .filter(op=>op.groupFlag!=null)
    .map(op=> op.groupFlag))];

    useEffect(()=>{
        console.log("productId", productId)
        setProducts([{...state.data?.product}]);
    }, [state.data?.product, setProducts, productId])

    function handleToggleOptionForm(group) {
        if(openedOptionGroup!==group) setOpenedOptionGroup(group);
        else setOpenedOptionGroup(null)
        setIsNewGroup(false)
    }
    function handleToggleNewGroup() {
        setOpenedOptionGroup(null)
        setIsNewGroup(!newGroup)
    }
    async function toggleProductPublishing(productId){
        try{
            setLoading(true)
            const params = `/${productId}`;
            const statusChangedResponse = await axiosPrivate.get(TOGGLE_PUBLISH_URL+params,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            setLoading(false)
            // onTogglePublishing(statusChangedResponse?.data.published, productId);
            const otherProducts=products.filter(prod=>prod.productId!==productId);
            const selectedProduct=products.find(prod=>prod.productId===productId);
            setProducts([...otherProducts, {...selectedProduct, published: statusChangedResponse?.data.published}])
            toast.success(statusChangedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }
    async function handleOnProductDelete(productId) {
         try{
            setLoading(true)
            const productDeletedResponse = await axiosPrivate.delete(PRODUCT_DELETE_URL+`/${productId}`,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            setLoading(false)
            const afterDelete=products.filter(remain=>remain.productId!==productId);
            setProducts(afterDelete)
            toast.success(productDeletedResponse?.data.message);
            navigate(PRODUCTS_ROUTE_URL, { replace: true })
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }
    const handleAddOptionToProduct = async (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        const formData = {...data,
            groupFlag: newGroup
            ? data.groupFlag
            : openedOptionGroup==="addons"?null:openedOptionGroup, productId};
        var isValidForm = validator.validateOptionBeforeSubmit(formData);
        if(isValidForm){
            try {
                setLoading(true)
                const infoResponse = await axiosPrivate.post(ADD_OPTION_INFO_URL, formData,
                    {headers: {'Accept-Language': i18n.language}}
                );
                setLoading(false)
                e.target.querySelectorAll('input').forEach(input => {
                    input.value = '';
                });
                const optionWithNewOne = [...selectedProduct?.options
                            .filter(op=>op.optionId!==infoResponse?.data.option.optionId)
                            , infoResponse?.data.option];
                setProducts([{...selectedProduct, options: optionWithNewOne},
                    ...products.filter((prod)=>prod.productId!==productId),
                ]);
                console.log(JSON.stringify(infoResponse?.data.option));
                toast.success(infoResponse?.data.message);
            } catch (error) {
                setLoading(false)
                e.target.querySelectorAll('input').forEach(input => {
                    input.value = "";
                });
                toast.error(error.response?.data.message);
            }
        } else {
            toast.error("Invalid Fields");
        }
    }
    const handleDeleteOption = async (optionId)=>{
        console.log("optionId"+optionId)
        try{
            setLoading(true)
            const optionDeletedResponse = await axiosPrivate.delete(OPTION_DELETE_URL+`/${optionId}`,
                {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
            );
            setLoading(false)
            const afterDelete=selectedProduct?.options.filter(op=>op.optionId!==optionId)
            setProducts([{...selectedProduct ,options: [...afterDelete]},
                    ...products.filter((prod)=>prod.productId!==productId)])
            toast.success(optionDeletedResponse?.data.message);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message);
        }
    }
    // const totalPrice = selectedProduct.price + (selectedProduct.price * selectedProduct.companyProfit / 100);
    const selectedProductPrice = selectedProduct?(Math.round(selectedProduct.finalPrice * 2) / 2).toFixed(2) : 0.0;
    const handleAddImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axiosPrivate.post(
                `${ADD_IIMAGE_URL.replace("{id}", productId)}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Language': i18n.language
                }
            });

            // Update the product's images in the state
            const updatedProduct = response.data.product;
            setProducts(products.map(p => p.productId === productId ? updatedProduct : p));

            toast.success('Image added successfully');
        } catch (error) {
            console.error('Error adding image:', error);
            toast.error(error.response?.data.message || 'Failed to add image');
        }
    };

    const handleRemoveImage = async (imagePath) => {
        try {
            const response = await axiosPrivate.delete(
                `${REMOVE_IIMAGE_URL.replace("{id}", productId)}?imagePath=${imagePath}`, {
                headers: {
                    'Accept-Language': i18n.language
                }
            });

            // Update the product's images in the state
            const updatedProduct =  response.data.product;
            setProducts(products.map(p => p.productId === productId ? updatedProduct : p));

            toast.success('Image removed successfully');
        } catch (error) {
            console.error('Error removing image:', error);
            toast.error(error.response?.data.message || 'Failed to remove image');
        }
    };
  return (
    <>
    <ToastContainer />
        <div className='container mx-auto px-4 py-8'>
            {selectedProduct?
            <div className='flex flex-col space-y-8'>
                {/* Alerts */}
                <div className='flex flex-wrap gap-3'>
                    {selectedProduct.quantity <= 5 &&
                    <p className="text-red-700 border-red-700 border rounded-lg p-1">
                        <IoWarningOutline className="inline-block mx-1 text-lg" title={"Published Prodcut"}/>
                        {pCard["quantityAboutAlert"]}
                        <button onClick={()=>setShowEditModal(true)} className='font-bold mx-2'>{pCard["update"]}</button>
                        {selectedProduct.published&&<button className='font-bold mx-2' 
                        onClick={()=>isLoading?null:toggleProductPublishing(selectedProduct.productId)}>{pCard["unpublish"]}</button>}
                    </p>}
                    {!selectedProduct.published &&
                    <p className="text-yellow-700 border-yellow-700 border rounded-lg p-1">
                        <IoWarningOutline className="inline-block mx-1 text-lg" title={"Published Prodcut"}/>
                        {pCard["notVisible"]}
                    </p>}
                </div>

                {/* Product Header */}
                <div className='flex flex-wrap items-center justify-between gap-4'>
                    <h2 className='text-2xl font-bold'>{selectedProduct?.name} / {selectedProduct?.arName}</h2>
                    <div className='flex flex-wrap items-center gap-2'>
                        <h4 className='uppercase primary-color border border-green-300 rounded-lg px-2 py-1'>
                            {selectedProduct?.category.name}
                        </h4>
                        <h4 className='uppercase primary-color border border-green-300 rounded-lg px-2 py-1'>
                            {`${tOptionInfo["companyProfit"]} ${selectedProduct?.companyProfit} %`}
                        </h4>
                        <button className='bg-danger-200 p-2 rounded' onClick={() => setShowDeleteModal(true)}><FaTrash /></button>
                        <button className='bg-primary-200 p-2 rounded' onClick={() => setShowEditModal(true)}><FaPen /></button>
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Product Details */}
                    <div className='flex-grow space-y-6'>
                        <div className='space-y-2'>
                            <p className='text-gray-600'>{selectedProduct?.description}</p>
                            <p className='text-gray-600'>{selectedProduct?.arDescription}</p>
                        </div>
                        <p className='text-4xl font-bold'>{selectedProductPrice}<span className='text-xl'>{tCard["aedUnit"]}</span></p>
                        
                        {/* Product Characteristics */}
                        <div className='space-y-4'>
                            <h4 className='text-xl font-semibold'>{tOptionInfo["productChar"]}</h4>
                            {groups.map(group=>{
                            return <div key={group} className='options my-7 border-2 border-slate-200 border-dashed rounded-3xl p-4'>
                                <div className='flex flex-wrap items-center'>
                                    <p className='text-gray-500 capitalize w-full'>{group}</p>
                                    {selectedProduct?.options
                                    .filter(op=>op.groupFlag===group)
                                    .map(option =>{
                                        return <div key={option.optionId}><div className='px-1 flex justify-between items-center min-w-16 capitalize bg-secondary-color text-white text-center rounded-lg pl-1 m-2'>
                                                <span>{option.name}</span>
                                                <IoMdCloseCircleOutline className='inline cursor-pointer' onClick={()=>handleDeleteOption(option.optionId)}/>
                                            </div></div>
                                    })}
                                    <button className='border border-green-300 mx-3' onClick={()=>handleToggleOptionForm(group)}><span><FaRegPlusSquare className='primary-color' size={20}/></span></button>
                                </div>
                                {(openedOptionGroup===group) && <form onSubmit={(e)=>handleAddOptionToProduct(e)} className="flex items-start" method='post'>
                                    <FormInput
                                    {...{...optionInputs[0], containerstyle: "w-1/2 mx-2"}}
                                    />
                                    <button type="submit" className="font-extrabold uppercase text-white bg-primary-color px-2 py-1 my-5 shadow-lg" disabled={isLoading} >{tOptionInfo["addBtn"]}</button>
                                </form>}
                                </div>
                                })}
                                {newGroup && <form onSubmit={(e)=>handleAddOptionToProduct(e)} className="flex items-start" method='post'>
                                    <FormInput
                                    {...{...optionInputs[0], containerstyle: "w-1/4 mx-2"}}
                                    />
                                    {newGroup&&
                                    <FormInput
                                    {...{...optionInputs[2], containerstyle: "w-1/4 mx-2"}}
                                    />}
                                    <button type="submit" className="font-extrabold uppercase text-white bg-primary-color px-2 py-1 my-5 shadow-lg">{tOptionInfo["addBtn"]}</button>
                                </form>}
                                <button className='border border-green-300' onClick={handleToggleNewGroup}><span>{tOptionInfo["newGroupBtn"]}</span></button>
                        </div>

                        {/* Product Addons */}
                        <div className='space-y-4'>
                            <h4 className='text-xl font-semibold'>{tOptionInfo["productAddons"]}</h4>
                            <div className='flex flex-wrap items-start options border-2 border-slate-200 border-dashed rounded-3xl p-4'>
                                
                                {selectedProduct?.options
                                .filter(option=>option.groupFlag==null)
                                .map((option) =>{
                                    return <div key={option.optionId} className='flex items-center capitalize bg-secondary-color text-white rounded-lg m-2'>
                                            <span className='p-1'>{option.name}</span>
                                            <span className='bg-white text-black p-1 border border-green-400 rounded-lg text-sm'>
                                                {option.fee} {tCard["aedUnit"]}
                                            </span>
                                            <span className="p-1 cursor-pointer" onClick={()=>handleDeleteOption(option.optionId)}><IoMdCloseCircleOutline className='inline'/></span>
                                        </div>
                                })}
                                <button className='border border-green-300 mt-2' onClick={()=>handleToggleOptionForm("addons")}><span><FaRegPlusSquare className='primary-color' size={20}/></span></button>
                                <div className='flex items-start mb-10'>
                                    {(openedOptionGroup==="addons") && <form className='flex items-start' method='post' onSubmit={(e)=>handleAddOptionToProduct(e, null)}>
                                    <FormInput
                                    {...{...optionInputs[0], containerstyle: "mx-2 rounded-sm w-1/3"}}
                                    />
                                    <FormInput
                                    {...{...optionInputs[1], containerstyle: "mx-2 rounded-sm w-1/3"}}
                                    />
                                    <button type="submit" className="mx-2 mt-7 w-1/5 font-extrabold uppercase text-white bg-primary-color px-2 py-1 shadow-lg" disabled={isLoading}>{tOptionInfo["addBtn"]}</button>
                                </form>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Images */}
                    <div className='w-full lg:w-1/3'>
                        {!selectedProduct?.images ? (
                            "Loading..."
                        ) : (
                            <ProductImageList
                                images={selectedProduct.images}
                                baseURL={baseURL}
                                productProfile={productProfile}
                                onAddImage={handleAddImage}
                                onRemoveImage={handleRemoveImage}
                            />
                        )}
                    </div>
                </div>
            </div>:"Loading,,,,,,,,,,,,,,"}
        </div>

        {/* Modals */}
        <EditProductModal showModal={showEditModal} setShowModal={setShowEditModal} target="Product">
            <AddOrEditProduct key={selectedProduct?.productId}
            isEdit={true}
            currentProduct={selectedProduct} />
        </EditProductModal>
        <ConfirmationModal
            title={"Confirm Product Delete"}
            btnColor={"bg-danger"}
            message={"Are you sure for deleting this product?"}
            onAction={() => {handleOnProductDelete(selectedProduct?.productId); setShowDeleteModal(false)}}
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
        />
    </>
  )
}

export default ProductDetails