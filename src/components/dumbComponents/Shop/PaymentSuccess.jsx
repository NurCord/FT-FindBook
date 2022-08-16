import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSessionID } from '../../../redux/actions/actionsShop';

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const { session_id } = useParams()

  if(session_id){
    dispatch(getSessionID(session_id))
  }else{
    return <div>A donde vas picaron?</div>
  }
}
