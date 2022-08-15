/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import img2 from '../../../assets/fondoAdmin.jpg'
import Swipers from '../../SmartComponents/Swiper/Swiper';
import { UilEditAlt } from '@iconscout/react-unicons'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, putUser, userRole } from '../../../redux/actions/actions';

const schema = yup.object().shape({
  name: yup.string().max(100),
  surname: yup.string().max(100),
  username: yup.string().max(100),
})

export default function AdminUser() {
  const { id } = useParams()
  const [state, setState] = useState('hidden')
  const user = useSelector(s => s.admin.userDetail);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(getUser(id, window.localStorage.getItem('token')))
  }, [])

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
    return Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (data.name === '' && data.surname === '' && data.username === '') {
          setState('hidden')
          return Swal.fire(
            'No se encontraron cambios!',
            'El Usuario no fue modificado',
            'warning'
          )
        }
        if (data.name === '') delete data.name
        if (data.surname === '') delete data.surname
        if (data.username === '') delete data.username
        setState('hidden')
        dispatch(putUser(user.email, data))
        Swal.fire(
          'Confirmar!',
          `El Usuario fue modificado`,
          'success'
        ).then(() => window.location.reload())
      }
    })
  }

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
                  placeholder={`${user.name}...`}
                  {...register("name")}
                />
              </div>
              <div className='grid content-center grid-cols-3'>
                <label className='col-span-1 font-semibold place-self-center'>Apellido:</label>
                <input
                  className='col-span-2 m-4 rounded-md bg-cream-100'
                  key='surname'
                  type='text'
                  name='surname'
                  placeholder={`${user.surname}...`}
                  {...register("surname")}
                />
              </div>
              <div className='grid content-center grid-cols-3'>
                <label className='col-span-1 ml-6 font-semibold place-self-center'>Nombre de usuario:</label>
                <input
                  className='col-span-2 m-4 rounded-md bg-cream-100'
                  key='nameUser'
                  type='text'
                  name='nameUser'
                  placeholder={`${user.nameUser}...`}
                  {...register("username")}
                />
              </div>
              <button type="submit" className='px-4 py-2 m-auto font-semibold duration-200 rounded-md bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'>Confirmar</button>
            </form>
          </div>
        </div>


        <div style={{ backgroundImage: `url(${img2})` }} className='relative w-full h-full col-span-1 bg-cover'>
          <img src={user?.img} alt='Not found' className='absolute duration-500 ease-in rounded-full top-48 left-16 scale-70 hover:scale-105' />
        </div>
        <div className='grid content-center w-full col-span-2 grid-rows-2 py-6 justify-items-center bg-zinc-300'>
          <div className='grid self-center grid-rows-4 row-span-1 gap-4 w-96'>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Nombre: </h1>
              <h1>{user?.name}</h1>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Apellido: </h1>
              <h2>{user?.surname}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Nombre de usuario: </h1>
              <h2>{user?.nameUser}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h1 className='font-semibold'>Email: </h1>
              <h2>{user?.email}</h2>
            </div>
          </div>
          <div className='self-center h-full row-span-1'>
            <Swipers />
          </div>
        </div>
      </div>
    </div>
  )
}
