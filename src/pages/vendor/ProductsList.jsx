
import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth, useProductsData } from '../../hooks/appHooks';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import AppLoading from '../../utils/AppLoading';
import { useLocation } from 'react-router-dom';
const PRODUCT_LIST_URL = "/vendors/{id}/products";

const ProductsList = ({routeRole}) => {

    const { auth, setAuth } = useAuth();
    const token = auth.token;
    const refreshToken = auth.refreshToken;
    const location = useLocation();
    const vendor = location?.state?.vendor;
    const vendorProductsUrl = PRODUCT_LIST_URL.replace("{id}", `${vendor?.vendorId??auth.vendorId}`);
    const sessionToken = auth.token;
    const [state, _, setChangeData] = useAxiosFetchApi(vendorProductsUrl, {}, sessionToken);
    const productList = state.data?.list;
    const { setProducts } = useProductsData();

    useEffect(()=>{
        setProducts(state.data?.list)
    }, [state.data, setProducts])

    useEffect(()=>{
        if(vendor){
            setAuth({...vendor, token, refreshToken})
        }
    }, [vendor])
  return (
    <>
        <div className='flex flex-wrap w-full justify-between'>
            {state.isLoading?<div className="w-full h-[70vh] flex justify-center items-center">
                <AppLoading/>
                </div>
            :!state.data?.list
            ?<div className='flex justify-center items-center h-[70vh] capitalize w-full'>{state.data?.message??state.error?.message}</div>
            :productList.map((product, index)=>{
            return <ProductCard key={product.productId} routeRole={routeRole} product={product} index={index}/>})
            }
        </div>
    </>
  )
}

export default ProductsList