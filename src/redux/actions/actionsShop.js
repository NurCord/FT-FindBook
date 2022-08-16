import { DELETE_CART_BOOK, GET_SESSION_ID, SOLD_OUT, USER_CART } from "./variables";
import axios from 'axios'
import Swal from "sweetalert2";


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

export let buyBook = (id) => async()=>{
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
                }
              })
        }else{
            window.location.href = '/shop'
        }
    } catch (error) {
        console.log(error)
    }
}

export const userCart = () => async(dispatch) => {
    const { data } = await axios.get("/user/getcart", {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
    const cartBooks = data.Libros
    dispatch({
        type: USER_CART,
        payload: cartBooks
    })
}

export const deleteCartBook = (id) => async(dispatch) => {
    try{
        const {data} = await axios.delete("/user/removetocart",{headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`},data:{id:id}})
        console.log(data)
        dispatch({type:DELETE_CART_BOOK, payload:data})
    }catch(err){
        console.log(err)
    }
}

export const stripe = (array) => async() => {
    try{
        const { data } = await axios.post('/payment/secret',{data: array}, {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
        if(data.hasOwnProperty("url")){
            window.location= data.url
        }else{
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
        }
    }catch(err){
        console.log(err)
    }
}

export const getSessionID = (session_id) => async(dispatch) =>{
    try{
        const {data} = await axios.get(`/payment/secret?session_id=${session_id}`, {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
        console.log(data)
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
           dispatch({
                type: GET_SESSION_ID,
                payload: data
            }) 
        }
    }catch(err){
        console.log(err.message)
        if(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Aqui no hay nada',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                window.location.href = '/'
              })
        }
    }
}

export const soldOut = () => {
    return {
        type: SOLD_OUT
    }
}