import React from 'react'
import SearchNavBar from '../../smartComponents/SearchNavBar/SearchNavBar'
import Logo from '../../../assets/FindBookLogo.png'
import Filters from '../../smartComponents/Filters/Filters'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
    <div className='w-full h-20 bg-cream-100'>
      <div className={'grid grid-cols-7 h-full items-center justify-items-center'}>
        <Link to={'/'}>
          <img src={Logo} alt='Not found' className={'h-16 col-start-1 col-end-2'}/>
        </Link>
        <div className='col-start-2 col-end-5'>
          <SearchNavBar/>
        </div>
        <div className='grid grid-cols-4 col-start-5 col-end-8 gap-5 justify-items-center'>
              <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>  
                <Link to={'/contacto'}>
                  <h1 className='duration-700 border-b-2 border-cream-100 hover:border-cream-300'>Contactanos</h1>
                </Link>         
              </div>

              <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>  
                <Link to={'/postbook'}>
                  <h1 className='duration-700 border-b-2 border-cream-100 hover:border-cream-300'>Publicar</h1>
                </Link>         
              </div>

              <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>   
                <Link to={'/loggin'}>
                  <h1 className='duration-700 border-b-2 border-cream-100 hover:border-cream-300'>Ingresar</h1>
                </Link>         
              </div>

              <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"  stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <Link to={'/shop'}>
                  <h1 className='duration-700 border-b-2 border-cream-100 hover:border-cream-300'>Comprar</h1>
                </Link>
              </div>
        </div>
      </div>
    </div>
      <div className='relative h-14 bg-cream-200'>
        <Filters/>
      </div>
    </>
  )
}
