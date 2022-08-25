import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserSalesById,
} from "../../../redux/actions/actionsShop";
import DetailSaleCard from "./DetailSaleCard";
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import clsx from 'clsx'

export default function SaleDetail() {
  const dispatch = useDispatch();
  const saleDetail = useSelector((state) => state.user.saleDetail);
  const { id, libroid } = useParams();
  useEffect(() => {
    dispatch(getUserSalesById(id, libroid));
  }, []);
  const handleOnClick = () => {
    window.history.back()
  }

  if (saleDetail.hasOwnProperty("message")) {
    return (
      <div>
        <div className="flex items-center justify-between pt-6 mt-6">
          <div className="flex items-center">
            <div className="flex flex-col ml-3">
              <h1>{saleDetail.message}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={clsx(
        'mobile:grid-cols-1 mobile:w-full  mobile:h-screen',
        "desktop:min-h-screen desktop:h-auto grid desktop:place-items-center text-lg font-medium bg-cream-100")}>
        <div className="absolute z-10 mobile:right-2 desktop:right-8 mobile:top-0">
          <button onClick={handleOnClick} className="grid w-12 h-12">
            <UilArrowCircleLeft className="w-9 h-9 place-self-center text-greyBlack-400" />
          </button>
        </div>
        <div class="mobile:pt-8 mobile:pb-10 desktop:pt-0 bg-white rounded-md shadow-lg">
          <div class="md:flex px-4 leading-none max-w-4xl">
            <div className="flex flex-col ml-3">
              <div className="flex justify-between m-4">
                <h2>Producto</h2>
                <h2>Subtotal</h2>
              </div>
              <div className="grid gap-4 my-4 grid-rows">
                  <DetailSaleCard
                      name={saleDetail.bookName}
                      image={saleDetail.bookUrl} 
                      cant={saleDetail.quantity}
                      price={saleDetail.bookPrice}
                      username={saleDetail.userName + " " + saleDetail.userLastname}
                      useremail={saleDetail.userEmail}
                  />
                
              </div>
              <div className="flex-col my-4">
                  <h1 className='text-end'>
                    Precio total: USD${saleDetail.total}
                  </h1>
              <p className="my-1 desktop:flex-col mobile:w-auto">
                ID de la compra: 
              </p>
              <h1 className="w-full overflow-hidden mobile:h-20 desktop:h-auto columns-1">
                {saleDetail.id}
              </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
