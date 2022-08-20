import React from "react";
import { useNavigate } from "react-router-dom";


export default function OrderCard({
  id,
  totalPrice,
  status,
  user,
}) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/layoutAdmin/detail/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 pt-6">
        <div className="flex  items-center">
          <div className="flex flex-col ml-3">
            <span onClick={handleOnClick} className="md:text-md font-medium">
              {id?.slice(0,9)}...{id?.slice(-5)}
            </span>
            {/* <span className="md:text-xs font-light text-gray-400">{items}</span> */}
            <span className="md:text-xs font-light text-gray-400">
              {user.name}
            </span>
            <img src={user.url} alt='Img url' width="60" className="rounded-3xl " />
            <span className="md:text-xs font-light text-gray-400">
              {status}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="pr-8 ">
            <span className="md:text-sm font-medium">USD${totalPrice}</span>
          </div>
          <div>
            <i className="fa fa-close text-xs font-medium"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
