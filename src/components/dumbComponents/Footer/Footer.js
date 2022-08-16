import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='w-full h-24 grid grid-rows-3'>
            <div className='w-full row-span-2 bg-greyBlack-200'>
                <Link to={'/contacto'}>
                    <div className='flex h-full justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h1>Contacto</h1>
                    </div>
                </Link>
            </div>
            <div className='grid justify-items-center content-center w-full bg-greyBlack-300'>
                <p className='col-span-2'>© 2022 Copyright: FindBook.com</p>
            </div>
        </div>
    )
}
