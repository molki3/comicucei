const Calificar = ({recogerCarrito, setRecogerCarrito, allProducts, setAllProducts}) => {
    
    const calificarProductos = () => {
        setRecogerCarrito(false);
    }

    return(
        <div>
            {recogerCarrito 
            ?
                <section id="calificar" class="p-8 rounded-3xl shadow-lg shadow-gray-500/50 z-30 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 fixed bg-white dark:bg-gray-900 text-black h-3/4 bottom-0 lg:w-3/5 w-full">
                    <h1 class="md:text-4xl text-xl text-white text-center font-bold">¿Te ha gustado lo que pediste? ¡Califícalo!</h1>
                    <div class="mx-5 w-6/7 md:pb-10 p-5 rounded-3xl text-center align-middle dark:text-white">
                        <div class="flex flex-row items-center py-3 place-content-evenly shadow-md rounded-full">
                            <p>Cantidad</p>
                            <p>Nombre</p>
                            <p>Precio</p>
                            <p>¿Te gustó?</p>
                        </div>
                        {allProducts.map(product => (
                            <div key={product.idproducto} class="flex flex-row items-center mt-5 my-1 py-3 place-content-around shadow-md dark:bg-gray-800 rounded-full">
                                    <p>{product.cantidad}</p>
                                    <p>{product.nombre}</p>
                                    <p>$ {product.precio}</p>
                                    <select id="rank" onClick={() => calificarProductos(product)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected value="5">Me encantó</option>
                                        <option value="4">Es muy bueno</option>
                                        <option value="3">Es bueno</option>
                                        <option value="2">Más o menos</option>
                                        <option value="1">Casi no me gustó</option>
                                        <option value="0">No me gustó</option>
                                    </select>
                                    {
                                        product.calificacion= 5
                                    }
                            </div>
                        ))}
                    </div>
                    <div class="flex">
                        <button onClick={calificarProductos} type="button" class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Listo</button>
                    </div>
                </section>
            : 
                <div></div>
            }
        </div>
        
    )
}

export default Calificar;