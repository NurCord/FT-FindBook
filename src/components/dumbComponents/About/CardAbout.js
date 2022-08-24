import React from 'react'
import { UilGithub } from '@iconscout/react-unicons'
import { UilLinkedin } from '@iconscout/react-unicons'
import {Link} from 'react-router-dom'
export default function CardAbout({key, name, Linkedin, gitHub, image}) {
  return (
    <div className='border-[0.2px] transition duration-500 ease-in scale-70 hover:scale-105 w-72 h-48 rounded-md content-center justify-items-center grid grid-cols-3 border-cream-100 shadow-2xl bg-cream-200'>
        <div className='grid content-center justify-center grid-cols-1 col-span-2'>
            <h1 className='pl-2 mb-2 font-medium text-start'>{name}</h1>
            <img src={image}  className='mx-2 rounded-md h-36' alt='Not found'/>
        </div>
        <div className='grid grid-rows-2 py-10'>
            <Link to={gitHub}>
                <UilGithub className='w-12 h-12'/>
            </Link>
            <Link to={Linkedin}>
                <UilLinkedin className='w-12 h-12'/>
            </Link>
        </div>
    </div>
  )
}
