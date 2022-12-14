import { GET_ALL_BOOKS, GET_BOOK_BY_ID, GET_BOOKS_BY_NAME, GET_BOOK_BY_GENRE, GET_GENRE, GET_YEARS, GET_BOOKS_BY_YEARS, GET_BOOKS_RATING, USER_ROLE, GET_ALL_USERS, GET_USERS_BY_NAME, GET_USER, ORDER_BY_NAME, ORDER_BY_BOOKS, BOOK_DETAIL, CLEAN_UP_DETAIL, GET_USER_PANEL, GET_BOOKS_PANEL, GET_DETAIL_BOOK_PANEL, USER_FAVO, DELETE_FAVO_BOOK, DELETE_ALL_FAVO_BOOKS} from "./variables";
import axios from "axios";
import Swal from "sweetalert2";



export let getAllBooks = ()=> async(dispatch)=>{
    try {
        let result = (await axios.get('/books?size=1')).data;
        let getAllBooks = (await axios.get(`/books?size=${result.totalBooks}`)).data;
        dispatch({
            type: GET_ALL_BOOKS,
            payload: getAllBooks.content
        })
    } catch (error) {
        console.log(error)
    }
}

export let getBookByID = (id)=> async(dispatch)=>{
    try {
        let bookByID = (await axios.get(`/books/${id}`)).data;
        dispatch({
            type: GET_BOOK_BY_ID,
            payload: bookByID
        })
    } catch (error) {
        console.log(error)
    }
}

export let getBookByName = (name)=> async(dispatch)=>{
    try {
        let totalBooks = (await axios.get(`/books?name=${name}`)).data.totalBooks;
        let bookByName = (await axios.get(`/books?name=${name}&size=${totalBooks}`)).data;
        dispatch({
            type: GET_BOOKS_BY_NAME,
            payload: {Books: bookByName.content, name} 
        })
    } catch (error) {
        console.log(error)
    }
}

export let getBooksGenres = (genre)=> async(dispatch)=>{
    try {
        let getGenresDB = (await axios.get(`/genres?genre=${genre}`)).data;
        dispatch({
            type: GET_BOOK_BY_GENRE,
            payload: getGenresDB.content
        }) 
    } catch (error) {
        console.log(error)
    }
}

export let getGenres = ()=> async(dispatch)=>{
    try {
        let getGenresDB = (await axios.get('/genres')).data;
        dispatch({
            type: GET_GENRE,
            payload: getGenresDB
        })
    } catch (error) {
        console.log(error)
    }
}

export let getYears = () => async(dispatch)=>{
    try {
        const totalBooks = (await axios.get(`/books?size=1`)).data.totalBooks;
        let getyears = (await axios.get(`/books?size=${totalBooks}`)).data;
        dispatch({
            type: GET_YEARS,
            payload: getyears.content
        })
    } catch (error) {
        console.log(error)
    }
}

export let getBooksByYears = (yearsToFilter) => async (dispatch) =>{
    const totalBooks = (await axios.get(`/books?size=1`)).data.totalBooks;
    let getAllBooks = (await axios.get(`/books?size=${totalBooks}`)).data;
    let filterBooks = [];
    let yearsToNumber = yearsToFilter.split('-').map(y => Number(y));
    for (let i = 0; i < getAllBooks.content.length; i++) {
        if (Number(getAllBooks.content[i].released.slice(0, 4)) >= yearsToNumber[0] && Number(getAllBooks.content[i].released.slice(0, 4)) < yearsToNumber[1]) {
            filterBooks.push(getAllBooks.content[i]);
        }
    }
    return dispatch({
        type: GET_BOOKS_BY_YEARS,
        payload: {filterBooks, yearsToFilter}
    })
}

export let postBook = (data2) => async(dispatch)=>{
    try {
        const token = window.localStorage.getItem('token');
        if(token !== undefined && token !== null){
            const { data } = await axios.post('/books', data2, {
            headers:{
                Authorization: `Bearer ${token}`
            }
            })
            if(data.hasOwnProperty("role")){
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario invalido',
                    text: 'Vuelve a conectarte',
                }).then(result=>{
                    if(result.isConfirmed){
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        window.location.href = '/'
                    }
                })
            }else if(data === "YES"){
                Swal.fire({
                    icon: 'success',
                    title: 'Libro posteado',
                    text: `El libro ${data2.name} se ha posteado correctamente.`,
                    showConfirmButton: false,
                    timer: 3000
                }).then(()=>window.location.href='/')
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

export let getForRating = () => async(dispatch)=>{
    try {
        let res = (await axios.get('/books?size=57')).data;
        dispatch({
            type: GET_BOOKS_RATING,
            payload: res.content
        })
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = (user) => async()=>{
    await axios.post('/auth/register',user)
        .then(({data})=>{
            if(typeof data === 'object') {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error,
                })
            } else {
                return Swal.fire(
                    'Confirmar!',
                    `${data}`,
                    'success'
                ).then(()=>window.location.reload())
            }
        }
    )
}

export const googleLogRes = (user) => async() => {
    return await axios.post('/auth/google', user)
    .then(async ({data})=>{
        if(data.error){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error,
                })
        }else{
            window.localStorage.setItem('token',data.token)
            await Swal.fire({
                title: `Bienvenido ${user.email}`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return window.location.href='/';
        }
    })
}

export const loginUser = (user) => async()=>{
    try{
        return await axios.post('/auth/login',user)
            .then(async ({data})=>{
                if(data.error){
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                        })
                }else{
                    window.localStorage.setItem('token',data.token)
                    await Swal.fire({
                        title: `Bienvenido ${user.email}`,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    return window.location.href='/';
                }
            })
    }
    catch(error){
        console.log(error);
    }
}

export const userRole = (token) => async(dispatch) =>{
    try {
        let action;
        if(token === undefined || token === null){
            action = 'invalid'
        }else{
            const { data } = await axios.get('/auth/user',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            action = data.role
        }
        dispatch({
            type:USER_ROLE,
            payload: action
        })
    } catch (error) {
        console.log(error)
    }
}

export let getAllUsers = (token)=> async(dispatch)=>{
    try {
        let getAllUsers = await axios.get('/admin/users',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>data)

        dispatch({
            type: GET_ALL_USERS,
            payload: getAllUsers
        })
    } catch (error) {
        console.log(error)
    }
}

export let getUser = (token)=> async(dispatch)=>{
    try {
        if(token !== undefined && token !== null){
            let getUser = await axios.get(`/admin/usersDetail`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(({data})=>data)

            dispatch({
                type: GET_USER,
                payload: getUser
            })  
        }
        
    } catch (error) {
        console.log(error)
    }
}

export let getUserByName = (name)=> async(dispatch)=>{
    try {

        let userByName = (await axios.get(`/admin/users?name=${name}`)).data;
        dispatch({
            type: GET_USERS_BY_NAME,
            payload: userByName 
        })
    } catch (error) {
        console.log(error)
    }
}

export let putUser = (email, data) => async()=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            const {data} = await axios.put(`/admin/putuser/${email}`, data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })   
        }
        if(data){
            window.location.reload();
        }
        
    } catch (error) {
        console.log(error)
    }
}

export let putBook = (id, data) => async()=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            await axios.put(`/admin/putbook/${id}`, data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }) 
        }
        
    } catch (error) {
        console.log(error)
    }
}

export let deleteUser = (email,status) => async()=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            await axios.delete(`/admin/deleteuser/${email}/${status}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(r => window.location.reload()) 
        }
        
    } catch (error) {
        console.log(error)
    }
}

export let deleteBook = (id) => async()=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            await axios.delete(`/admin/deletebook/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(r => window.location.reload())
        }
    } catch (error) {
        console.log(error)
    }
}

export const orderByName = payload => {
    return{
        type: ORDER_BY_NAME,
        payload,
    }
}

export const orderByBooks = payload => {
    return{
        type: ORDER_BY_BOOKS,
        payload,
    }
}

export let bookDetail = (id) => async(dispatch) => {
    try {
        let bookByID = (await axios.get(`/books/${id}`)).data;
        dispatch({
            type: BOOK_DETAIL,
            payload: bookByID
        })
    } catch (error) {
        console.log(error)
    }
}

export const cleanUpDetailState = () => {
    return{
        type: CLEAN_UP_DETAIL
    }
}


export let userDetailPanel = () => async(dispatch) => {
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            let detailUserPanel = (await axios.get(`/userPanel/getUser`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })).data;
            dispatch({
                type: GET_USER_PANEL,
                payload: detailUserPanel
            }) 
        }   
    } catch (error) {
        console.log(error)
    }
}

export let booksPanel = () => async(dispatch) => {
    try {
        const token = window.localStorage.getItem('token');
        if(token !== undefined && token !== null){
            let getBooks = (await axios.get(`/userPanel/getBooks`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })).data;
            dispatch({
                type: GET_BOOKS_PANEL,
                payload: getBooks
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export let bookDetailPanel = (id) => async(dispatch) => {
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            let bookByID = (await axios.get(`/userPanel/getBooks/${id}`,{headers:{
                Authorization: `Bearer ${token}`
            }})).data;

            dispatch({
                type: GET_DETAIL_BOOK_PANEL,
                payload: bookByID
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

export let deleteBookPanel = (id) => async()=>{
    try {
        const token = window.localStorage.getItem('token');
        if(token !== undefined && token !== null){
            await axios.delete(`/userPanel/deleteBook/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(r => window.location.reload()) 
        }
    } catch (error) {
        console.log(error)
    }
}

export let deleteUserPanel = (email) => async()=>{
    try {
        const token = window.localStorage.getItem('token');
        if(token !== undefined && token !== null){
            await axios.delete(`/userPanel/deleteUser/${email}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(r => window.location.reload())
        }
    } catch (error) {
        console.log(error)
    }
}

export let putUserPanel = (email, data) => async()=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            await axios.put(`/userPanel/putUser/${email}`, data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export let putUserBook = (id, data) => async()=>{
    try {
        const token = window.localStorage.getItem('token');
        if(token !== undefined && token !== null){
            await axios.put(`/userPanel/putBook/${id}`, data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export let addToFavo = (id) => async()=>{
    try {
        const token = window.localStorage.getItem("token");
        if(token !== undefined && token !== null){
            const { data } = await axios.post(`/userPanel/addtofavo`, {id: id}, {headers:{Authorization: `Bearer ${token}`}})
            if(data.hasOwnProperty("role")){
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario invalido',
                    text: 'Vuelve a conectarte',
                }).then(result=>{
                    if(result.isConfirmed){
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        window.location.href = '/'
                    }
                })
            }else if(data.message === "El libro fue agregado"){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Libro agregado a favoritos',
                    showConfirmButton: false,
                    timer: 1000
                })
            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'El libro ya se encuentra en favoritos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const userFavo = () => async(dispatch) => {
    const token = window.localStorage.getItem("token")
    if(window.localStorage.getItem("token")==='null')return;
    if(token !== null && token !== undefined){
        const { data } = await axios.get("/userPanel/getfavo", {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
        if(data.hasOwnProperty("role")){
            Swal.fire({
                icon: 'error',
                title: 'Usuario invalido',
                text: 'Vuelve a conectarte',
            }).then(result=>{
                if(result.isConfirmed){
                    window.localStorage.removeItem("token")
                    window.location.reload()
                    window.location.href = '/'
                }
            })
        }else{
            const favoBooks = data.Libros
            dispatch({
                type: USER_FAVO,
                payload: favoBooks
            })
        }
    }
}

export const deleteFavoBook = (id) => async(dispatch) => {
    try{
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const {data} = await axios.delete("/userPanel/removetofavo",{headers:{Authorization: `Bearer ${token}`},data:{id:id}})
            if(data.hasOwnProperty("role")){
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario invalido',
                    text: 'Vuelve a conectarte',
                }).then(result=>{
                    if(result.isConfirmed){
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        window.location.href = '/'
                    }
                })
            }else{
                dispatch({type:DELETE_FAVO_BOOK, payload:data})
            }
        }
    }catch(err){
        console.log(err)
    }
}

export const deleteAllCartBooksFavo = () => async(dispatch) => {
    try{
        const token = window.localStorage.getItem("token");
        if(token !== undefined && token !== null){
            const {data} = await axios.delete('/userPanel/removeallbooksfavo', {headers:{Authorization: `Bearer ${token}`}});
            if(data.hasOwnProperty("role")){
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario invalido',
                    text: 'Vuelve a conectarte',
                }).then(result=>{
                    if(result.isConfirmed){
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        window.location.href = '/'
                    }
                })
            }else{
                dispatch({type:DELETE_ALL_FAVO_BOOKS})
            }
        }
    }catch(err){
        console.log(err)
    }
}

export let postComent = (id, Comentario) => async(dispatch)=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            const nuevoComentario = await axios.post(`/userPanel/addtoComent/${id}`, {Comentario}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(nuevoComentario.data.hasOwnProperty("role")){
                return Swal.fire({
                    icon: 'error',
                    title: 'Usuario invalido',
                    text: 'Vuelve a conectarte',
                }).then(result=>{
                    if(result.isConfirmed){
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        window.location.href = '/'
                    }
                })
            } else if (nuevoComentario.data.error){
                return Swal.fire({
                    icon: 'error',
                    title: nuevoComentario.data.error,
                })
            }
            else {
                return Swal.fire({
                    icon: 'success',
                    title: nuevoComentario.data,
                    showConfirmButton: false,
                    timer: 1000
                }).then(()=>window.location.reload())
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = (id) => async() => {
    try {
        const token = window.localStorage.getItem('token');
        if(token !== undefined && token !== null){
            const commentToDelete = await axios.delete(`/admin/deletecomment/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return Swal.fire(
                'Eliminado!',
                commentToDelete.data,
                'success'
                )
            .then(r => window.location.reload())
        }
    } catch (error) {
        console.log(error)
    }
}

export const eliminarCuenta = (password)=>async()=>{
    try {
        const token = window.localStorage.getItem('token')
        if(token !== undefined && token !== null){
            await axios.put(`/userPanel/deleteaccount`,{password:password},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(({data})=>{
                if (data.error){
                    return Swal.fire({
                        icon: 'error',
                        title: data.error,
                    })
                }else{
                    return Swal.fire(
                        'Eliminado!',
                        data,
                        'success'
                        ).then(()=>{
                            window.localStorage.removeItem("token")
                            window.location.reload()
                            window.location.href = '/'
                        })
                }
            })

        }
        
    } catch (error) {
        console.log(error)
    }
} 