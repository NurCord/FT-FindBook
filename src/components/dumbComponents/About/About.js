import React from 'react'
import CardAbout from './CardAbout'

let data = [
    {
        id: 1,
        name: 'Nelson',
        Linkedin: 'Linkedin',
        gitHub: 'gitHub',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU'
    },
    {
        id: 2,
        name: 'Heider',
        Linkedin: 'Linkedin',
        gitHub: 'gitHub',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU'
    },
    {
        id: 3,
        name: 'Cesar',
        Linkedin: 'Linkedin',
        gitHub: 'gitHub',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU'
    },
    {
        id: 4,
        name: 'Mauri',
        Linkedin: 'Linkedin',
        gitHub: 'gitHub',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU'
    },
    {
        id: 5,
        name: 'Emi',
        Linkedin: 'Linkedin',
        gitHub: 'gitHub',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU'
    },
    {
        id: 6,
        name: 'Nuria',
        Linkedin: 'Linkedin',
        gitHub: 'gitHub',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU'
    },
]
export default function About() {
  return (
    <div className='grid content-center grid-cols-3 gap-6 my-10 justify-items-center'>{
        data?.map(e => <CardAbout
            key={e.id}
            name={e.name}
            Linkedin={e.Linkedin}
            gitHub={e.gitHub}
            image={e.img}
        />)
    }</div>
  )
}
