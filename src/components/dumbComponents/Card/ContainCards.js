import React from 'react'
import Cards from './Cards'
import clsx from 'clsx'
export default function ContainCards({data}) {
  return (
    <div className={clsx(
      'mobile:grid-cols-3 mobile:p-4',
      'grid desktop:grid-cols-4 gap-4 ')}>
        {
            data?.length > 0 && data.map(e=> <Cards key={e.id} data={e}/>)
        }
    </div>
  )
}
