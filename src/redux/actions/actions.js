import { GET_ALL_BOOKS, GET_BOOK_BY_ID, GET_BOOKS_BY_NAME, GET_BOOK_BY_GENRE, GET_GENRE, GET_YEARS, GET_BOOKS_BY_YEARS, GET_BOOKS_RATING} from "./variables";
import axios from "axios";



export let getAllBooks = ()=> async(dispatch)=>{
    try {
        // let result = (await axios.get('https://findbook-api.herokuapp.com/books?size=1')).data;
        // let getAllBooks = (await axios.get(`https://findbook-api.herokuapp.com/books?size=${result.totalBooks}`)).data;
        let result = (await axios.get('http://localhost:3001/books?size=1')).data;
        let getAllBooks = (await axios.get(`http://localhost:3001/books?size=${result.totalBooks}`)).data;
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
        // let bookByID = (await axios.get(`https://findbook-api.herokuapp.com/books/${id}`)).data;
        let bookByID = (await axios.get(`http://localhost:3001/books/${id}`)).data;
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
        // let bookByName = (await axios.get(`https://findbook-api.herokuapp.com/books?name=${name}`)).data;
        let bookByName = (await axios.get(`http://localhost:3001/books?name=${name}`)).data;
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
        // let getGenresDB = (await axios.get(`https://findbook-api.herokuapp.com/genres?genre=${genre}`)).data;
        let getGenresDB = (await axios.get(`http://localhost:3001/genres?genre=${genre}`)).data;
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
        // let getGenresDB = (await axios.get('https://findbook-api.herokuapp.com/genres')).data;
        let getGenresDB = (await axios.get('http://localhost:3001/genres')).data;
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
        // let getyears = (await axios.get(`https://findbook-api.herokuapp.com/books?size=57`)).data;
        let getyears = (await axios.get(`http://localhost:3001/books?size=57`)).data;
        dispatch({
            type: GET_YEARS,
            payload: getyears.content
        })
    } catch (error) {
        alert(error)
    }
}

export let getBooksByYears = (yearsToFilter) => async (dispatch) =>{
    // let getAllBooks = (await axios.get(`https://findbook-api.herokuapp.com/books?size=57`)).data;
    let getAllBooks = (await axios.get(`http://localhost:3001/books?size=57`)).data;
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
        // await axios.post('https://findbook-api.herokuapp.com/books', data)
        await axios.post('http://localhost:3001/books', data)
    } catch (error) {
        console.log(error)
    }
}

export let getForRating = () => async(dispatch)=>{
    try {
        // let res = (await axios.get('https://findbook-api.herokuapp.com/books?size=57')).data;
        let res = (await axios.get('http://localhost:3001/books?size=57')).data;
        dispatch({
            type: GET_BOOKS_RATING,
            payload: res.content
        })
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = (user) => async()=>{
    try{
        await axios.post('http://localhost:3001/auth/register',user)
            .then(({data})=>console.log(data))
    }
    catch(error){
        console.log(error);
    }
}

export const loginUser = (user) => async()=>{
    try{
        await axios.post('http://localhost:3001/auth/login',user)
            .then(({data})=>window.localStorage.setItem('token',data.token))
    }
    catch(error){
        console.log(error);
    }
}


//Carrito de compra - Logearse
//