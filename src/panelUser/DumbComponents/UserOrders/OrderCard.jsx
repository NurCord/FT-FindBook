import React from 'react'

export default function OrderCard ({ compras_id,user_id, totalPrice, status, items}){
    return (
        <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <div className="flex flex-col ml-3">
              <Link to={OrderDetail}>
                <span className="md:text-md font-medium">
                  {compras_id}
                </span>
              </Link>
              <span className="md:text-xs font-light text-gray-400">
                {user_id}
              </span>
              <span className="md:text-xs font-light text-gray-400">
                {items}
              </span>
              <span className="md:text-xs font-light text-gray-400">
                {status}
              </span>
            </div>
          </div> 
          <div className="flex justify-center items-center">
            <div className="pr-8 ">
              <span className="md:text-sm font-medium">U$D{totalPrice}</span>
            </div>
            <div>
              <i className="fa fa-close text-xs font-medium"></i>
            </div>
          </div>
        </div>
    </div>
    )
}