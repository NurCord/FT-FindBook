import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import img2 from '../../../assets/fondoAdmin.jpg'
import { UilEditAlt } from '@iconscout/react-unicons'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().max(100).strict(),
  surname: yup.string().max(100).strict(),
  username: yup.string().max(100).strict(),
})

export default function AdminBooK() {
  let { id } = useParams()
  let [state, setState] = useState('hidden')

  /* let navigate = useNavigate()
  let dispatch = useDispatch() */

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  let handleHidden = () => {
    setState(state === 'hidden' ? '' : 'hidden')
    console.log(state);
  }

  const handleOnClick = () => {
    window.history.back()
  }

  function onSubmit(data) {
    console.log(data)
    //dispatch()
    //navigate('') 
  }

  const allBooks = useSelector(s => s.root.allBooks)

  const Book = allBooks.find(e => e.id === parseInt(id))

  return (
    <div className='grid w-full h-full p-8 bg-cream-200'>
      <div className='grid grid-cols-3'>
        <div className="absolute z-10 right-8">
          <button onClick={handleOnClick} className="grid w-12 h-12">
            <UilArrowCircleLeft className="w-9 h-9 place-self-center text-greyBlack-400" />
          </button>
          <button onClick={() => handleHidden()} className="grid w-12 h-12">
            <UilEditAlt className="w-8 h-8 duration-200 place-self-center text-greyBlack-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" />
          </button>
        </div>

        <div className={`${state} absolute flex left-1/2 top-1/3`}>
          <div className={`z-10 bg-cream-300 w-96 h-80 rounded-md`}>
            <form onSubmit={handleSubmit(onSubmit)} className='grid h-full grid-cols-1 grid-rows-4 gap-4'>
              <div className='grid content-center grid-cols-3'>
                <label className='col-span-1 font-semibold place-self-center'>Nombre:</label>
                <input
                  className='col-span-2 m-4 rounded-md bg-cream-100'
                  key='name'
                  type='text'
                  name='name'
                  placeholder={`${Book.name}...`}
                  {...register("name")}
                  isRigth={errors.name ? errors.name : false}
                />
              </div>
              <div className='grid content-center grid-cols-3'>
                <label className='col-span-1 font-semibold place-self-center'>Apellido:</label>
                <input
                  className='col-span-2 m-4 rounded-md bg-cream-100'
                  key='surname'
                  type='text'
                  name='surname'
                  placeholder={`${Book.author}...`}
                  {...register("surname")}
                  isRigth={errors.surname ? errors.surname : false}
                />
              </div>
              <div className='grid content-center grid-cols-3'>
                <label className='col-span-1 ml-6 font-semibold place-self-center'>Nombre de usuario:</label>
                <input
                  className='col-span-2 m-4 rounded-md bg-cream-100'
                  key='nameUser'
                  type='text'
                  name='nameUser'
                  placeholder={`${Book.category}...`}
                  {...register("username")}
                  isRigth={errors.nameUser ? errors.nameUser : false}
                />
              </div>
              <button type="submit" className='px-4 py-2 m-auto font-semibold duration-200 rounded-md bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'>Confirmar</button>
            </form>
          </div>
        </div>


        <div style={{ backgroundImage: `url(${img2})` }} className='relative w-full h-full col-span-1 bg-cover'>
          <img src={Book?.image} alt='Not found' className='absolute duration-500 ease-in rounded-full top-48 left-16 scale-70 hover:scale-105' />
        </div>
        <div className='grid content-center w-full col-span-2 grid-rows-2 py-6 justify-items-center bg-zinc-300'>
          <div className='grid self-center grid-rows-4 row-span-1 gap-4 w-96'>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Nombre: </h1>
              <h1>{Book?.name}</h1>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Autor: </h1>
              <h2>{Book?.author}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Categoria: </h1>
              <h2>{Book?.category}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Paginas: </h1>
              <h2>{Book?.pages}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Editorial: </h1>
              <h2>{Book?.publisher}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Descripción: </h1>
              <h2>{Book?.description}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Rating: </h1>
              <h2>{Book?.rating}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Precio: </h1>
              <h2>{Book?.price}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Fecha De Publicación: </h1>
              <h2>{Book?.released}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Lenguaje: </h1>
              <h2>{Book?.language}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Generos: </h1>
              {Book?.generos?.map(g => { return <h2>{g.genre}</h2> })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
