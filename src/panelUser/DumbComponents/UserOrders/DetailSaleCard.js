import React from 'react'

export default function OrderDetailCard({name, image, cant, price, username, useremail}) {
  return (
    <div className='grid w-full grid-cols-5'>
        <img src={image} className='w-32 rounded-md h-36' alt='Not found'/>
        <div className='grid col-span-3 grid-rows-3 h-28'>
            <h1>Nombre: {name}</h1>
            <h2>US$ {price}</h2>
            <h2>{cant} X</h2>
            <h2>Comprado por: {username}</h2>
            <h3>Correo: {useremail}</h3>
        </div>
        <h2 className='text-end'>US$ {price}</h2>
    </div>
  )
}