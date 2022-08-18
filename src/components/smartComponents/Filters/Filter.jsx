import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

export default function Filter({ text, filtros }) {
  let navigate = useNavigate()
  let handleOnClick = (type) => {
    if(filtros?.some(e => e.genre === type)){
        navigate(`/categoria/${type}`)
      }else{
        navigate(`/released/${type}`)
      } 
  }
  return (
    <div className={clsx(
      'mobile:z-10 mobile:w-20 mobile:mt-4',
      'desktop:w-80')}>
      <details className={clsx(
        'mobile:rounded-lg mobile:open:bg-cream-300 mobile:open:shadow-lg mobile:p-1',
        `desktop:p-2`
        )}>
        <summary className={clsx(
          'mobile:text-xs mobile:font-semibold mobile:text-greyBlack-400',
          "desktop:p-1 desktop:text-sm"
        )}>
          {text}
        </summary>
        <div className={clsx(
          'mobile:grid mobile:grid-cols-2 mobile:gap-1 mobile:p-2 mobile:text-sm mobile:leading-6 mobile:desktop:border-t-2 mobile:border-greyBlack-100 mobile:text-greyBlack-400',
          "desktop:grid-cols-3 desktop:leading-6"
        )}>
          {
            filtros && filtros?.map((e, i) => <button className='mobile:w-4' key={i} id={e.genre || e} onClick={() => handleOnClick(e.genre || e)}>{e.genre || e}</button>)
          }
        </div>
      </details>
    </div>
  )
}

