import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import publi1 from '../../../assets/After.png'
import publi2 from '../../../assets/Harry.png'
import publi3 from '../../../assets/propagada.jpg'
import publi4 from '../../../assets/propaganda1.jpg'
import publi5 from '../../../assets/propaganda2.jpg'
import publi6 from '../../../assets/propaganda3.jpg'
import publi7 from '../../../assets/propaganda4.jpeg'

import clsx from 'clsx'
let pictures = [publi6, publi3, publi1, publi4, publi2, publi5, publi7];

function slidecreator() {
    return (
        pictures.map((e, i) => {
            return (
                <SwiperSlide className="flex justify-center" key={i}>
                    <img
                        className={clsx(
                          "desktop:w-screen desktop:mb-4 desktop:h-96"
                        )}
                        alt="Not Found"
                        src={e}
                    ></img>
                </SwiperSlide>
            )
        })
    )
}

export default function Publicity() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            //navigation
            // autoplay={{ delay: 10000 }}
            autoplay={true}
            pagination={{ clickable: true }}
        >
            {slidecreator()}
        </Swiper>
    )
}