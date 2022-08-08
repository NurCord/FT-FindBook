import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ContainCards from '../Card/ContainCards'
import { getBookByName } from '../../../redux/actions/actions'

export default function SearchByName() {
    let books = useSelector(s => s.root.allBooksByName)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBookByName(window.location.pathname.split('/')[2]))
      }, [dispatch, books])
    return (
        <div className='w-full h-full bg-greyBlack-100'>
            <div className='grid grid-cols-4 justify-items-center'>
                <div className='w-full col-span-1 p-10'>
                    <h1>{books?.length} Resultados</h1>
                </div>
                <div className='w-full col-span-3'>
                    <div className='w-full h-auto'>
                        <ContainCards data={books}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
