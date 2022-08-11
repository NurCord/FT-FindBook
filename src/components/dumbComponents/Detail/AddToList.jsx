import React, { useState } from 'react'
import { ButtonDetail } from './stayleComponentDetail'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export default function AddToList({ id }) {

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
            SetAdded(!added)
        }
    }
  return (
    <div>
        {
            !added ? 
            <ButtonDetail onClick={handleOnClick}>Agregar a lista de deseados</ButtonDetail> :
            <ButtonDetail onClick={handleOnClick}>Quitar de lista de deseados</ButtonDetail>
        }
        
    </div>
  )
}
