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
      <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <div className="flex flex-col ml-3">
              <span className="md:text-md font-medium">
                ID de la compra: {orderDetail.compras_id}
              </span>
              <span className="md:text-xs font-light text-gray-400">
                      {orderDetail.user?.name}
                    </span>
              {orderDetail.items?.map((item) => {
                return (
                  <div>
                    <span className="md:text-xs font-light text-gray-400">
                      {item.Book.name}
                    </span>
                    <img
                      src={item.Book.image}
                      width="60"
                      className="rounded-full"
                      alt="Book"
                    />
                    <span className="md:text-xs font-light text-gray-400">
                      {item.quantity}
                    </span>
                    <span className="md:text-xs font-light text-gray-400">
                    USD${item.subTotal}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="pr-8 ">
              <span className="md:text-sm font-medium">
                USD${orderDetail.totalPrice}
              </span>
            </div>
            <div>
              <i className="fa fa-close text-xs font-medium"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}