import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCartBook, userCart } from '../../../redux/actions/actionsShop'
import Swal from 'sweetalert2'


export default function CartCard({ id, name, author, image, price, language}) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "El libro será eliminado ",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCartBook(id)) 
        return Swal.fire(
          'Eliminado!',
          'El libro ha sido retirado de tu carrito',
          'success'
          )
      }
    }).then(() => dispatch(userCart()))
  }

  return (
    <div>
        <div className="flex items-center justify-between pt-6 mt-6">
          <div className="flex items-center">
            <img src={image} alt='Img Producto' className="w-20 h-32 rounded-sm" />
            <div className="flex flex-col ml-3">
              <Link to={`/detail/${id}`}>
                <span className="font-medium md:text-md">
                  {name}
                </span>
              </Link>
              <span className="font-light text-gray-400 md:text-xs">
                {author}
              </span>
              <span className="font-light text-gray-400 md:text-xs">
                {language}
              </span>
              <div>
                <button className = 'px-1 py-1 text-xs font-medium no-underline w-30 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-red-500' onClick={handleOnClick}>Quitar del carrito</button>
              </div>
            </div>
          </div> 
          <div className="flex items-center justify-center">
            <div className="pr-8 ">
              <span className="font-medium md:text-sm">USD${price}</span>
            </div>
            <div>
              <i className="text-xs font-medium fa fa-close"></i>
            </div>
          </div>
        </div>
    </div>
  )
}
