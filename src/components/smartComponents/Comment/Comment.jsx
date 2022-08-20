import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../redux/actions/actions';


export default function Comment({ newcomment, timestamp, user, closeButton, id }) {
   
   let options = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC' };
   let postDate = new Date(timestamp).toLocaleDateString('es-ES', options)

   const dispatch = useDispatch();
   const handleDelete = (e) => {
      Swal.fire({
         title: '¿Estás seguro?',
         text: "El comentario será eliminado ",
         icon: 'warning',
         showCancelButton: true,
         cancelButtonText: 'Cancelar',
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Sí'
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(deleteComment(id)) 
         }
      })
   }

   return (
      <div>
         <div className='flex items-center justify-center mt-2'>  
            <div className="rounded-xl border p-5 shadow-md w-full bg-white">
               <div className="flex w-full items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-3">                   
                     <img className="h-8 w-8 rounded-full" src={`${user.url}`}/>
                     <div className="text-lg font-bold text-slate-700">{`${user.name} ${user.lastname}`}</div>
                  </div>
               <div className="flex items-center space-x-8">
                  <div className="text-xs text-neutral-500">{postDate}</div>
               </div>
            </div>

            <div className="mt-4 mb-6">
               <div className="mb-3 text-xl font-bold">Comentó:</div>
               <h1 className="text-sm text-neutral-600">{newcomment}</h1>
            </div>
            {closeButton &&
            <div className='flex justify-end'>
            <button className = 'justify-self-end px-1 py-1 font-medium text-xs no-underline w-30 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-red-500' onClick={handleDelete}>Eliminar comentario</button>
            </div>}
         </div>
         </div>
      </div>
   )
}
