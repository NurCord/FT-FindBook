import { DELETE_ALL_CART_BOOKS, DELETE_CART_BOOK, GET_SESSION_ID, SOLD_OUT, USER_CART, GET_ALL_USER_ORDERS, BUTTON_STATUS, GET_USER_ORDERS_BY_ID, GET_ALL_USER_SALES, GET_TIMER, GET_USER_SALES_BY_ID } from "./variables";
import axios from 'axios'
import Swal from "sweetalert2";


export let addToCart = (id) => async()=>{
    try {
        const token = window.localStorage.getItem("token");
        if(token !== undefined && token !== null){
            const { data } = await axios.post(`/user/addtocart`, {id: id}, {headers:{Authorization: `Bearer ${token}`}})
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
        }
    } catch (error) {
        console.log(error)
    }
}

export let buyBook = (id) => async()=>{
    try {
        const token = window.localStorage.getItem("token");
        if(token !== undefined && token !== null){
            const { data } = await axios.post(`/user/addtocart`, {id: id}, {headers:{Authorization: `Bearer ${token}`}})
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
        }
    } catch (error) {
        console.log(error)
    }
}

export const userCart = () => async(dispatch) => {
    const token = window.localStorage.getItem("token")
    if(token ==='null')return;
    if(token !== null && token !== undefined){
        const { data } = await axios.get("/user/getcart", {headers:{Authorization: `Bearer ${token}`}})
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
            const cartBooks = data.Libros
            dispatch({
                type: USER_CART,
                payload: cartBooks
            })
        }
    }
}

export const deleteCartBook = (id) => async(dispatch) => {
    try{
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const {data} = await axios.delete("/user/removetocart",{headers:{Authorization: `Bearer ${token}`},data:{id:id}})
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
                dispatch({type:DELETE_CART_BOOK, payload:data})
            }
        }
    }catch(err){
        console.log(err)
    }
}

export const stripe = (array) => async() => {
    try{
        const token = window.localStorage.getItem("token");
        if(token !== undefined && token !== null){
            const { data } = await axios.post('/payment/secret',{data: array}, {headers:{Authorization: `Bearer ${token}`}})
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
        }
    }catch(err){
        console.log(err)
    }
}

export const getSessionID = (session_id) => async(dispatch) =>{
    try{
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const {data} = await axios.get(`/payment/secret/session/${session_id}`, {headers:{Authorization: `Bearer ${token}`}})
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
        }
    }catch(err){
        console.log(err)
        if(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Aqui no hay nada',
                showConfirmButton: false,
                timer: 1500
              }).then(()=>{
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

export const deleteAllCartBooks = () => async(dispatch) => {
    try{
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const {data} = await axios.delete('/user/removeallbooks', {headers:{Authorization: `Bearer ${token}`}});
    
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
                dispatch({type:DELETE_ALL_CART_BOOKS})
            }
        }
    }catch(err){
        console.log(err)
    }
}

export const getUserOrders = () =>async(dispatch) => {
    try {
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const { data } = await axios.get('/userPanel/orderlist', {headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: GET_ALL_USER_ORDERS, payload:data})
            }    
        }
    } catch (err) {
        console.log(err)
    }
}

export const getButtonStatus = () => async(dispatch) => {
    try {
        const token = window.localStorage.getItem("token")
        if(token ==='null')return;
        if(token !== undefined && token !== null){
            const { data } = await axios.get('/payment/secret/buttonstate',{headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: BUTTON_STATUS, payload:data})
            }    
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserOrdersById = (id, user_id) => async(dispatch) => {
try {
    const token = window.localStorage.getItem("token")
    if(token !== undefined && token !== null){
        if(user_id){
            const { data } = await axios.get(`/userPanel/orderlist/${id}?user_id=${user_id}`,{headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: GET_USER_ORDERS_BY_ID, payload:data})
            }
        }
        const { data } = await axios.get(`/userPanel/orderlist/${id}`,{headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: GET_USER_ORDERS_BY_ID, payload:data})
            }

    }
    } catch (error) {
        console.log(error)
    }
}

export const getUserSales = () =>async(dispatch) => {
    try {
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const { data } = await axios.get('/userPanel/sellUser', {headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: GET_ALL_USER_SALES, payload:data})
            }    
        }
    } catch (err) {
        console.log(err)
    }
}

export const getUserSalesById = (id,libroid)=>async(dispatch)=>{
    try {
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const { data } = await axios.get(`/userPanel/sellUser/${id}/${libroid}`, {headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: GET_USER_SALES_BY_ID, payload:data})
            }    
        }
    } catch (err) {
        console.log(err)
    }
}

export const getTimer = () => async(dispatch) => {
    try {
        const token = window.localStorage.getItem("token")
        if(token !== undefined && token !== null){
            const { data } = await axios.get('/payment/secret/counter', {headers:{Authorization: `Bearer ${token}`}})
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
                dispatch({type: GET_TIMER, payload:data.timer})
            }    
        }
    } catch (error) {
        console.log(error)
    }
}