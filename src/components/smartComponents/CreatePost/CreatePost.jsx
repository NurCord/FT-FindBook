import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { postBook } from "../../../redux/actions/actions";
import Swal from "sweetalert2";
import clsx from 'clsx'

// lógica validación
function validator(form) {
    // const re = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    let forbidden = {};
    // let imageValidator = re.test(form.image)
    Object.keys(form).forEach(property => {
        if (!form[property]) {
            forbidden.title = `Todos los campos son obligatorios`;
        }
    })
    if (form.genre.length === 0) forbidden.genre = '';
    if (form.category.length === 0) forbidden.category = '';
    if (isNaN(form.pages)) forbidden.pages = 'Número de páginas debe ser un número';
    else if (Number(form.pages) < 0) forbidden.pages = 'Número de páginas debe ser un número positivo';
    else if (!Number.isInteger(Number(form.pages))) forbidden.pages = 'Número de páginas debe ser un número entero';
    if (form.description.length > 2000) forbidden.description = 'La descripción es muy larga';
    // if (form.image.length > 0 && !imageValidator) forbidden.image = 'Enlace URL imagen inválido';
    if (form.rating.length === 0) forbidden.rating = '';
    if (isNaN(form.price)) forbidden.price = 'Precio debe ser un número';
    else if (Number(form.price) < 0) forbidden.price = 'Precio debe ser un número positivo';
    if (!form.released) forbidden.released = '';
    if (form.language.length === 0) forbidden.language = '';
    return forbidden;
}

let state = {
    name: '',
    author: '',
    genre: [],
    category: '',
    pages: '',
    publisher: '',
    description: '',
    image: '',
    rating: '',
    price: '',
    released: '',
    language: ''
}

export default function CreatePost() {
    // const { register, handleSubmit, errors } = useForm({
    //     resolver: yupResolver(bookSchema),
    // });
    // Declaración de estados
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector(state => state.root.role);
    const [ form, setForm ] = useState({
        name: '',
        author: '',
        genre: [],
        category: '',
        pages: '',
        publisher: '',
        description: '',
        image: '',
        rating: '',
        price: '',
        released: '',
        language: ''
    });
    const [ forbidden, setForbidden ] = useState({});

    // lógica cargue de portada de libro
    const [ bookCover, setBookCover ] = useState('');
    const [ loadingBookCover, setLoadingBookCover ] = useState(false);
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
        setForm({
            ...form,
            image: file.secure_url
        })
        setLoadingBookCover(false);
    }

    // lógica posteo
    function handleSelectCategory (e) {
        e.preventDefault()
        if (e.target.value !== 'disabled' && !form.category.includes(e.target.value)) {
            setForm({
                ...form,
                category: [e.target.value]
            })
        }
    }

    function handleSelectRating (e) {
        e.preventDefault()
        if (e.target.value !== 'disabled' && !form.rating.includes(e.target.value)) {
            setForm({
                ...form,
                rating: [e.target.value]
            })
        }
    }

    function handleSelectLanguage (e) {
        e.preventDefault()
        if (e.target.value !== 'disabled' && !form.language.includes(e.target.value)) {
            setForm({
                ...form,
                language: [e.target.value]
            })
        }
    }

    function handleSelectGenre (e) {
        e.preventDefault()
        if (e.target.value !== 'disabled' && !form.genre.includes(e.target.value)) {
            setForm({
                ...form,
                genre: [...form.genre, e.target.value]
            })
        }
    }

    function handleDeleteGenre (toDelete, e) {
        e.preventDefault()
        setForm({
            ...form,
            genre: form.genre.filter(gen => gen !== toDelete)
        })
    }

    function handleFormChange (e) {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        setForbidden(validator({
            ...form,
            [e.target.name]: e.target.value
        }))
    };
    function handleFormSubmit (e) {
        e.preventDefault();
        setForbidden(validator(form))
        if(Object.keys(forbidden).length !== 0 || form === state){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
        }
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
            if (result.isConfirmed) {
                form.category = form.category[0];
                form.pages = Number(form.pages);
                form.rating = Number(form.rating[0]);
                form.price = Number(form.price);
                form.released = form.released + '';
                form.language = form.language[0];
                dispatch(postBook(form));
                // setForm(state)
                // navigate('/');
                // window.location.reload();
                // Swal.fire(
                //     'Confirmar!',
                //     `El libro ${form.name} fue publicado`,
                //     'success'
                // )
            }
        })
    }

    function RatingSelector() {
        const possibleRatings = [1, 2, 3, 4, 5];
        return (
            <div>
                <select name = 'rating' className ={clsx( 
                    "desktop:w-56 desktop:text-center desktop:rounded-lg text-slate-600"
                )} 
                onChange = {(e) => handleSelectRating(e)}> {/*RatingSelector*/}
                    <option /*disabled={true}*/ value="disabled">--Seleccionar--</option>
                    {
                        possibleRatings.map(r  => ( <option key = {r} value = {r}>{r}</option> ))
                    }
                </select>
                <div>
                    {form.rating &&
                        (<div className = 'text-slate-400'>
                            <p>Puntaje asignado: &nbsp;{form.rating}</p>
                        </div>)}
                </div>
            </div>
        )
    }

    function CategorySelector() {
        const possibleCategories = ['todos', '12+', '16+', '18+', 'sin clasificación'];
        return (
            <div>
                <select name = 'category' className = "w-56 text-center rounded-lg text-slate-600" onChange = {(e) => handleSelectCategory(e)}> {/*CategorySelector*/}
                    <option /*disabled={true}*/ value="disabled">--Seleccionar--</option>
                    {
                        possibleCategories.map((cat, i)  => ( <option key = {i} value = {cat}>{cat}</option> ))
                    }
                </select>
                <div>
                {form.category &&
                        (<div className = "text-slate-400">
                            <p>Categoría asignada: &nbsp; {form.category}</p>
                        </div>)}
                </div>
            </div>
        )
    }

    function LanguageSelector() {
        const possibleLanguages = ['español', 'inglés', 'otro'];
        return (
            <div>
                <select name = 'language' className = "w-56 text-center rounded-lg text-slate-600" onChange = {(e) => handleSelectLanguage(e)}> {/*LanguageSelector*/}
                    <option /*disabled={true}*/ value="disabled">--Seleccionar--</option>
                    {
                        possibleLanguages.map((lang, i)  => ( <option key = {i} value = {lang}>{lang}</option> ))
                    }
                </select>
                <div className = "flex justify-center">
                    {form.language &&
                        (<div className = "flex items-center no-underline text-slate-400">
                            <p>Lenguaje seleccionado: &nbsp; {form.language}</p>
                        </div>)}
                </div>
            </div>
        )
    }

    function GenreSelector() {
        const possibleGenres = [
            'arte', 'biografía', 'biología', 'comic', 'comida',
            'computación', 'deporte', 'derecho', 'economía', 'estudio', 'ficción',
            'historia', 'humor', 'infantil', 'juvenil','manga', 'matemática', 'medicina',
            'novela', 'ocio - tiempo libre', 'política', 'salud - desarrollo personal', 'tecnología', 'terror'
        ];
        return (
            <div>
                <select multiple value = {form.genre} name = 'genre' className = "h-10 align-top w-56 text-center rounded-lg text-slate-600 focus:h-auto" onChange = {(e) => handleSelectGenre(e)}> {/*GenreSelector*/}
                    <option /*disabled={true}*/ value="disabled">--Seleccionar--</option>
                    {
                        possibleGenres.map((gen, i)  => ( <option key = {i} value = {gen}>{gen}</option> ))
                    }
                </select>
                <div className = "flex flex-col items-center">
                    {
                        form.genre?.map((gen, i) => 
                            <div key = {i} className = "flex items-center py-1 no-underline text-slate-400">
                                <p>Añadido: &nbsp;{gen}&nbsp;</p>{<button className = 'px-1 border rounded-lg bg-stone-100' onClick = {(e) => handleDeleteGenre(gen, e)}>&nbsp;Borrar</button>}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    // Renderizar formulario
    if(role !== "invalid"){
    return (
        <div className ={clsx( 
            "flex flex-col items-center justify-center h-full desktop:mt-8 text-center"
            )}> {/*Container*/}
            <div className ={clsx(  
                'mobile:px-2',
                "desktop:w-2/3 desktop:px-20 rounded bg-cream-100"
                )}> {/*Background bg-slate-900*/}
                <h1 className ={clsx(  
                    "pt-5 desktop:text-lg text-zinc-600")}>PUBLICA TU LIBRO PARA VENTA</h1>
                <br></br>
                <form onSubmit={e => handleFormSubmit (e)}> {/*FormContainer*/}
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center',
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className ={clsx(   
                            "flex items-center"
                        )}>
                            <label>Título:</label>
                            <label className = "text-orange-600 justify-self-center">{forbidden.name && forbidden.name}</label>
                        </div>
                        <input type = 'text' value = {form.name} name = 'name' autoComplete = 'off' onChange={e => handleFormChange (e)} className = "w-56 rounded-lg"/>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Autor:</label>
                            <label className = "text-orange-600">{forbidden.author && forbidden.author}</label>
                        </div>
                        <input type = 'text' value = {form.author} name = 'author' autoComplete = 'off' onChange={e => handleFormChange (e)} className = "w-56 rounded-lg"/>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}>  {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Género(s):</label>
                            <label className = "text-orange-600">{forbidden.genre && forbidden.genre}</label>
                        </div>
                        {GenreSelector()}
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}>{/*FormItem text-slate-50*/}
                        <div className = "flex items-center">
                            <label>Categoría:</label>
                            <label className = "text-orange-600">{forbidden.category && forbidden.category}</label>
                        </div>
                        {CategorySelector()}
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Número de páginas:</label>
                            <label className = "text-orange-600">{forbidden.pages && forbidden.pages}</label>
                        </div>
                        <input type = 'text' value = {form.pages} name = 'pages' autoComplete = 'off' onChange={e => handleFormChange (e)} className = "w-56 rounded-lg"/>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Editorial:</label>
                            <label className = "text-orange-600">{forbidden.publisher && forbidden.publisher}</label>
                        </div>
                        <input type = 'text' value = {form.publisher} name = 'publisher' autoComplete = 'off' onChange={e => handleFormChange (e)} className = "w-56 rounded-lg"/>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}>{/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Imagen o Portada:</label>
                            <label className = "text-orange-600 justify-self-center">{forbidden.image && forbidden.image}</label>
                        </div>
                        {/*value = {form.image}*/}
                        <div className = "h-12 flex items-center">
                            <input type = 'file' name = 'file' accept = ".jpg, .jpeg, .png" onChange={ upLoadBookCover } className = "w-56"/>
                        </div>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Puntaje:</label>
                            <label className = "text-orange-600">{forbidden.rating && forbidden.rating}</label>
                        </div>
                        {RatingSelector()}
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Precio:</label>
                            <label className = "text-orange-600">{forbidden.price && forbidden.price}</label>
                        </div>
                        <input type = 'text' value = {form.price} name = 'price' autoComplete = 'off' onChange={e => handleFormChange (e)} className = "w-56 rounded-lg"/>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Fecha de publicación:</label>
                            <label className = "text-orange-600">{forbidden.released && forbidden.released}</label>
                        </div>
                        <input type = 'date' value = {form.released} name = 'released' onChange={e => handleFormChange (e)} className = "w-56 text-center rounded-lg text-slate-600"/>
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}>{/*FormItem*/}
                        <div className = "flex items-center">
                            <label>Idioma:</label>
                            <label className = "text-orange-600">{forbidden.language && forbidden.language}</label>
                        </div>
                        {LanguageSelector()}
                    </div>
                    <div className ={clsx(   
                        'mobile:grid mobile:justify-items-center', 
                        "desktop:flex desktop:justify-between mb-1 text-zinc-600")}> {/*FormItem*/}
                        <div className = "flex items-center pt-2">
                            <label className = "flex items-start">Descripción:</label>
                            <label className = "text-orange-600">{forbidden.description && forbidden.description}</label>
                        </div>
                        <textarea type = 'text' value = {form.description} name = 'description' autoComplete = 'off' onChange={e => handleFormChange (e)} className = "w-full rounded-lg"/>
                    </div>
                    <div> {/*ErrorDiv*/}
                        {
                            forbidden.title && ( <p key = 'title' className = "flex text-orange-600">{forbidden.title}</p> )
                        }
                    </div>
                    <br></br>
                    <br></br>
                    <div className = "flex flex-nowrap pb-4 justify-evenly"> {/*ButtonsDiv*/}
                        {
                            Object.entries(forbidden).length === 0 ?
                                <div> {/*PostButtonDiv*/}
                                    <button type = 'submit' className ={clsx(  
                                        'mobile:w-40 mobile:mx-2 mobile:h-14',
                                        "px-4 py-3 mb-2 font-medium no-underline desktop:w-60 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400"
                                    )}>Publicar</button>
                                </div>
                                :
                                <div> {/*PostButtonDisabledDiv*/}
                                    <button type = 'submit' className ={clsx(  
                                        'mobile:w-40 mobile:h-14 mobile:mx-2 ',
                                        "px-4 py-1 mb-2 font-medium text-gray-800 no-underline pointer-events-none desktop:w-60 rounded-2xl bg-zinc-600")}>Publicar</button>
                                </div>
                        }
                        <div> {/*GoBackDiv*/}
                            <Link to = '/'>
                                <button className =
                                {clsx(  
                                    'mobile:w-40 mobile:h-14 mobile:mx-2 ', 
                                    "px-4 py-1 font-medium no-underline desktop:w-60 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400"
                                    )}>Cancelar {'&'} Volver</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    }else{
        Swal.fire({
            title: 'Debes estar conectado',
            showDenyButton: true,
            confirmButtonText: 'Inicio',
            denyButtonText: `Conectar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                navigate('/')
            } else if (result.isDenied) {
                navigate("/login")
            }
        })
    }
}