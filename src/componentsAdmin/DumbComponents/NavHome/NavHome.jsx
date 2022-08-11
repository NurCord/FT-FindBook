import React from 'react'
import SearchBar from '../../SmartComponents/SearchBar/SearchBar'
import Filters from '../../SmartComponents/Filters/Filters'

function NavHome() {
  let filtroByOrden = ['acendente', 'descendente']
  return (
    <nav className='grid grid-cols-6 m-5'>
        <div className='relative grid h-full col-span-3'>
            <Filters text='Az-Za' filtros={filtroByOrden}/>
        </div>
        <div className='grid col-span-3 justify-items-center'>
            <SearchBar/>
        </div>
    </nav>
  )
}

export default NavHome