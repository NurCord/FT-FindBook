import React from 'react'
import Cards from './Cards'

export default function ContainCards({data}) {
  return (
    <div className='grid grid-cols-4 gap-4 p-10'>
        {
            data && data.length > 0 && data.map(e=> <Cards key={e.id} data={e}/>)
        }
    </div>
  )
}
