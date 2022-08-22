import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrders, getUserSales } from '../../../redux/actions/actionsShop'
import OrderCards from './OrderCards'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import SaleCards from './SaleCards';


export default function UserOrders() {
  const role = useSelector(state => state.root.role);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const orderList = useSelector(state => state.shop.orderList)
  const salesList = useSelector(state => state.shop.salesList)
  useEffect(() => {
    dispatch(getUserOrders())
    dispatch(getUserSales())
  }, [])

  if(role === "user"){
    return (
    <div className='flex flex-wrap'>
      <div>
      <div className="h-screen bg-gray-300">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Historial de compras</h1>
                    { orderList && orderList.length ?
                    <OrderCards orderUser={orderList}/> :
                    <span>No tienes historial de compra</span>}
                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <i className="fa fa-arrow-left text-sm pr-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          <div>
          <div className="h-screen bg-gray-300">
            <div className="py-12">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
                <div className="md:flex ">
                  <div className="w-full p-4 px-5 py-5">
                    <div className="md:grid md:grid-cols-3 gap-2 ">
                      <div className="col-span-2 p-5">
                        <h1 className="text-xl font-medium ">Historial de ventas</h1>
                        { salesList && salesList.length ?
                        <SaleCards salesUser={salesList}/> :
                        <span>No tienes historial de venta</span>}
                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <div className="flex items-center">
                            <i className="fa fa-arrow-left text-sm pr-2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      if (result.isConfirmed) {
        navigate('/')
      } else if (result.isDenied) {
        navigate("/login")
      }
    })
  }

}