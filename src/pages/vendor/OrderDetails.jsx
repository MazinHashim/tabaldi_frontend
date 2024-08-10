import React, { useEffect, useRef, useState } from 'react'
import { IoCheckmarkDone } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom'
import orderProfile from '../../img/vendor_profile.png'
// import ConfirmationModal from '../modals/ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useFetchFileData from '../../apis/useFetchFileData';
import { useOrdersData } from '../../hooks/appHooks';
import { allStatuses, statusBGColor, statusTextColor } from '../../utils/OrderStatusUtils';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import useAxiosFetchApi from '../../hooks/useFetch';
import AppLoading from '../../utils/AppLoading';
const CHANGE_STATUS_URL="/orders/change/status"
const INVOICE_URL = "/invoices/order"
const OrderDetails = () => {
    const{t, i18n} = useTranslation();
    // const tRecord = t("orderRecord")
    const statusRef = useRef(null)
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const orderId=location.state.orderId;
    const files = useFetchFileData()
    const [productImages, setProductImages] = useState(null);
    const { orders, setOrders } = useOrdersData();
    const selectedOrder = orders.filter((ord)=> ord.orderId===orderId);
    const [state] = useAxiosFetchApi(INVOICE_URL.concat(`/${orderId}`), {}, null);
    const invoice = state.data?.invoice;
    useEffect(()=>{
        const fetchData = async () => {
            if(!productImages) {
                const images = [...new Set(selectedOrder[0].cartItems.map(item=>{
                    return item.product.images.map((img, i)=>
                    {return {id: `product ${item.product.productId}${i}`, path: img}})
                }))];
                console.log(images.flat())
                const result = await files({filePaths: images.flat()});
                setProductImages(result) 
                }};

        fetchData();
    }, [selectedOrder, files, productImages])
    const customerName = `${selectedOrder[0].customer.firstName} ${selectedOrder[0].customer.lastName}`;

    async function handleChangeOrderStatus() {
        if(statusRef.current.value){
            try{
                const params = `/${selectedOrder[0].orderId}?status=${statusRef.current.value}`;
                setLoading(true)
                const orderChangedResponse = await axiosPrivate.get(CHANGE_STATUS_URL+params,
                    {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
                );
                setLoading(false)
                const otherOrders=orders.filter(ord=>ord.orderId!==selectedOrder[0].orderId);
                setOrders([...otherOrders, {...selectedOrder[0], status: statusRef.current.value}])
                toast.success(orderChangedResponse?.data.message);
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message);
            }
        }
    }
    const bgColor=invoice?.status==="PAID"?"bg-green-200":"bg-red-200";
    const txtColor=invoice?.status==="PAID"?"text-green-600":"text-red-600";
  return (
    <>
    <ToastContainer />
    <div className='flex flex-col w-full'>
        <div className="flex justify-between mb-10">
            <h2>Order Details</h2>
            <button className="bg-secondary-color text-white" onClick={()=>navigate(-1)}>Back to all Orders</button>
        </div>
        {state.isLoading?<AppLoading/>
        : !invoice
        ? <p>{state.data.message??state.error.message}</p>
        : <div className='border border-gray-300 rounded-xl shadow-3 mb-10 py-4'>
            <div className="m-2 px-4">
                <div className="flex justify-between">
                    <div className='flex items-center'>
                        <h3>Order #{selectedOrder[0].orderNumber}</h3>
                        <span className={"font-bold px-1 m-2 text-sm capitalize "
                        + statusTextColor(selectedOrder[0].status) + " "
                        + statusBGColor(selectedOrder[0].status) + " rounded-lg"}>
                            {selectedOrder[0].status.toLowerCase()}
                        </span>
                    </div>
                    <div className='flex space-x-3 text-sm'>
                        <select ref={statusRef} className='p-1 rounded-lg border' name="status" id="status">
                            <option value={""}>Status</option>
                            {allStatuses.map(status=>{
                                return <option key={status}>{status}</option>
                            })}
                        </select>
                        <button className={`${isLoading?'invisible':''} bg-primary-color text-white`} onClick={handleChangeOrderStatus}>Save</button>
                        <button className="border border-gray-300">Download Invoice</button>
                    </div>
                </div>
                <div className="flex w-full justify-between my-10">
                    <div className="flex-col space-y-2">
                        <h4>Customer Details</h4>
                        <p>{customerName}</p>
                        <p>{selectedOrder[0].customer.user.email}</p>
                        <p>{selectedOrder[0].customer.user.phone}</p>
                        <p className='font-bold text-sm primary-color cursor-pointer'>View Profile</p>
                    </div>
                    <div className="flex-col space-y-2">
                        <h4>Shipping Address</h4>
                        <p>{selectedOrder[0].address.name}</p>
                        <p>{selectedOrder[0].address.street}</p>
                        <p>Contact No. {selectedOrder[0].address.phone}</p>
                    </div>
                    <div className="flex-col space-y-2">
                        <h4>Order Details</h4>
                        <p>Order No: {selectedOrder[0].orderNumber}</p>
                        <p>Order Date: {selectedOrder[0].orderDate}</p>
                        <p>Number of items: {selectedOrder[0].cartItems.length} {"items"}</p>
                        <p>Order Total: {selectedOrder[0].total} AED 
                            <span className={`lowercase mx-2 text-sm px-1 shadow-2 rounded-md ${txtColor} ${bgColor}`}>
                                {invoice.status}</span></p>
                    </div>
                </div>
            </div>
            <table className="min-w-full text-center text-sm font-light">
            <thead
                className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                <th scope="col" className="p-4 text-start" colSpan={2}>Product</th>
                <th scope="col" className="p-4">Quantity</th>
                <th scope="col" className="p-4">Price</th>
                <th scope="col" className="p-4 text-end">Total</th>
                </tr>
            </thead>
            <tbody>
                {selectedOrder[0].cartItems.map((item)=>{
                    const img = productImages?productImages.filter(image=>image.id.includes(item.product.productId)):null;
                return <><tr key={item.itemId} className='border-b border-gray-100'>
                    <td className="whitespace-nowrap">
                        {!img?"loading...":
                        <img className="rounded-md w-15 h-16 m-2" 
                        src={img[0].data
                            ?`data:image/png;base64, ${img[0].data}`
                            :orderProfile}
                        alt={`${img[0].id}`} />}
                    </td>
                    <td className="whitespace-nowrap font-medium text-start ps-7">{item.product.name}</td>
                    <td className="whitespace-nowrap font-medium p-2">{item.quantity}</td>
                    <td className="whitespace-nowrap font-medium p-2">{item.price}</td>
                    <td className="whitespace-nowrap font-medium p-2 text-end">{item.quantity*item.price} AED</td>
                </tr>
                {!item.selectedOptions?"":
                item.selectedOptions.map(option=>{
                    return <tr className='border-b border-gray-300'>
                        <td className="whitespace-nowrap"></td>
                        <td className="whitespace-nowrap capitalize text-start">
                            <IoCheckmarkDone className='inline p-1 secondary-color' size={25}/>
                            {option.name}</td>
                        <td className="whitespace-nowrap px-2">_</td>
                        <td className="whitespace-nowrap px-2">{option.fee??"_"}</td>
                        <td className="whitespace-nowrap px-2 text-end">{option.fee??"_"} AED</td>
                    </tr>
                })}
                </>
                })}
                <tr className='font-bold'>
                    <td colSpan={3}></td>
                    <td className="border-b border-gray-300 capitalize text-start">subtotal </td>
                    <td className='border-b border-gray-300 p-2 text-end'>{invoice.summary.subtotal} AED</td>
                </tr>
                <tr className='font-bold'>
                    <td colSpan={3}></td>
                    <td className="border-b border-gray-300 capitalize text-start">discount </td>
                    <td className='border-b border-gray-300 p-2 text-end'>{invoice.summary.discount} AED</td>
                </tr>
                <tr className='font-bold'>
                    <td colSpan={3}></td>
                    <td className="border-b border-gray-300 capitalize text-start">shipping cost </td>
                    <td className='border-b border-gray-300 p-2 text-end'>{invoice.summary.shippingCost} AED</td>
                </tr>
                <tr className='font-bold'>
                    <td colSpan={3}></td>
                    <td className="border-b border-gray-300 capitalize text-start">VAT </td>
                    <td className='border-b border-gray-300 p-2 text-end'>{invoice.summary.taxes} AED</td>
                </tr>
                <tr className='font-bold'>
                    <td colSpan={3}></td>
                    <td className="capitalize text-start">grand total: </td>
                    <td className='p-2 text-end'>{invoice.summary.total} AED</td>
                </tr>
            </tbody>
            </table>
            <div className="flex px-7 py-2">
                <div className="w-1/2">
                    <h4>Payment Info</h4>
                    <p>{invoice.paymentMethod==="CASH"?"Cash on Delivery":invoice.paymentMethod}</p>
                </div>
                <div className="w-1/2">
                    <h3 className='my-2'>Notes</h3>
                    <textarea placeholder='Write note for order' className='rounded-md border border-gray-200 w-full h-24 p-2' name="note" id="note"></textarea>
                    <button className="bg-primary-color text-white">Save Notes</button>
                </div>
            </div>
        </div>}
    </div>
    </>
  )
}

export default OrderDetails