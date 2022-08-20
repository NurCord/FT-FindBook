import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ContainCards from '../Card/ContainCards'
import ImgReleased from '../../../assets/released.jpg'
import { getBooksByYears } from '../../../redux/actions/actions'
import clsx from 'clsx'

export default function SearchByReleased() {
    const dispatch = useDispatch()
    let state = useSelector(s => s.root.allBooksByRealiced) 
    useEffect(() => {
        dispatch(getBooksByYears(window.location.pathname.split('/')[2]))
    },[state, dispatch])
    if(state.hasOwnProperty('filterBooks')) {
    return (
        <div className={clsx(
            'mobile:w-screen mobile:h-full',
            'bg-greyBlack-100 desktop:w-full')}>
            <div className='relative'>
                <span className={clsx(
                    'mobile:text-5xl mobile:left-16 mobile:top-6',
                    'absolute desktop:text-6xl desktop:top-10 desktop:left-72')}>{state.yearsToFilter}</span>
                <img className={clsx(
                    'mobile:h-24',
                    'w-full desktop:h-36'
                    )} src={ImgReleased} alt='Not found' />
            </div>
            <div className={clsx(
                'mobile:grid-cols-1 mobile:grid mobile:justify-items-center',
                'desktop:grid-cols-4 desktop:h-full'
                )}>
                <div className={clsx(
                    'mobile:px-10 mobile:py-5',
                    'w-full desktop:col-span-1 desktop:text-2xl desktop:p-10'
                    )}>
                    {state.filterBooks.length} Resultados
                </div>
                <div className={clsx(
                    'desktop:w-full desktop:col-span-3'
                    )}>
                    <div className='w-full h-full'>
                        <ContainCards data={state.filterBooks} />
                    </div>
                </div>
            </div>
        </div>
    )
    } else {
        return (<div></div>)
    }
}
