import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

export default function Filter({ text, filtros }) {
  let navigate = useNavigate()
  let rigth = text === 'Año' ? 'mobile:text-end' : 'mobile:text-start'; 
  let rigth2 = text === 'Genero' ? 'mobile:open:w-screen' : 'mobile:open:w-screen'
  let handleOnClick = (type) => {
    if(filtros?.some(e => e.genre === type)){
      navigate(`/categoria/${type}`)
    }else{
      navigate(`/released/${type}`)
    } 
  }
  return (
    <div className={clsx(
      'mobile:z-20 mobile:w-auto mobile:mt-4',
      'desktop:w-full desktop:mt-0')}>
      <details id='abrir' className={clsx(
        `mobile:rounded-lg mobile:open:bg-cream-100 mobile:open:duration-500 ${rigth2} mobile:open:shadow-lg mobile:p-1`,
        `desktop:p-2 desktop:open:w-full`
        )}>
        <summary className={clsx(
          `mobile:text-xs mobile:font-semibold mobile:text-greyBlack-400 ${rigth}`,
          "desktop:p-1 desktop:text-sm desktop:text-start"
        )}>
          {text}
        </summary>
        <div className={clsx(
          'mobile:grid mobile:grid-cols-2 mobile:gap-1 mobile:p-2 mobile:text-sm mobile:desktop:border-t-2 mobile:border-cream-300 mobile:text-greyBlack-400 mobile:justify-items-start',
          "desktop:grid-cols-3 desktop:leading-6"
        )}>
          {
            filtros && filtros?.map((e, i) => <button className={clsx('desktop:overflow-hidden desktop:max-h-6 desktop:hover:border-cream-300 desktop:rounded-md desktop:border-cream-100 desktop:hover:bg-cream-300 desktop:duration-500 desktop:w-full','border-b-[0.2px] mobile:hover:border-cream-200 mobile:border-black text-start mobile:w-32')} key={i} id={e.genre || e} onClick={() =>handleOnClick(e.genre || e)}>{e.genre || e}</button>)
          }
        </div>
      </details>
    </div>
  )
}

