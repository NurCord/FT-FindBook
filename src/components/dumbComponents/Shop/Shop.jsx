import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sumCountItem, lessCountItem, priceItem } from "../../../redux/actions/actionsShop";
import { getBookByID } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";

export default function Shop() {
  const role = useSelector(state => state.root.role);
  const book = useSelector(state => state.root.bookById);
  const count = useSelector(state => state.shop.count);
  const price = useSelector(state => state.shop.price);
  const id = useSelector(state => state.shop.id);

  let dispatch = useDispatch()

  useEffect(()=>{
    if(id !== 0 && count > 0){
      dispatch(priceItem(id))
    }
  }, [count])

  function handlerOnSum(){
    dispatch(sumCountItem())
  }

  
  function handlerOnLess(){
    if(count > 0){
      dispatch(lessCountItem())
    }
  }
  
  const onChange = () => {
    console.log('info actualizada')
  }
  const navigate = useNavigate();
  if(role !== "invalid"){
    return (
    <div>
      <div className="h-screen bg-gray-300">
        <div className="py-12">
          { count > 0 ? <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Tu carrito</h1>
                    <div className="flex justify-between items-center mt-6 pt-6">
                      <div className="flex  items-center">
                        <img src={book?.image} alt='Img Producto' width="60" className="rounded-full " />
                        <div className="flex flex-col ml-3">
                          <span className="md:text-md font-medium">
                            {book?.name}
                          </span>
                          <span className="text-xs font-light text-gray-400">
                            {book?.author}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="pr-8 flex ">
                        <button onClick={() => handlerOnLess()} className="font-semibold">-</button>
                          <input
                            type="text"
                            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
                            value={count}
                            onChange={onChange}
                          />
                          <button onClick={() => handlerOnSum()} className="font-semibold">+</button>
                        </div>
                        <div className="pr-8 ">
                          <span className="text-xs font-medium">{price}</span>
                        </div>
                        <div>
                          <i className="fa fa-close text-xs font-medium"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <i className="fa fa-arrow-left text-sm pr-2"></i>
                        <span className="text-md  font-medium text-blue-500">
                          <Link to={"/"}>Continua comprando</Link>
                        </span>
                      </div>
                      <div className="flex justify-center items-end">
                        <span className="text-sm font-medium text-gray-400 mr-1">
                          Subtotal:
                        </span>
                        <span className="text-lg font-bold text-gray-800 ">
                          {" "}
                          US${price}
                        </span>
                      </div>
                    </div>
                  </div>
                    <button className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                      Pagar
                    </button>
                </div>
              </div>
            </div>
          </div>: 
          <div>Tu carrito esta vacio</div>
          }
        </div>
      </div>
    </div>
  );
  }else{
    Swal.fire({
      title: 'Debes estar conectado',
      showDenyButton: true,
      confirmButtonText: 'Inicio',
      denyButtonText: `Conectar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate('/')
      } else if (result.isDenied) {
        navigate("/login")
      }
    })
  }
  
}
