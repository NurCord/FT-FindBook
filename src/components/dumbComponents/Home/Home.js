import React, { useEffect } from 'react'
import Publicity from '../../dumbComponents/Publicity/Publicity';
import SwiperCard from '../Card/SwiperCard';
import SwiperGenre from '../Card/SwiperGenre'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {getForRating} from '../../../redux/actions/actions'

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getForRating())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    let state = useSelector(s => s.root.allBoksByRating)
    let data = state.slice(0, 10)
    return (
        <div className='w-full h-full bg-greyBlack-100'>
            <Publicity/>
            <div className='grid grid-cols-1 gap-10 justify-items-start'>
                <h1 className='mt-8 ml-14'>RECOMENDADOS: Los más populares</h1>
                <div className='w-full'>
                    <SwiperCard data={data}/>
                </div>
                <h1 className='ml-14'>Generos más populares</h1>
                <div className='w-full'>
                    <SwiperGenre/>
                </div>
            </div>
        </div>
    )
}
