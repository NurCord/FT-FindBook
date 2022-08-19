import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFavoBook, userFavo } from '../../../redux/actions/actions'

function FavoCard({ id, name, author, image, price, language }) {
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
                dispatch(deleteFavoBook(id))
                return Swal.fire(
                    'Eliminado!',
                    'El libro ha sido retirado de favoritos',
                    'success'
                )
            }
        }).then(() => dispatch(userFavo()))
    }

    return (
        <div>
            <div className="flex justify-between items-center mt-6 pt-6">
                <div className="flex  items-center">
                    <img src={image} alt='Img Producto' width="60" className="rounded-full " />
                    <div className="flex flex-col ml-3">
                        <Link to={`/detail/${id}`}>
                            <span className="md:text-md font-medium">
                                {name}
                            </span>
                        </Link>
                        <span className="md:text-xs font-light text-gray-400">
                            {author}
                        </span>
                        <span className="md:text-xs font-light text-gray-400">
                            {language}
                        </span>
                        <div>
                            <button className='px-1 py-1 font-medium text-xs no-underline w-30 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-red-500' onClick={handleOnClick}>Quitar del carrito</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="pr-8 ">
                        <span className="md:text-sm font-medium">U$D{price}</span>
                    </div>
                    <div>
                        <i className="fa fa-close text-xs font-medium"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoCard