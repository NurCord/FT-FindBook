/* eslint-disable react-hooks/exhaustive-deps */
import React , {useEffect, useState}from 'react'
import { H1Detail, DivDetail, TextDetail, DivTableDetail, DivTableColDetail, H1DetailSwiper, ButtonDetail} from './stayleComponentDetail'
import { useDispatch, useSelector } from 'react-redux';
import loading from '../../../assets/loading.gif';
import CardImag from '../Card/CardImag';
import { useParams } from 'react-router-dom';
import { booksPanel, cleanUpDetailState, getBookByID, getBooksGenres, postComent } from '../../../redux/actions/actions';
import AddToList from './AddToList';
import Buy from './Buy';
import AddToCart from './AddToCart';
import clsx from 'clsx'
import Comment from '../../smartComponents/Comment/Comment';
import { getUserOrders } from '../../../redux/actions/actionsShop';
import Swal from 'sweetalert2';

export default function Detail() {
    let state = useSelector(s => s.root.bookById)
    const orderList = useSelector(state => state.shop.orderList)
    const owner = useSelector(state => state.user.books)
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
        dispatch(booksPanel())
        dispatch(getUserOrders())
        dispatch(booksPanel())
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
    if(state?.statusBook === 'false'){
        return Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'La publicación no existe',
            showConfirmButton: false,
            timer: 1500
        }).then(()=>window.location.href='/')
    }
    if(state?.hasOwnProperty('generos')){ return (
        <>
        {  
            state.id && 
                <div className={clsx(
                    'mobile:gap-2',
                    'grid w-full grid-cols-1 gap-5 bg-greyBlack-100 justify-items-center'
                )}>
                <div className={clsx(
                    'mobile:px-6 mobile:h-20 mobile:text-sm mobile:content-center',
                    'grid w-full grid-cols-1 desktop:px-20 desktop:pt-2 justify-items-center bg-cream-100 desktop:text-xl'
                )}>
                    <h1 className='text-2xl font-black text-center '>{state.name}</h1>
                    {
                        window.matchMedia("(min-width: 700px)").matches ? 
                        <div className={clsx(
                            'mobile:h-6 mobile:text-sm',
                            'grid desktop:content-center desktop:text-lg desktop:justify-between w-full desktop:h-12 grid-cols-4 desktop:justify-items-center'
                            )}>
                            <span><a href='#descripcion' className='p-1 font-medium rounded hover:bg-white'>Descripción</a></span>
                            <span><a href='#caracteristicas' className='p-1 font-medium rounded hover:bg-white'>Caracteristicas</a></span>
                            <span><a href='#recomendados' className='p-1 font-medium rounded hover:bg-white'>Recomendados</a></span>
                            <span><a href='#recomendados' className='p-1 font-medium rounded hover:bg-white'>Comentarios</a></span>
                        </div> : null
                    }
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
                                {!owner?.find(b=>b.id ==id) && <AddToList id={id}/>}
                        </div>
                        <div className='mobile:grid mobile:grid-rows-2'>
                            {!owner?.find(b=>b.id ==id) && <div className='grid content-center grid-rows-3 pb-10 rounded-md min-h-min min-w-min bg-cream-200 justify-items-center'>
                                <h1 className='m-auto'>USD${state.price}</h1>                      
                                <Buy id={id}/>
                                <AddToCart id={id}/>
                            </div>}
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
                        ((role === 'user' && orderList?.find(order=>order.status==='complete'&&order.Items.find(item=>item.libro_id==id))) || (role === 'admin')) &&
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
    )}else if(state?.hasOwnProperty('error')){
        return(
        <div className='grid h-screen uppercase place-content-center text-9xl'>{state.error}</div>
        )
    }
    else{
        return (
            <div className='grid h-screen place-content-center'><img className='rounded-lg' src={loading} alt='Cargando' /></div>
        )
    }
}
