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
import { bookDetail, putBook, userRole } from '../../../redux/actions/actions';


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


export default function AdminBooK() {
  let { id } = useParams()
  let [state, setState] = useState('hidden')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(bookDetail(id))
  }, [])

  let image = '';

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [bookCover, setBookCover] = useState('');
  const [loadingBookCover, setLoadingBookCover] = useState(false);

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
        dispatch(putBook(id, data))
        Swal.fire(
          'Confirmar!',
          `El libro ${Book.name} fue modificado`,
          'success'
        ).then(() => window.location.reload())
      }
    })
  }

  const Book = useSelector(s => s.admin.bookDetail)
  if(Book.error){
    return (
      <div className='grid h-screen place-content-center text-9xl uppercase'>{Book.error}</div>
    )
  }
  return (
    <div className='grid w-full h-full p-8 bg-cream-200'>
      <div>
        <div className="absolute z-10 right-8">
          <button onClick={handleOnClick} className="grid w-12 h-12">
            <UilArrowCircleLeft className="w-9 h-9 place-self-center text-greyBlack-400" />
          </button>
          <button onClick={() => handleHidden()} className="grid w-12 h-12">
            <UilEditAlt className="w-8 h-8 duration-200 place-self-center text-greyBlack-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" />
          </button>
        </div>

        <div className={`${state} absolute flex`}>
          <div className={`z-10 bg-cream-300 w-full h-auto rounded-md`}>
            <form onSubmit={handleSubmit(onSubmit)} className='grid'>
              <div className='grid h-auto grid-cols-2 gap-4'>
                <div className='grid grid-cols-1'>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Nombre:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='name'
                      type='text'
                      name='name'
                      placeholder={`${Book.name}...`}
                      {...register("name")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='font-semibold place-self-center'>Autor:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='author'
                      type='text'
                      name='author'
                      placeholder={`${Book.author}...`}
                      {...register("author")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Categoría:</label>
                    <select
                      className='m-4 rounded-md bg-cream-100'
                      {...register("category")}
                    >
                      <option value='disable'>--Seleccionar--</option>
                      {
                        possibleCategories.map((cat, i) => (<option key={i} value={cat}>{cat}</option>))
                      }
                    </select>
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Paginas:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='pages'
                      type='number'
                      name='pages'
                      placeholder={`${Book.pages}...`}
                      {...register("pages")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Editorial:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='publisher'
                      type='text'
                      name='publisher'
                      placeholder={`${Book.publisher}...`}
                      {...register("publisher")}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1'>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Descripción:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='description'
                      type='text'
                      name='description'
                      placeholder={`${Book.description}...`}
                      {...register("description")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Imágen:</label>
                    <input type='file' name='file' accept=".jpg, .jpeg, .png" onChange={upLoadBookCover} className='w-40 m-auto' />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Precio:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='price'
                      type='number'
                      name='price'
                      placeholder={`${Book.price}...`}
                      {...register("price")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Publición:</label>
                    <input
                      className='m-4 rounded-md bg-cream-100'
                      key='released'
                      type='date'
                      name='released'
                      placeholder={`${Book.released}...`}
                      {...register("released")}
                    />
                  </div>
                  <div className='grid content-center grid-cols-2'>
                    <label className='ml-6 font-semibold place-self-center'>Idioma:</label>
                    <select
                      className='m-4 rounded-md bg-cream-100'
                      {...register("language")}>
                      <option value='disable'>--Seleccionar--</option>
                      {
                        possibleLanguages.map((lang, i) => (<option key={i} value={lang}>{lang}</option>))
                      }
                    </select>
                  </div>
                  <div className='grid content-center grid-cols-1 justify-items-center'>
                    <select multiple name='genre' className="w-56 h-10 text-center align-top rounded-lg text-slate-600 focus:h-auto" onChange={(e) => handleSelectGenre(e)}>
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
                  </div>
                </div>
              </div>
              <button type="submit" className='px-4 py-2 m-auto my-6 font-semibold duration-200 rounded-md bg-cream-100 hover:bg-greyBlack-400 hover:text-cream-100'>Confirmar</button>
            </form>
          </div>
        </div>

        <div className='grid grid-cols-3 h-80'>
          <img src={Book?.image} alt='Not found' className='col-span-1 duration-500 ease-in rounded-md h-80 top-48 left-16 scale-70 hover:scale-105' />
          <div className='col-span-2 mr-12'>
            <h1 className='font-semibold'>Descripción: </h1>
            <h2 className='pr-2 overflow-hidden text-base tracking-tight text-justify max-h-80 columns-2'>{Book?.description}</h2>
          </div>
        </div>

        <div className='grid content-center p-6 mt-10 justify-items-center bg-zinc-300'>
          <div className='grid grid-cols-2 gap-20'>
            <div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Nombre: </h1>
                <h1>{Book?.name}</h1>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Autor: </h1>
                <h2>{Book?.author}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Categoria: </h1>
                <h2>{Book?.category}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Paginas: </h1>
                <h2>{Book?.pages}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Editorial: </h1>
                <h2>{Book?.publisher}</h2>
              </div>
            </div>
            <div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Rating: </h1>
                <h2>{Book?.rating}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Precio: </h1>
                <h2>{Book?.price}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Publicación: </h1>
                <h2>{Book?.released}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Lenguaje: </h1>
                <h2>{Book?.language}</h2>
              </div>
              <div className='grid grid-cols-2'>
                <h1 className='font-semibold'>Generos: </h1>
                <div className='flex'>
                  {Book?.generos?.map((g, i) => { return <h2 className='mr-2' key={i} >{g.genre}</h2> })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
