import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sumCountItem, lessCountItem, userCart } from "../../../redux/actions/actionsShop";
import { userRole } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import CartCards from "./CartCards";

export default function Shop() {
  const role = useSelector(state => state.root.role);
  const cartBooks = useSelector(state => state.shop.cartBooks)
  const [cantidad, setCantidad] = useState({})

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(userCart())
  },[])
  
  const navigate = useNavigate();
  if(role === "user" || role === "admin"){
    //<CartCards books={cartBooks} cantidad={cantidad} /> => a renderizar books.length(si hay libros en el array) mapear <card id:{id} name.... imagen..... price... cantidad={cantidad}/>
    return (
    <div>
      <div className="h-screen bg-gray-300">
        <div className="py-12">
          { cartBooks.length ? 
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Tu carrito</h1>
                    <CartCards books={cartBooks} cantidad={cantidad}/>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <i className="fa fa-arrow-left text-sm pr-2"></i>
                        <span className="text-md  font-medium text-blue-500">
                          <Link to={"/"}>Continua comprando</Link>
                        </span>
                      </div>
                      <div className="flex justify-center items-end">
                        <span className="text-sm font-medium text-gray-400 mr-1">
                          Subtotal:
                        </span>
                        <span className="text-lg font-bold text-gray-800 ">
                          {" "}
                        </span>
                      </div>
                    </div>
                  </div>
                    <button className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                      Pagar
                    </button>
                </div>
              </div>
            </div>
          </div>: 
          <div>Tu carrito esta vacio</div>
          }
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate('/')
      } else if (result.isDenied) {
        navigate("/login")
      }
    })
  }
  
}
