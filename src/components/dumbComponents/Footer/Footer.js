import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import logo from '../../../assets/FindBookLogo.png'
import { UilTelegramAlt } from '@iconscout/react-unicons'
//import {DivAnimation} from './StyleFooter'

export default function Footer() {
    return (
        <div className={clsx(
            'mobile:text-sm',
            'w-full desktop:text-base desktop:h-44 grid grid-rows-3'
        )}>
        <div  className={clsx(
            'grid grid-cols-1 justify-items-start content-center row-span-2 bg-[#c5b081]')}>
            <div className='w-full'>
                    <div className='flex flex-col items-center justify-center w-full h-full'>
                        <img src={logo} className='z-10 h-16' alt='Not found'/>
                        <div className='flex'>
                            <div className='flex mr-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" className={clsx(
                                    'mobile:w-5 mobile:h-5',
                                    "desktop:w-6 desktop:h-6 mx-2"
                                    )} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <Link to={'/contacto'}>
                                    <h1>Contacto</h1>
                                </Link>
                            </div>
                            <div className='flex ml-4'>
                                <UilTelegramAlt className={clsx(
                                    'mobile:w-5 mobile:h-5',
                                    "desktop:w-6 desktop:h-6"
                                    )}/>
                                <Link to={'/about'}>
                                    <h1 className='ml-2'>About</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
            {/* {
                window.matchMedia("(min-width: 700px)").matches ? <div className='grid content-center w-full h-full'>
                    <DivAnimation/>
                </div> : null
            } */}
        </div>
            <div className='grid content-center w-full justify-items-center bg-cream-200'>
                <p className='col-span-2'>© 2022 Copyright: FindBook.com</p>
            </div>
        </div>
    )
}
