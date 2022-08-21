/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
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
import clsx from 'clsx';

const schema = yup.object().shape({
  name: yup.string().max(100),
  surname: yup.string().max(100),
  username: yup.string().max(100),
  emailput: yup.string().max(100),
  password: yup.string().max(100),
})

export default function AdminUser() {
  const [state, setState] = useState('hidden')
  const user = useSelector(s => s.admin.userDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(getUser(window.localStorage.getItem('token')))
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  let handleHidden = () => {
    setState(state === 'hidden' ? '' : 'hidden')
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
        if (data.name === '' && data.surname === '' && data.username === ''  && data.emailput === ''  && data.password === '') {
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
        if (data.emailput === '') delete data.emailput
        if (data.password === '') delete data.password
        setState('hidden')
        dispatch(putUser(user?.email, data))
        Swal.fire(
          'Confirmar!',
          `El Usuario fue modificado`,
          'success'
        ).then(() => window.location.reload())
      }
    })
  }

  return (
    <div className={clsx(
      'desktop:grid desktop:w-full desktop:h-full desktop:p-8 desktop:bg-cream-200')}>
      <div className={clsx(
          'mobile:grid mobile:grid-cols-1',
          'desktop:grid desktop:grid-cols-3')}>
        <div className="absolute z-10 right-8">
          <button onClick={handleOnClick} className="grid w-12 h-12">
            <UilArrowCircleLeft className="w-9 h-9 place-self-center text-greyBlack-400" />
          </button>
          <button onClick={() => handleHidden()} className="grid w-12 h-12">
            <UilEditAlt className="w-8 h-8 duration-200 place-self-center text-greyBlack-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" />
          </button>
        </div>
        <div style={{ backgroundImage: `url(${img2})` }} className={clsx(
            'mobile:relative mobile:grid mobile:justify-items-center mobile:content-center mobile:h-36 mobile:bg-cover',
            'desktop:relative desktop:w-full desktop:h-full desktop:col-span-1 desktop:bg-cover')}>
            <img src={user?.url} alt='Not found' className={clsx(
              'mobile:rounded-full',
              'desktop:absolute desktop:duration-500 desktop:ease-in desktop:rounded-full1 desktop:top-48 desktop:left-25 desktop:scale-70 desktop:scale-105')} />
          </div>

          <div className={clsx(
            'mobile:top-44',
            `absolute flex desktop:top-28 desktop:right-20`)}>
            <div className={`z-10 bg-cream-200 desktop:bg-cream-100 rounded-md`}>
          <form onSubmit={handleSubmit(onSubmit)} className={clsx(
                'mobile:h-96 mobile:gap-0',
                'grid h-full grid-cols-1 grid-rows-6 gap-4'
                )}>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 font-semibold place-self-center'>Nombre:</label>
                  <h1 className={state === 'hidden' ? 'col-span-2 m-4 text-center' : 'hidden'}>{user?.name}</h1>
                  <input
                    className={clsx(
                      `${state} col-span-2 m-4 rounded-md bg-cream-100`
                    )}
                    key='name'
                    type='text'
                    name='name'
                    placeholder={`${user.name}...`}
                    {...register("name")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 font-semibold place-self-center'>Apellido:</label>
                  <h1 className={state === 'hidden' ? 'col-span-2 m-4 text-center' : 'hidden'}>{user?.lastname}</h1>
                  <input
                    className={`${state} col-span-2 m-4 rounded-md bg-cream-100`}
                    key='surname'
                    type='text'
                    name='surname'
                    placeholder={`${user.lastname}...`}
                    {...register("surname")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 ml-6 font-semibold place-self-center'>Nombre de usuario:</label>
                  <h1 className={state === 'hidden' ? 'col-span-2 m-4 text-center' : 'hidden'}>{user?.username}</h1>
                  <input
                    className={`${state} col-span-2 m-4 rounded-md bg-cream-100`}
                    key='username'
                    type='text'
                    name='username'
                    placeholder={`${user.username}...`}
                    {...register("username")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 ml-6 font-semibold place-self-center'>Email:</label>
                  <h1 className={state === 'hidden' ? 'col-span-2 m-4 text-center' : 'hidden'}>{user?.email}</h1>
                  <input
                    className={`${state} col-span-2 m-4 rounded-md bg-cream-100`}
                    key='emailput'
                    type='email'
                    name='emailput'
                    placeholder={`${user.email}...`}
                    {...register("emailput")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 ml-6 font-semibold place-self-center'>Contraseña:</label>
                  <h1 className={state === 'hidden' ? 'col-span-2 m-4 text-center' : 'hidden'}>* * * * * *</h1>
                  <input
                    className={`${state} col-span-2 m-4 rounded-md bg-cream-100`}
                    key='password'
                    type='text'
                    name='password'
                    placeholder={'* * * * * *'}
                    {...register("password")}
                  />
                </div>
                <button type="submit" className={state === 'hidden' ? 'hidden' : 'px-4 py-2 m-auto font-semibold duration-200 rounded-md desktop:bg-cream-300 bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'}>Confirmar</button>
              </form>
          </div>
        </div>


        
        <div className='grid content-center w-full col-span-2 grid-rows-2 py-6 justify-items-center bg-zinc-300'>
          <div className='grid self-center grid-rows-4 row-span-1 gap-4 w-96'>
          </div>
          <div className='self-center h-full row-span-1'>
            <Swipers />
          </div>
        </div>
      </div>
    </div>
  )
}
