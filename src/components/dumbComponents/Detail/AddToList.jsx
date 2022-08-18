import React, { useState } from 'react'
import { ButtonDetail } from './stayleComponentDetail'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx'

export default function AddToList({ id }) {

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
                cancelButtonText: 'Cancelar',
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
