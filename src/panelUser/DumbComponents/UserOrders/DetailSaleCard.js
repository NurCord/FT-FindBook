import React from 'react'

export default function OrderDetailCard({name, image, cant, price, username, useremail}) {
  return (
    <div className='grid grid-cols-5 desktop:w-full mobile:h-36'>
        <img src={image} className='w-32 rounded-md desktop:h-36 mobile:h-28' alt='Not found'/>
        <div className='grid col-span-3 grid-rows-3 desktop:h-28'>
            <h1>Nombre: {name}</h1>
            <div className='grid row-start-4'>
              <h2>US$ {price}</h2>
              <h2>{cant} X</h2>
              <h2>Comprado por: {username}</h2>
              <h3>Correo: {useremail}</h3>
            </div>
        </div>
        <h2 className='text-end'>US$ {price}</h2>
    </div>
  )
}