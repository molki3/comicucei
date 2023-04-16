import Image from "next/image"
import logo from "../../public/logo.png"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"

const Menu = () => {
    
    const router = useRouter();

    const boton = () =>{
        const lista = document.getElementById('dropdownHover');
        if(lista.className == "hidden absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"){
            lista.className = "absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700";
        }else{
            lista.className = "hidden absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        }
    }

     
    //USE STATE PARA LOS DATOS DE USUARIO
    const [user, setUser] = useState({
        codigo: "",
        nombre: ""
    })

    //MANDA UNA PETICION GET AL BACKEND PARA TRAER EL PERFIL
    const getProfile = async () =>{
        //retorna un objeto con codigo y nombre
        const response = await axios.get('/api/profile');
        setUser(response.data);
    }

    //MANDA PETICION AL BACKEND PARA CAMBIAR EL TOKEN A NULO Y CERRAR SESION
    const logout = async () => {
        await axios.post('/api/auth/logout');
        router.push("/login");
    }

    function dobleFuncion(){
        boton();
        getProfile();
    }

    function routerCarrito(){
        router.push('/carrito')
    }
    function routerHome(){
        router.push('/');
    }
    

    return(
        <nav class="rounded-t-lg shadow dark:bg-gray-900 dark:text-white"> {/*m-4 my-0 rounded-b-lg*/}
            <div class="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a onClick={routerHome} class="cursor-pointer flex items-center">
                    <Image class={"h-10 w-10 mr-2"} src={logo} alt="ComiCucei Logo"></Image>
                    <span class="hidden md:inline self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ComiCucei</span>
                </a>
                <div>
                    <a class="flex items-center hover:text-gray-200 cursor-pointer" onClick={routerCarrito}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="flex absolute -mt-5 ml-4">
                        <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                            </span>
                        </span>
                    </a> 
                </div>
                
                <div class="relative">
                    <div>
                        <button onClick={dobleFuncion} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Mi perfil <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> 
                    </div>
                    <div id="dropdownHover" class="hidden absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                        <li>
                            <a class=" block px-4 py-2 ">Código: {user.codigo}</a>
                        </li>
                        <li>
                            <a class="block px-4 py-2 ">Nombre: {user.nombre}</a>
                        </li>
                        <li>
                            <a onClick={logout} class="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cerrar sesión</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menu