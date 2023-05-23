import Footer from "@sspis-comicucei/components/footer"
import Menu from "@sspis-comicucei/components/menu"
import Separador from "@sspis-comicucei/components/separador"
import axios from "axios"
import { useEffect, useState } from "react"
import Carrito from "./carrito"
import Calificar from "./calificar"
import CloudinaryImage from "@sspis-comicucei/components/image"

const Home = ({products}) => {
    //MOSTRAR O NO CARRITO 
    const [onCarrito, setOnCarrito] = useState(false);
    const [recogerCarrito, setRecogerCarrito] = useState(false);
    const [pedirCarrito, setPedirCarrito] = useState(false);
    const [calificarProductos, setCalificarProductos] = useState(false);
    const [historialPerfiles, setHistorialPerfiles] = useState([]); //historial de perfiles
    const [miPerfil, setMiPerfil] = useState({
        usuario:0, bebida:0, entrada:0, principal:0, postre:0, picante:0, salado:0, dulce:0, caliente:0, frio:0, 
        mx:0,
        na:0,
        sa:0,
        ca:0,
        eur:0,
        afr:0,
        ori:0,
        chn:0,
        jpn:0,
        ita:0,
        fra:0   
    }); 

    const [historialProductos, setHistorialProductos] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const [user, setUser] = useState({
        codigo: "",
        nombre: ""
    });

    products = products.rows;

    const fetchData = async () => {
        try {
            const response = await axios.get("../../public/profiles.json");
            const historialPerfiles = response.data;
            console.log('PERFILES:');
            console.log(response);
        } catch (error) {
            console.log('Error al obtener los perfiles:', error);
        }
    };

    useEffect(() => {
        // Función para obtener datos del backend
        const getProfile = async () =>{
            //retorna un objeto con codigo y nombre
            const response = await axios.get('/api/profile');
            setUser(response.data)
        };
    
        getProfile(); // Llamar a la función cuando el componente se monta
    
        // Opcional: Puedes retornar una función de limpieza en useEffect
        // si necesitas realizar alguna limpieza al desmontar el componente
        return () => {
          // Lógica de limpieza
        };
    }, []); // Pasar un arreglo vacío como segundo argumento

    useEffect(() => {
        if (calificarProductos) {
            //fetchData();
            const miHistorial = historialProductos.filter(producto => producto.usuario == user.codigo);
            
            const perfilAux = miPerfil;

             //si el perfil no existe:
            if(perfilAux.usuario==0){
                perfilAux.usuario = user.codigo;
                miHistorial.forEach(product =>{
                    perfilAux[product.momento] += product.calificacion;
                    perfilAux[product.origen] += product.calificacion;
                    if(product.picante=='s') perfilAux.picante += product.calificacion
                    if(product.saldul=='s') perfilAux.salado += product.calificacion
                    if(product.saldul=='d') perfilAux.dulce += product.calificacion
                    if(product.calfrio=='c') perfilAux.caliente += product.calificacion
                    if(product.calfrio=='f') perfilAux.frio += product.calificacion
                });
                setMiPerfil(perfilAux);
                console.log("NUEVO PERFIL")
                console.log(miPerfil);
            }
            else{
                allProducts.forEach(product =>{
                    perfilAux[product.momento] += product.calificacion;
                    perfilAux[product.origen] += product.calificacion;
                    if(product.picante=='s') perfilAux.picante += product.calificacion
                    if(product.saldul=='s') perfilAux.salado += product.calificacion
                    if(product.saldul=='d') perfilAux.dulce += product.calificacion
                    if(product.calfrio=='c') perfilAux.caliente += product.calificacion
                    if(product.calfrio=='f') perfilAux.frio += product.calificacion
                });
                setMiPerfil(perfilAux);
                console.log("YA EXISTE PERFIL")
                console.log(miPerfil);  
            }
        }
        setAllProducts([]);
        setCalificarProductos(false);
    }, [calificarProductos]);
    
    console.log(calificarProductos);
    console.log(historialProductos);

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
            console.log("AGREGO USUARIO:")
            console.log(user);
            product.calificacion = 0;
            product.usuario=user.codigo;
            console.log("No se encontro, se agrega: ");
            console.log(product)
            setAllProducts([...allProducts, product]);  
        } 
    };

    return(
        // <section class="bg-white text-black flex grid md:grid-cols-4 grid-cols-1"> 
        <section class="bg-white w-full"> 
            <div class="w-full">
                <Menu setOnCarrito={setOnCarrito} onCarrito={onCarrito}/>
                {/*MAIN*/}
                <div class="mx-auto flex flex-col p-0 bg-[url('../../public/fondo4.jpg')] dark:bg-[url('../../public/fondo1.jpg')] bg-cover bg-bottom dark:text-white text-dark">
                    <div class="mx-5 w-full md:w-2/4 md:my-5 md:pt-5">
                        <p class="md:text-5xl text-2xl font-bold tracking-tight">Compra comida en tu cafetería favorita</p>
                        <p class="md:text-8xl text-5xl font-bold tracking-tight text-orange-600">sin hacer largas filas</p>
                    </div>
                    <div class="mx-5 w-full md:w-2/4 my-5 md:pb-10 pb-5">
                        <p class="md:text-2xl text-lg leading-loose tracking-tight text-justify">
                            Hemos innovado para ti, <b class="md:text-3xl text-xl">universitario</b>. En <b class="md:text-3xl text-xl">ComiCucei</b>, ahora podrás pedir tu comida favorita <b class="md:text-3xl text-xl">dentro de tu escuela</b> y recogerla <b class="md:text-3xl text-xl">cuando quieras y puedas</b>.
                        </p>
                    </div>
                </div>
                
                <div class="md:w-3/4 w-5/6 mx-auto flex flex-col ml-100 p-0">
                    <div class="mx-auto w-full md:w-3/4 md:py-10 mb-10">
                        <div class="mx-auto w-full md:w-3/4 md:my-5 p-5 md:text-6xl text-4xl">
                            <p class="tracking-tight text-center">¿Lo pensaste?, <b class="text-orange-600">búscalo</b></p>
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
                        <div class="mx-auto w-full md:w-3/4 md:my-5 p-5 md:text-6xl text-4xl">
                            <p class="tracking-tight text-center">Una sección <b class="text-orange-600">solo para ti</b></p>
                        </div>
                        <div class="mx-auto md:w-3/4 md:my-5 md:pb-10 pb-5 md:text-2xl text-lg text-justify">
                            <p class="leading-loose tracking-tight">
                                Usamos métodos que recopilan tus comidas favoritas y calculan distintos alimentos que podrían gustarte, echa un vistazo a esta sección.
                            </p>
                        </div>
                    </div>
                    <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                        {products.map(product => (
                            <div key={product.id} class="grid grid-cols-2 justify-items-center">
                                {/* <Image class="h-60 w-full bg-gray-200 border-black" src={product.url} alt={product.name} width={300} height={300}/> */}
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
                                        <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/*MAIN*/}
                <Footer/>
            </div>
            <Carrito historialProductos={historialProductos} setHistorialProductos={setHistorialProductos} recogerCarrito={recogerCarrito} setRecogerCarrito={setRecogerCarrito} pedirCarrito={pedirCarrito} setPedirCarrito={setPedirCarrito} onCarrito={onCarrito} setOnCarrito={setOnCarrito} setAllProducts={setAllProducts} allProducts={allProducts} setTotal={setTotal} total={total}/>
            <Calificar calificarProductos={calificarProductos} setCalificarProductos={setCalificarProductos} historialProductos={historialProductos} setHistorialProductos={setHistorialProductos} recogerCarrito={recogerCarrito} setRecogerCarrito={setRecogerCarrito} allProducts={allProducts} setAllProducts={setAllProducts}/>                               
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