import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/FindBookLogo.png'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilBooks } from '@iconscout/react-unicons'
import { UilSwatchbook } from '@iconscout/react-unicons'

function NavBarAdmin({SetHomeAdmin}) {
  const handleOnClick = (value) => {
        if(value === 'Users'){
          SetHomeAdmin(value)
          return 
        }else if(value === 'Books'){
          SetHomeAdmin(value)
          return 
        }else{
          SetHomeAdmin(value)
          return 
        }
  }
  return (
    <div>
        <nav>
          <Link to='/'>
            <img src={logo} alt="Logo FindBook" className='p-4'/>
          </Link>
            <div className='grid grid-cols-1 grid-rows-3 gap-20 mt-6 justify-items-center'>
              <button onClick={() => handleOnClick('Users')}>
                <div className='flex flex-col items-center justify-center'>
                  <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                    <UilUsersAlt className='w-10 h-10 text-cream-300'/>
                  </div>
                  <h1>Usuarios</h1>
                </div>
              </button>
              <button onClick={() => handleOnClick('Books')}>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                      <UilBooks className='w-10 h-10 text-cream-300'/>
                    </div>
                    <h1>Libros</h1>
                </div>
              </button>
              <button onClick={() => handleOnClick('Cupons')} >
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300 hover:shadow-lg'>
                      <UilSwatchbook className='w-10 h-10 text-cream-300'/>
                    </div>
                    <h1>Cupones</h1>
                </div>
              </button>
            </div>
        </nav>
    </div>
  )
}

export default NavBarAdmin