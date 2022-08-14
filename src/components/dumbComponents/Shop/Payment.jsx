import React from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const role = useSelector(state => state.root.role);
  const navigate = useNavigate()

  if(role === "user" || role === "admin"){
    return (
      <div>
        <h1>Payment</h1>
      </div>
    )
  }else{
    Swal.fire({
      title: 'Debes estar conectado',
      showDenyButton: true,
      confirmButtonText: 'Inicio',
      denyButtonText: `Conectar`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      } else if (result.isDenied) {
        navigate("/login")
      }
    })
  }
  
}
