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
                'desktop:w-full h-screen')}>
                <div className={clsx(
                    'mobile:grid-cols-1',
                    'grid w-full h-full desktop:grid-cols-6')}>
                    <div className={clsx(
                        'mobile:fixed mobile:bottom-0 mobile:bg-cream-200 mobile:py-2',
                        'h-auto desktop:col-span-1 desktop:relative desktop:py-0 desktop:bg-greyBlack-100'
                        )}>
                        <NavBarHome SetHomeUser={SetHomeUser} />
                    </div>
                    <div className={clsx(
                        '',
                        'h-auto desktop:col-span-5 bg-greyBlack-100'
                        )}>
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }
}

export default PanelUser