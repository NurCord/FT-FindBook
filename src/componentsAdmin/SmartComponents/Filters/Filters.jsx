import React from 'react'

function Filters({text, filtros}) {

  let handleOnClick = (type) => {
    console.log(type)
  }

  return (
    <div className='absolute w-32'>
      <details className={`p-2 rounded-lg open:bg-cream-300 open:shadow-lg`}>
        <summary className="p-1 text-sm font-semibold select-none text-greyBlack-400">
          {text}
        </summary>
        <div className="grid grid-cols-1 gap-1 p-2 text-sm leading-6 border-t-2 text-greyBlack-400 border-greyBlack-100">
          {
            filtros && filtros.map((e, i) => <button key={i} id={e.genre || e} onClick={() => handleOnClick(e.genre || e)}>{e.genre || e}</button>)
          }
        </div>
      </details>
    </div>
  )
}

export default Filters