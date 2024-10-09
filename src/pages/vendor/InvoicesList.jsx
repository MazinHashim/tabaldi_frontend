import React, { useState } from 'react'
import { useAuth } from '../../hooks/appHooks';
import { useTranslation } from 'react-i18next';
import useAxiosFetchApi from '../../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import AppLoading from '../../utils/AppLoading';

const INVOICE_LIST_URL = "/vendors/{id}/invoices";

const InvoicesList = () => {
  const {auth} = useAuth()
    const{t, i18n} = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const tInvoice = t("invoiceInfo")
    const vendorInvoicesUrl = INVOICE_LIST_URL.replace("{id}", `${auth.vendor?.vendorId}`);
    const sessionToken = auth.token;
    const [state] = useAxiosFetchApi(vendorInvoicesUrl, {}, sessionToken);
    const invoiceList = state.data?.list;
    const queryInvoices = invoiceList?.filter((data) =>
        Object.values(data).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.order.customer.user.phone===searchQuery.toLowerCase()
        )
    )
  return (
    <div>
      <>
        <ToastContainer />
        <div className='flex flex-col w-full'>
          <div className="flex justify-between mb-10">
              <h2>{tInvoice["invoices"]}</h2>
          </div>
          <div className="flex flex-col shadow-4 p-2 rounded-2xl">
              <div className="flex justify-between">
                  <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text" placeholder={tInvoice["search"]} className='p-2 m-2 rounded-lg border'/>
                  <select className='p-2 m-2 rounded-lg border' name="status" id="status"
                  onChange={(e) => setSearchQuery(e.target.value)}>
                      <option value={""}>{tInvoice["status"]}</option>
                      <option value={"DRAFT"}>{tInvoice["draft"]}</option>
                      <option value={"PAID"}>{tInvoice["paid"]}</option>
                      <option value={"UNPAID"}>{tInvoice["unpaid"]}</option>
                  </select>
              </div>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 px-6">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light">
                    <thead
                      className="bg-neutral-100 rounded-lg font-medium dark:border-neutral-500 dark:text-neutral-800">
                      <tr key={"head-1"}>
                      <th scope="col" className="py-4">{tInvoice["invoiceNumber"]}</th>
                      <th scope="col" className="py-4">{tInvoice["paymentMethod"]}</th>
                      <th scope="col" className="py-1">{tInvoice["issueDate"]}</th>
                      <th scope="col" className="py-1">{tInvoice["total"]}</th>
                      <th scope="col" className="py-4">{tInvoice["status"]}</th>
                      <th scope="col" className="py-4">{t("action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.isLoading?<tr><td colSpan={7} className='p-10'>
                          <AppLoading/>
                          </td></tr>
                      : !state.data.list
                      ? <tr><td colSpan={7} className='p-10'>{state.data.message??state.error.message}</td></tr>
                      : queryInvoices?.length===0
                      ? <tr><td colSpan={7} className='p-10'>{"invoiceInfo.noInvoices"}</td></tr>
                      : queryInvoices.map((invoice)=>{
                          const bgColor=invoice.status==="PAID"?"bg-green-200":"bg-red-200";
                          const txtColor=invoice.status==="PAID"?"text-green-600":"text-red-600";
                      return <tr key={invoice.invoiceId}>
                        <td className="whitespace-nowrap p-5 font-medium capitalize">{invoice.invoiceNumber}</td>
                        <td className="whitespace-nowrap p-5">{invoice.paymentMethod}</td>
                        <td className="whitespace-nowrap p-5">{invoice.fissueDate}</td>
                        <td className="whitespace-nowrap p-5">{invoice.summary.total} {t("aedUnit")}</td>
                        <td className="whitespace-nowrap p-5">
                                <span className={`px-1 shadow-2 rounded-md ${txtColor} ${bgColor}`}>
                                    {invoice.status.toLowerCase()}
                                </span>
                            </td>
                        <td className="whitespace-nowrap py-4">
                          <button 
                          onClick={()=>console.log("Mazin")}
                          className='bg-success-200 mx-1'>{tInvoice["viewOrder"]}</button>
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
    </div>
  )
}

export default InvoicesList