import React, { useEffect, useRef, useState } from 'react'
import { IoCheckmarkDone } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom'
import orderProfile from '../../img/vendor_profile.png'
// import ConfirmationModal from '../modals/ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useFetchFileData from '../../apis/useFetchFileData';
import { useAuth, useOrdersData } from '../../hooks/appHooks';
import { allStatuses, statusBGColor, statusTextColor } from '../../utils/OrderStatusUtils';
import useAxiosPrivate from '../../apis/useAxiosPrivate';
import useAxiosFetchApi from '../../hooks/useFetch';
import AppLoading from '../../utils/AppLoading';
import { baseURL } from '../../apis/axios';
const CHANGE_STATUS_URL="/orders/change/status"
const SAVE_NOTE_URL = "/orders/save/note"
const INVOICE_URL = "/invoices/order"
const OrderDetails = () => {
    const{t, i18n} = useTranslation();
    const tOrder = t("orderDetailsInfo")
    const { auth } = useAuth();
    const statusRef = useRef(null)
    const noteRef = useRef(null)
    const tCard = t("vendorCard")
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setLoading] = useState(false);
    const {orderId} = useParams();
    
    const navigate = useNavigate();
    // const orderId=location.state.orderId;
    const files = useFetchFileData()
    const [productImages, setProductImages] = useState(null);
    const { orders, setOrders } = useOrdersData();
    const [state] = useAxiosFetchApi(INVOICE_URL.concat(`/${orderId}`), {}, null);
    const invoice = state.data?.invoice;
    const selectedOrder = invoice?.order;
    useEffect(()=>{
        const fetchData = async () => {
            if(!productImages && selectedOrder) {
                const images = [...new Set(selectedOrder?.cartItems.map(item=>{
                    return item.product.images.map((img, i)=>
                    {return {id: `product ${item.product.productId}${i}`, path: img}})
                }))];
                console.log(images.flat())
                const result = await files({filePaths: images.flat()});
                setProductImages(result) 
                }};

        fetchData();
    }, [selectedOrder, files, productImages])
    const customerName = `${selectedOrder?.customer.firstName} ${selectedOrder?.customer.lastName}`;

    async function handleChangeOrderStatus() {
        if(statusRef.current.value){
            try{
                const params = `/${selectedOrder.orderId}?status=${statusRef.current.value}`;
                setLoading(true)
                const orderChangedResponse = await axiosPrivate.get(CHANGE_STATUS_URL+params,
                    {headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
                );
                setLoading(false)
                const otherOrders=orders.filter(ord=>ord.orderId!==selectedOrder.orderId);
                setOrders([...otherOrders, {...selectedOrder, status: statusRef.current.value}])
                toast.success(orderChangedResponse?.data.message);
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message);
            }
        }
    }
    const bgColor=invoice?.status==="PAID"?"bg-green-200":"bg-red-200";
    const txtColor=invoice?.status==="PAID"?"text-green-600":"text-red-600";
    const vendorCoordinates = { lat: selectedOrder?.vendor.lat, lng: selectedOrder?.vendor.lng };
    const customerCoordinates = { lat: selectedOrder?.address.latitude, lng: selectedOrder?.address.longitude };

    const shareCoordinates = (coordinates) => {
        if(coordinates.lat && coordinates.lng){
            const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
            navigator.clipboard.writeText(url).then(() => {
                toast.success(tCard["locationCopied"]);
            }).catch(err => {
                toast.error(tCard["copyFailed"]);
            });
        } else {
            toast.error(tCard["noLocationAvailable"]);
        }
    };
    async function handleSaveNote() {
        if(noteRef.current.value){
            try{
                setLoading(true)
                const orderChangedResponse = await axiosPrivate.post(SAVE_NOTE_URL+`/${selectedOrder.orderId}`,
                    {vendorNote: noteRef.current.value},{headers: { 'Accept-Language': i18n.language, 'Content-Type': 'application/json'}}
                );
                setLoading(false)
                const otherOrders=orders.filter(ord=>ord.orderId!==selectedOrder.orderId);
                setOrders([...otherOrders, {...selectedOrder, vendorNote: noteRef.current.value}])
                toast.success(orderChangedResponse?.data.message);
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message);
            }
        }
    }
  return (
    <>
    <ToastContainer />
    <div className='flex flex-col w-full'>
        <div className="flex justify-between mb-10">
            <h2>{tOrder["orderDetails"]}</h2>
            <button className="bg-secondary-color text-white" onClick={()=>navigate(-1)}>{tOrder["backToOrders"]}</button>
        </div>
        {state.isLoading?<AppLoading/>
        : !invoice
        ? <p>{state.data.message??state.error.message}</p>
        : <div className='border border-gray-300 rounded-xl shadow-3 mb-10 py-4'>
            <div className="m-2 px-4">
                <div className="flex justify-between">
                    <div className='flex items-center'>
                        <h3>{tOrder["orderNumber"]} {selectedOrder.orderNumber}</h3>
                        <span className={"font-bold px-1 m-2 text-sm capitalize "
                        + statusTextColor(selectedOrder.status) + " "
                        + statusBGColor(selectedOrder.status) + " rounded-lg"}>
                            {selectedOrder.status.toLowerCase()}
                        </span>
                    </div>
                    <div className='flex space-x-3 text-sm'>
                        <select ref={statusRef} className='p-1 rounded-lg border' name="status" id="status">
                            <option value={""}>{tOrder["status"]}</option>
                            {allStatuses.map(status=>{
                                if(status==="DELIVERED" && auth.role?.includes("VENDOR"))
                                    return "";
                                return <option key={status}>{status}</option>
                            })}
                        </select>
                        <button className={`${isLoading?'invisible':''} bg-primary-color text-white`} onClick={handleChangeOrderStatus}>{tOrder["save"]}</button>
                        <a href={`${baseURL}/invoices/${invoice.invoiceId}/download`} target='_blank' rel="noreferrer" className="border border-gray-300">{tOrder["downloadInv"]}</a>
                    </div>
                </div>
                <div className="flex w-full justify-between my-10">
                    <div className="flex-col space-y-2">
                        <h4>{tOrder["custDetails"]}</h4>
                        <p>{customerName}</p>
                        <p>{selectedOrder.customer.user.email}</p>
                        <p>{selectedOrder.customer.user.phone}</p>
                        {/* <p className='font-bold text-sm primary-color cursor-pointer'>{tOrder["viewProfile"]}</p> */}
                    </div>
                    <div className="flex-col space-y-2">
                        <h4>{tOrder["shippAddress"]}</h4>
                        <p>{selectedOrder.address.name}</p>
                        <p>{selectedOrder.address.street}</p>
                        <p>{tOrder["contactNum"]} {selectedOrder.address.phone}</p>
                    </div>
                    <div className="flex-col space-y-2">
                        <h4>{tOrder["orderDetails"]}</h4>
                        <p>{tOrder["orderNum"]}: {selectedOrder.orderNumber}</p>
                        <p>{tOrder["orderDate"]}: {selectedOrder.forderDate}</p>
                        <p>{tOrder["numOfItems"]}: {selectedOrder.cartItems.length} {"items"}</p>
                        <p>{tOrder["orderTotal"]}: {selectedOrder.total?.toFixed(2)} {t("aedUnit")} 
                            <span className={`lowercase mx-2 text-sm px-1 shadow-2 rounded-md ${txtColor} ${bgColor}`}>
                                {invoice.status}</span></p>
                    </div>
                </div>
            </div>
            <div className="flex mb-4 justify-between">
                <p className="mx-7 text-green-800">{tOrder["orderFrom"]+" "} 
                <b>{i18n.language==="en"
                ? selectedOrder.vendor.fullName ? selectedOrder.vendor.fullName : "Vendor Name"
                : selectedOrder.vendor.arFullName ? selectedOrder.vendor.arFullName : "إسم المحل"}</b></p>
                <div className="flex justify-end">
                    <button className="text-sm bg-secondary-color text-white py-1 px-2 rounded" onClick={() => shareCoordinates(vendorCoordinates)}>
                        {tCard.shareLocationVendorBtn}
                    </button>
                    <button className="text-sm mx-7 bg-secondary-color text-white py-1 px-2 rounded" onClick={() => shareCoordinates(customerCoordinates)}>
                        {tCard.shareLocationCustomerBtn}
                    </button>
                </div>
            </div>
            <table className="min-w-full text-center text-sm font-light">
            <thead
                className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                <th scope="col" className="py-4 px-9 text-start" colSpan={2}>{tOrder["product"]}</th>
                <th scope="col" className="p-4">{tOrder["quantity"]}</th>
                <th scope="col" className="p-4">{tOrder["price"]}</th>
                <th scope="col" className="p-4">{tOrder["comment"]}</th>
                <th scope="col" className="py-4 px-9 text-end">{tOrder["total"]}</th>
                </tr>
            </thead>
            <tbody>
                {selectedOrder.cartItems.map((item)=>{
                    const img = productImages?productImages.filter(image=>image.id.includes(item.product.productId)):null;
                return <><tr key={item.itemId} className='border-b border-gray-100'>
                    <td className="whitespace-nowrap py-2 px-4">
                        {!img?"loading...":
                        <img className="rounded-md w-15 h-16 m-2" 
                        src={img[0].data
                            ?`data:image/png;base64, ${img[0].data}`
                            :orderProfile}
                        alt={`${img[0].id}`} />}
                    </td>
                    <td className="whitespace-nowrap font-medium text-start">{item.product.name}</td>
                    <td className="whitespace-nowrap font-medium p-2">{item.quantity}</td>
                    <td className="whitespace-nowrap font-medium p-2">{item.price?.toFixed(2)}</td>
                    <td className="font-medium py-2 text-start">{item.comment===""?"-":item.comment}</td>
                    <td className="whitespace-nowrap font-medium py-2 px-9 text-end">{(item.quantity*item.price).toFixed(2)} AED</td>
                </tr>
                {!item.selectedOptions?"":
                item.selectedOptions.map(option=>{
                    return <tr key={option.optionId} className='border-b border-gray-300'>
                        <td className="whitespace-nowrap"></td>
                        <td className="whitespace-nowrap capitalize text-start">
                            <IoCheckmarkDone className='inline p-1 secondary-color' size={25}/>
                            {option.name}</td>
                        <td className="whitespace-nowrap px-2">{item.quantity}</td>
                        <td className="whitespace-nowrap px-2">{option.fee??"_"}</td>
                        <td></td>
                        <td className="whitespace-nowrap py-2 px-9 text-end">{item.quantity*option.fee??"_"} {t("aedUnit")}</td>
                    </tr>
                })}
                </>
                })}
                <tr className='font-bold'>
                    <td colSpan={4}></td>
                    <td className="border-b border-gray-300 capitalize text-start">{tOrder["subtotal"]} </td>
                    <td className='border-b border-gray-300 py-2 px-9 text-end'>{invoice.summary.subtotal?.toFixed(2)} {t("aedUnit")}</td>
                </tr>
                <tr className='font-bold'>
                    <td colSpan={4}></td>
                    <td className="border-b border-gray-300 capitalize text-start">{tOrder["discount"]} </td>
                    <td className='border-b border-gray-300 py-2 px-9 text-end'>{invoice.summary.discount?.toFixed(2)} {t("aedUnit")}</td>
                </tr>
                <tr className='font-bold'>
                    <td colSpan={4}></td>
                    <td className="border-b border-gray-300 capitalize text-start">{tOrder["shippingCost"]} </td>
                    <td className='border-b border-gray-300 py-2 px-9 text-end'>{invoice.summary.shippingCost?.toFixed(2)} {t("aedUnit")}</td>
                </tr>
                {/* <tr className='font-bold'>
                    <td colSpan={4}></td>
                    <td className="border-b border-gray-300 capitalize text-start">{tOrder["vat"]} </td>
                    <td className='border-b border-gray-300 py-2 px-9 text-end'>{invoice.summary.taxes} {t("aedUnit")}</td>
                </tr> */}
                <tr className='font-bold'>
                    <td colSpan={4}></td>
                    <td className="capitalize text-start">{tOrder["grandTotal"]}: </td>
                    <td className='py-2 px-9 text-end'>{invoice.summary.total?.toFixed(2)} {t("aedUnit")}</td>
                </tr>
            </tbody>
            </table>
            <div className="flex px-7 py-2">
                <div className="w-1/2">
                    <h4>{tOrder["paymentInfo"]}</h4>
                    <p>{invoice.paymentMethod==="CASH"?"Cash on Delivery":invoice.paymentMethod}</p>
                    <p className='mt-4'>{selectedOrder.comment}</p>
                </div>
                <div className="w-1/2">
                    <h3 className='my-2'>{tOrder["notes"]}</h3>
                    <textarea ref={noteRef} defaultValue={selectedOrder.vendorNotes||""} placeholder='Write note for order' className='rounded-md border border-gray-200 w-full h-24 p-2' id="note"></textarea>
                    {selectedOrder.status!=="DELIVERED" && selectedOrder.status!=="CANCELED"
                    ? <button onClick={handleSaveNote} className={`${isLoading?'invisible':''} bg-primary-color text-white`}>{tOrder["saveNotes"]}</button>
                    : <hr style={{border: "1px dashed grey", marginTop: 10, width: "50%"}}/>
                    }
                </div>
            </div>
        </div>}
    </div>
    </>
  )
}

export default OrderDetails
