import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ContainCards from '../Card/ContainCards'
import ImgReleased from '../../../assets/released.jpg'
import { getBooksByYears } from '../../../redux/actions/actions'
export default function SearchByReleased() {
    const dispatch = useDispatch()
    let state = useSelector(s => s.root.allBooksByRealiced) 
    useEffect(() => {
        dispatch(getBooksByYears(window.location.pathname.split('/')[2]))
    },[state, dispatch])
    if(state.hasOwnProperty('filterBooks')) {
  return (
        <div className='w-full h-full bg-greyBlack-100'>
            <div className='relative h-full'>
                <span className='absolute grid w-full text-5xl place-content-center top-10'>{state.yearsToFilter}</span>
                <img className='w-full h-36' src={ImgReleased} alt='Not found' />
            </div>
            <div className='grid grid-cols-4 justify-items-center'>
                <div className='w-full col-span-1 p-10'>
                    {state.filterBooks.length} Resultados
                </div>
                <div className='w-full col-span-3'>
                    <div className='w-full h-auto'>
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
