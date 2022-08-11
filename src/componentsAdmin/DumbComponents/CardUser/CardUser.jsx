import React from 'react'
import {useNavigate} from 'react-router-dom'

function CardUser({data}) {
  let navigate = useNavigate();

  let handleOnClick = (e) =>{
    navigate(`/layoutAdmin/user/${e}`)
  }

  return (
    <div className='grid grid-cols-1 grid-rows-2 rounded-sm w-52 h-80 bg-greyBlack-200'>
      <div className='flex items-center justify-center m-4'>
        <img alt='Not Found' 
        src={data.img}
        className='h-32 rounded-full'  
        />      
        </div>
      <div className='grid content-center grid-rows-2 m-4'>
        <button className='my-2 rounded-lg bg-cream-300' onClick={() => handleOnClick(data.id)}>Editar</button>
        <button className='my-2 bg-red-400 rounded-lg'>Eliminar</button>
      </div>
    </div>
  )
}

export default CardUser