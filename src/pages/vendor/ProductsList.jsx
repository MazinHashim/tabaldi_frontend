
import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth, useProductsData } from '../../hooks/appHooks';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import AppLoading from '../../utils/AppLoading';
const PRODUCT_LIST_URL = "/vendors/{id}/products";

const ProductsList = () => {

    const { auth } = useAuth();
    const vendorProductsUrl = PRODUCT_LIST_URL.replace("{id}", `${auth.vendorId}`);
    const sessionToken = auth.token;
    const [state, _,setChangeData] = useAxiosFetchApi(vendorProductsUrl, {}, sessionToken);
    const productList = state.data?.list;
    const { setProducts } = useProductsData();

    useEffect(()=>{
        setProducts(state.data?.list)
    }, [state.data, setProducts])
  return (
    <>
        <div className='flex flex-wrap w-full justify-between'>
            {state.isLoading?<div className="w-full h-[70vh] flex justify-center items-center">
                <AppLoading/>
                </div>
            :!state.data.list
            ?<div className='flex justify-center items-center h-[70vh] capitalize w-full'>{state.data.message??state.error.message}</div>
            :productList.map((product, index)=>{
            return <ProductCard key={product.productId} product={product} index={index}/>})
            }
        </div>
    </>
  )
}

export default ProductsList