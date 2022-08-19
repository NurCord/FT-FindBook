import React from 'react'

export default function UserOrders() {
  return (
    <div className='w-full'>
      <div className=' bg-gray-300'>
        <div className='py-12'>
          <div className='max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl'>
            <div className='md:flex'>
              <div className='w-full p-4 px-5 py-5'>
                <div className='md:grid md:grid-cols-3 gap-2'>
                  <div className='col-span-2 p-5'>
                    <h1 className='text-xl font-medium'>Tus ordenes</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
