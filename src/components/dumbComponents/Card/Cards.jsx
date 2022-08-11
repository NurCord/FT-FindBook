import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { getBookByName , getBookByID} from '../../../redux/actions/actions'

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
        if(index <= colorStar) arrayColor.push('text-yellow-300')
        else{
            arrayColor.push('text-greyBlack-100')
        }
    }
    const handleBuy = (e) => {
        e.preventDefault();
        if(!window.localStorage.getItem("token")){
            Swal.fire({
                title: 'Debes estar conectado',
                text: "¿Deseas conectarte?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Conectar'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login')
                }
              })
        }else{
            navigate('/shop')
        }
    }
    
    return (
        <div className="flex justify-center w-56 bg-white rounded-sm shadow-lg h-96 min-h-72">
            <div>
                <div className='flex justify-center'>
                    <button onClick={() => handleOnClick(data?.id)}>
                        <img className="self-center h-64 p-6 w-52 min-p-4" src={data?.image} alt="not found" />
                    </button>
                </div>
                <div className="flex flex-col items-start px-4 pb-1 flex-nowrap">
                    <div className="flex items-center">
                        <svg aria-hidden="true" className={`w-5 h-5 ${arrayColor[0]} min-w-4 min-h-4`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${arrayColor[1]} min-w-4 min-h-4`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${arrayColor[2]} min-w-4 min-h-4`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${arrayColor[3]} min-w-4 min-h-4`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className={`w-5 h-5 ${arrayColor[4]} min-w-4 min-h-4`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    </div>
                    <h2 className="overflow-hidden text-lg italic font-semibold tracking-tight text-left min-text-sm text-greyBlack-300 min-max-h-5 max-h-7">{data?.name}
                    </h2>
                    <h4 className="text-base font-semibold tracking-tight min-text-sm text-greyBlack-200">{data?.author}
                    </h4>
                    <div className="flex items-center justify-between w-full">
                        <span className="mx-2 text-xl font-bold min-text-sm text-greyBlack-300">${data?.price}</span>
                        <div onClick={handleBuy} className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2" fill="none" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
