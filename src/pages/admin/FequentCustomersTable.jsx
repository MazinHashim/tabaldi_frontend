import React from 'react'
import AppLoading from '../../utils/AppLoading';

const FrequentCustomersTable = ({state, title, labels}) => {
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
                  <th scope="col" className="p-4">{labels["customerName"]}</th>
                  <th scope="col" className="p-4">{labels["email"]}</th>
                  <th scope="col" className="p-4">{labels["phone"]}</th>
                  <th scope="col" className="p-4">{labels["createdAt"]}</th>
                  <th scope="col" className="p-4">{labels["gender"]}</th>
                  <th scope="col" className="p-4">{labels["birthDate"]}</th>
                  <th scope="col" className="p-4">{labels["numOfOrd"]}</th>
                  </tr>
              </thead>
              <tbody>
                {state.isLoading?<tr><td colSpan={6} className='p-10'>
                    <AppLoading/>
                    </td></tr>
                : !state.data?.details
                ? <tr><td colSpan={7} className='p-10'>{state.data?.message}</td></tr>
                : state.data?.details.frequentCustomers.map((frequentCustomer)=>{
                  return <tr key={frequentCustomer.customer.customerId}>
                      <td className="whitespace-nowrap p-4 font-medium">{`${frequentCustomer.customer.firstName} ${frequentCustomer.customer.lastName}`}</td>
                      <td className="whitespace-nowrap p-4 text-start">{frequentCustomer.customer.user.email??"Not Entered"}</td>
                      <td className="whitespace-nowrap p-4">{frequentCustomer.customer.user.phone}</td>
                      <td className="whitespace-nowrap p-4">{frequentCustomer.customer.createdAt?.split(".")[0].replace("T", " ")}</td>
                      <td className="whitespace-nowrap p-4">{frequentCustomer.customer.gender}</td>
                      <td className="whitespace-nowrap p-4">{frequentCustomer.customer.dateOfBirth}</td>
                      <td className="whitespace-nowrap p-4">{frequentCustomer.frequency}</td>
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

export default FrequentCustomersTable