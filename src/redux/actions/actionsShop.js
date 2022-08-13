import { GET_PRICE_ITEM, LESS_COUNT_ITEM, SUM_COUNT_ITEM, USER_CART } from "./variables";
import axios from 'axios'
import Swal from "sweetalert2";

export let priceItem = (id) => async(dispatch)=>{
    try {
        let bookByID = (await axios.get(`/books/${id}`)).data;
        dispatch({
            type: GET_PRICE_ITEM,
            payload: {book: bookByID, id: id}
        })
    } catch (error) {
        alert(error)
    }
}

export let sumCountItem = () => {
    return {
        type: SUM_COUNT_ITEM
    }
}

export let lessCountItem = () => {
    return {
        type: LESS_COUNT_ITEM
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

export const userCart = () => async(dispatch) => {
    const { data } = await axios.get("/user/getcart", {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
    const cartBooks = data.Libros
    dispatch({
        type: USER_CART,
        payload: cartBooks
    })
}