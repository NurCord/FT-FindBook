import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrdersById } from "../../../redux/actions/actionsShop";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.user.orderDetail);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserOrdersById(id));
  }, []);

  if (orderDetail.hasOwnProperty("message")) {
    return (
      <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <div className="flex flex-col ml-3">
              <h1>No se encontro la lista de compras buscada</h1>
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
            <div className="flex flex-col ml-3">
              <span className="flex-col text-gray-900 pt-4 text-xl font-bold">
                ID de la compra: {orderDetail.compras_id}
              </span>
              <div className="flex-col text-gray-900">
                  <span className="pt-4 text-xl font-bold">
                    Precio total: USD${orderDetail.totalPrice}
                  </span>
              </div>
              {orderDetail.items?.map((item) => {
                return (
                  <div>
                    <span className="font-bold p-1">
                     Libro: {item.Book.name}
                    </span>
                    <img
                      src={item.Book.image}
                      width="60"
                      className="h-40 w-40 rounded-md border-4 border-gray-300 shadow-lg"
                      alt="Book"
                    />
                    <span className="text-md flex justify-between px-4 my-2 font-bold">
                      {item.quantity+ ' X '}
                    </span>
                    <span className="text-md flex justify-between px-4 my-2 font-bold">
                      USD ${item.subTotal}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
