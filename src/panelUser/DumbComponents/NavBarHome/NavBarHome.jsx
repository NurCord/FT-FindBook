import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/FindBookLogo.png'
import { UilUser } from '@iconscout/react-unicons'
import { UilBook } from '@iconscout/react-unicons'
import { UilHistory } from '@iconscout/react-unicons'

function NavBarHome({ SetHomeUser }) {
    const handleOnClick = (value) => {
        if (value === 'User') {
            SetHomeUser(value)
            return
        } else if (value === 'Books') {
            SetHomeUser(value)
            return
        } else {
            SetHomeUser(value)
            return
        }
    }
    return (
        <div>
            <nav>
                <Link to='/'>
                    <img src={logo} alt="Logo FindBook" className='p-4' />
                </Link>
                <div className='grid grid-cols-1 grid-rows-3 gap-20 mt-6 justify-items-center'>
                    <button onClick={() => handleOnClick('User')}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                                <UilUser className='w-10 h-10 text-cream-300' />
                            </div>
                            <h1>Usuario</h1>
                        </div>
                    </button>
                    <button onClick={() => handleOnClick('Books')}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                                <UilBook className='w-10 h-10 text-cream-300' />
                            </div>
                            <h1>Libros</h1>
                        </div>
                    </button>
                    <button onClick={() => handleOnClick('Historial')} >
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                                <UilHistory className='w-10 h-10 text-cream-300' />
                            </div>
                            <h1>Historial</h1>
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default NavBarHome