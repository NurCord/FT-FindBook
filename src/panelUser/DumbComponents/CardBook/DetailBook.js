/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable use-isnan */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UilEditAlt } from '@iconscout/react-unicons'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2";
import { bookDetailPanel, putUserBook, userRole, booksPanel } from '../../../redux/actions/actions';
import clsx from 'clsx'


const schema = yup.object().shape({
  name: yup.string().max(100),
  author: yup.string().max(100),
  category: yup.string(),
  pages: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable().min(0),
  publisher: yup.string().max(100),
  description: yup.string().max(2000),
  price: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable().min(0),
  released: yup.string(),
  language: yup.string(),
})

const possibleGenres = [
  'arte', 'anime', 'biografía', 'biología', 'comic', 'comida',
  'computación', 'deporte', 'derecho', 'economía', 'estudio', 'ficción',
  'historia', 'humor', 'infantil', 'juvenil', 'matemática', 'medicina',
  'novela', 'ocio - tiempo libre', 'política', 'salud - desarrollo personal', 'tecnología', 'terror'
];
const possibleCategories = ['todos', '12+', '16+', '18+', 'sin clasificación'];
const possibleLanguages = ['español', 'inglés', 'otro'];


export default function DetailBook() {
  let { id } = useParams()
  let [state, setState] = useState('hidden')
  const [genres, setGenres] = useState([])
  const [bookCover, setBookCover] = useState('');
  const [loadingBookCover, setLoadingBookCover] = useState(false);
  const Book = useSelector(s => s.user.bookDetail)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(bookDetailPanel(+id))
  }, [Book])

  let image = '';

  
  
  const upLoadBookCover = async (e) => {
      const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'findbookpreset');
    setLoadingBookCover(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/findbookcloud/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    setBookCover(file.secure_url);
    image = file.secure_url
    setLoadingBookCover(false);
  }

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  function handleSelectGenre(e) {
    if (e.target.value !== 'disabled' && !genres.includes(e.target.value)) {
      setGenres([...genres, e.target.value])
    }
  }

  function handleDeleteGenre(toDelete, e) {
    e.preventDefault()
    setGenres(genres.filter(gen => gen !== toDelete))
  }

  let handleHidden = () => {
    setState(state === 'hidden' ? '' : 'hidden')
  }

  const handleOnClick = () => {
    window.history.back()
  }

  function onSubmit(data) {
    return Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      data.image = image
      data.genres = genres
      let values = Object.values(data)
      if (result.isConfirmed) {
        if (values.filter(e => e === '').length === 6 &&
          data.price === undefined && data.pages === undefined &&
          values.filter(e => e === "disable").length === 2 &&
          data.genres.length === 0
        ) {
          setState('hidden')
          return Swal.fire(
            'No se encontraron cambios!',
            'El Libro no fue modificado',
            'warning'
          )
        }
        setState('hidden')
        dispatch(putUserBook(id, data))
        console.log(data);
        Swal.fire(
          'Confirmar!',
          `El libro ${Book?.name} fue modificado`,
          'success'
        ).then(() => window.location.reload())
      }
    })
  }


  return (
    <div className='grid w-full h-full mobile:pt-5 desktop:p-8 bg-cream-100'>
      <div>
        <div className=" mobile:right-2 absolute z-10 desktop:right-8 mobile:top-0">
          <button onClick={handleOnClick} className="grid w-12 h-12">
            <UilArrowCircleLeft className="w-9 h-9 place-self-center text-greyBlack-400" />
          </button>
        </div>

        <div className={clsx('mobile:h-auto mobile:p-4 ','desktop:grid desktop:grid-cols-3 desktop:h-auto')}>
          <img src={Book?.image} alt='Not found' className={clsx(
            'mobile:h-40 float-left',
            'desktop:col-span-1 desktop:duration-500 desktop:ease-in desktop:rounded-md desktop:h-80 desktop:top-48 desktop:left-16 desktop:scale-70 desktop:hover:scale-105')}/>
            <p className='desktop:pr-2 desktop:text-base desktop:col-span-2 desktop:columns-2 desktop:tracking-tight text-justify'>{Book?.description}</p>
        </div>

          <button onClick={() => handleHidden()} className="grid w-full h-8 my-2 px-2">
            <UilEditAlt className="w-8 h-8 duration-200 place-self-end text-greyBlack-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" />
          </button>

        <div className={`flex desktop:mb-0 mobile:mb-24`}>
          <div className={`bg-cream-200 w-full h-auto rounded-md`}>
            <form onSubmit={handleSubmit(onSubmit)} className='grid'>
                <div className='grid grid-cols-1'>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Nombre:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='name'
                      type='text'
                      name='name'
                      placeholder={`${Book?.name}...`}
                      {...register("name")}
                    />
                    <h1 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.name}</h1>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Autor:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='author'
                      type='text'
                      name='author'
                      placeholder={`${Book?.author}...`}
                      {...register("author")}
                    />
                    <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.author}</h2>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Categoría:</label>
                    <select
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      {...register("category")}
                    >
                      <option value='disable'>--Seleccionar--</option>
                      {
                        possibleCategories.map((cat, i) => (<option key={i} value={cat}>{cat}</option>))
                      }
                    </select>
                    <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.category}</h2>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Paginas:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='pages'
                      type='number'
                      name='pages'
                      placeholder={`${Book?.pages}...`}
                      {...register("pages")}
                    />
                    <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.pages}</h2>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Editorial:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='publisher'
                      type='text'
                      name='publisher'
                      placeholder={`${Book?.publisher}...`}
                      {...register("publisher")}
                    />
                    <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.publisher}</h2>
                  </div>
                </div>
                <div className='grid grid-cols-1'>
                  <div className='grid content-center grid-cols-2'>
                    <label className={`${state} font-semibold place-self-center`}>Descripción:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='description'
                      type='text'
                      name='description'
                      placeholder={`${Book?.description}...`}
                      {...register("description")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className={`${state} font-semibold place-self-center`}>Imágen:</label>
                    <input type='file' name='file' accept=".jpg, .jpeg, .png" onChange={upLoadBookCover} className={`${state} w-40 m-auto`}/>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Precio:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='price'
                      type='number'
                      name='price'
                      placeholder={`${Book?.price}...`}
                      {...register("price")}
                    />
                    <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.price}</h2>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Publición:</label>
                    <input
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      key='released'
                      type='date'
                      name='released'
                      placeholder={`${Book?.released}...`}
                      {...register("released")}
                    />
                  <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.released}</h2>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Idioma:</label>
                    <select
                      className={`${state} m-4 rounded-md bg-cream-100`}
                      {...register("language")}>
                      <option value='disable'>--Seleccionar--</option>
                      {
                        possibleLanguages.map((lang, i) => (<option key={i} value={lang}>{lang}</option>))
                      }
                    </select>
                    <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.language}</h2>
                  </div>
                  <div className={state === 'hidden' ? 'grid content-center grid-cols-2' : 'hidden'}>
                      <h1 className='font-semibold place-self-center'>Rating: </h1>
                      <h2 className={state === 'hidden' ? 'm-2 text-center' : 'hidden'}>{Book?.rating}</h2>
                    </div>
                  <div className='grid content-center grid-cols-1 justify-items-center'>
                    <select multiple name='genre' className={`${state} w-56 h-10 text-center align-top rounded-lg text-slate-600 focus:h-auto`}onChange={(e) => handleSelectGenre(e)}>
                      <option disabled={true}>--Genero--</option>
                      {
                        possibleGenres.map((gen, i) => (<option key={i} value={gen}>{gen}</option>))
                      }
                    </select>
                    <div className="flex flex-col items-center">
                      {
                        genres.length > 0 && genres?.map((gen, i) =>
                          <div key={i} className="flex items-center py-1 no-underline text-slate-400">
                            <p>Añadido: &nbsp;{gen}&nbsp;</p>{<button className='px-1 border rounded-lg bg-stone-100' onClick={(e) => handleDeleteGenre(gen, e)}>&nbsp;Borrar</button>}
                          </div>
                        )
                      }
                    </div>
                    <div className='flex'>
                      {Book?.generos?.map((g, i) => { return <h2 className='mr-2' key={i} >{g.genre}</h2> })}
                    </div>
                  </div>
                </div>
              <button type="submit" className={state === 'hidden' ? 'hidden' : 'px-4 py-2 m-auto my-6 font-semibold duration-200 rounded-md bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'}>Confirmar</button>
            </form>
          </div>
        </div> 
      </div>
    </div>
  )
}
