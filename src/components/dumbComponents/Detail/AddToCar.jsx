import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ButtonDetail } from './stayleComponentDetail'

export default function AddToCar({ id }) {
    const [added, SetAdded] = useState(false)

    const navigate = useNavigate()

    const handleOnClick = (e) => {
        e.preventDefault();
        if(!window.localStorage.getItem("token")){
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
