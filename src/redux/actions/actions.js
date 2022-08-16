import { GET_ALL_BOOKS, GET_BOOK_BY_ID, GET_BOOKS_BY_NAME, GET_BOOK_BY_GENRE, GET_GENRE, GET_YEARS, GET_BOOKS_BY_YEARS, GET_BOOKS_RATING, USER_ROLE, GET_ALL_USERS, GET_USERS_BY_NAME, GET_USER, ORDER_BY_NAME, ORDER_BY_BOOKS, BOOK_DETAIL, CLEAN_UP_DETAIL} from "./variables";
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
        alert(error)
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
        alert(error)
    }
}

export let getBookByName = (name)=> async(dispatch)=>{
    try {
        let bookByName = (await axios.get(`/books?name=${name}`)).data;
        dispatch({
            type: GET_BOOKS_BY_NAME,
            payload: {Books: bookByName.content, name} 
        })
    } catch (error) {
        alert(error)
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
        alert(error)
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
        alert(error)
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
        alert(error)
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

export let postBook = (data) => async(dispatch)=>{
    try {
        await axios.post('/books', data)
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
    // try{
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
            // .catch(error => alert(error.message))
    // }
    // catch(error){
    //     console.log(error);
        // dispatch({
        //     type: REGISTER_USER_ERROR,
        //     payload: error
        // })
    // }
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
        alert(error)
    }
}

export let getUser = (username,token)=> async(dispatch)=>{
    try {
        let getUser = await axios.get(`/admin/users/${username}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>data)

        dispatch({
            type: GET_USER,
            payload: getUser
        })
    } catch (error) {
        alert(error)
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
        alert(error)
    }
}

export let putUser = (email, data) => async()=>{
    try {
        await axios.put(`/admin/putuser/${email}`, data, {
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export let putBook = (id, data) => async()=>{
    try {
        await axios.put(`/admin/putbook/${id}`, data, {
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export let deleteUser = (email) => async()=>{
    try {
        await axios.delete(`/admin/deleteuser/${email}`, {
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then(r => window.location.reload())
    } catch (error) {
        console.log(error)
    }
}

export let deleteBook = (id) => async()=>{
    try {
        await axios.delete(`/admin/deletebook/${id}`, {
            headers:{
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then(r => window.location.reload())
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
        alert(error)
    }
}

export const cleanUpDetailState = () => {
    return{
        type: CLEAN_UP_DETAIL
    }
}