import React from 'react'
import {useNavigate} from 'react-router-dom'

function CardUser({data}) {
  let navigate = useNavigate();

  let handleOnClick = (e) =>{
    navigate(`/layoutAdmin/book/${e}`)
  }

  return (
    <div className="w-full max-w-sm duration-500 ease-in border rounded-lg shadow-md scale-70 bg-cream-300 border-cream-200 hover:scale-105">
      <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mt-6 mb-3 rounded-full shadow-lg" src={data.image} alt={data.name}/>
          <h5 className="mb-1 text-xl font-medium text-white">{data.name}</h5>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-800 duration-300 rounded-lg bg-cream-100 hover:bg-gray-800 hover:text-cream-100' onClick={() => handleOnClick(data.id)}>Editar</button>
            <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center duration-300 bg-gray-800 rounded-lg text-cream-200 hover:bg-cream-100 hover:text-gray-800 focus:ring-gray-800'>Eliminar</button>
          </div>
      </div>
    </div>
  )
}

export default CardUser