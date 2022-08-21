import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { getBookByName, getBookByID } from '../../../redux/actions/actions'
import { addToCart } from '../../../redux/actions/actionsShop.js'
import clsx from 'clsx'
import { UilShoppingBag } from '@iconscout/react-unicons'
export default function Cards({ data }) {
    let colorStar = data.rating
    let navigate = useNavigate()
    let dispatch = useDispatch()
    function handleOnClick(e) {
        dispatch(getBookByName(data?.name))
        dispatch(getBookByID(e))
        navigate(`/detail/${parseInt(e)}`)
    }

    let arrayColor = []
    for (let index = 1; index < 6; index++) {
        if (index <= colorStar) arrayColor.push('text-yellow-300')
        else {
            arrayColor.push('text-greyBlack-100')
        }
    }
    const handleBuy = (e) => {
        e.preventDefault();
        if (!window.localStorage.getItem("token")) {
            Swal.fire({
                title: 'Debes estar conectado',
                text: "¿Deseas conectarte?",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Conectar'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
        } else {
            dispatch(addToCart(data.id))
        }
    }

    return (
        <div className={clsx(
            'mobile:flex mobile:justify-center mobile:bg-white mobile:rounded-sm mobile:shadow-lg mobile:h-48 mobile:w-28',
            "desktop:w-56 desktop:h-96 desktop:min-h-72"
        )}>
            <div>
                <div className='flex justify-center'>
                    <button onClick={() => handleOnClick(data?.id)}>
                        <img className={clsx(
                            'mobile:h-28 mobile:w-24 mobile:self-center mobile:p-2',
                            "desktop:h-64 desktop:p-6 desktop:w-52 desktop:min-p-4"
                        )} src={data?.image} alt="not found"/>
                    </button>
                </div>
                <div className="flex flex-col items-start px-4 pb-1 flex-nowrap">
                    <div className="flex items-center">
                        <svg aria-hidden="true" className={clsx(
                            'mobile:w-4 mobile:h-4',
                            `desktop:w-5 desktop:h-5 ${arrayColor[0]} desktop:min-w-4 desktop:min-h-4`
                            )} 
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={clsx(
                            'mobile:w-4 mobile:h-4',
                            `desktop:w-5 desktop:h-5 ${arrayColor[1]} desktop:min-w-4 desktop:min-h-4`
                            )} 
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={clsx(
                            'mobile:w-4 mobile:h-4',
                            `desktop:w-5 desktop:h-5 ${arrayColor[2]} desktop:min-w-4 desktop:min-h-4`
                            )}  
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={clsx(
                            'mobile:w-4 mobile:h-4',
                            `desktop:w-5 desktop:h-5 ${arrayColor[3]} desktop:min-w-4 desktop:min-h-4`
                            )} 
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={clsx(
                            'mobile:w-4 mobile:h-4',
                            `desktop:w-5 desktop:h-5 ${arrayColor[4]} desktop:min-w-4 desktop:min-h-4`
                            )}  
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    </div>
                    <h2 className={clsx(
                        'mobile:text-xs mobile:h-4',
                        "overflow-hidden desktop:text-lg desktop:italic desktop:font-semibold desktop:h-8 desktop:mt-1 desktop:tracking-tight desktop:text-left desktop:min-text-sm text-greyBlack-300 desktop:max-h-7"
                    )}>{data?.name}
                    </h2>
                    <h4 className={clsx(
                        'mobile:text-xs mobile:h-4 mobile:overflow-hidden',
                        "desktop:text-base desktop:font-semibold desktop:tracking-tight desktop:min-text-sm desktop:h-7 desktop:text-greyBlack-200"
                        )}>
                        {data?.author}
                    </h4>
                    <div className="flex items-center justify-between w-full">
                        <span className={clsx(
                            'mobile:text-sm',
                            "desktop:mx-2 desktop:text-xl desktop:font-bold desktop:min-text-sm desktop:text-greyBlack-300"
                            )}>${data?.price}</span>
                        <div onClick={handleBuy} className="cursor-pointer">
                            <UilShoppingBag className={clsx(
                                'mobile:w-5 mobile:h-5 mobile:flex',
                                "desktop:w-6 desktop:h-6 desktop:mx-2" 
                                )}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
