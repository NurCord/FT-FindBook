import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { getButtonStatus, getSessionID, getTimer, stripe } from '../../../redux/actions/actionsShop';

export default function Payment() {
  const role = useSelector(state => state.root.role);
  const cartBooks = useSelector(state => state.shop.cartBooks)
  const buttonStatus = useSelector(state => state.shop.buttonStatus)
  const timer = useSelector(state => state.shop.timer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(window.location.search);
  const cancel_session = queryParams.get("cancel_session")
  const [quantity, setQuantity] = useState({})

  useEffect(() => {
    dispatch(getButtonStatus())
    if(cartBooks?.length){
      let state
      cartBooks.forEach(book =>{
        setQuantity(prevState =>{
          state = {...prevState, [book.id]: 1};
          return state
        }) 
      })
    }
    if(cancel_session){
      dispatch(getSessionID(cancel_session))
    }
  }, [cartBooks, dispatch, buttonStatus])

  useEffect(() => {
    if(buttonStatus === "disabled"){
      dispatch(getTimer())
      Swal.fire({
        title: `Debes esperar ${timer} para poder comprar`,
        icon: 'warning',
        confirmButtonText: 'ir al inicio'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/')
        }
      })
    }
  })

  
  const handleOnChange = (e) => {
    e.preventDefault();
    setQuantity({
      ...quantity,
      [e.target.name]: e.target.value
    })
  }

  const handleOnClick = () => {
    navigate('/');
  }

  const handleBackToCart = (e) => {
    e.preventDefault()
    navigate('/shop')
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(buttonStatus === "disabled")return;
    else{
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Tendrás que esperar 30 min para volver a intentarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          let bookQuantityArray = []

          for(let i=0; i<cartBooks.length; i++){
            let bookQuantity= {
              id: cartBooks[i].id,
              quantity: quantity[cartBooks[i].id]
            }
            bookQuantityArray.push(bookQuantity)
          }

          dispatch(stripe(bookQuantityArray))
        }
      })
      
    }
    
  }

  if(role === "user" || role === "admin"){
    if(cartBooks && cartBooks.length > 0){      
      return (
        <form onSubmit={(e)=> handleOnSubmit(e)}>
          <div className="h-screen bg-gray-300">
            <div className="py-12">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
                <div className="md:flex ">
                  <div className="w-full p-4 px-5 py-5">
                    <main className="md:grid md:grid-cols-3 gap-2 ">
                      <section className="col-span-2 p-5">
                        <h1 className="text-xl font-medium ">Lista de compra</h1>
                          <div>                          
                            {cartBooks.map(book => (
                              <div key={book.id} className="flex flex-col items-center mt-6 pt-6 bg-stone-300 rounded-lg">
                                <div className="flex  items-center">
                                  <div className="flex flex-col ml-3">
                                      <span className="font-medium text-center underline mb-2">
                                        {book.name}
                                      </span>
                                  </div>
                                </div> 
                                <div className="flex justify-evenly items-center">
                                  <div>
                                    <label>Cantidad: </label>
                                    <input 
                                      type="number" 
                                      min={1} 
                                      placeholder="Cantidad" 
                                      name={book?.id} 
                                      value={quantity[book?.id]} 
                                      onChange={(e) => handleOnChange(e)}
                                      className="w-16 rounded-lg mr-8 h-6"
                                      />
                                  </div>
                                  <div className="pr-8 ">
                                    <span className="md:text-sm font-medium">Precio por unidad: USD${book.price}</span>
                                  </div>
                                  <div>
                                    <span className="md:text-sm font-medium">Subtotal: USD${Number(parseFloat(book.price * quantity[book.id]).toFixed(2))}</span>                                    
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <div className="flex items-center">
                            <i className="fa fa-arrow-left text-sm pr-2"></i>
                          </div>
                        </div>
                      </section>
                      <section className='flex flex-col bg-stone-200 rounded'>
                        { cartBooks && cartBooks.length ?
                        <div>
                          <button onClick={(e) => handleBackToCart(e)} className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                            Volver al carrito
                          </button> 
                          <button className={buttonStatus === "enabled" ? "h-12 w-full mt-4 bg-green-500 rounded focus:outline-none text-white hover:bg-blue-600" : "h-12 w-full mt-4 bg-gray-500 rounded focus:outline-none text-white pointer-events-none"}>
                            Pagar
                          </button> 
                        </div>
                         :
                        <div></div>}
                      </section>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    } else {
      return (
        <div>
          <div className="h-screen bg-gray-300">
            <div className="py-12">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
                <div className="md:flex ">
                  <div className="w-full p-4 px-5 py-5">
                    <main className="md:grid md:grid-cols-3 gap-2 ">
                      <section className="col-span-2 p-5">
                        <div className = 'flex flex-row justify-center'>
                          <h1 className="h-8 w-fit px-3 flex items-center">No hay nada en el carrito para comprar&nbsp;</h1>
                          <h1 className="h-8 w-fit px-3 flex items-center bg-blue-500 rounded-3xl focus:outline-none text-white hover:cursor-pointer hover:bg-blue-600" onClick = {handleOnClick}>Volver al home</h1>
                        </div>
                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <div className="flex items-center">
                            <i className="fa fa-arrow-left text-sm pr-2"></i>
                          </div>
                        </div>
                      </section>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  else{
    Swal.fire({
      title: 'Debes estar conectado',
      showDenyButton: true,
      confirmButtonText: 'Inicio',
      denyButtonText: `Conectar`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      } else if (result.isDenied) {
        navigate("/login")
      }
    })
  }
  
}
