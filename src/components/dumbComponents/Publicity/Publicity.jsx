import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import publi1 from '../../../assets/After.png'
import publi2 from '../../../assets/Harry.png'

let pictures = [publi1, publi2];

function slidecreator() {
    return (
        pictures.map((e, i) => {
            return (
                <SwiperSlide className="flex justify-center" key={i}>
                    <img
                        className="h-96 w-screen mb-4"
                        alt="Not Found"
                        /*src = {`https://picsum.photos/id/${pic}/800/600`}*/
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