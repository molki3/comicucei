import Separador from "@sspis-comicucei/components/separador"
import { useState } from "react"
import Image from "next/image"
import QR from "../../public/qr-code.png"

const Carrito = ({pedirCarrito, setPedirCarrito, onCarrito, setOnCarrito, setAllProducts, allProducts, setTotal, total}) =>{

    () => {
        const section = document.getElementById('section');
        onCarrito ?
            section.className = "bg-white text-black hidden" 
        :
            section.className = "bg-white text-black" 
    }

    const deleteProduct = (product) => {
        const result = allProducts.filter(
            item => item.idproducto != product.idproducto
        );
        setTotal(total-product.subtotal);
        setAllProducts(result);
    }

    const vaciarCarrito = () => {
        setAllProducts([]);
        setTotal(0);
        setPedirCarrito(false);
    }

    return(
        <div>
            {onCarrito ?
                <section id="section" class="z-20 fixed bg-white dark:bg-gray-900 text-black h-screen top-0 bottom-0 lg:w-3/5 w-full">
                    <div class="mx-auto p-0 flex flex-col justify-center">
                        <div class="flex items-center">
                            <div class="p-5">
                                <div class="mx-auto w-full md:w-3/4">
                                    <p class="lg:text-4xl text-4xl font-bold tracking-tight text-orange-700">Mi pedido</p>
                                </div>
                                <div class="mx-auto w-full md:w-3/4 mt-5">
                                    <p class="lg:text-xl text-justify dark:text-white">
                                        Una vez pedido tu carrito, te daremos un código único con el que podrás pagar y recoger tu comida.
                                    </p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOnCarrito(false)} class="h-10 w-10 m-5 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <div class="mx-5 w-6/7 md:pb-10 p-5 rounded-3xl text-center align-middle dark:text-white">
                            <div class="flex flex-row items-center py-3 place-content-evenly shadow-md rounded-full">
                                <p>Nombre</p>
                                <p>Precio</p>
                                <p>Subtotal</p> 
                            </div>
                            {allProducts.length>0 ? allProducts.map(product => (
                                <div key={product.idproducto} class="flex flex-row items-center my-1 py-3 place-content-around shadow-md dark:bg-gray-800 rounded-full">
                                        <p>{product.cantidad}x</p>
                                        <p>{product.nombre}</p>
                                        <p>$ {product.precio}</p>
                                        <p>$ {product.subtotal}</p> 
                                    <svg onClick={() => deleteProduct(product)} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                )) 
                            : 
                                <p class="text-xl my-5">Carrito Vacio</p>
                            }
                            {allProducts.length>0 && !pedirCarrito
                            ? 
                                <div onClick={vaciarCarrito} class="w-1/2 md:w-1/5 bg-red-800 hover:bg-red-700 mx-auto rounded-lg text-white mt-3 p-1 cursor-pointer">
                                    <p>Vaciar carrito</p>
                                </div>
                            : 
                                <div></div> 
                            }
                            
                        </div>
                        <div class="grid grid-cols-2 w-4/5 md:w-1/2 mx-auto">
                            <div>
                                {pedirCarrito ?
                                <div class="h-full w-full" id="qr">
                                    <Image class="pt-0 lg:pt-0 rounded-xl" src={QR} alt="Código QR"></Image>
                                </div>
                                :  
                                <div class="h-full w-full" id="qr"></div>
                                }
                            </div>
                            <div class="text-center dark:text-white md:text-2xl text-lg my-auto mt-0 lg:flex justify-around flex-col">
                                <p>Total: ${total}</p>
                                {allProducts.length>0 && !pedirCarrito 
                                    ?  
                                    <div class="">
                                        <button onClick={() => setPedirCarrito(true)} type="button" class="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pedir</button>
                                    </div>
                                    :
                                    <div></div>
                                } 
                            </div>
                        </div>
                        <div class="mx-auto mt-5">
                            {pedirCarrito ?
                                <button onClick={vaciarCarrito} type="button" class="m-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">He recogido mi pedido ✔️</button>                            
                            :
                                <div></div>
                            }
                        </div>
                    </div>
                </section>
            :
                <div class="w-full"></div>
            }
        </div>
    )
}

export default Carrito