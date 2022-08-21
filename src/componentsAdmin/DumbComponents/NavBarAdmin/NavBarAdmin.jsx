import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/FindBookLogo.png'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilBooks } from '@iconscout/react-unicons'
import { UilSwatchbook } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilHistory } from '@iconscout/react-unicons'
import clsx from 'clsx'

function NavBarAdmin({SetHomeAdmin}) {
  const handleOnClick = (value) => {
        if(value === 'Users'){
          SetHomeAdmin(value)
          return 
        }else if(value === 'User') {
          SetHomeAdmin(value)
          return
        }else if(value === 'Books'){
          SetHomeAdmin(value)
          return 
        }else if(value === 'Cupones'){
          SetHomeAdmin(value)
          return 
        }else {
          SetHomeAdmin(value)
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
          'grid desktop:grid-cols-1 desktop:grid-rows-3 desktop:gap-20 desktop:my-6 desktop:justify-items-center'
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
              <button onClick={() => handleOnClick('Users')}>
              <div className='flex flex-col items-center justify-center'>
                            <div className={clsx(
                                'mobile:h-10 mobile:w-10',
                                'flex items-center justify-center border-2 rounded-full desktop:h-14 desktop:w-14 border-cream-300 hover:shadow-lg'
                                )}>
                    <UilUsersAlt className={clsx(
                                    'mobile:w-6 mobile:h-6',
                                    'desktop:w-10 desktop:h-10 text-cream-300'
                                    )}/>
                  </div>
                  <h1 className={clsx('mobile:text-sm', 'desktop:text-lg')}>Usuarios</h1>
                </div>
              </button>
              <button onClick={() => handleOnClick('Books')}>
              <div className='flex flex-col items-center justify-center'>
                            <div className={clsx(
                                'mobile:h-10 mobile:w-10',
                                'flex items-center justify-center border-2 rounded-full desktop:h-14 desktop:w-14 border-cream-300 hover:shadow-lg'
                                )}>
                      <UilBooks className={clsx(
                                    'mobile:w-6 mobile:h-6',
                                    'desktop:w-10 desktop:h-10 text-cream-300'
                                    )}/>
                    </div>
                    <h1 className={clsx('mobile:text-sm', 'desktop:text-lg')}>Libros</h1>
                </div>
              </button>
              {/* <button onClick={() => handleOnClick('Cupones')} >
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                      <UilSwatchbook className='w-10 h-10 text-cream-300'/>
                    </div>
                    <h1>Cupones</h1>
                </div>
              </button> */}
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
            </div>
        </nav>
    </div>
  )
}

export default NavBarAdmin