import React from 'react'

export default function Comment({ timestamp, comentario }) {
   

   return (
      <div>
         <div className='flex items-center justify-center min-h-screen'>  <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
            <div className="flex w-full items-center justify-between border-b pb-3">
               <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://static.vecteezy.com/system/resources/previews/002/896/415/non_2x/books-illustration-cartoon-books-books-vector.jpg')]"></div>
                  <div className="text-lg font-bold text-slate-700">Usuario</div>
               </div>
               <div className="flex items-center space-x-8">
                  {/* <div className="text-xs text-neutral-500">{timestamp}</div> */}
               </div>
            </div>

            <div className="mt-4 mb-6">
               <div className="mb-3 text-xl font-bold">Un usuario comentó:</div>
               <h1 className="text-sm text-neutral-600">{comentario}</h1>
            </div>
         </div>
         </div>
      </div>
   )
}
