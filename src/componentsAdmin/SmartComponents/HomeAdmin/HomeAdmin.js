import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import img2 from '../../../assets/fondoAdmin.jpg'
import { UilEditAlt } from '@iconscout/react-unicons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2"
import { putUserPanel } from '../../../redux/actions/actions';
const schema = yup.object().shape({
  name: yup.string().max(100),
  surname: yup.string().max(100),
  username: yup.string().max(100),
  emailput: yup.string().max(100),
  password: yup.string().max(100),
})

export default function HomeAdmin({ HomeUser }) {
  const [state, setState] = useState('hidden')
  const user = useSelector(state => state.user.userDetail)
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  let handleHidden = () => {
    setState(state === 'hidden' ? '' : 'hidden')
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
        if (data.name === '' && data.lastname === '' && data.username === '') {
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
        ).then(()=> window.location.reload())
      }
    })
  }

    return (
      <div className='grid w-full h-full p-8 bg-cream-200'>
        <div className='grid grid-cols-3'>
          <div className="absolute z-10 right-8">
            <button onClick={() => handleHidden()} className="grid w-12 h-12">
              <UilEditAlt className="w-8 h-8 duration-200 place-self-center text-greyBlack-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" />
            </button>
          </div>

          <div className={`${state} absolute flex`}>
            <div className={`z-10 bg-cream-300 rounded-md`}>
              <form onSubmit={handleSubmit(onSubmit)} className='grid h-full grid-cols-1 grid-rows-6 gap-4'>
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
                    placeholder={`${user.lastname}...`}
                    {...register("surname")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 ml-6 font-semibold place-self-center'>Nombre de usuario:</label>
                  <input
                    className='col-span-2 m-4 rounded-md bg-cream-100'
                    key='username'
                    type='text'
                    name='username'
                    placeholder={`${user.username}...`}
                    {...register("username")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 ml-6 font-semibold place-self-center'>Email:</label>
                  <input
                    className='col-span-2 m-4 rounded-md bg-cream-100'
                    key='emailput'
                    type='email'
                    name='emailput'
                    placeholder={`${user.email}...`}
                    {...register("emailput")}
                  />
                </div>
                <div className='grid content-center grid-cols-3'>
                  <label className='col-span-1 ml-6 font-semibold place-self-center'>Contraseña:</label>
                  <input
                    className='col-span-2 m-4 rounded-md bg-cream-100'
                    key='password'
                    type='text'
                    name='password'
                    placeholder={'* * * * * *'}
                    {...register("password")}
                  />
                </div>
                <button type="submit" className='px-4 py-2 m-auto font-semibold duration-200 rounded-md bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'>Confirmar</button>
              </form>
            </div>
          </div>


          <div style={{ backgroundImage: `url(${img2})` }} className='relative w-full h-full col-span-1 bg-cover'>
            <img src={user?.url} alt='Not found' className='absolute duration-500 ease-in rounded-full top-48 left-16 scale-70 hover:scale-105' />
          </div>
          <div className='grid content-center w-full col-span-2 py-6 justify-items-center bg-zinc-300'>
            <div className='grid self-center grid-rows-4 gap-4 w-96'>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Nombre: </h1>
                <h1>{user?.name}</h1>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Apellido: </h1>
                <h2>{user?.lastname}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Nombre de usuario: </h1>
                <h2>{user?.username}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Email: </h1>
                <h2>{user?.email}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Contraseña: </h1>
                <h2>* * * * * *</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}