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
      console.log("este es la sesion: " + cancel_session)
      dispatch(getSessionID(cancel_session))
    }
  }, [cartBooks, dispatch, buttonStatus])

  useEffect(() => {
    if(buttonStatus === "disabled"){
      dispatch(getTimer())
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
          <div className="h-full bg-gray-300">
            <div className="py-12">
              <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg md:max-w-5xl">
                <div className="md:flex ">
                  <div className="w-full p-4 px-5 py-5">
                    <main className="gap-2 md:grid md:grid-cols-3 ">
                      <section className="col-span-2 p-5">
                        <h1 className="text-xl font-medium ">Lista de compra</h1>
                          <div>                          
                            {cartBooks.map(book => (
                              <div key={book.id} className="flex flex-col items-center pt-6 mt-6 rounded-lg bg-stone-300">
                                <div className="flex items-center">
                                  <div className="flex flex-col ml-3">
                                      <span className="mb-2 font-medium text-center underline">
                                        {book.name}
                                      </span>
                                  </div>
                                </div> 
                                <div className="flex items-center justify-evenly">
                                  <div>
                                    <label>Cantidad: </label>
                                    <input 
                                      type="number" 
                                      min={1} 
                                      placeholder="Cantidad" 
                                      name={book?.id} 
                                      value={quantity[book?.id]} 
                                      onChange={(e) => handleOnChange(e)}
                                      className="w-16 h-6 mr-8 rounded-lg"
                                      />
                                  </div>
                                  <div className="pr-8 ">
                                    <span className="font-medium md:text-sm">Precio por unidad: USD${book.price}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium md:text-sm">Subtotal: USD${Number(parseFloat(book.price * quantity[book.id]).toFixed(2))}</span>                                    
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        <div className="flex items-center justify-between pt-6 mt-6 border-t">
                          <div className="flex items-center">
                            <i className="pr-2 text-sm fa fa-arrow-left"></i>
                          </div>
                        </div>
                      </section>
                      <section className='flex flex-col rounded bg-stone-200'>
                        { cartBooks && cartBooks.length ?
                        <div>
                          <button onClick={(e) => handleBackToCart(e)} className="w-full h-12 text-white bg-blue-500 rounded focus:outline-none hover:bg-blue-600">
                            Volver al carrito
                          </button> 
                          <button className={buttonStatus === "enabled" ? "h-12 w-full mt-4 bg-green-500 rounded focus:outline-none text-white hover:bg-blue-600" : "h-12 w-full mt-4 bg-gray-500 rounded focus:outline-none text-white pointer-events-none"}>
                            {buttonStatus === "enabled" ? "Pagar" : `Debes esperar ${timer} para hacer otra compra`}
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
              <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg md:max-w-5xl">
                <div className="md:flex ">
                  <div className="w-full p-4 px-5 py-5">
                    <main className="gap-2 md:grid md:grid-cols-3 ">
                      <section className="col-span-2 p-5">
                        <div className = 'flex flex-row justify-center'>
                          <h1 className="flex items-center h-8 px-3 w-fit">No hay nada en el carrito para comprar&nbsp;</h1>
                          <h1 className="flex items-center h-8 px-3 text-white bg-blue-500 w-fit rounded-3xl focus:outline-none hover:cursor-pointer hover:bg-blue-600" onClick = {handleOnClick}>Volver al home</h1>
                        </div>
                        <div className="flex items-center justify-between pt-6 mt-6 border-t">
                          <div className="flex items-center">
                            <i className="pr-2 text-sm fa fa-arrow-left"></i>
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
