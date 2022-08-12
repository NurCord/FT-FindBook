import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonDetail } from './stayleComponentDetail';

export default function Buy({ id }) {

    const [buy, SetBuy] = useState(false)

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
            // SetBuy(!buy)
            console.log(buy)
            navigate('/shop')
        }
    }
  return (
    <div>
        <ButtonDetail onClick={handleOnClick}>Comprar</ButtonDetail>
    </div>
  )
}
