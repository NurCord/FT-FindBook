/* eslint-disable react-hooks/exhaustive-deps */
import React , {useEffect, useState}from 'react'
import { H1Detail, DivDetail, TextDetail, DivTableDetail, DivTableColDetail, H1DetailSwiper} from './stayleComponentDetail'
import { useDispatch, useSelector } from 'react-redux';
import loading from '../../../assets/loading.gif';
import CardImag from '../Card/CardImag';
import { useParams } from 'react-router-dom';
import { cleanUpDetailState, getBookByID, getBooksGenres, postComent } from '../../../redux/actions/actions';
import AddToList from './AddToList';
import Buy from './Buy';
import AddToCart from './AddToCart';
import clsx from 'clsx'
import Comment from '../../smartComponents/Comment/Comment';

export default function Detail() {
    let state = useSelector(s => s.root.bookById)
    let {id} = useParams()
    let dispatch = useDispatch()

    const [ comment, setComment ] = useState('');

    const handleOnChange = (e) => {
        setComment(e.target.value);                
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(postComent(id, comment));
    }

    useEffect(() => {
        dispatch(getBookByID(parseInt(id)))
        return () => {
            dispatch(cleanUpDetailState())
        }
    }, [dispatch, id])

    useEffect(() => {
        if(state?.hasOwnProperty('generos')){
            dispatch(getBooksGenres(state?.generos[0]?.genre))
        }
    }, [state, comment])
    
    if(state?.hasOwnProperty('generos')){ return (
        <>
        {  
            state.id && 
                <div className={clsx(
                    'mobile:gap-2',
                    'grid w-full grid-cols-1 gap-5 bg-greyBlack-100 justify-items-center'
                )}>
                <div className={clsx(
                    'mobile:px-6 mobile:h-20 mobile:text-sm',
                    'grid w-full grid-cols-1 desktop:px-20 desktop:pt-2 justify-items-center bg-greyBlack-200 desktop:text-xl'
                )}>
                    <h1 className='text-center'>{state.name}</h1>
                    <div className={clsx(
                        'mobile:h-6 mobile:text-sm',
                        'grid desktop:content-center desktop:text-lg desktop:justify-between w-full desktop:h-12 grid-cols-3 desktop:justify-items-center'
                        )}>
                        <span><a href='#descripcion'>Descripcion</a></span>
                        <span><a href='#caracteristicas'>Caracteristicas</a></span>
                        <span><a href='#recomendados'>Recomendados</a></span>
                        <span><a href='#recomendados'>Comentarios</a></span>
                    </div>
                </div>
                <div className={clsx(
                    'mobile:w-full',
                    'grid desktop:w-2/3 gap-5 rounded-sm bg-cream-100 justify-items-center'
                    )}>
                    <div className={clsx(
                        'mobile:w-3/4 mobile:gap-10',
                        'grid desktop:w-2/3 grid-cols-2 desktop:gap-40 my-8 border-b-2 border-greyBlack-100'
                    )}>
                        <div className='grid justify-items-center'>
                                <img src={state.image} alt='Not found'
                                className='w-48 rounded-md'
                                />
                                <AddToList id={id}/>
                        </div>
                        <div className='mobile:grid mobile:grid-rows-2'>
                            <div className='grid content-center grid-rows-3 pb-10 rounded-md min-h-min min-w-min bg-cream-200 justify-items-center'>
                                <h1 className='m-auto'>USD${state.price}</h1>                      
                                <Buy id={id}/>
                                <AddToCart id={id}/>
                            </div>
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
                                <h1>Editorial</h1>
                                <h2>{state.publisher}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                    <h1>Páginas</h1>
                                    <h2>{state.pages}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Categoría</h1>
                                <h2>{state.category}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Autor</h1>
                                <h2>{state.author}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Género(s)</h1>
                                <h2>{state.generos.map(g => g.genre).join(' - ')}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Fecha lanzamiento</h1>
                                <h2>{state.released}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                            <DivTableColDetail>
                                <h1>Idioma</h1>
                                <h2>{state.language}</h2>
                            </DivTableColDetail>
                            <DivTableDetail/>
                        </div>
                    </DivDetail>
                    <DivDetail>
                        <H1Detail id='descripcion'>Comentarios</H1Detail>
                        <TextDetail>
                            <form onSubmit={e => handleOnSubmit (e)}>
                            <textarea type = 'text' value = {comment} name = 'comment' onChange = {e => handleOnChange (e)} className = "w-full rounded-lg"/>
                            <button type='submit'>Publicar</button>
                            </form>
                        </TextDetail>
                        <div>
                            {state.comentarios?.map((c, i) => {
                                return (<Comment key={i}
                                    comentario = { c.Comentario }
                                />)})}
                        </div>
                    </DivDetail>
                    <DivDetail id='recomendados' style={{border: 'none', position: 'relative'}}>
                        <H1DetailSwiper>Recomendaciones</H1DetailSwiper>
                        <div className={clsx(
                            'mobile:w-80',
                            'absolute desktop:max-w-3xl desktop:w-full top-14')}>
                            <CardImag/> 
                        </div>
                    </DivDetail>
                </div>
                </div>
            }
        </>
    )}else{
        return (
            <div className='grid h-screen place-content-center'><img className='rounded-lg' src={loading} alt='Cargando' /></div>
        )
    }
}
