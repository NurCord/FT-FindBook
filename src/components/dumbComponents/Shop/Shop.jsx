import React from "react";
import { Link } from "react-router-dom";

export default function Shop() {
  const onChange = () => {
    console.log('info actualizada')
  }
  return (
    <div>
      <div className="h-screen bg-gray-300">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Tu carrito</h1>
                    <div className="flex justify-between items-center mt-6 pt-6">
                      <div className="flex  items-center">
                        <img src="" alt='Img Producto' width="60" className="rounded-full " />
                        <div className="flex flex-col ml-3">
                          <span className="md:text-md font-medium">
                            Nombre libro
                          </span>
                          <span className="text-xs font-light text-gray-400">
                            Autor
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="pr-8 flex ">
                          <span className="font-semibold">-</span>
                          <input
                            type="text"
                            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
                            value="1"
                            onChange={onChange}
                          />
                          <span className="font-semibold">+</span>
                        </div>
                        <div className="pr-8 ">
                          <span className="text-xs font-medium">$10.50</span>
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
                          $10.50
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" p-5 bg-gray-800 rounded overflow-visible">
                    <span className="text-xl font-medium text-gray-100 block pb-3">
                      Datos de tarjeta
                    </span>
                    <span className="text-xs text-gray-400 ">Tipo de Tarjeta</span>
                    <div className="overflow-visible flex justify-between items-center mt-2">
                      <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                        <span className="italic text-lg font-medium text-gray-200 underline">
                          VISA
                        </span>
                        <div className="flex justify-between items-center pt-4 ">
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs  text-gray-200">
                            Emilio Navarro
                          </span>
                          <span className="text-xs  text-gray-200">11/25</span>
                        </div>
                      </div>
                      <div className="flex justify-center  items-center flex-col">
                        <img src="https://img.icons8.com/color/96/000000/mastercard-logo.png" alt='MasterCard' width="40" className="relative right-5" />
                        <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
                          mastercard.
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Name on Card
                      </label>
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                      placeholder="Emilio Navarro"
                      onChange={onChange}
                    />
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="****     ****      ****      ****"
                        onChange={onChange}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                      <div className="col-span-2 ">
                        <label className="text-xs text-gray-400">
                          Expiration Date
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            placeholder="mm"
                            onChange={onChange}
                          />
                          <input
                            type="text"
                            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            placeholder="yyyy"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label className="text-xs text-gray-400">CVV</label>
                        <input
                          type="text"
                          className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          placeholder="XXX"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <button className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">
                      Pagar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
