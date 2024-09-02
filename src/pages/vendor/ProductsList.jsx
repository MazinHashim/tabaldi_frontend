
import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth, useProductsData } from '../../hooks/appHooks';
import EditProductModal from '../modals/EditModal';
import AddOrEditProduct from './AddOrEditProduct';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import AppLoading from '../../utils/AppLoading';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
const PRODUCT_LIST_URL = "/vendors/{id}/products";

const ProductsList = ({routeRole}) => {

    const { auth, setAuth } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
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
    }, [vendor, token, refreshToken, setAuth])

    function onTogglePublishing(published, productId) {
        const otherProducts=productList.filter(prod=>prod.productId!==productId);
        const selectedProduct=productList.find(prod=>prod.productId===productId);
        setChangeData([...otherProducts, {...selectedProduct, published: published}])
    }
  return (
    <>
        <ToastContainer />
        <div className="flex justify-between mb-10">
            <h2>Products</h2>
            <button className="bg-secondary-color text-white"
            onClick={()=>setShowEditModal({advertisement: null, status: true})}
            >Add New Product</button>
        </div>
        <div className='flex flex-wrap w-full justify-between'>
            {state.isLoading?<div className="w-full h-[70vh] flex justify-center items-center">
                <AppLoading/>
                </div>
            :!state.data?.list
            ?<div className='flex justify-center items-center h-[70vh] capitalize w-full'>{state.data?.message??state.error?.message}</div>
            :productList
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0
            }).map((product)=>{
            return <ProductCard key={product.productId}
            routeRole={routeRole}
            product={product}
            onTogglePublishing={onTogglePublishing}/>})
            }
        </div>
        <EditProductModal showModal={showEditModal} setShowModal={setShowEditModal} target="Product">
            <AddOrEditProduct />
        </EditProductModal>
    </>
  )
}

export default ProductsList