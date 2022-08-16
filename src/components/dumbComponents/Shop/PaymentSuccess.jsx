import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getSessionID, soldOut } from '../../../redux/actions/actionsShop';

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const { session_id } = useParams()
  const navigate = useNavigate()
  const check = useSelector(state => state.shop.soldOut)

  useEffect(() => {
    return () => {
      dispatch(soldOut())
    }
  },[])

  if(session_id){
    dispatch(getSessionID(session_id))
    if(check === true){
      Swal.fire({
        icon: 'success',
        title: 'Tu pago ha sido exitoso',
        showConfirmButton: false,
        timer: 1500
      }).then(() =>{
        navigate('/')
      })
    }
  }else{
    return <div>A donde vas picaron?</div>
  }
}
