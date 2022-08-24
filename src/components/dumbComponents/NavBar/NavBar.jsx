import React, { useState } from 'react'
import SearchNavBar from '../../smartComponents/SearchNavBar/SearchNavBar'
import Logo from '../../../assets/FindBookLogo.png'
import Filters from '../../smartComponents/Filters/Filters'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import NavBarRes from './NavBarRes'
import { UilFidgetSpinner } from '@iconscout/react-unicons'
import { UilEstate } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { useEffect } from 'react'
import { userCart } from '../../../redux/actions/actionsShop'
import PrimarySearchAppBar from './NavBarDes'
export default function NavBar() {
  const role = useSelector(state => state.root.role)
  const cartBooks = useSelector(state => state.shop.cartBooks)
  let [state, setState] = useState('hidden')
  let [state2, setState2] = useState('hidden')
  let handleHidden = (value) => {
    if(value === 'search')setState(state === 'hidden' ? '' : 'hidden')
    if(value === 'menu')setState2(state2 === 'hidden' ? '' : 'hidden')
  }

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(userCart())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartBooks,dispatch])
  

  return (
    <>
      <div className={clsx(
        'mobile:h-14 mobile:grid mobile:grid-cols-5 mobile:content-center mobile:justify-items-center mobile:w-screen mobile:items-center mobile:bg-cream-100',
        'tablet:',
        'desktop:w-full desktop:flex desktop:h-20 desktop:bg-cream-100',
        )}>
          <div className={clsx(
            'mobile:col-span-1',
            'tablet:',
            'desktop:hidden')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-3 rounded-full w-7 h-7" onClick={()=>handleHidden('search')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className={`${state} duration-500 absolute flex top-16 left-0 w-screen z-50 h-10`}>
              <SearchNavBar handleHidden={handleHidden}/>
            </div>
          </div>
          <div className={clsx(
            'mobile:col-span-1 mobile:col-start-4',
            'tablet:',
            'desktop:hidden')}>
              <Link to='/'>
                <UilEstate className='w-8 h-8'/>
              </Link>
          </div>
          <div className={clsx(
            'mobile:col-span-1 mobile:col-start-5',
            'tablet:',
            'desktop:hidden')}>
            <UilFidgetSpinner className='w-8 h-8' onClick={()=>handleHidden('menu')}/>
            <div className={`${state2} absolute z-50 top-0 right-0 w-full`}>
              <NavBarRes handleHidden={handleHidden}/>
            </div>
          </div>
        <div className={clsx(
          'mobile:hidden',
          'tablet:',
          'desktop:grid desktop:grid-cols-7 desktop:h-full desktop:items-center desktop:justify-items-center'
          )}>
          <Link to={'/'}>
            <img src={Logo} alt='Not found' className={clsx(
              'mobile:inline-flex',
              'tablet:',
              'desktop:h-16 desktop:col-start-1 desktop:col-end-2'
            )} />
          </Link>
          <div className={clsx(
            'mobile:',
            'tablet:',
            'desktop:col-start-2 desktop:col-end-5')}>
            <SearchNavBar setState={()=>setState()}/>
          </div>
          <div className={clsx('mobile: inline-flex',`${role === 'invalid' ? 'col-start-7' : role === 'user' ? 'grid grid-cols-5 justify-items-center' : 'grid grid-cols-5 justify-items-center'} col-start-5 col-end-8 gap-2`)}>
            {
              role !== "invalid" ?
              <div className='col-start-2'>
                <PrimarySearchAppBar/>
              </div>
                : null
            }

            {role === 'invalid' ? null : 
            <div className='relative flex items-center col-start-3'>
              { cartBooks?.length > 0 ?
                    <span className="flex h-3 absolute -right-5 top-0">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cream-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cream-300"></span>
                  </span> : ''
              }
              <div className={clsx('flex')}>
                <svg xmlns="http://www.w3.org/2000/svg" className={clsx("self-center w-6 h-6")} fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <div className={clsx('self-center')}>
                  <Link to={'/shop'}>
                    <h1 className={clsx('duration-700 border-b-2 border-cream-100 hover:border-cream-300')}>Carrito</h1>
                  </Link>
                </div>
              </div>
            </div>}
            {
              role === "user" ?
                <div className={clsx('flex col-start-4')}>
                  <div className='flex items-center justify-center'>
                    <UilUser className='w-5 h-5'/>
                  </div>
                  <div className={clsx('self-center')}>
                    <Link to={'/panelUser'}>
                      <h1 className={clsx('duration-700 border-b-2 border-cream-100 hover:border-cream-300')}>Usuario</h1>
                    </Link>
                  </div>
                </div> : null
            }

            {role === 'admin' ? <div className={clsx('flex col-start-4')}>
              <svg className={clsx("self-center w-6 h-6")} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 488.1 488.1">
                <g>
                  <g>
                    <g>
                      <path d="M474.85,452.5c-20.8-17.1-43.2-28.4-47.8-30.7c-0.5-0.3-0.8-0.8-0.8-1.3v-32.4c4.1-2.7,6.8-7.3,6.8-12.6v-33.6
                      c0-16.7-13.5-30.2-30.2-30.2h-3.6h-3.6c-16.7,0-30.2,13.5-30.2,30.2v33.6c0,5.3,2.7,9.9,6.8,12.6v32.4c0,0.6-0.3,1.1-0.8,1.3
                      c-4.6,2.2-27,13.6-47.8,30.7c-3.8,3.1-5.9,7.7-5.9,12.6v23h81.6h81.6v-23C480.75,460.2,478.65,455.6,474.85,452.5z"/>
                    </g>
                    <g>
                      <path d="M323.55,399.9c3.6,0,7.1-1.8,9.2-5c3.3-5.1,1.9-11.9-3.2-15.2l-74.7-48.5v-89.1c0-6.1-4.9-11-11-11s-11,4.9-11,11v89.1
                      l-74.7,48.5c-5.1,3.3-6.6,10.1-3.2,15.2c2.1,3.2,5.6,5,9.2,5c2.1,0,4.1-0.6,6-1.8l73.8-47.8l73.8,47.8
                      C319.45,399.3,321.55,399.9,323.55,399.9z"/>
                    </g>
                    <g>
                      <path d="M239.55,168c-16.5-23,1.2-24.1,4.3-24.1l0,0l0,0c3.1,0,20.8,1.1,4.3,24.1l8.1,37.3h82.5v-26.8c0-5.7-2.5-11-6.9-14.6
                      c-24.2-19.9-50.3-33.1-55.6-35.7c-0.6-0.3-1-0.9-1-1.6V88.9c4.7-3.2,7.9-8.5,7.9-14.7v-39c0-19.4-15.7-35.2-35.2-35.2h-4.1h-4.2
                      c-19.4,0-35.2,15.7-35.2,35.2v39c0,6.1,3.1,11.5,7.9,14.7v37.7c0,0.7-0.4,1.3-1,1.6c-5.3,2.6-31.4,15.8-55.6,35.7
                      c-4.4,3.6-6.9,9-6.9,14.6v26.8h82.5L239.55,168z"/>
                    </g>
                    <g>
                      <path d="M164.25,452.5c-20.8-17.1-43.2-28.4-47.8-30.7c-0.5-0.3-0.8-0.8-0.8-1.3v-32.4c4.1-2.7,6.8-7.3,6.8-12.6v-33.6
                      c0-16.7-13.5-30.2-30.2-30.2h-3.6h-3.6c-16.7,0-30.2,13.5-30.2,30.2v33.6c0,5.3,2.7,9.9,6.8,12.6v32.4c0,0.6-0.3,1.1-0.8,1.3
                      c-4.6,2.2-27,13.6-47.8,30.7c-3.8,3.1-5.9,7.7-5.9,12.6v23h81.6h81.6v-23C170.15,460.2,168.05,455.6,164.25,452.5z"/>
                    </g>
                  </g>
                </g>
              </svg>
              <div className={clsx('self-center')}>
                <Link to={'/layoutAdmin'}>
                  <h1 className={clsx('duration-700 border-b-2 border-cream-100 hover:border-cream-300')}>Admin</h1>
                </Link>
              </div>
            </div> : null}

            {role === 'invalid' ? <div className={clsx('flex col-start-5')}>
              <svg xmlns="http://www.w3.org/2000/svg" className={clsx("self-center w-6 h-6")} fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
                <Link to={'/login'}>
                  <h1 className={clsx('duration-700 border-b-2 border-cream-100 hover:border-cream-300')}>Ingresar</h1>
                </Link>
            </div> : <div onClick={() => {
              window.localStorage.removeItem('token');
              window.location.reload()
            }} className={clsx('flex col-start-5')}>
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
              <div className={clsx('self-center')}>
                <h1 className={clsx('duration-700 border-b-2 cursor-pointer border-cream-100 hover:border-cream-300')}>Cerrar sesión</h1>
              </div>  
              </div>}
          </div>
        </div>
      </div>
      <div className={clsx('relative h-14 bg-cream-200')}>
        <Filters />
      </div>
    </>
  )
}