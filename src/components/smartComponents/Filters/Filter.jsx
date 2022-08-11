import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className='z-10 w-80'>
      <details className={`p-2 rounded-lg open:bg-cream-300 open:shadow-lg`}>
        <summary className="p-1 text-sm font-semibold select-none text-greyBlack-400">
          {text}
        </summary>
        <div className="grid grid-cols-3 gap-1 p-2 text-sm leading-6 border-t-2 text-greyBlack-400 border-greyBlack-100">
          {
            filtros && filtros?.map((e, i) => <button key={i} id={e.genre || e} onClick={() => handleOnClick(e.genre || e)}>{e.genre || e}</button>)
          }
        </div>
      </details>
    </div>
  )
}

