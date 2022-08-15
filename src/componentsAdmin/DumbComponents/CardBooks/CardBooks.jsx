import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteBook } from '../../../redux/actions/actions';

function CardUser({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleOnClick = (e) => {
    navigate(`/layoutAdmin/book/${e}`)
  }

  const erase = (id) => {
    dispatch(deleteBook(id))
  }

  return (
    <div className="max-w-sm duration-500 ease-in border rounded-lg shadow-md w-60 h-96 scale-70 bg-cream-300 border-cream-200 hover:scale-105">
      <div className="grid content-center h-full grid-rows-2 justify-items-center">
        <img className="h-48 col-span-1 mt-4 rounded-sm shadow-lg w-44" src={data.image} alt={data.name} />
        <div className="grid w-48 grid-cols-1 mt-4 h-36">
          <div className='grid content-center'>
            <h5 className="overflow-hidden text-base italic font-medium tracking-tight text-left text-white min-text-sm min-max-h-5 max-h-7">{data.name}</h5>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <button className='items-center text-sm font-medium text-center text-gray-800 duration-300 rounded-lg bg-cream-100 hover:bg-gray-800 hover:text-cream-100' onClick={() => handleOnClick(data.id)}>Editar</button>
            <button className='items-center text-sm font-medium text-center duration-300 bg-gray-800 rounded-lg i text-cream-200 hover:bg-cream-100 hover:text-gray-800 focus:ring-gray-800' onClick={() => erase(data.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardUser