import { GET_ALL_BOOKS, GET_BOOK_BY_ID, GET_BOOKS_BY_NAME, GET_BOOK_BY_GENRE, GET_GENRE, GET_YEARS, GET_BOOKS_BY_YEARS, GET_BOOKS_RATING, USER_ROLE, GET_ALL_USERS, GET_USERS_BY_NAME, REGISTER_USER_ERROR} from "./variables";
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
        let getyears = (await axios.get(`/books?size=57`)).data;
        dispatch({
            type: GET_YEARS,
            payload: getyears.content
        })
    } catch (error) {
        alert(error)
    }
}

export let getBooksByYears = (yearsToFilter) => async (dispatch) =>{
     let getAllBooks = (await axios.get(`/books?size=57`)).data;
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
        await axios.post('/auth/login',user)
            .then(({data})=>window.localStorage.setItem('token',data.token))
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

export let getAllUsers = ()=> async(dispatch)=>{
    try {
        let getAllUsers = (await axios.get('/admin/users')).data;
        dispatch({
            type: GET_ALL_USERS,
            payload: getAllUsers
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

export let putUser = (id) => async(dispatch)=>{
    try {
        await axios.put(`/admin/putuser/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export let putBook = (id) => async(dispatch)=>{
    try {
        await axios.put(`/admin/putbook/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export let deleteUser = (id) => async(dispatch)=>{
    try {
        await axios.delete(`/admin/deleteuser/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export let deleteBook = (id) => async(dispatch)=>{
    try {
        await axios.delete(`/admin/deletebook/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export let addToCart = (id) => async()=>{
    try {
        const { data } = await axios.post(`/user/addtocart`, {id: id}, {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
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
                    // window.history.go(-1)
                }
              })
        }else if(data.message === "El libro fue agregado"){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Libro agregado al carrito',
                showConfirmButton: false,
                timer: 1000
              })
        }else{
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'El libro ya se encuentra en el carrito',
                showConfirmButton: false,
                timer: 1500
              })
        }
    } catch (error) {
        console.log(error)
    }
}

//Carrito de compra - Logearse
//