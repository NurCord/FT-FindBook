import React, { useEffect } from 'react'
import Publicity from '../../dumbComponents/Publicity/Publicity';
import SwiperCard from '../Card/SwiperCard';
import SwiperGenre from '../Card/SwiperGenre'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {getForRating} from '../../../redux/actions/actions'
import clsx from 'clsx'
import Chat from '../../smartComponents/ChatBot/ChatBot';

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getForRating())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    let state = useSelector(s => s.root.allBoksByRating)
    let data = state.slice(0, 10)
    return (
        <div className={clsx(
            'desktop:w-full desktop:h-full desktop:bg-greyBlack-100'
        )}>
            <Publicity/>
            <div className={clsx(
                'mobile:grid mobile:grid-cols-1 mobile:gap-5 mobile:justify-items-start', 
                'desktop:gap-10')}>
                <h1 className={clsx(
                    'mobile:mt-6 mobile:ml-6',
                    'desktop:mt-8 desktop:ml-14'
                )}>RECOMENDADOS: Los más populares</h1>
                <div className='w-full'>
                    <SwiperCard data={data}/>
                </div>
                <h1 className={clsx(
                    'mobile:ml-6',
                    'desktop:ml-14'
                )}>Generos más populares</h1>
                <div className='w-full'>
                    <SwiperGenre/>
                </div>
            </div>
            <Chat />
        </div>
    )
}
