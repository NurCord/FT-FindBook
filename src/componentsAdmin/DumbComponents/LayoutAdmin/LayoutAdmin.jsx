import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin'

function LayoutAdmin() {
  return (
    <div>
        <NavBarAdmin/>
        <Outlet/>
    </div>
  )
}

export default LayoutAdmin