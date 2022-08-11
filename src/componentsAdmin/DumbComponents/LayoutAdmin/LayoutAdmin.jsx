import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin'

function LayoutAdmin() {
  return (
    <div className='grid w-full h-screen grid-cols-6'>
      <div className='col-span-1'>
        <NavBarAdmin />
      </div>
      <div className='col-span-5'>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutAdmin