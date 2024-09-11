import React from 'react'
import AppLoading from '../../utils/AppLoading';

const FrequentProductsTable = ({state, title, labels}) => {
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
                  <th scope="col" className="p-4">{labels["prodName"]}</th>
                  <th scope="col" className="p-4">{labels["category"]}</th>
                  <th scope="col" className="p-4">{labels["availQuant"]}</th>
                  <th scope="col" className="p-4">{labels["compProfit"]}</th>
                  <th scope="col" className="p-4">{labels["price"]}</th>
                  <th scope="col" className="p-4">{labels["numOfOpt"]}</th>
                  <th scope="col" className="p-4">{labels["numOfOrd"]}</th>
                  </tr>
              </thead>
              <tbody>
                {state.isLoading?<tr><td colSpan={6} className='p-10'>
                    <AppLoading/>
                    </td></tr>
                : !state.data?.details
                ? <tr><td colSpan={7} className='p-10'>{state.data?.message}</td></tr>
                : state.data?.details?.numberOfOrders===0
                ? <tr><td colSpan={7} className='p-10'>No {title}</td></tr>
                : state.data?.details.frequentProducts.map((frequentProduct)=>{
                  return <tr key={frequentProduct.product.productId}>
                      <td className="whitespace-nowrap p-4 text-start font-medium">{frequentProduct.product.name}</td>
                      <td className="whitespace-nowrap p-4 text-start">{frequentProduct.product.category.name}</td>
                      <td className="whitespace-nowrap p-4">{frequentProduct.product.quantity}</td>
                      <td className="whitespace-nowrap p-4">{frequentProduct.product.companyProfit}</td>
                      <td className="whitespace-nowrap p-4">{frequentProduct.product.price} AED</td>
                      <td className="whitespace-nowrap p-4">{frequentProduct.product.options?.length}</td>
                      <td className="whitespace-nowrap p-4">{frequentProduct.frequency}</td>
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

export default FrequentProductsTable