import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonDetail } from './stayleComponentDetail';
import { useDispatch } from 'react-redux';
import { buyBook } from '../../../redux/actions/actionsShop';
export default function Buy({ id }) {

  const role = useSelector(state => state.root.role)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleOnClick = (e) => {
    e.preventDefault();
    if (role === "invalid") {
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
      dispatch(buyBook(id));
    }
  } 
  return (
    <div>
      <ButtonDetail onClick={handleOnClick}>Comprar</ButtonDetail>
    </div>
  )
}
