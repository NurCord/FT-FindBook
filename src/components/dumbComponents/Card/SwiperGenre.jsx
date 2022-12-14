import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useNavigate } from 'react-router-dom';
import genre1 from '../../../assets/Comic (1).png'
import genre2 from '../../../assets/Comic (2).png'
import genre3 from '../../../assets/Comic (3).png'
import genre4 from '../../../assets/Comic (4).png'
import genre5 from '../../../assets/Comic.png'
import clsx from 'clsx'


let data = [
    {name:'biografía', img: genre1}, 
    {name:'infantil', img: genre2}, 
    {name:'ficción', img: genre3},
    {name:'novela', img: genre4},
    {name:'comic', img: genre5},
]

export default function SwiperGenre() {
    const navigate = useNavigate()

    function handleOnClick(name) {
        window.scroll(0,100)
        navigate(`/categoria/${name}`)
    }
    if (window.matchMedia("(min-width: 700px)").matches) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            navigation
            className='bg-greyBlack-100 mobile:mb-5'
        >
            <div className="flex justify-evenly">
                {data?.map((e, i) => (
                <SwiperSlide className={clsx(
                    "desktop:p-10 desktop:w-full"
                )} key={i}>
                    <button onClick={() => handleOnClick(e.name)}>
                    <img className={clsx(
                        'desktop:w-40 desktop:h-40 rounded-lg'
                    )} src={e.img} alt='Not found'/>
                </button>
            </SwiperSlide>))}
        </div>
    </Swiper>
    )}else{
        return (
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={4}
                className='bg-greyBlack-100 mobile:mb-5'
            >
                <div className="flex justify-evenly">
                    {data?.map((e, i) => (
                    <SwiperSlide className={clsx(
                        'mobile:flex mobile:justify-center mobile:w-48',
                    )} key={i}>
                        <button onClick={() => handleOnClick(e.name)}>
                        <img className={clsx(
                            'mobile:w-20 mobile:h-20 mobile:rounded-lg',
                        )} src={e.img} alt='Not found'/>
                    </button>
                </SwiperSlide>))}
            </div>
        </Swiper>)
    }
}
