import React from 'react'
import { UilFidgetSpinner } from '@iconscout/react-unicons'
import clsx from 'clsx'
import { UilUser } from '@iconscout/react-unicons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function NavBarRes({handleHidden}) {
    const value = useSelector(state => state.root.role)
    return (
    <div className='grid grid-cols-5 bg-cream-300 h-14'>
        {
            value === 'user' || value === 'admin' ? 
                <div className='grid grid-cols-1 col-start-1 content-center justify-items-center'>
                    <Link to='/postbook'>
                        <svg xmlns="http://www.w3.org/2000/svg" className={clsx("self-center w-6 h-6")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                <h1 className='text-sm'>Publicar</h1>
                </div>
            : ''
        }
        {
            value === 'user' || value === 'admin' ? 
                <div className='grid grid-cols-1 col-start-2 content-center justify-items-center'>
                    <Link to='/shop'>
                        <svg xmlns="http://www.w3.org/2000/svg" className={clsx("self-center w-6 h-6")} fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </Link>
                <h1 className='text-sm'>Carrito</h1>
                </div> 
            : ''
        }
        {
            value === 'user' ? 
                <div className='grid grid-cols-1 col-start-3 content-center justify-items-center'>
                    <Link to='/panelUser'>
                        <UilUser className='w-6 h-6' />
                    </Link>
                    <h1 className='text-sm'>Usuario</h1>
                </div> 
            : ''
        }
        {
            value === 'admin' ? 
                <div className='grid grid-cols-1 col-start-3 content-center justify-items-center'>
                    <Link to='/layoutAdmin'>
                        <UilUser className='w-6 h-6' />
                    </Link>
                    <h1 className='text-sm'>Admin</h1>
                </div> 
            : ''
        }
        {
            value === 'user' || value === 'admin' ? 
            
            <div className='grid grid-cols-1 col-start-4 content-center justify-items-center' onClick={() => {
                window.localStorage.removeItem('token');
                window.location.reload()
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className={clsx("self-center w-6 h-6")} fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.109,5.454c-0.242-0.289-0.673-0.327-0.962-0.086l-1.894,1.591l-0.871-2.158
                    c-0.031-0.081-0.078-0.149-0.132-0.209c-0.178-0.396-0.487-0.736-0.913-0.933c-0.185-0.084-0.376-0.129-0.567-0.151
                    c-0.042-0.022-0.08-0.051-0.128-0.066L8.309,2.513C8.122,2.462,7.934,2.495,7.78,2.585C7.597,2.647,7.44,2.78,7.365,2.973
                    L6.11,6.2C5.974,6.551,6.148,6.947,6.5,7.085c0.35,0.136,0.747-0.039,0.884-0.391l1.06-2.725l1.518,0.422
                    c-0.037,0.06-0.077,0.116-0.107,0.18L7.909,8.789C7.881,8.851,7.866,8.914,7.846,8.978l-2.365,3.965l-3.958,1.324
                    c-0.448,0.335-0.543,0.966-0.212,1.414c0.333,0.449,0.966,0.544,1.413,0.213l4.05-1.395c0.124-0.09,0.214-0.208,0.282-0.335
                    C7.107,14.11,7.165,14.067,7.204,14l1.41-2.364l2.503,2.133l-2.678,3.018c-0.369,0.416-0.332,1.057,0.086,1.425
                    c0.417,0.371,1.056,0.332,1.427-0.086l3.342-3.765c0.104-0.116,0.166-0.25,0.208-0.39c0.025-0.076,0.025-0.155,0.031-0.234
                    c0-0.04,0.015-0.076,0.012-0.113c-0.009-0.276-0.121-0.544-0.347-0.735l-2.303-1.964c0.166-0.158,0.307-0.346,0.409-0.567
                    l1.492-3.231L13.274,8.4c0.02,0.113,0.058,0.224,0.138,0.317c0.072,0.086,0.164,0.143,0.262,0.183
                    c0.01,0.005,0.022,0.006,0.034,0.009c0.062,0.022,0.125,0.043,0.19,0.046c0.077,0.007,0.155-0.003,0.234-0.025
                    c0.002-0.001,0.003-0.001,0.003-0.001c0.021-0.005,0.042-0.001,0.063-0.01c0.111-0.042,0.196-0.113,0.269-0.196l2.718-2.307
                    C17.474,6.173,17.352,5.743,17.109,5.454z" />
                </svg>
                <h1 className='text-sm'>Cerrar</h1>
            </div> : ''
        }
        {
            value === 'invalid' ? 
                <div className='grid grid-cols-1 col-start-4 content-center justify-items-center'>
                    <Link to={'/login'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={clsx("self-center w-6 h-6")} fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </Link>
                    <h1 className='text-sm'>Iniciar</h1>
                </div> 
            : ''
        }
        <div className='grid grid-cols-1 col-start-5 content-center justify-items-center'>
            <UilFidgetSpinner className='w-8 h-8' onClick={()=>handleHidden('menu')}/>
        </div>
    </div>
)}
