import React from 'react'
import Cards from './Cards'
import clsx from 'clsx'
export default function ContainCards({data}) {
  return (
    <div className={clsx(
      'mobile:grid-cols-3 mobile:p-4',
      'grid desktop:grid-cols-4 gap-4 ')}>
        {
            data && data.length > 0 ? data.map(e=> <Cards key={e.id} data={e}/>):<div className='flex mt-20 text-9xl uppercase text-center'>NO hay resultados</div>
        }
    </div>
  )
}
