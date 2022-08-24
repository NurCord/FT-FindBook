import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import CartCards from "./CartCards";
import { deleteAllCartBooks, userCart } from "../../../redux/actions/actionsShop";

export default function Shop() {
  const role = useSelector(state => state.root.role);
  const cartBooks = useSelector(state => state.shop.cartBooks)

  let dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(userCart())
  },[cartBooks])
  
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/payment")
  }

  const handleDeleteAll = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminaran todos los libros del carrito",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllCartBooks()) 
        return Swal.fire(
          'Libros eliminados',
          'Se ha vaciado tu carrito de compra',
          'success'
          )
      }
    }).then(() => dispatch(userCart()))
  }

  if(role === "user" || role === "admin"){
    return (
    <div>
      <div className="h-full bg-gray-300">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="gap-2 md:grid md:grid-cols-3 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Tu carrito</h1>
                    { cartBooks && cartBooks.length ?
                    <CartCards books={cartBooks}/> :
                    <span>Tu carrito está vacío</span>}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t">
                      <div className="flex items-center">
                        <i className="pr-2 text-sm fa fa-arrow-left"></i>
                        <span className="font-medium text-blue-500 text-md">
                          <Link to={"/"}>Continuar mirando libros</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                  { cartBooks && cartBooks.length ?
                  <div>
                    <button onClick={handleOnClick} className="w-full h-12 text-white bg-blue-500 rounded focus:outline-none hover:bg-blue-600">
                      Comprar
                    </button>
                    <button onClick={handleDeleteAll} className="w-full h-12 mt-4 text-white bg-red-500 rounded focus:outline-none hover:bg-blue-600">
                      Vaciar carrito
                    </button>
                  </div>:
                    <div></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
