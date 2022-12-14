import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getSessionID, soldOut } from '../../../redux/actions/actionsShop';

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const { session_id } = useParams()
  const navigate = useNavigate()
  const check = useSelector(state => state.shop.soldOut)

  useEffect(() => {
    dispatch(getSessionID(session_id))
    return () => {
      dispatch(soldOut())
    }
  },[dispatch, session_id])

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <div>
      {
        check === true ? 
          <main>
            <div className="h-screen bg-gray-300">
              <div className="py-12">
                <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg md:max-w-5xl">
                  <div className="md:flex ">
                    <div className="w-full p-4 px-5 py-5">
                      <main className="gap-2 md:grid md:grid-cols-3 ">
                        <section className="col-span-2 p-5">
                          <div className = 'flex flex-row justify-center'>
                            <h1 className="flex items-center h-8 px-3 w-fit mobile:h-14">Gracias por su compra</h1>
                            <h1 
                              className="flex items-center h-8 px-3 text-white bg-blue-500 rounded-lg w-fit focus:outline-none mobile:h-14 mobile:text-center hover:cursor-pointer hover:bg-blue-600" 
                              onClick = {handleOnClick}>
                                Volver al home
                            </h1>
                          </div>
                        </section>
                      </main>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main> :
          <div> </div>
      }
    </div>
  )
}
