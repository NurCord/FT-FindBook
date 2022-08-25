import React from "react";
import { useNavigate } from "react-router-dom";


export default function SaleCard({
  id,
  totalPrice,
  status,
  libroid
}) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/paneluser/detailsale/${id}/${libroid}`);
  };

  return (
    <div onClick={handleOnClick} className={`cursor-pointer transition duration-700 ${status==='expired'?'hover:bg-red-200':'hover:bg-green-100'} rounded`}>
      <div className="flex items-center justify-between pt-6 mt-6">
        <div className="flex items-center">
          <div className="flex flex-col ml-3">
            <span className={`md:text-md font-medium ${status ==='expired' && 'text-red-500'}`}>
              {id?.slice(0,9)}...{id?.slice(-5)}
            </span>
            {/* <span className="font-light text-gray-400 md:text-xs">{items}</span> */}
            <span className={`md:text-xs font-light ${status ==='expired'?'text-red-500':'text-gray-400'   }`}>
              {status}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="pr-8 ">
            <span className={`md:text-sm font-medium ${status ==='expired' && 'text-red-500'}`}>USD ${totalPrice}</span>
          </div>
          <div>
            <i className="text-xs font-medium fa fa-close"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
