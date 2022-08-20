import React from 'react'
import { useSelector } from 'react-redux'
import Filter from './Filter'
import clsx from 'clsx'
export default function Filters() {
  let state = useSelector(s => s.genre.genres)
  let year = useSelector(s => s.root.year)
  return (
    <div className={clsx(
      'mobile:z-50 mobile:h-full mobile:flex',
      'tablet:',
      'desktop:pt-1 desktop:mx-56 desktop:grid desktop:grid-cols-2 desktop:gap-4')}>
      <Filter text={'Genero'} filtros={state} />
      <div className={clsx(
        'desktop:relative',
        'mobile:absolute mobile:z-10 mobile:right-0')}>
        <Filter text={'Año'} filtros={year} />
      </div>
    </div>
  )
}
