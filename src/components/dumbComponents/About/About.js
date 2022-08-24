import React from 'react'
import CardAbout from './CardAbout'
import img1 from '../../../assets/CePhoto.jpg'
import img2 from '../../../assets/EmiPhoto.jpg'
import img3 from '../../../assets/HeiPhoto.jpg'
import img4 from '../../../assets/MauPhoto.jpg'
import img5 from '../../../assets/NelPhoto.jpg'
import img6 from '../../../assets/NuPhoto.jpeg'

let data = [
    {
        id: 1,
        name: 'Heider Lopez Urrea',
        Linkedin: 'https://www.linkedin.com/in/heider-lopez-b71a09217/',
        gitHub: 'https://github.com/Pebody-h',
        img: img3
    },
    {
        id: 2,
        name: 'Nelson Nicolás Escurra',
        Linkedin: 'https://www.linkedin.com/in/nelson-n-escurra-966a50213/',
        gitHub: 'https://github.com/Nelnico08',
        img: img5
    },
    {
        id: 3,
        name: 'Cesar',
        Linkedin: 'Linkedin',
        gitHub: 'https://github.com/catalancesar',
        img: img1
    },
    {
        id: 4,
        name: 'Robert Mauricio Castilla Cruz',
        Linkedin: 'https://www.linkedin.com/in/rmauriciocastilla/',
        gitHub: 'https://www.linkedin.com/in/rmauriciocastilla',
        img: img4
    },
    {
        id: 5,
        name: 'Emilio Jose Navarro Chavez',
        Linkedin: 'https://www.linkedin.com/in/emilio-jose-navarro-chavez/',
        gitHub: 'https://github.com/Aodak9',
        img: img2
    },
    {
        id: 6,
        name: 'Nuria Candela Córdoba',
        Linkedin: 'https://www.linkedin.com/in/nuria-candela-cordoba-a14135224/',
        gitHub: 'https://github.com/NurCord',
        img: img6
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
