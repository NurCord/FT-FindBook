import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBookPanel } from '../../../redux/actions/actions';
import clsx from 'clsx'


export default function CardBook({ data }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const erase = (id) => {
    console.log('Libro eliminado');
    dispatch(deleteBookPanel(id))
  }
  const handleOnClick = (id)=>{
    navigate(`/paneluser/book/${id}`)
  }

  return (
    <div className={clsx(
      'mobile:h-60 mobile:w-40 mobile:rounded-sm',
      "max-w-sm duration-500 ease-in border rounded-lg shadow-md desktop:w-52 desktop:h-80 scale-70 bg-cream-300 border-cream-200 hover:scale-105"
    )}>
      <div className="grid content-center h-full grid-rows-2 justify-items-center">
        <img className={clsx(
                            'mobile:h-32 mobile:w-28 mobile:mt-1 mobile:self-center mobile:p-2',"desktop:h-48 col-span-1 desktop:mt-4 shadow-lg desktop:w-40")} src={data.image} alt={data.name} />
        <div className={clsx(
          'mobile:w-32 mobile:mt-2 mobile:h-auto',
          "grid desktop:w-48 grid-cols-1 mt-4 h-36"
        )}>
          <div className='grid content-center'>
            <h5 className={clsx(
              'mobile:max-h-5 mobile:text-sm',
              "overflow-hidden text-base italic desktop:font-medium desktop:tracking-tight text-left text-white desktop:min-text-sm desktop:min-max-h-5 desktop:mt-4 desktop:max-h-7"
            )}>{data.name}</h5>
          </div>
          <div className={clsx('mobile:py-3 mobile:gap-2',"grid grid-cols-2 gap-4 desktop:py-4")}>
            <button className='items-center text-sm font-medium text-center text-gray-800 duration-300 rounded-lg bg-cream-100 hover:bg-gray-800 hover:text-cream-100' onClick={() => handleOnClick(data.id)}>Editar</button>
            <button className='items-center text-sm font-medium text-center duration-300 bg-gray-800 rounded-lg i text-cream-200 hover:bg-cream-100 hover:text-gray-800 focus:ring-gray-800' onClick={() => erase(data.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}