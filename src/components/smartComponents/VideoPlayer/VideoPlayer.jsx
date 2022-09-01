import React from 'react';
import ReactPlayer from 'react-player';
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import clsx from 'clsx';
// import './VideoPlayer.css';

export default function VideoPlayer() {

    const navigate = useNavigate();

    return (
        <div>
            <div className='relative pt-96'>
                <ReactPlayer
                    className='absolute top-0 left-0'
                    url = {require('../../../assets/FindBook_Overview.mp4')}
                    width = '100%'
                    height = '100%'
                    controls
                    playing = {true}
                    muted = {true}
                    onEnded = {() => {
                        Swal.fire({
                            title: 'Gracias por ver',
                            text: "¿Deseas volver a ver?",
                            icon: 'question',
                            showCancelButton: true,
                            cancelButtonText: 'No, Cancelar',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, Repetir!'
                        }).then((result) => {
                            if (result.isConfirmed) {                                
                                window.location.reload();
                            } else {
                                navigate('/');
                                window.location.reload();
                                window.scroll(0,0);
                            }
                        })
                    }}
                />
            </div>
            <div className = 'flex justify-center py-5'>
                <Link to = '/'>
                    <button className =
                        {clsx(  
                            'mobile:w-40 mobile:h-14 mobile:mx-2 ', 
                            "px-4 py-1 font-medium no-underline desktop:w-60 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400"
                        )}>Volver a FindBook</button>
                </Link>
            </div>
        </div>
    )
}