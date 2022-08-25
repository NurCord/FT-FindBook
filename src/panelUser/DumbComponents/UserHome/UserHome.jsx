/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import img2 from '../../../assets/fondoAdmin.jpg'
import { UilEditAlt } from '@iconscout/react-unicons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2"
import { putUserPanel } from '../../../redux/actions/actions';
import CardBook from '../CardBook/CardBook'
import UserOrders from '../UserOrders/UserOrders'
import { eliminarCuenta } from '../../../redux/actions/actions';

import clsx from 'clsx'

const schema = yup.object().shape({
  name: yup.string().max(100),
  surname: yup.string().max(100),
  username: yup.string().max(100),
  emailput: yup.string().max(100),
  password: yup.string().max(100),
})

function UserHome({ HomeUser }) {
  const [state, setState] = useState('hidden')
  const user = useSelector(state => state.user.userDetail)
  const books = useSelector(state => state.user.books)
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  let handleHidden = () => {
    setState(state === 'hidden' ? '' : 'hidden')
  }

  function deleteAccount(){
    return Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Confirmar!'
    }).then(resultTwo=>{
          if(resultTwo.isConfirmed){
            return Swal.fire({
              title: 'Ingresa tu contraseña',
              input: 'password',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Enviar',
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                if(!login.length){
                  Swal.showValidationMessage(`El campo es obligatorio`)
                }
              }
              }).then(response=>{
                if(response.isConfirmed){
                  return dispatch(eliminarCuenta(response.value))
                }
              })
          }
        })
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
        dispatch(putUserPanel(user?.email, data))
        Swal.fire(
          'Confirmar!',
          `El Usuario fue modificado`,
          'success'
        ).then(() => window.location.reload())
      }
    })
  }

  if (HomeUser === 'User') {
    return (
      <div className={clsx(
        'desktop:grid desktop:w-full desktop:h-full desktop:p-8 desktop:bg-cream-200')}>
        <div className={clsx(
          'mobile:grid mobile:grid-cols-1',
          'desktop:grid desktop:grid-cols-3')}>
          <div className="absolute z-10 right-8">
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
                    type='password'
                    name='password'
                    placeholder={'* * * * * *'}
                    {...register("password")}
                  />
                </div>
                <div onClick={deleteAccount} className={state === 'hidden' ?'cursor-pointer px-4 py-2 m-auto font-semibold duration-200 rounded-md bg-greyBlack-400 text-cream-100 hover:bg-red-600':'hidden'}>Eliminar Cuenta</div>
                <button type="submit" className={state === 'hidden' ? 'hidden' : 'px-4 py-2 m-auto font-semibold duration-200 rounded-md desktop:bg-cream-300 bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'}>Confirmar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (HomeUser === 'Books') {
    return (
      <div className='w-full h-auto'>
        <div className={clsx(
          'mobile:grid-cols-2 mobile:mt-3',
          'grid desktop:grid-cols-4 desktop:gap-4 justify-items-center'
        )}>
          {
            books.length > 0 ? books?.map(e => <CardBook key={e.id} data={e} />)
            : <div className="col-span-4 p-5 m-auto rounded-lg bg-cream-300">
                    <h1 className="text-xl font-medium ">Libros</h1>
                    <span>No tienes libros publicados</span>
                    <div className="flex items-center justify-between pt-6 mt-6 border-t">
                      <div className="flex items-center">
                        <i className="pr-2 text-sm fa fa-arrow-left"></i>
                        <span className="font-medium text-blue-500 text-md">
                        </span>
                      </div>
                    </div>
                  </div>
          }
        </div>
      </div>
    )
  } else if (HomeUser === 'Historial') {
    return (
      <div className='w-full h-full'>
        <div className={clsx(
          'grid grid-cols-1 gap-4')}>
          <UserOrders />
        </div>
      </div>
    )
  }
}

export default UserHome