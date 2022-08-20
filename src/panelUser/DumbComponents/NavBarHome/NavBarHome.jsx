import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/FindBookLogo.png'
import { UilUser } from '@iconscout/react-unicons'
import { UilBook } from '@iconscout/react-unicons'
import { UilHistory } from '@iconscout/react-unicons'
import clsx from 'clsx'
import { UilEstate } from '@iconscout/react-unicons'

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
                {
                    window.matchMedia("(min-width: 700px)").matches ? 
                    <Link to='/'>
                        <img src={logo} alt="Logo FindBook" className={clsx('p-4')} />
                    </Link>
                    : ''
                }
                <div className={clsx(
                    'mobile:grid-cols-4 mobile:w-screen',
                    'grid desktop:grid-cols-1 desktop:w-full desktop:grid-rows-3 desktop:gap-20 desktop:mt-6 justify-items-center'
                    )}>
                    <button onClick={() => handleOnClick('User')}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className={clsx(
                                'mobile:h-10 mobile:w-10',
                                'flex items-center justify-center border-2 rounded-full desktop:h-14 desktop:w-14 border-cream-300 hover:shadow-lg'
                                )}>
                                <UilUser className={clsx(
                                    'mobile:w-6 mobile:h-6',
                                    'desktop:w-10 desktop:h-10 text-cream-300'
                                    )}/>
                            </div>
                            <h1 className={clsx('mobile:text-sm', 'desktop:text-lg')}>Usuario</h1>
                        </div>
                    </button>
                    <button onClick={() => handleOnClick('Books')}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className={clsx(
                                'mobile:h-10 mobile:w-10',
                                'flex items-center justify-center border-2 rounded-full desktop:h-14 desktop:w-14 border-cream-300 hover:shadow-lg'
                                )}>
                                <UilBook className={clsx(
                                    'mobile:w-6 mobile:h-6',
                                    'desktop:w-10 desktop:h-10 text-cream-300'
                                    )}/>
                            </div>
                            <h1 className={clsx('mobile:text-sm', 'desktop:text-lg')}>Libros</h1>
                        </div>
                    </button>
                    <button onClick={() => handleOnClick('Historial')} >
                        <div className='flex flex-col items-center justify-center'>
                        <div className={clsx(
                                'mobile:h-10 mobile:w-10',
                                'flex items-center justify-center border-2 rounded-full desktop:h-14 desktop:w-14 border-cream-300 hover:shadow-lg'
                                )}>
                                <UilHistory className={clsx(
                                    'mobile:w-6 mobile:h-6',
                                    'desktop:w-10 desktop:h-10 text-cream-300'
                                    )}/>
                            </div>
                            <h1 className={clsx('mobile:text-sm', 'desktop:text-lg')}>Historial</h1>
                        </div>
                    </button>
                    <div className='desktop:hidden flex flex-col items-center justify-center'>
                        <div className={clsx(
                                    'flex desktop:hidden items-center justify-center border-2 rounded-full mobile:h-10 mobile:w-10 border-cream-300 hover:shadow-lg'
                                    )}>
                                    <Link to='/'>
                                        <UilEstate className={clsx(
                                        'mobile:w-6 mobile:h-6 text-cream-300 desktop:hidden',
                                        )}/>
                                    </Link>
                            </div>
                            <h1 className={clsx('mobile:text-sm', 'desktop:text-lg')}>Home</h1>
                        </div>
                    <div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBarHome