import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { deleteUser, putUser } from '../../../redux/actions/actions';

function CardUser({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnClick = (username) => {
    navigate(`/layoutAdmin/user/${username}`)
  }

  const erase = (email) => {
    dispatch(deleteUser(email))
  }

  const updateBan = (email) => {
    return Swal.fire({
      title: 'Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then(result=>{
        if(result.isConfirmed){
          return Swal.fire(
            'Confirmar!',
            `${data.status==='true'?'El Usuario fue BANEADO':'El Usuario fue DESBANEADO'}`,
            'success'
          ).then(()=>{
            dispatch(putUser(email,{status: data.status==='true'?'false':'true'}))
            window.location.reload();
          })
        }        
      })


    // dispatch(putUser(email,{status: data.status==='true'?'false':'true'}))
    // window.location.reload();
  }

  return (
    <div className={`w-full max-w-sm duration-500 ease-in border rounded-lg shadow-md scale-70 ${data.status==='true'?'bg-cream-300':'bg-red-500'} border-cream-200 hover:scale-105`}>
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mt-6 mb-3 rounded-full shadow-lg" src={data.url} alt='Not Found' />
        <h5 className="mb-1 text-xl font-medium text-white">{data.name+' '+data.lastname}</h5>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-800 duration-300 rounded-lg bg-cream-100 hover:bg-gray-800 hover:text-cream-100' onClick={() => handleOnClick(data.username)}>Editar</button>
          <button className={`inline-flex items-center px-2 py-1 text-sm font-medium text-center ${data.status === 'true'?'text-gray-800':'text-cream-100'} ${data.status ==='false'?'border':''} duration-300 rounded-lg ${data.status === 'true'?'bg-cream-100':'bg-red-600'} ${data.status === 'true'?'hover:bg-red-600':'hover:bg-gray-800'} hover:text-cream-100`} onClick={() => updateBan(data.email)}>{data.status==='true'?'Online':'Offline'}</button>
          <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-center duration-300 bg-gray-800 rounded-lg text-cream-200 hover:bg-cream-100 hover:text-gray-800 focus:ring-gray-800' onClick={() => erase(data.email)}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default CardUser