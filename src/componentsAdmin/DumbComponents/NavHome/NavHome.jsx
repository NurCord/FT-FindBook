import React from 'react'
import SearchBar from '../../SmartComponents/SearchBar/SearchBar'
//import Filters from '../../SmartComponents/Filters/Filters'
import clsx from 'clsx'

function NavHome() {
  //let filtroByOrden = ['acendente', 'descendente']
  return (
    <nav className={clsx(
      'mobile:grid-rows-1',
      'grid desktop:grid-cols-6 m-5')}>
      {/* <div className='relative grid h-full col-span-3'>
        <Filters text='Az-Za' filtros={filtroByOrden} />
      </div> */}
      <div className={clsx(
      'grid desktop:col-span-3 desktop:col-start-2 justify-items-center'
      )}>
        <SearchBar />
      </div>
    </nav>
  )
}

export default NavHome