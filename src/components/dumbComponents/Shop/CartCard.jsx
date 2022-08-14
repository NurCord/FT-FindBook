import React from 'react'

export default function CartCard({ id, name, author, image, price, cantidad}) {
  console.log("id " + id + " name " + name) 
  return (
    <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <img src={image} alt='Img Producto' width="60" className="rounded-full " />
            <div className="flex flex-col ml-3">
              <span className="md:text-md font-medium">
                {name}
              </span>
              <span className="text-xs font-light text-gray-400">
                {author}
              </span>
            </div>
          </div> 
          <div className="flex justify-center items-center">
            <div className="pr-8 flex ">
            <button  className="font-semibold">-</button>
              <input
                type="number"
                name={name}
                className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
                value={cantidad}
                min="1"
                max="10"
              />
              <button className="font-semibold">+</button>
            </div>
            <div className="pr-8 ">
              <span className="text-xs font-medium">{price}</span>
            </div>
            <div>
              <i className="fa fa-close text-xs font-medium"></i>
            </div>
          </div>
        </div>
    </div>
  )
}
