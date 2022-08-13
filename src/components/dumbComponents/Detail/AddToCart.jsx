import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ButtonDetail } from './stayleComponentDetail'
import { addToCart } from '../../../redux/actions/actions'

export default function AddToCart({ id }) {
    const role = useSelector(state => state.root.role)
    const token = window.localStorage.getItem("token")
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleOnClick = (e) => {
        e.preventDefault();
        if(role === "invalid"){
            Swal.fire({
                title: 'Debes estar conectado',
                text: "¿Deseas conectarte?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Conectar'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login')
                }
              })
        }else{
            dispatch(addToCart(id, token))
        }
    }
  return (
    <div>
            <ButtonDetail onClick={(handleOnClick)} style={{background: '#bababa'}}>Agregar al carrito</ButtonDetail>
    </div>
  )
}
