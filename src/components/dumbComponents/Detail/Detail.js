/* eslint-disable react-hooks/exhaustive-deps */
import React , {useEffect, useState}from 'react'
import { H1Detail, DivDetail, TextDetail, DivTableDetail, DivTableColDetail, H1DetailSwiper, ButtonDetail} from './stayleComponentDetail'
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
    let role = useSelector(s => s.root.role)
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
                    <h1 className='text-center text-white font-black text-2xl'>{state.name}</h1>
                    <div className={clsx(
                        'mobile:h-6 mobile:text-sm',
                        'grid desktop:content-center desktop:text-lg desktop:justify-between w-full desktop:h-12 grid-cols-4 desktop:justify-items-center'
                        )}>
                        <span><a href='#descripcion' className='font-bold p-1 hover:bg-white rounded'>Descripción</a></span>
                        <span><a href='#caracteristicas' className='font-bold p-1 hover:bg-white rounded'>Caracteristicas</a></span>
                        <span><a href='#recomendados' className='font-bold p-1 hover:bg-white rounded'>Recomendados</a></span>
                        <span><a href='#recomendados' className='font-bold p-1 hover:bg-white rounded'>Comentarios</a></span>
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
                                <h1>Lanzamiento</h1>
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
                        {
                        (role === 'user' || role === 'admin') && 
                        <div className='my-6'>
                            <form onSubmit={e => handleOnSubmit (e)} className={clsx(
                                'mobile:gap-4',
                                'w-full grid desktop:gap-0 grid-cols-2 h-auto content-center justify-items-center')}>
                                <textarea type = 'text' value = {comment} name = 'comment' onChange = {e => handleOnChange (e)} className = "w-full rounded-lg"/>
                                <ButtonDetail type='submit'>Publicar</ButtonDetail>
                            </form>
                        </div>
                        }
                        <div className={clsx(
                            'grid desktop:grid-cols-1 desktop:w-full desktop:h-auto desktop:gap-4')}>

                        <div className='w-full'>
                            {state.comentarios?.map((c) => {
                                return (<Comment key = {c.id}
                                    newcomment = { c.Comentario }
                                    timestamp = { c.createdAt }
                                    user = { c.usuario }
                                    closeButton = { role === 'admin' ? true : false }
                                    id = { c.id }
                                />)}).reverse()}
                        </div>
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
