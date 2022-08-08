import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import Swiper from '../Card/SwiperCard'
import ImgCategory from '../../../assets/categoria.jpg'
import ContainCards from '../Card/ContainCards'
import { getBooksGenres } from '../../../redux/actions/actions'

export default function SearchByCategory() {
    let state = useSelector(s => s.root.allBooksByGenre)
    let data = state[0]?.libros
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBooksGenres(window.location.pathname.split('/')[2]))
    },[dispatch, data])
    return (
        <div className='w-full h-full bg-greyBlack-100'>
            <div className='relative'>
                <span className='absolute text-7xl top-6 left-32'>{state[0]?.genre.replace(/(^\w{1})/g, letra => letra.toUpperCase())}</span>
                <img className='w-full h-36' src={ImgCategory} alt='Not found' />
            </div>
            <div className='grid grid-cols-4 justify-items-center'>
                <div className='w-full col-span-1 p-10'>
                    {data?.length} Resultados
                </div>
                <div className='w-full col-span-3'>
                    <div className='w-full h-auto'>
                        <ContainCards data={data}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
