import React, { useEffect, useState } from 'react'
import productProfile from '../../img/vendor_profile.png'
import { useTranslation } from 'react-i18next';
import useFetchFileData from '../../apis/useFetchFileData';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({product, index}) => {
    const{t,} = useTranslation();
    const navigate = useNavigate()
    const tCard = t("productCard")
    const files = useFetchFileData()
    const [productImages, setProductImages] = useState(null);

    function goToProductDetails(productId) {
        navigate('/product-details', {state: { productId, images: productImages }});
    }

    useEffect(()=>{
        const fetchData = async () => {
            if(!productImages) {
                const result = await files({filePaths: product.images.map((img, i)=>
                    {return {id: `product${index}${i}`, path: img}}
                )});
                setProductImages(result) }};

        fetchData();
    }, [product, index, files, productImages])
  return (
    <>
    <div key={product.productId} className='flex flex-col justify-between h-[27rem] bg-gray-50 mb-16 w-full lg:w-3/12 m-1 shadow-xl rounded-xl'>
        
        <img className="rounded-xl justify-stretch w-full h-[13rem]"
        src={productImages && productImages[0].data
            ?`data:image/png;base64, ${productImages[0].data}`
            :productProfile}
        alt={`Product ${index}`} />
        <div className="flex justify-between px-2">
            <h4 className='uppercase primary-color'>{product.category.name}</h4>
            <h3 className='uppercase'>{`${product.price} ${tCard["aedUnit"]}`}</h3>
        </div>
        <div className="flex px-2"><h4>{product.name}</h4></div>
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