import React from 'react'
import clsx from 'clsx'

export default function Comment({ timestamp, comentario }) {
   

   return (
      <div>
         <div className={clsx(
            'mobile:py-2','flex justify-center h-auto items-stretch w-full')}>  
         <div className="rounded-xl border p-4 shadow-md w-full bg-white">
            <div className="flex w-full items-center justify-between border-b pb-2">
               <div className="flex items-center space-x-3 h-4">
                  <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://static.vecteezy.com/system/resources/previews/002/896/415/non_2x/books-illustration-cartoon-books-books-vector.jpg')]"></div>
                  <div className={clsx(
                     'mobile:text-sm',
                     "desktop:text-lg font-bold text-slate-700")}>Usuario</div>
               </div>
               {/* <div className="flex items-center space-x-8">
                  <div className="text-xs text-neutral-500">{timestamp}</div> 
               </div> */}
            </div>

            <div className={clsx(
                     'mobile:grid-cols-2',
                     "my-4 grid desktop:grid-cols-3 content-center w-full justify-items-start")}>
               <div className={clsx(
                     'mobile:text-sm',
                     "desktop:text-base font-bold")}>Un usuario comentó:</div>
               <h1 className={clsx(
                  '',
                  "text-sm text-neutral-600 desktop:col-span-2")}>{comentario}</h1>
            </div>
         </div>
         </div>
      </div>
   )
}
