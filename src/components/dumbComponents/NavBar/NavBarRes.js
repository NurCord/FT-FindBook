import React from 'react'
import { UilFidgetSpinner } from '@iconscout/react-unicons'

export default function NavBarRes({handleHidden}) {
    return (
    <div className='grid grid-cols-5 bg-cream-300 h-16'>
        <div className='grid grid-cols-1 content-center justify-items-center'>
            <div>logo</div>
            <h1>iniciar</h1>
        </div>
        <div className='grid grid-cols-1 content-center justify-items-center'>
            <div>logo</div>
            <h1>Publicar</h1>
        </div>
        <div className='grid grid-cols-1 content-center justify-items-center'>
            <div>logo</div>
            <h1>panel</h1>
        </div>
        <div className='grid grid-cols-1 content-center justify-items-center'>
            <div>logo</div>
            <h1>carrito</h1>
        </div>
        <div className='grid grid-cols-1 content-center justify-items-center'>
            <UilFidgetSpinner className='w-8 h-8' onClick={()=>handleHidden('menu')}/>
        </div>
    </div>
)}
