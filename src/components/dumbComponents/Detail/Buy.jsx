import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonDetail } from './stayleComponentDetail';

export default function Buy({ id }) {

  const [buy, SetBuy] = useState(false)
  const role = useSelector(state => state.root.role)

  const navigate = useNavigate()

  const handleOnClick = (e) => {
    e.preventDefault();
    if (role === "invalid") {
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
    } else {
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
