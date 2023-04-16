import Footer from "@sspis-comicucei/components/footer"
import Image from "next/image"
import logo from "../../public/logo.png"
import { useState } from "react"
import axios from "axios"   //hacer peticiones al backend
import { useRouter } from "next/router"

export default function Register(){
    const [credentials, setCredentials] = useState({    //estados de las credenciales
        codigo:'',
        nombre:'',
        password:''
    })
    const router = useRouter();
    
    const handleChange = (e) =>{        //captura el contenido de los inputs
        setCredentials({
            ...credentials,
            [e.target.name]: [e.target.value]
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();     //evitar que se vean las credenciales en el url
        const response = await axios.post('/api/auth/register', credentials);
        if(response.data=='register succesfully'){
            router.push('/');
        }else{
            document.getElementById('mensaje').textContent = response.data;
            document.getElementById('container-mensaje').className = "mt-3 w-full rounded-lg shadow sm:max-w-md xl:p-0 bg-red-700";
        }
    }

    function routerLogin(){
        router.push('/login');
    }

  return (
    <section class="bg-white">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image class={"w-20 h-20"} src={logo} alt="ComiCucei"></Image>  
            </a>
            <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-900">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-orange-600 md:text-2xl dark:text-white">
                        Registrate
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Tu código UDG</label>
                            <input onChange={handleChange} type="text" name="codigo" id="codigo" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Código de 9 digitos" required="true"/>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Tu nombre completo</label>
                            <input onChange={handleChange} type="text" name="nombre" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ejemplo: Luis López" required="true"/>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Contraseña</label>
                            <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" class="bg-green border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="true"/>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Guardar</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            ¿Ya tienes cuenta? <a onClick={routerLogin} class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Inicia Sesión</a>
                        </p>
                    </form>
                </div>
            </div>
            <div id="container-mensaje" class="hidden mt-3 w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-red-700">
                <h3 id="mensaje" class="text-white text-center text-lg p-3 "></h3>
            </div>
      </div>
      <Footer></Footer>
    </section>
  )
}