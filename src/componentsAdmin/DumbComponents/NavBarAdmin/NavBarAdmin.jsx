import React from 'react'
import logo from '../../../assets/FindBookLogo.png'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilBooks } from '@iconscout/react-unicons'
import { UilSwatchbook } from '@iconscout/react-unicons'

function NavBarAdmin() {
  const handleOnClick = (e) => {
        if(e === 'user'){
          
        }else if(e === 'book'){
          
        }else{
          
        }
  }
  return (
    <div>
        <nav>
            <img src={logo} alt="Logo FindBook" className='p-4'/>
            <div className='grid grid-cols-1 grid-rows-3 gap-20 mt-6 justify-items-center'>
              <button onClick={() => handleOnClick('user')}>
                <div className='flex flex-col items-center justify-center'>
                  <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300'>
                    <UilUsersAlt className='w-10 h-10 text-cream-300'/>
                  </div>
                  <h1>Usuarios</h1>
                </div>
              </button>
              <button onClick={() => handleOnClick('book')}>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300'>
                    <UilBooks className='w-10 h-10 text-cream-300'/>
                    </div>
                    <h1>Libros</h1>
                </div>
              </button>
              <button onClick={() => handleOnClick('cupons')} >
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center border-2 rounded-full h-14 w-14 border-cream-300'>
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