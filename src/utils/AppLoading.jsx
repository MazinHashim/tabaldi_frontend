import React from 'react'
import loadingSpinner from '../img/spinner.png'
const AppLoading = ({width}) => {
  return (
    <div className='flex justify-center items-center'>
      <p className='stroke-zinc-800 font-thin text-4xl'>
        <img src={loadingSpinner} alt="Loading..." className={`${width}`} />
      </p>
    </div>
  )
}

export default AppLoading