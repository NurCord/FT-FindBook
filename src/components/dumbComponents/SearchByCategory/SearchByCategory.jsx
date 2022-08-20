import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import Swiper from '../Card/SwiperCard'
import ImgCategory from '../../../assets/categoria.jpg'
import ContainCards from '../Card/ContainCards'
import { getBooksGenres } from '../../../redux/actions/actions'
import clsx from 'clsx'
export default function SearchByCategory() {
    let state = useSelector(s => s.root.allBooksByGenre)
    let data = state[0]?.libros
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBooksGenres(window.location.pathname.split('/')[2]))
    },[dispatch, data])
    return (
        <div className={clsx(
            'mobile:w-screen mobile:h-full',
            'bg-greyBlack-100 desktop:w-full')}>
            <div className='relative'>
                <span className={clsx(
                    'mobile:text-5xl mobile:left-16 mobile:top-6',
                    'absolute desktop:text-6xl desktop:top-10 desktop:left-72'
                )}>{state[0]?.genre.replace(/(^\w{1})/g, letra => letra.toUpperCase())}</span>
                <img className={clsx(
                    'mobile:h-24',
                    'w-full desktop:h-36'
                    )} src={ImgCategory} alt='Not found' />
            </div>
            <div className={clsx(
                'mobile:grid-cols-1 mobile:grid mobile:justify-items-center',
                'desktop:grid-cols-4 desktop:h-full'
                )}>
                <div className={clsx(
                    'mobile:px-10 mobile:py-5',
                    'w-full desktop:col-span-1 desktop:text-2xl desktop:p-10'
                    )}>
                    {data?.length} Resultados
                </div>
                <div className={clsx(
                    'desktop:w-full desktop:col-span-3'
                    )}>
                    <div className='w-full h-full'>
                        <ContainCards data={data}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
