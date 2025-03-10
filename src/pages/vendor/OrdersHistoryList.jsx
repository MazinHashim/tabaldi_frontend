import useAxiosFetchApi from '../../hooks/useFetch';
import { useAuth, useOrdersData } from '../../hooks/appHooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusBGColor, statusTextColor } from '../../utils/OrderStatusUtils';
import AppLoading from '../../utils/AppLoading';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx-js-style';

const ORDER_HISTORY_LIST_URL = "/orders/history";

const createWorksheetData = (filteredOrders, t) => {
    return [
        ['Vendor Type', 'Vendor Name', 'Emirates',
        'Order Date', 'Customer Price', 'Vendor Price',
        'Rateena Profit', 'Entered Percent', 'Delivery AED',
        'Payment Method', 'Status', 'Order Number'],
        ...filteredOrders.map(order => {

            const customerPrice = order?.total || 0;

            let vendorPrice = 0;
            let rateenaProfit = 0;
            if (Array.isArray(order.cartItems)) {
                vendorPrice = order.cartItems.reduce((sum, item) => {
                    const itemPrice = parseFloat(item.price) || 0;
                    const itemQuantity = parseInt(item.quantity) || 0;
                    // Calculate the total price of selected options
                    const optionsPrice = (item.selectedOptions || []).reduce((optSum, option) => {
                        return optSum + (parseFloat(option.fee*itemQuantity) || 0);
                    }, 0);
                    return sum + (itemPrice * itemQuantity + optionsPrice);
                }, 0);

                rateenaProfit = order.cartItems.reduce((sum, item) => {
                    const finalPrice = parseFloat(item.product.finalPrice) || 0;
                    const productPrice = parseFloat(item.product.price) || 0;
                    const itemQuantity = parseInt(item.quantity) || 0;
                    return sum + ((finalPrice - productPrice) * itemQuantity);
                }, 0);
            }

            return [
                order.vendor?.vendorType || '',
                order.vendor?.fullName || '',
                order.vendor?.region || '',
                order?.forderDate || '',
                `${customerPrice.toFixed(2)}`,
                `${vendorPrice.toFixed(2)}`,
                `${rateenaProfit.toFixed(2)}`,
                `${order.cartItems?.[0]?.product?.companyProfit || 0}%`,
                `${order?.shippingCost || 0}`,
                order?.paymentMethod || '',
                order?.status || '',
                order?.orderNumber || '',
            ];
        })
    ];
};

const applyStyles = (ws) => {
    const headerStyle = {
        fill: { fgColor: { rgb: "E6E6E6" } },
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" }
    };
    const oddRowStyle = { fill: { fgColor: { rgb: "F2F2F2" } } };
    const evenRowStyle = { fill: { fgColor: { rgb: "FFFFFF" } } };

    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: R };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            if (!ws[cellRef]) ws[cellRef] = { v: '', t: 's' };
            
            if (R === 0) {
                ws[cellRef].s = headerStyle;
            } else if (R % 2 === 1) {
                ws[cellRef].s = oddRowStyle;
            } else {
                ws[cellRef].s = evenRowStyle;
            }
        }
    }
};

const autoSizeColumns = (ws, wsData) => {
    const colWidths = wsData.reduce((widths, row) => {
        return row.map((cell, i) => Math.max(widths[i] || 0, cell?.toString().length));
    }, []);

    ws['!cols'] = colWidths.map(w => ({ wch: w + 2 }));
};

const OrdersHistoryList = () => {
    const { auth } = useAuth();
    const sessionToken = auth.token;
    const [state] = useAxiosFetchApi(ORDER_HISTORY_LIST_URL, {}, sessionToken);
    const orderList = state.data?.list;
    const { t } = useTranslation();
    const tOrderInfo = t("orderInfo");
    const { setOrders } = useOrdersData();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [vendorType, setVendorType] = useState('');
    const [vendorName, setVendorName] = useState('');

    useEffect(() => {
        setOrders(state.data?.list);
    }, [state.data, setOrders]);

    function goToOrderDetails(orderId) {
        navigate(`${orderId}`);
    }

    const queryOrders = orderList?.filter((data) =>
        Object.values(data).some((value) =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.customer.user.phone.includes(searchQuery.toLowerCase())
        )
    );

    const filteredOrders = queryOrders?.filter((order) => {
        const orderDate = new Date(order.orderDate);
        const isInDateRange = (!startDate || orderDate >= new Date(startDate)) &&
            (!endDate || orderDate <= new Date(endDate));
        const matchesVendorType = !vendorType || order.vendor.vendorType === vendorType;
        const matchesVendorName = !vendorName || order.vendor.fullName.toLowerCase().includes(vendorName.toLowerCase())
                                  || order.vendor.arFullName.toLowerCase().includes(vendorName.toLowerCase());
        return isInDateRange && matchesVendorType && matchesVendorName;
    });

    const exportToExcel = () => {
        const wsData = createWorksheetData(filteredOrders, t);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        applyStyles(ws);
        autoSizeColumns(ws, wsData);

        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "order_history.xlsx");
    };

    return (
        <>
            <div className='flex flex-col w-full'>
                <div className="flex flex-col shadow-4 p-2 rounded-2xl">
                    <div className="flex justify-between items-end flex-wrap">
                        <input type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`${tOrderInfo.search}`} className='p-2 m-2 rounded-lg border'/>
                        <select className='p-2 m-2 rounded-lg border' name="status" id="status"
                            onChange={(e) => setSearchQuery(e.target.value)}>
                            <option value={""}>{`${tOrderInfo.status.label}`}</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELED">CANCELED</option>
                        </select>
                        <div className="flex flex-col m-2">
                            <label htmlFor="startDate" className='text-xs'>From</label>
                            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='p-2 rounded-lg border' placeholder="Start Date" />
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="endDate" className='text-xs'>To</label>
                            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='p-2 rounded-lg border' placeholder="End Date" />
                        </div>
                        <select 
                            value={vendorType} 
                            onChange={(e) => setVendorType(e.target.value)} 
                            className='p-2 m-2 rounded-lg border'
                        >
                            <option value="">{tOrderInfo.selectVendorType}</option>
                            <option value="GROCERY">GROCERY</option>
                            <option value="RESTAURANT">RESTAURANT</option>
                            <option value="STORE">STORE</option>
                        </select>
                        <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} className='p-2 m-2 rounded-lg border' placeholder={tOrderInfo.vendorName.label} />
                        {/* added superadmin condition */}
                        {auth.superAdmin && <button onClick={exportToExcel} className='bg-primary-color text-white p-2 m-2 rounded-lg'>Export to Excel</button>}
                    </div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 px-6">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light">
                                    <thead
                                        className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                                        <tr>
                                            <th scope="col" className="p-4">{`${tOrderInfo.orderNumber.label}`}</th>
                                            <th scope="col" className="p-4">{`${tOrderInfo.customerName.label}`}</th>
                                            <th scope="col" className="p-4">{`${tOrderInfo.customerPhone.label}`}</th>
                                            <th scope="col" className="p-4">{`${tOrderInfo.orderDate.label}`}</th>
                                            <th scope="col" className="p-4">{`${tOrderInfo.status.label}`}</th>
                                            <th scope="col" className="p-4">{`${tOrderInfo.amount.label}`}</th>
                                            <th scope="col" className="p-4">{t("action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.isLoading ? <tr><td colSpan={7} className='p-10'><AppLoading /></td></tr> :
                                            !state.data.list
                                            ? <tr><td colSpan={7} className='p-10'>{state.data.message ?? state.error.message}</td></tr>
                                            : filteredOrders?.length === 0
                                            ? <tr><td colSpan={7} className='p-10'>{`${tOrderInfo.noOrders}`}</td></tr>
                                            : filteredOrders.map((order) => {
                                                return <tr key={order.orderId}>
                                                    <td className="whitespace-nowrap p-4 font-medium">{order.orderNumber}</td>
                                                    <td className="whitespace-nowrap p-4">{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                                                    <td className="whitespace-nowrap p-4">{order.customer.user.phone}</td>
                                                    <td className="whitespace-nowrap p-4 w-64 text-sm">
                                                        <div className='flex justify-between text-warning-700 mb-1'>
                                                            <span>{`${tOrderInfo.ordered}`}</span> <span>{order.forderDate}</span>
                                                        </div>
                                                        <div className='flex justify-between text-info-700 mb-1'>
                                                            <span>{`${tOrderInfo.processed}`}</span> <span>{order.fprocessedDate ?? `${tOrderInfo.notYet}`}</span>
                                                        </div>
                                                        <div className='flex justify-between text-success-700 mb-1'>
                                                            <span>{`${tOrderInfo.delivered}`}</span> <span>{order.fdeliveredDate ?? `${tOrderInfo.notYet}`}</span>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap p-4">
                                                        <span className={"font-bold py-1 px-2 "
                                                            + statusTextColor(order.status) + " "
                                                            + statusBGColor(order.status) + " rounded-lg"}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap p-4">{order.total?.toFixed(2)} {t("aedUnit")}</td>
                                                    <td className="whitespace-nowrap p-4">
                                                        <button onClick={() => goToOrderDetails(order.orderId)} className='bg-secondary-color text-white'>{tOrderInfo.viewDetails}</button>
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

export default OrdersHistoryList