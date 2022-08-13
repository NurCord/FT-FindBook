/* eslint-disable use-isnan */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UilEditAlt } from '@iconscout/react-unicons'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2";


const schema = yup.object().shape({
  name: yup.string().max(100),
  author: yup.string().max(100),
  category: yup.string().max(100),
  pages: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
  publisher: yup.string().max(100),
  description: yup.string().max(2000),
  image: yup.string().url('imagen incorrecta'),
  price: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
  released: yup.string().max(100),
  language: yup.string().max(100),
})

const possibleGenres = [  
            'arte', 'anime', 'biografía', 'biología', 'comic', 'comida', 
            'computación', 'deporte', 'derecho', 'economía', 'estudio', 'ficción', 
            'historia', 'humor', 'infantil', 'juvenil', 'matemática', 'medicina', 
            'novela', 'ocio - tiempo libre', 'política', 'salud - desarrollo personal', 'tecnología', 'terror'
        ];

export default function AdminBooK() {
  let { id } = useParams()
  let [state, setState] = useState('hidden')
  const [genres, setGenres] = useState([])
 
  /* let navigate = useNavigate()
  let dispatch = useDispatch() */
  
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    })

  function handleSelectGenre (e) {
        if (e.target.value !== 'disabled' && !genres.includes(e.target.value)) {
          setGenres([...genres, e.target.value])
        }    
  }

  function handleDeleteGenre (toDelete, e) {
        e.preventDefault()
        setGenres(genres.filter(gen => gen !== toDelete))
  }

  let handleHidden = () => {
    setState(state === 'hidden' ? '' : 'hidden')
    console.log(state);
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Confirmar!'
        }).then((result) => {
            if (result.isConfirmed) {
                if(genres.length > 0 && data.name === '' && data.author === '' && data.category === '' 
                && data.publisher === '' && data.description === '' && data.price === undefined
                && data.pages === undefined && data.released === '' && data.image === ''
                && data.language
                ){
                  return Swal.fire(
                    'No se encontraron cambios!',
                    'El Libro no fue modificado',
                    'warning'
                  )
                }
                if(genres.length > 0)data.genres = genres  
                if(data.name === '') delete data.name
                if(data.author === '') delete data.author
                if(data.category === '') delete data.category
                if(data.publisher === '') delete data.publisher
                if(data.description === '') delete data.description
                if(data.price === undefined) delete data.price
                if(data.pages === undefined) delete data.pages
                if(data.released === '') delete data.released
                if(data.image === '') delete data.image
                if(data.language === '') delete data.language
                setState('hidden')
                console.log(data)
                Swal.fire(
                    'Confirmar!',
                    `El libro ${Book.name} fue modificado`,
                    'success'
                )
            }
        }) 
    //dispatch()
    //navigate('') 
  }

  const allBooks = useSelector(s => s.root.allBooks)

  const Book = allBooks.find(e => e.id === parseInt(id))

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
                  <input
                    className='m-4 rounded-md bg-cream-100'
                    key='category'
                    type='text'
                    name='category'
                    placeholder={`${Book.category}...`}
                    {...register("category")}
                  />
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
                  <input
                    className='m-4 rounded-md bg-cream-100'
                    key='image'
                    type='text'
                    name='image'
                    placeholder={`${Book.image}...`}
                    {...register("image")}
                  />
                  {errors?.image && <p>{errors?.image.message}</p>}
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
                    type='text'
                    name='released'
                    placeholder={`${Book.released}...`}
                    {...register("released")}
                  />
                </div>
                <div className='grid content-center grid-cols-2'>
                  <label className='ml-6 font-semibold place-self-center'>Idioma:</label>
                  <input
                    className='m-4 rounded-md bg-cream-100'
                    key='language'
                    type='text'
                    name='language'
                    placeholder={`${Book.language}...`}
                    {...register("language")}
                  />
                </div>
                <div className='grid content-center grid-cols-1 justify-items-center'>
                <select multiple name='genre' className="w-56 h-10 text-center align-top rounded-lg text-slate-600 focus:h-auto" onChange = {(e) => handleSelectGenre(e)}>
                    <option value="disabled">--Genero--</option>
                    {
                        possibleGenres.map((gen, i)  => ( <option key={i} value={gen}>{gen}</option> ))
                    }
                </select>
                <div className = "flex flex-col items-center">
                    {
                      genres.length > 0 && genres?.map((gen, i) => 
                            <div key={i} className="flex items-center py-1 no-underline text-slate-400">
                                <p>Añadido: &nbsp;{gen}&nbsp;</p>{<button className ='px-1 border rounded-lg bg-stone-100' onClick={(e) => handleDeleteGenre(gen, e)}>&nbsp;Borrar</button>}
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
              <h2 className='pr-2 text-justify columns-2'>{Book?.description}</h2>
          </div>
        </div>

        <div className='grid content-center py-6 mt-10 justify-items-center bg-zinc-300'>
          <div className='grid grid-cols-2 gap-52'>
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
                {Book?.generos?.map(g => { return <h2>{g.genre}</h2> })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
