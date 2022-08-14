import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCartBook } from '../../../redux/actions/actionsShop'


export default function CartCard({ id, name, author, image, price, language}) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(deleteCartBook(id))
  }

  return (
    <div>
        <div className="flex justify-between items-center mt-6 pt-6">
          <div className="flex  items-center">
            <img src={image} alt='Img Producto' width="60" className="rounded-full " />
            <div className="flex flex-col ml-3">
              <Link to={`/detail/${id}`}>
                <span className="md:text-md font-medium">
                  {name}
                </span>
              </Link>
              <span className="md:text-xs font-light text-gray-400">
                {author}
              </span>
              <span className="md:text-xs font-light text-gray-400">
                {language}
              </span>
              <div>
                <button onClick={handleOnClick}>Quitar del carrito</button>
              </div>
            </div>
          </div> 
          <div className="flex justify-center items-center">
            <div className="pr-8 ">
              <span className="md:text-sm font-medium">U$D{price}</span>
            </div>
            <div>
              <i className="fa fa-close text-xs font-medium"></i>
            </div>
          </div>
        </div>
    </div>
  )
}
