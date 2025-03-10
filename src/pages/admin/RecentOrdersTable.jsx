import React from 'react'
import { statusBGColor, statusTextColor } from '../../utils/OrderStatusUtils';
import AppLoading from '../../utils/AppLoading';
import { useTranslation } from 'react-i18next';

const RecentOrdersTable = ({state, orders, title}) => {
  const{t} = useTranslation();
  const tOrderInfo = t("orderInfo")

  return (
    <div className="flex flex-col shadow-4 p-2 rounded-2xl mt-14">
        <div className="flex justify-between my-3">
            <h3 className='font-medium'>{title}</h3>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 px-6">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead
                  className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                  <th scope="col" className="p-4">{`${tOrderInfo.orderNumber.label}`}</th>
                  <th scope="col" className="p-4">{`${tOrderInfo.productName.label}`}</th>
                  <th scope="col" className="p-4">{`${tOrderInfo.vendorName.label}`}</th>
                  <th scope="col" className="p-4">{`${tOrderInfo.orderDate.label}`}</th>
                  <th scope="col" className="p-4">{`${tOrderInfo.amount.label}`}</th>
                  <th scope="col" className="p-4">{t("action")}</th>
                  </tr>
              </thead>
              <tbody>
                {state.isLoading?<tr><td colSpan={6} className='p-10'>
                    <AppLoading/>
                    </td></tr>
                : !state.data?.details
                ? <tr><td colSpan={7} className='p-10'>{state.data?.message}</td></tr>
                : orders.length===0
                ? <tr><td colSpan={7} className='p-10'>No {title}</td></tr>
                : orders.map((order)=>{
                  return <tr key={order.orderId}>
                      <td className="whitespace-nowrap p-4 font-medium">#{order.orderNumber}</td>
                      <td className="whitespace-nowrap p-4 text-start">{order.cartItems[0]?.product.name}</td>
                      <td className="whitespace-nowrap p-4">{order.vendor.fullName}</td>
                      <td className="whitespace-nowrap p-4">{order.forderDate}</td>
                      <td className="whitespace-nowrap p-4">{order.total?.toFixed(2)} {t("aedUnit")}</td>
                      <td className="whitespace-nowrap p-4">
                          <span className={"font-bold py-1 px-2 "
                          + statusTextColor(order.status) + " "
                          + statusBGColor(order.status) + " rounded-lg"}>
                              {order.status}
                          </span>
                      </td>
                  </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}

export default RecentOrdersTable