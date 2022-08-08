import React from 'react'
import { useSelector } from 'react-redux'
import Filter from './Filter'

export default function Filters() {
  let state = useSelector(s => s.genre.genres)
  let year = useSelector(s => s.root.year)
  return (
    <div className='z-50 grid h-full grid-cols-2 pt-1 mx-40 justify-items-center'>
      <Filter text={'Genero'} filtros={state} />
      <Filter text={'Año'} filtros={year} />
    </div>
  )
}
