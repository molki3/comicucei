import Separador from "@sspis-comicucei/components/separador"
import { useState } from "react"

const Carrito = ({onCarrito, setOnCarrito, setAllProducts, allProducts}) =>{

    () => {
        const section = document.getElementById('section');
        onCarrito ?
            section.className = "bg-white text-black hidden" 
        :
            section.className = "bg-white text-black" 
    }

    return(
        <div>
            {onCarrito ? 
                <section id="section" class="fixed bg-white text-black h-screen top-0 bottom-0 lg:w-1/2 w-full">
                    <div class="mx-auto ml-100 p-0">

                        <div class="flex items-center">
                            <div class="p-5">
                                <div class="mx-auto w-full md:w-3/4 md:pt-5">
                                    <p class="lg:text-4xl text-xl font-bold tracking-tight text-orange-700">Mi pedido</p>
                                </div>
                                <div class="mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5">
                                    <p class="lg:text-xl text-justify">
                                        Una vez pedido tu carrito, te daremos un código único con el que podrás pagar y recoger tu comida.
                                    </p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOnCarrito(false)} class="h-10 w-10 m-5 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    
                        <div class="mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5 rounded-3xl shadow text-center align-middle">
                            {allProducts.length>0 ? allProducts.map(product => (
                                <div key={product.idproducto}>
                                    <p>{product.nombre}</p>
                                    <p>{product.precio}</p>
                                    <p>{product.momento}</p>
                                </div>
                                )) 
                            : 
                                <p>Carrito Vacio</p>
                            }
                        </div>
                    </div>
                </section>
            :
                <section id="section" class="hidden bg-white text-black h-screen sticky top-0">
                    <div class="mx-auto ml-100 p-0">
                        <div class="mx-auto w-full md:w-3/4 md:pt-5">
                            <p class="lg:text-4xl text-xl font-bold tracking-tight text-orange-700">Mi pedido</p>
                        </div>
                        <div class="mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5">
                            <p class="lg:text-xl text-justify">
                                Una vez pedido tu carrito, te daremos un código único con el que podrás pagar y recoger tu comida.
                            </p>
                        </div>
                        <Separador/>
                        <div class="mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5 rounded-3xl shadow text-center align-middle">
                            {allProducts.length>0 ? allProducts.map(product => (
                                <div key={product.idproducto}>
                                    <p>{product.nombre}</p>
                                    <p>{product.precio}</p>
                                    <p>{product.momento}</p>
                                </div>
                            )) : <p>Carrito Vacio</p>}
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default Carrito