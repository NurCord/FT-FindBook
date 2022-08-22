import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrdersById, getUserSalesById } from "../../../redux/actions/actionsShop";

export default function SaleDetail() {
  const dispatch = useDispatch();
  const saleDetail = useSelector((state) => state.user.saleDetail);
  const { id,libroid } = useParams();
  useEffect(() => {
    dispatch(getUserSalesById(id,libroid));
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
      <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <div className="flex flex-col ml-3">
              <div className="flex py-5 h-auto">
                <img
                  src={saleDetail.userUrl}
                  // width="60"
                  className="rounded-full"
                  alt="Book"
                />
                <div className="flex flex-col">
                  <span className="md:text-md font-medium">
                    ID de la compra: {saleDetail.id}
                  </span>
                  <span className="md:text-md font-medium">
                    Nombre del comprador: {saleDetail.userName +' '+saleDetail.userLastname}
                  </span>
                  <span className="md:text-md font-medium">
                    Email del comprador: {saleDetail.userEmail}
                  </span>
                </div>
              </div>
              <div>
                    <span className="md:text-xs font-light text-gray-400">
                      {saleDetail.bookName}
                    </span>
                    <img
                      src={saleDetail.bookUrl}
                      width="60"
                      className="rounded-full"
                      alt="Book"
                    />
                    <span className="md:text-xs font-light text-gray-400">
                      {saleDetail.quantity+' X '}
                    </span>
                    <span className="md:text-xs font-light text-gray-400">
                    USD${saleDetail.bookPrice}
                    </span>
                  </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="pr-8 ">
              <span className="md:text-sm font-medium">
                USD${saleDetail.total}
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
