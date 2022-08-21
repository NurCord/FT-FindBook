import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin'
import clsx from 'clsx'

function LayoutAdmin({ SetHomeAdmin }) {
  const role = useSelector(state => state.root.role)
  if (role === "admin") {
    return (
      <div className={clsx(
        'desktop:w-full h-screen')}>
        <div className={clsx(
            'mobile:grid-cols-1',
            'grid w-full h-full desktop:grid-cols-6')}>
            <div className={clsx(
                'mobile:fixed mobile:bottom-0 mobile:bg-cream-200 mobile:py-2',
                'h-auto desktop:col-span-1 desktop:relative desktop:py-0 desktop:bg-greyBlack-100'
                )}>
            <NavBarAdmin SetHomeAdmin={SetHomeAdmin} />
          </div>
          <div className='col-span-5 h-auto bg-greyBlack-100'>
            <Outlet />
          </div>
        </div>
      </div>
    )
  }
  // return (
  //   <div className='grid w-full h-screen grid-cols-6'>
  //     <div className='col-span-1'>
  //       <NavBarAdmin SetHomeAdmin={SetHomeAdmin} />
  //     </div>
  //     <div className='col-span-5'>
  //       <Outlet />
  //     </div>
  //   </div>
  // )
}

export default LayoutAdmin