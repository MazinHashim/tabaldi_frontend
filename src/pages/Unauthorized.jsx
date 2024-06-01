import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  return (
    <div className='flex flex-col space-y-5 justify-center items-center h-[100vh]'>
      <h1 className='text-red-700 font-bold px-2 text-2xl'>Unauthorized Access</h1>
      <p>You do not have access to the requested page.</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Unauthorized