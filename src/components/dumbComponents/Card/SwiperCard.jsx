import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Cards from "./Cards";

export default function SwiperCard({ data }) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            navigation
        >
            <div className="flex justify-evenly">
                {data && data.length > 0 && data.map((e, i) => (
                    <SwiperSlide className="flex justify-center w-full h-full p-6 bg-greyBlack-100" key={i}>
                        <Cards data={e} key={e.id} />
                    </SwiperSlide>))}
            </div>
        </Swiper>
    )
}


