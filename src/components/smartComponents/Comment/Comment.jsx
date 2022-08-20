import React from 'react';

export default function Comment({ comentario, timestamp, usuario }) {
   
   let options = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC' };
   let postDate = new Date(timestamp).toLocaleDateString('es-ES', options)
   return (
      <div>
         <div className='flex items-center justify-center mt-2'>  
            <div className="rounded-xl border p-5 shadow-md w-full bg-white">
               <div className="flex w-full items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-3">                   
                     <img className="h-8 w-8 rounded-full" src={`${usuario.url}`}/>
                     <div className="text-lg font-bold text-slate-700">{`${usuario.name} ${usuario.lastname}`}</div>
                  </div>
               <div className="flex items-center space-x-8">
                  <div className="text-xs text-neutral-500">{postDate}</div>
               </div>
            </div>

            <div className="mt-4 mb-6">
               <div className="mb-3 text-xl font-bold">Comentó:</div>
               <h1 className="text-sm text-neutral-600">{comentario}</h1>
            </div>
         </div>
         </div>
      </div>
   )
}
