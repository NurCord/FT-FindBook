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
      <div class="min-h-screen grid place-items-center font-mono bg-gray-900">
        <div class="bg-white rounded-md  shadow-lg">
          <div class="md:flex px-4 leading-none max-w-4xl">
            <div class="flex-none ">
              <img
                src={saleDetail.bookUrl}
                alt="pic"
                class="h-72 w-56 rounded-md  transform -translate-y-4 border-4 border-gray-300 shadow-lg"
              />
            </div>

            <div class="flex-col text-gray-900">
              <p class="pt-4 text-2xl font-bold">USD${saleDetail.total}</p>
              <p class="pt-4 text-2xl font-bold">ID de la compra: {saleDetail.id}</p>
              <p class="pt-4 text-2xl font-bold">{saleDetail.bookName}</p>

              <div class="text-md flex justify-between px-4 my-2">
                <span class="font-bold">Cantidad: {saleDetail.quantity+' X '}</span>
                <span class="font-bold"></span>
              </div>

              <p class="flex text-md px-4 my-2">
                USD${saleDetail.bookPrice} 
              </p>

              
              <div class="flex-items-center">
                <img
                  class="w-10 h-10 rounded-full mr-4"
                  src={saleDetail.userUrl}
                  alt="avatar del usuario"
                />
                <div class="text-sm">
                  <p class="text-gray-900 leading-none font-bold"> Nombre de Usuario:
                    {" "}
                    {saleDetail.userName + " " + saleDetail.userLastname}
                  </p>
                  <p class="text-gray-600 font-bold"> correo: {saleDetail.userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
