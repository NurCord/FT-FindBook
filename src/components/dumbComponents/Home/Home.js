import React from 'react'
import Publicity from '../../dumbComponents/Publicity/Publicity';
import SwiperCard from '../Card/SwiperCard';
import { useSelector } from "react-redux";


export default function Home() {
    let state = useSelector(s => s.root.allBooks)
    let data = state.slice(0, 10)
    return (
        <div className='w-full h-screen bg-greyBlack-100'>
            <Publicity/>
            <div className='grid grid-cols-1 gap-4 justify-items-start'>
                <h1 className='my-8 ml-14'>RECOMENDADOS: Los más populares</h1>
                <div className='w-full'>
                    <SwiperCard data={data}/>
                </div>
            </div>
        </div>
    )
}
