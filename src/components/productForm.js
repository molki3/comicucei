import Footer from "@sspis-comicucei/components/footer"
import { useState } from "react"
import axios from "axios"   //hacer peticiones al backend
import { useRouter } from "next/router"
import Image from "next/image"
import logo from "../../public/logo.png"

export default function ProductForm(){
    
    const [credentials, setCredentials] = useState({    //estados de las credenciales
        nombre:'',
        precio: 0,
        calidad:'',
        momento:'',
        origen:''
    })

    const router = useRouter();
    
    const handleChange = (e) =>{        //captura el contenido de los inputs
        setCredentials({
            ...credentials,
            [e.target.name]: [e.target.value]
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();                                                         //evitar que se vean las credenciales en el url
        const response = await axios.post('/api/products', credentials);
        console.log(response)
        if(response.status==200){
            document.getElementById('container-mensaje').className = "mt-3 w-full rounded-lg shadow sm:max-w-md xl:p-0 bg-green-700";
            document.getElementById('mensaje').textContent = 'Agregado';
        }else{
            document.getElementById('container-mensaje').className = "mt-3 w-full rounded-lg shadow sm:max-w-md xl:p-0 bg-red-700";
            document.getElementById('mensaje').textContent = response.data;
            
        }
    }
    
    function routerHome(){
        router.push('/');
    }

    return(
        <section class="bg-white">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto my-10 lg:py-0 h-screen lg:h-auto">
            <a onClick={routerHome} class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image class={"w-20 h-20"} src={logo} alt="ComiCucei"></Image>  
            </a>
            <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-900">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-orange-600 md:text-2xl dark:text-white">
                        Registra Productos
                    </h1>
                    <form method="POST" class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Nombre</label>
                            <input onChange={handleChange} type="text" name="nombre" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Nombre del producto" required="true"/>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Precio</label>
                            <input onChange={handleChange} type="number" name="precio" id="precio" placeholder="Precio en pesos MXN" class="bg-green border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="true"/>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Momento</label>
                            <input onChange={handleChange} type="text" name="momento" id="momento" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Entrada, Principal, Postre o Bebida" required="true"/>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">Lugar de origen</label>
                            <input onChange={handleChange} type="text" name="origen" id="origen" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="mx, na, sa, ca, eur, afr, ori, chn, jpn, ita, fra, esp" required="true"/>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-white dark:text-white">URL imagen</label>
                            <input onChange={handleChange} type="text" name="url" id="url" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="URL" required="true"/>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Guardar</button>
                    </form>
                </div>
            </div>
            <div id="container-mensaje" class="hidden mt-3 w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-red-700">
                <h3 id="mensaje" class="text-white text-center text-lg p-3 "></h3>
            </div>
        </div>
        <Footer/>
    </section>
    )
}  