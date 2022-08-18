import React from 'react'
import { useSelector } from 'react-redux'
import Filter from './Filter'
import clsx from 'clsx'
export default function Filters() {
  let state = useSelector(s => s.genre.genres)
  let year = useSelector(s => s.root.year)
  return (
    <div className={clsx(
      'mobile:z-50 mobile:h-full mobile:grid-cols-2 mobile:grid mobile:justify-items-center',
      'tablet:',
      'desktop:pt-1 desktop:mx-40')}>
      <Filter text={'Genero'} filtros={state} />
      <Filter text={'Año'} filtros={year} />
    </div>
  )
}
