import React from 'react'
import AppLoading from '../../utils/AppLoading';

const FrequentVendorsTable = ({state, title}) => {
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
                  <th scope="col" className="p-4">Vendor Name</th>
                  <th scope="col" className="p-4">Email</th>
                  <th scope="col" className="p-4">Phone</th>
                  <th scope="col" className="p-4">Created At</th>
                  <th scope="col" className="p-4">Vendor Type</th>
                  <th scope="col" className="p-4">Number Of Orders</th>
                  </tr>
              </thead>
              <tbody>
                {state.isLoading?<tr><td colSpan={6} className='p-10'>
                    <AppLoading/>
                    </td></tr>
                : !state.data?.details
                ? <tr><td colSpan={7} className='p-10'>{state.data.message}</td></tr>
                : state.data?.details.frequentVendors.map((frequentVendor)=>{
                  return <tr key={frequentVendor.vendor.vendorId}>
                      <td className="whitespace-nowrap p-4 font-medium">{frequentVendor.vendor.fullName}</td>
                      <td className="whitespace-nowrap p-4 text-start">{frequentVendor.vendor.user.email}</td>
                      <td className="whitespace-nowrap p-4">{frequentVendor.vendor.user.phone}</td>
                      <td className="whitespace-nowrap p-4">2024-05-03 21:00:54</td>
                      <td className="whitespace-nowrap p-4">{frequentVendor.vendor.vendorType}</td>
                      <td className="whitespace-nowrap p-4">{frequentVendor.frequency}</td>
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

export default FrequentVendorsTable