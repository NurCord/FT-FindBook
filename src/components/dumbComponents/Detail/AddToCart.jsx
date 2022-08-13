import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ButtonDetail } from './stayleComponentDetail'

export default function AddToCart({ id }) {
    const [added, SetAdded] = useState(false)
    const role = useSelector(state => state.root.role)

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
            SetAdded(true)
        }
    }
  return (
    <div>
        {
            !added ? 
            <ButtonDetail onClick={(handleOnClick)} style={{background: '#bababa'}}>Agregar al carrito</ButtonDetail> :
            <ButtonDetail style={{background: '#bababa'}}>Agregar al carrito</ButtonDetail>
        }
    </div>
  )
}
