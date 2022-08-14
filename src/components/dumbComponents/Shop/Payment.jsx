import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { userCart } from '../../../redux/actions/actionsShop';

export default function Payment() {
  const role = useSelector(state => state.root.role);
  const navigate = useNavigate()
  const cartBooks = useSelector(state => state.shop.cartBooks)
  const dispatch = useDispatch()

  const [quantity, SetQuantity] = useState({})

  useEffect(() => {
    dispatch(userCart())
  }, [])
  

  const handleOnClick = () => {

  }

  if(role === "user" || role === "admin"){
    if(cartBooks && cartBooks.length){
      return (
        <div>
          <div className="h-screen bg-gray-300">
            <div className="py-12">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
                <div className="md:flex ">
                  <div className="w-full p-4 px-5 py-5">
                    <div className="md:grid md:grid-cols-3 gap-2 ">
                      <div className="col-span-2 p-5">
                        <h1 className="text-xl font-medium ">Tu carrito</h1>
                          <div> 
                            {}
                          </div> :
                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <div className="flex items-center">
                            <i className="fa fa-arrow-left text-sm pr-2"></i>
                          </div>
                        </div>
                      </div>
                      { cartBooks && cartBooks.length ?
                        <button onClick={handleOnClick} className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                          Pagar
                        </button> :
                        <div></div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal',
      }).then(result => {
        if(result.isConfirmed){
          navigate('/')
        }
      })
    }
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
