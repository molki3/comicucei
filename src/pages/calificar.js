import { useEffect, useState } from "react";
import axios from "axios";

const Calificar = ({calificarProductos, setCalificarProductos, historialProductos, setHistorialProductos, recogerCarrito, setRecogerCarrito, allProducts, setAllProducts}) => {
    
    const [likes, setLikes] = useState(Array(allProducts.length).fill(false));
    const [notLikes, setNotLikes] = useState(Array(allProducts.length).fill(false));

    // useEffect(() => {
    //     const fetchHistorialProductos = async () => {
    //       try {
    //         const response = await fetch('/api/products/history.json'); // Ruta del archivo JSON en tu backend
    //         const data = await response.json();
    //         setHistorialProductos(data.historialProductos);
    //       } catch (error) {
    //         console.log('Error al obtener el historial de productos:', error);
    //       }
    //     };
    
    //     fetchHistorialProductos();
    //   }, []);

    const actualizarHistorial = async () => {
        await setHistorialProductos(prevHistorialProductos => {
            const updatedHistorialProductos = [...prevHistorialProductos];
            allProducts.forEach(item => {
              //console.log("ACTUAL:");
              //console.log(item)
              const foundItem = updatedHistorialProductos.find(into => into.idproducto === item.idproducto);
              //console.log("ENCONTRADO:");
              //console.log(foundItem);
              if (foundItem) {
                foundItem.cantidad += item.cantidad;
                foundItem.calificacion += item.calificacion; // Acumular la calificación en el objeto encontrado
              } else {
                updatedHistorialProductos.push(item); // No se encontró, agregar el nuevo producto al historial
              }
            });
            return updatedHistorialProductos;
          });  
    }

    const calificar = async () => {
        await actualizarHistorial();

        setLikes(Array(allProducts.length).fill(false));
        setNotLikes(Array(allProducts.length).fill(false));
        setRecogerCarrito(false);
        setCalificarProductos(true);

        // escribir();
        // console.log("HISTORIAL");
        // console.log(historialProductos)
    };

    const escribir = async () => {
        try {
          await axios.post('/api/products/history', {historialProductos});
          console.log('Historial de productos enviado al backend y guardado en archivo JSON.');
        } catch (error) {
          console.error('Error al enviar el historial de productos al backend:', error);
        }
    };



    //escribir();
    //leer();

    const like = (product, index) => {
        product.calificacion = 1;
        console.log(product.nombre , "calificacion: ", product.calificacion);
        const newLikes = [...likes];
        const newNotLikes = [...notLikes];

        newLikes[index] = true;
        newNotLikes[index] = false;

        setLikes(newLikes);
        setNotLikes(newNotLikes);
    }

    const notLike = (product, index) => {
        product.calificacion = 0;
        console.log(product.nombre , "calificacion: ", product.calificacion);
        const newLikes = [...likes];
        const newNotLikes = [...notLikes];
    
        newLikes[index] = false;
        newNotLikes[index] = true;
    
        setLikes(newLikes);
        setNotLikes(newNotLikes);
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
                            <p>Total</p>
                            <p>¿Te gustó?</p>
                        </div>
                        {allProducts.map((product, index) => (
                            <div key={product.idproducto} class="flex flex-row items-center mt-5 my-1 py-3 place-content-around shadow-md dark:bg-gray-800 rounded-full">
                                <p>{product.cantidad}</p>
                                <p>{product.nombre}</p>
                                <p>$ {product.precio}</p>
                                <p>$ {product.subtotal}</p>
                                <div class="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="icon-like" fill={likes[index] ? 'green' : 'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => like(product, index)} class="w-6 h-6 cursor-pointer mr-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="icon-notlike" fill={notLikes[index] ? 'red' : 'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => notLike(product, index)} class="w-6 h-6 cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="flex">
                        <button onClick={calificar} type="button" class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Listo</button>
                    </div>
                </section>
            : 
                <div></div>
            }
        </div>
        
    )
}

export default Calificar;