import React from 'react'
import { UilGithub } from '@iconscout/react-unicons'
import { UilLinkedin } from '@iconscout/react-unicons'
export default function CardAbout({key, name, Linkedin, gitHub, image}) {
  return (
    <div className='border-[0.2px] transition duration-500 ease-in scale-70 hover:scale-105 w-72 h-48 rounded-md content-center justify-items-center grid grid-rows-6 border-cream-100 shadow-2xl bg-cream-200'>
        <div className='grid content-center justify-center row-span-1'>
            <h1 className='pl-2 mb-2 font-medium text-start'>{name}</h1>
        </div>
        <div  className='grid w-full grid-cols-3 row-span-5'>
            <img src={image}  className='w-40 col-span-2 mx-2 rounded-md h-36' alt='Not found'/>
            <div className='grid content-center justify-center col-span-1 py-10'>
                    <a href={gitHub}>
                        <UilGithub className='w-12 h-12'/>
                    </a>
                    <a href={Linkedin}>
                        <UilLinkedin className='w-12 h-12'/>
                    </a>
            </div>
        </div>
    </div>
  )
}
