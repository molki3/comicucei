import { useState, useEffect } from 'react';
import axios from 'axios';
import CloudinaryImage from "@sspis-comicucei/components/image"

const SearchResults = ({setBusqueda, term, allProducts, setAllProducts, total, setTotal, user}) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
      if (term) {
        axios.get(`/api/search?term=${encodeURIComponent(term)}`)
          .then(response => {
            setResults(response.data);
          })
          .catch(error => {
            console.error('Error al realizar la búsqueda:', error);
          });
      }
      
    }, [term]);

    const addProduct = async (producto) =>{
      const product = producto;
      const itemm = allProducts.find(item => item.idproducto === product.idproducto)
      if(itemm){
          console.log("Encontrado:");
          console.log(itemm)
          setTotal(total+parseFloat(product.precio));
          const products = allProducts.map(item =>
              item.idproducto == product.idproducto ?
              {...item, cantidad: item.cantidad + 1, subtotal: parseFloat(item.subtotal) + parseFloat(item.precio), usuario: user.codigo} 
              : item
          );
          return setAllProducts([...products]);
      }
      else{
          setTotal(total+parseFloat(product.precio));
          product.cantidad=1;
          product.subtotal = parseFloat(product.precio);
          product.calificacion = 0;
          product.usuario=user.codigo;
          setAllProducts([...allProducts, product]);  
      } 
  };

    return(
      <section class="bg-white w-full"> 
              {/*MAIN*/}
              <div class="mx-auto w-full md:my-5 p-5 md:text-6xl text-4xl flex">
                  <h2 class="text-orange-600 font-bold">Resutados de "{term}"</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setBusqueda(false)} class="h-10 w-10 m-5 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
              <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                  {results.map(product => (
                      <div key={product.id} class="grid grid-cols-2 justify-items-center place-content-center rounded-3xl shadow border">
                          <CloudinaryImage publicId={product.url} />
                          <div class="text-center grid grid-cols-1 content-around w-full">
                              <p class="font-bold text-3xl">{product.nombre}</p>
                              {product.momento=='Bebida' ? (
                                  <div class="flex justify-center">
                                      <p>Platillo: {product.momento}</p>
                                  </div>
                              ) : null}
                              {product.momento=='Postre' ? (
                                  <div class="flex justify-center">
                                      <p>Platillo: {product.momento}</p>
                                  </div>    
                              ) : null}
                              {product.momento=='Principal' ? (
                                  <div class="flex justify-center">
                                      <p>Platillo: {product.momento}</p>
                                  </div>
                              ) : null}
                              {product.momento=='Entrada' ? (
                                  <div class="flex justify-center">
                                      <p>Platillo: {product.momento}</p>
                                  </div>
                              ) : null}

                              <h1 class="text-xl">{product.origen}</h1>
                              <p class="text-2xl">${product.precio}</p>

                              <div class="flex justify-around">
                                  <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer border rounded-full bg-orange-500 shadow">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
              {/*MAIN*/}
         </section>
  )
}

export default SearchResults;
