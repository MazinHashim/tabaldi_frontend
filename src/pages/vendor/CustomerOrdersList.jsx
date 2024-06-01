import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth, useOrdersData } from '../../hooks/appHooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusBGColor, statusTextColor } from '../../utils/OrderStatusUtils';
import AppLoading from '../../utils/AppLoading';
const ORDER_LIST_URL = "/vendors/{id}/orders";

const OrdersList = () => {

    const { auth } = useAuth();
    const vendorOrdersUrl = ORDER_LIST_URL.replace("{id}", `${auth.vendorId}`);
    const sessionToken = auth.token;
    const [state] = useAxiosFetchApi(vendorOrdersUrl, {}, sessionToken);
    const orderList = state.data?.list;
    const { setOrders } = useOrdersData();
    const navigate = useNavigate()

    useEffect(()=>{
        setOrders(state.data?.list)
    }, [state.data, setOrders])

    function goToOrderDetails(orderId) {
        navigate('/order-details', {state: {orderId}});
    }

  return (
    <>
        <div className='flex flex-col w-full'>
            <div className="flex flex-col shadow-4 p-2 rounded-2xl">
                <div className="flex justify-between">
                    <input type="text" placeholder='Search' className='p-2 m-2 rounded-lg border'/>
                    <select className='p-2 m-2 rounded-lg border' name="status" id="status">
                        <option>Status</option>
                        <option value="PROGRESSING">PROGRESSING</option>
                        <option value="WAITING">WAITING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELED">CANCELED</option>
                    </select>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 px-6">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead
                            className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                            <tr>
                            <th scope="col" className="p-4">Order Number</th>
                            <th scope="col" className="p-4">Customer</th>
                            <th scope="col" className="p-4">Date & Time</th>
                            <th scope="col" className="p-4">Payment</th>
                            <th scope="col" className="p-4">Status</th>
                            <th scope="col" className="p-4">Amount</th>
                            <th scope="col" className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.isLoading?<tr><td colSpan={7} className='p-10'>
                                <AppLoading/>
                                </td></tr>
                            : !state.data.list
                            ? <tr><td colSpan={7} className='p-10'>{state.data.message??state.error.message}</td></tr>
                            : orderList.map((order)=>{
                            return <tr key={order.orderId}>
                                <td className="whitespace-nowrap p-4 font-medium">{order.orderNumber}</td>
                                <td className="whitespace-nowrap p-4">{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                                <td className="whitespace-nowrap p-4">{order.orderDate}</td>
                                <td className="whitespace-nowrap p-4">Paypal</td>
                                <td className="whitespace-nowrap p-4">
                                    <span className={"font-bold py-1 px-2 "
                                    + statusTextColor(order.status) + " "
                                    + statusBGColor(order.status) + " rounded-lg"}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap p-4">{order.total} AED</td>
                                <td className="whitespace-nowrap p-4">
                                    <button onClick={()=>goToOrderDetails(order.orderId)} className='bg-secondary-color text-white'>View</button>
                                </td>
                            </tr>
                            })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OrdersList