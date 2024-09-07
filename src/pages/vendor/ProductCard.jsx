import React, { useState } from 'react'
import productProfile from '../../img/vendor_profile.png'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../apis/axios';
import { GrDeploy } from 'react-icons/gr';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import { toast } from 'react-toastify';
import { BsCheck2Circle } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';
import { useProductsData } from '../../hooks/appHooks';

const TOGGLE_PUBLISH_URL = "/products/toggle/publish"
const ProductCard = ({product, routeRole}) => {
    const{t, i18n} = useTranslation();
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setLoading] = useState(false);
    const { products, setProducts } = useProductsData();
    const tCard = t("productCard")

    function goToProductDetails(productId) {
        navigate((routeRole!=="SUPERADMIN"?"/":"")+'product-details', {state: { productId }});
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
    const selectedProductPrice = Math.round(product.price + (product.price / 100) * product.companyProfit).toFixed(2);
  return (
    <>
    <div key={product.productId} className='flex flex-col justify-between h-[27rem] bg-gray-50 mb-16 w-full lg:w-3/12 m-1 shadow-xl rounded-xl'>
        <img className="rounded-xl justify-stretch w-full h-[13rem]"
        src={product.images && product.images[0]
            ?`${baseURL}/files/get/file/${product.images[0]}`
            :productProfile}
        alt={`Product 0`} />
        <div className="flex justify-between px-2">
            <h4 className='uppercase primary-color'>{product.category.name}</h4>
            <h3 className='uppercase'>{`${selectedProductPrice} ${tCard["aedUnit"]}`}</h3>
        </div>
        <div className="flex justify-between px-2 items-start">
            <h4>{product.name}</h4>
            {routeRole==="SUPERADMIN"?
            <div className='flex flex-col items-center'>
                <button 
                onClick={()=>isLoading?null:toggleProductPublishing(product.productId)}
                className={`${product.published?"bg-green-200":"bg-red-200"} text-sm`} title={"Published Prodcut"}>
                    <GrDeploy/>
                </button>
                {!product.published && <span className='text-yellow-700 text-sm mx-1'>Reviewing</span>}
            </div>:
                product.published
                ? <BsCheck2Circle className={`${"text-green-700"} text-xl`} title={"Published Prodcut"}/>
                : <p className={`text-sm ${"text-yellow-700"}`}>
                    <IoWarningOutline className="inline-block mx-1 text-lg" title={"Published Prodcut"}/>
                    Reviewing</p>
            }
        </div>
        <div className="flex px-2"><p className='text-gray-500'>{product.description}.</p></div>
        <hr/>
        <div className="text-sm flex justify-between items-center p-2">
            <h4>{`${product.quantity} ` + (tCard["itemText"])}</h4>
            <button key={product.productId} onClick={()=>goToProductDetails(product.productId)} className='text-white py-1 px-2 bg-primary-color rounded-md'>
                {tCard["showDetails"]}</button>
        </div>
    </div>
    </>
  )
}

export default ProductCard