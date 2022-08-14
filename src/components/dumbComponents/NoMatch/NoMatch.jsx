import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function NoMatch() {
    const navigate = useNavigate();
    Swal.fire({
        title: `Aquí no hay nada para mostrar`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then(result => {
        if(result.isConfirmed) {
            navigate('/')
        }
    })
}
