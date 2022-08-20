
import React from 'react'
import clsx from 'clsx'


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
         <div className={clsx(
            'mobile:py-2','flex justify-center h-auto items-stretch w-full')}>  
                    <div className="rounded-xl border p-4 shadow-md w-full bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-2">
                                 <div className="flex items-center space-x-3 h-4">
                                                    <img className="h-8 w-8 rounded-full" src={`${usuario.url}`}/>
                                                    <div className={clsx(
                                                       'mobile:text-sm',
                                                       "desktop:text-lg font-bold text-slate-700")}>{`${usuario.name} ${usuario.lastname}`}
                                                    </div>
                                        </div>
                                        <div className="flex items-center space-x-8">
                                                      <div className="text-xs text-neutral-500">{postDate}</div>
                                        </div>
                            </div>
                            <div className={clsx(
                                     'mobile:grid-cols-2',
                                     "my-4 grid desktop:grid-cols-3 content-center w-full justify-items-start")}>
                                       <div className={clsx(
                                             'mobile:text-sm',
                                             "desktop:text-base font-bold")}>Comentó:</div>
                                         <h1 className={clsx(
                                            '',
                                            "text-sm text-neutral-600 desktop:col-span-2")}>{comentario}</h1>
                                </div>
                        </div>
         </div>
      </div>
   )
}
