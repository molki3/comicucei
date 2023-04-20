import Footer from "@sspis-comicucei/components/footer"
import Menu from "@sspis-comicucei/components/menu"
import Separador from "@sspis-comicucei/components/separador"
import axios from "axios"
import Image from "next/image"

const Home = ({products}) => {
    products = products.rows;
    console.log(products);
    return(
        <section class="bg-white text-black">
            <Menu/>
            {/*MAIN*/}
            <Separador/>
            <div class="w-full mx-auto flex flex-col ml-100 p-0 bg-[url('../../public/fondo.jpg')] bg-cover bg-center">
                <div class="mx-auto w-full md:w-3/4 md:my-5 md:pt-5">
                    <p class="text-6xl tracking-tight">Compra comida en tu cafetería favorita</p>
                    <p class="text-8xl font-bold tracking-tight text-orange-600">sin hacer largas filas</p>
                </div>
                <div class="mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5">
                    <p class="text-2xl leading-loose tracking-tight ">
                        Hemos innovado para ti, <b class="text-3xl">universitario</b>. En <b class="text-3xl">ComiCucei</b>, ahora podrás pedir tu comida favorita <b class="text-3xl">dentro de tu escuela</b> y recogerla <b class="text-3xl">cuando quieras y puedas</b>.
                    </p>
                </div>
            </div>
            <div class="md:w-3/4 w-5/6 mx-auto flex flex-col ml-100 p-0">
                <Separador/>
                <div class="mx-auto w-full md:w-3/4 md:py-10 mb-10">
                    <div class="mx-auto w-full md:w-3/4 md:my-5 p-5">
                        <p class="text-6xl tracking-tight text-center">¿Lo pensaste?, <b class="text-orange-600">búscalo</b></p>
                    </div>
                    <form class="w-full m-auto 2xl:w-1/3">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hoy quiero comer..." required/>
                            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                        </div>
                    </form>
                </div>
                <Separador/>
                <div class="mx-auto w-full md:my-10 mb-10">
                    <div class="mx-auto w-full md:w-3/4 md:my-5 p-5">
                        <p class="text-6xl tracking-tight text-center">Una sección <b class="text-orange-600">solo para ti</b></p>
                    </div>
                    <div class="mx-auto md:w-3/4 md:my-5 md:pb-10 pb-5">
                        <p class="text-2xl leading-loose tracking-tight ">
                            Usamos métodos que recopilan tus comidas favoritas y calculan distintos alimentos que podrían gustarte, echa un vistazo a esta sección.
                        </p>
                    </div>
                </div>
                <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                    {products.map(product => (
                        <div key={product.id} class="grid grid-cols-2 justify-items-center">
                            <Image class="h-60 w-full bg-gray-200 border-black" src="" alt="Producto Logo"/>
                            <div class="text-center grid grid-cols-1 content-around w-full">
                                <p class="font-bold text-3xl">{product.nombre}</p>

                                {product.momento=='Bebida' ? (
                                    <div class="flex justify-center">
                                        <p>{product.momento}</p>
                                    </div>
                                ) : null}
                                {product.momento=='Postre' ? (
                                    <div class="flex justify-center">
                                        <p>{product.momento}</p>
                                    </div>    
                                ) : null}
                                {product.momento=='Principal' ? (
                                    <div class="flex justify-center">
                                        <p>{product.momento}</p>
                                    </div>
                                ) : null}
                                {product.momento=='Entrada' ? (
                                    <div class="flex justify-center">
                                        <p>{product.momento}</p>
                                    </div>
                                ) : null}

                                <h1 class="text-xl">{product.origen}</h1>
                                <p class="text-2xl">${product.precio}</p>

                                <div class="flex justify-around">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p class="text-xl">{0}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/*MAIN*/}
            <Footer/>
        </section>
    )
}

export const getServerSideProps = async context => {
    const {data : products} = await axios.get('http://localhost:3000/api/products');
    return{
        props:{
            products
        }
    }
}

export default Home