import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NavBarHome from '../NavBarHome/NavBarHome'

function PanelUser({ SetHomeUser }) {
    const role = useSelector(state => state.root.role)
    if (role !== "loading") {
        return (
            <div className='w-full h-screen'>
                <div className='grid w-full h-auto grid-cols-6'>
                    <div className='col-span-1 h-auto bg-greyBlack-100'>
                        <NavBarHome SetHomeUser={SetHomeUser} />
                    </div>
                    <div className='col-span-5 h-auto bg-greyBlack-100'>
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }
}

export default PanelUser