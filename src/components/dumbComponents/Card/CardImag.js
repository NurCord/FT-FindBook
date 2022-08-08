import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getBookByID} from '../../../redux/actions/actions';

export default function CardImag() {
    let res = useSelector(s => s.root.allBooksByGenre)
    let data = res[0]?.libros
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleOnClick(id) {
        dispatch(getBookByID(parseInt(id)))
        window.scroll(0,100)
        navigate(`/detail/${id}`)
    }

    if(data?.length < 3){
        return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={data.length}
        >
            <div className="flex justify-evenly">
                {data?.map((e, i) => (
                <SwiperSlide className="flex justify-center w-96" key={i}>
                    <button onClick={() => handleOnClick(e.id)}>
                        <img className='w-40 h-64' src={e.image} alt={e.name}/>
                    </button>
                </SwiperSlide>))}
            </div>
        </Swiper>
        )
    }else{
        return (
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={3}
                navigation
            >
                <div className="flex justify-evenly">
                    {data?.map((e, i) => (
                    <SwiperSlide className="flex justify-center w-96" key={i}>
                        <button onClick={() => handleOnClick(e.id)}>
                            <img className='w-40 h-64' src={e.image} alt={e.name}/>
                        </button>
                    </SwiperSlide>))}
                </div>
            </Swiper>
        )
    }
}
