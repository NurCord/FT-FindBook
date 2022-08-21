import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteBook } from '../../../redux/actions/actions';
import clsx from 'clsx'

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
    <div className={clsx(
      'mobile:h-72 mobile:w-44',
      "max-w-sm duration-500 ease-in border rounded-lg shadow-md desktop:w-60 desktop:h-96 scale-70 bg-cream-300 border-cream-200 hover:scale-105"
      )}>
      <div className="grid content-center h-full grid-rows-2 justify-items-center">
        <img className={clsx(
          'mobile:h-36 mobile:w-32',
          "desktop:h-48 col-span-1 mt-4 rounded-sm shadow-lg desktop:w-44")} src={data.image} alt={data.name} />
        <div className={clsx(
          'mobile:w-32 mobile:mt-0',
          "desktop:grid desktop:w-48 desktop:grid-cols-1 desktop:mt-4 desktop:h-36")}>
          <div className={clsx(
            'mobile:h-6 mobile:mt-8 mobile:mb-6',
            'grid content-center desktop:mt-0 desktop:mb-0 desktop:h-6')}>
            <h5 className="overflow-hidden text-base italic font-medium tracking-tight text-left text-white min-text-sm min-max-h-5 max-h-7">{data.name}</h5>
          </div>
          <div className={clsx(
            'mobile:gap-2 mobile:py-0 mobile:w-32 mobile:h-10',
            "grid grid-cols-2 gap-4 py-4")}>
            <button className='items-center text-sm font-medium text-center text-gray-800 duration-300 rounded-lg bg-cream-100 hover:bg-gray-800 hover:text-cream-100' onClick={() => handleOnClick(data.id)}>Editar</button>
            <button className='items-center text-sm font-medium text-center duration-300 bg-gray-800 rounded-lg text-cream-200 hover:bg-cream-100 hover:text-gray-800 focus:ring-gray-800' onClick={() => erase(data.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardUser