/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NavBarHome from '../NavBarHome/NavBarHome'
import { userDetailPanel, booksPanel } from '../../../redux/actions/actions'
import clsx from 'clsx'

function PanelUser({ SetHomeUser }) {
    const role = useSelector(state => state.root.role)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(booksPanel())
        dispatch(userDetailPanel())
    }, [])
    if (role !== "loading") {
        return (
            <div className={clsx(
                'mobile:h-screen',
                'desktop:w-full desktop:h-screen')}>
                <div className='grid w-full h-auto grid-cols-6'>
                    <div className='h-auto col-span-1 bg-greyBlack-100'>
                        <NavBarHome SetHomeUser={SetHomeUser} />
                    </div>
                    <div className='h-auto col-span-5 bg-greyBlack-100'>
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }
}

export default PanelUser