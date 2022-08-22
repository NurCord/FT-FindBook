import React from "react";
import { useNavigate } from "react-router-dom";


export default function OrderCard({
  id,
  totalPrice,
  status,
}) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/paneluser/detail/${id}`);
  };

  return (
    <div onClick={handleOnClick} className={`cursor-pointer transition duration-700 ${status==='expired'?'hover:bg-red-200':'hover:bg-green-100'} rounded`}>
      <div className="flex justify-between items-center mt-6 pt-6">
        <div className="flex  items-center">
          <div className="flex flex-col ml-3">
            <span className={`md:text-md font-medium ${status ==='expired' && 'text-red-500'}`}>
              {id?.slice(0,9)}...{id?.slice(-5)}
            </span>
            {/* <span className="md:text-xs font-light text-gray-400">{items}</span> */}
            <span className={`md:text-xs font-light ${status ==='expired'?'text-red-500':'text-gray-400'}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="pr-8 ">
            <span className={`md:text-sm font-medium ${status ==='expired' && 'text-red-500'}`}>USD ${totalPrice}</span>
          </div>
          <div>
            <i className="fa fa-close text-xs font-medium"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
