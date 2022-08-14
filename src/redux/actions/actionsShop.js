import { USER_CART } from "./variables";
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

export const userCart = () => async(dispatch) => {
    const { data } = await axios.get("/user/getcart", {headers:{Authorization: `Bearer ${window.localStorage.getItem("token")}`}})
    const cartBooks = data.Libros
    dispatch({
        type: USER_CART,
        payload: cartBooks
    })
}