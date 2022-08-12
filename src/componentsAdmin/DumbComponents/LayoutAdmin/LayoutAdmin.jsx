import React from 'react'
// import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin'

function LayoutAdmin({SetHomeAdmin}) {
  // const role = useSelector(state => state.root.role)
  // if(role === "admin"){
  //   return (
  //     <div className='grid w-full h-screen grid-cols-6'>
  //       <div className='col-span-1'>
  //         <NavBarAdmin SetHomeAdmin={SetHomeAdmin} />
  //       </div>
  //       <div className='col-span-5'>
  //         <Outlet/>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className='grid w-full h-screen grid-cols-6'>
      <div className='col-span-1'>
        <NavBarAdmin SetHomeAdmin={SetHomeAdmin} />
      </div>
      <div className='col-span-5'>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutAdmin