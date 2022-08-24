import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserOrdersById,
  getUserSalesById,
} from "../../../redux/actions/actionsShop";

export default function SaleDetail() {
  const dispatch = useDispatch();
  const saleDetail = useSelector((state) => state.user.saleDetail);
  const { id, libroid } = useParams();
  useEffect(() => {
    dispatch(getUserSalesById(id, libroid));
  }, []);

  if (saleDetail.hasOwnProperty("message")) {
    return (
      <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <div className="flex flex-col ml-3">
              <h1>{saleDetail.message}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen grid place-items-center font-mono bg-gray-900">
        <div className="bg-white rounded-md  shadow-lg">
          <div className="md:flex px-4 leading-none max-w-4xl">
            <div className="flex-none ">
              <img
                src={saleDetail.bookUrl}
                alt="pic"
                className="h-72 w-56 rounded-md  transform -translate-y-4 border-4 border-gray-300 shadow-lg"
              />
            </div>

            <div className="flex-col text-gray-900">
              <p className="pt-4 text-2xl font-bold">USD${saleDetail.total}</p>
              <p className="pt-4 text-2xl font-bold">ID de la compra: {saleDetail.id}</p>
              <p className="pt-4 text-2xl font-bold">{saleDetail.bookName}</p>

              <div className="text-md flex justify-between px-4 my-2">
                <span className="font-bold">Cantidad: {saleDetail.quantity+' X '}</span>
                <span className="font-bold"></span>
              </div>

              <p className="flex text-md px-4 my-2">
                USD${saleDetail.bookPrice} 
              </p>

              
              <div className="flex-items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={saleDetail.userUrl}
                  alt="avatar del usuario"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none font-bold"> Nombre de Usuario:
                    {" "}
                    {saleDetail.userName + " " + saleDetail.userLastname}
                  </p>
                  <p className="text-gray-600 font-bold"> correo: {saleDetail.userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
