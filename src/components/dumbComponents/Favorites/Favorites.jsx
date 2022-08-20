import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import FavoCards from "./FavoCards";
import { deleteAllCartBooksFavo, userFavo } from "../../../redux/actions/actions";

export default function Favorites() {
    const role = useSelector(state => state.root.role);
    const favoBooks = useSelector(state => state.user.favoBooks)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(userFavo())
    }, [favoBooks])

    const navigate = useNavigate();

    const handleDeleteAll = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminaran todos los libros de favoritos",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAllCartBooksFavo())
                return Swal.fire(
                    'Libros eliminados',
                    'Se ha vaciado tu lista de favoritos',
                    'success'
                )
            }
        }).then(() => dispatch(userFavo()))
    }

    if (role === "user" || role === "admin") {
        return (
            <div>
                <div className="h-screen bg-gray-300">
                    <div className="py-12">
                        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
                            <div className="md:flex ">
                                <div className="w-full p-4 px-5 py-5">
                                    <div className="md:grid md:grid-cols-3 gap-2 ">
                                        <div className="col-span-2 p-5">
                                            <h1 className="text-xl font-medium ">Favoritos</h1>
                                            {favoBooks && favoBooks.length ?
                                                <FavoCards books={favoBooks} /> :
                                                <span>Favoritos está vacío</span>}
                                            <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                                <div className="flex items-center">
                                                    <i className="fa fa-arrow-left text-sm pr-2"></i>
                                                    <span className="text-md  font-medium text-blue-500">
                                                        <Link to={"/"}>Continuar mirando libros</Link>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {favoBooks && favoBooks.length ?
                                            <div>
                                                <button onClick={handleDeleteAll} className="h-12 w-full mt-4 bg-red-500 rounded focus:outline-none text-white hover:bg-blue-600">
                                                    Vaciar Lista De Favoritos
                                                </button>
                                            </div> :
                                            <div></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
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