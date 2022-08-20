import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ContainCards from '../Card/ContainCards'
import { getBookByName } from '../../../redux/actions/actions'
import clsx from 'clsx'

export default function SearchByName() {
    let books = useSelector(s => s.root.allBooksByName)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBookByName(window.location.pathname.split('/')[2]))
    }, [dispatch, books])
    return (
        <div className={clsx(
            'w-full desktop:h-screen bg-greyBlack-100'
        )}>
            <div className={clsx(
                'mobile:grid-cols-1 mobile:grid mobile:justify-items-center mobile:h-full',
                'desktop:grid-cols-4 '
                )}>
                <div className={clsx(
                    'mobile:px-10 mobile:py-5',
                    'w-full desktop:col-span-1 desktop:text-2xl desktop:p-10'
                    )}>
                    <h2>{books?.length ? books.length: 0} Resultados</h2>
                </div>
                <div className='desktop:w-full desktop:col-span-3'>
                    <div className='w-full h-auto'>
                        <ContainCards data={books}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
