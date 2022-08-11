/* eslint-disable react-hooks/exhaustive-deps */
import React , {useEffect}from 'react'
import {ButtonDetail, H1Detail, DivDetail, TextDetail, DivTableDetail, DivTableColDetail, H1DetailSwiper} from './stayleComponentDetail'
import { useDispatch, useSelector } from 'react-redux';

import CardImag from '../Card/CardImag';
import { useParams } from 'react-router-dom';
import { getBookByID, getBooksGenres } from '../../../redux/actions/actions';
import AddToList from './AddToList';
import Buy from './Buy';
import AddToCar from './AddToCar';

export default function Detail() {
    let state = useSelector(s => s.root.bookById)
    let {id} = useParams()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBookByID(parseInt(id)))
    }, [])

    useEffect(() => {
        console.log(state)
        if(state?.hasOwnProperty('generos')){
            dispatch(getBooksGenres(state?.generos[0]?.genre))
        }
    }, [state])
    
    if(state?.hasOwnProperty('generos')){ return (
        <>
        {  
            state.id && 
                <div className='grid w-full grid-cols-1 gap-5 bg-greyBlack-100 justify-items-center'>
                <div className='grid w-full grid-cols-1 px-20 pt-2 justify-items-center bg-greyBlack-200'>
                    <h1>{state.name}</h1>
                    <div className='grid content-center justify-between w-full h-12 grid-cols-3 justify-items-center'>
                        <span><a href='#descripcion'>Descripcion</a></span>
                        <span><a href='#caracteristicas'>Caracteristicas</a></span>
                        <span><a href='#recomendados'>Recomendados</a></span>
                    </div>
                </div>
                <div className='grid w-2/3 gap-5 rounded-sm bg-cream-100 justify-items-center'>
                    <div className='grid w-2/3 grid-cols-2 gap-40 mt-8 border-b-2 w pb-7 border-greyBlack-100'>
                        <div className='grid justify-items-center'>
                                <img src={state.image} alt='Not found'
                                className='w-48 rounded-md'
                                />
                                <AddToList id={id}/>
                        </div>
                        <div className='grid content-center min-h-min min-w-min grid-rows-3 rounded-md bg-cream-200 justify-items-center'>
                            <h1 className='m-auto'>US${state.price}</h1>                      
                            <Buy id={id}/>
                            <AddToCar id={id}/>
                        </div>
                    </div>
                    <DivDetail>
                        <H1Detail id='descripcion'>Descripción</H1Detail>
                        <TextDetail>
                        {state.description}
                        </TextDetail>
                    </DivDetail>
                    <DivDetail>
                        <H1Detail id='caracteristicas'>Características</H1Detail>
                        <div className='w-full my-6'>
                            <DivTableColDetail>
                                <h1>Publisher</h1>
                                <h2>{state.publisher}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                    <h1>Pages</h1>
                                    <h2>{state.pages}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Category</h1>
                                <h2>{state.category}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Author</h1>
                                <h2>{state.author}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Genre</h1>
                                <h2>{state.generos.map(g => g.genre).join(' - ')}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Released</h1>
                                <h2>{state.released}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Language</h1>
                                <h2>{state.language}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                        </div>
                    </DivDetail>
                    <DivDetail id='recomendados' style={{border: 'none', position: 'relative'}}>
                        <H1DetailSwiper>Recomendaciones</H1DetailSwiper>
                        <div className='absolute max-w-3xl top-14'>
                            <CardImag/> 
                        </div>
                    </DivDetail>
                </div>
                </div>
            }
        </>
    )}else{
        return (
            <h1>Jodidos</h1>
        )
    }
}
