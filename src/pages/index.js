import Footer from "@sspis-comicucei/components/footer"
import Menu from "@sspis-comicucei/components/menu"
import Separador from "@sspis-comicucei/components/separador"
import axios from "axios"
import { useEffect, useState } from "react"
import Carrito from "./carrito"
import Calificar from "./calificar"
import CloudinaryImage from "@sspis-comicucei/components/image"
import { useRouter } from "next/router"
import SearchResults from "./search"

const Home = ({products}) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [busqueda, setBusqueda] = useState(false)
    //MOSTRAR O NO CARRITO 
    const [onCarrito, setOnCarrito] = useState(false);
    const [recogerCarrito, setRecogerCarrito] = useState(false);
    const [pedirCarrito, setPedirCarrito] = useState(false);
    const [calificarProductos, setCalificarProductos] = useState(false);
    const [historialPerfiles, setHistorialPerfiles] = useState([]); //historial de perfiles
    
    //PERFILES DE PREFERENCIAS
    const [misBebidas, setMisBebidas] = useState({
        usuario:0, picante:0, salado:0, dulce:0, caliente:0, frio:0, 
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
    const [misEntradas, setMisEntradas] = useState({
        usuario:0,picante:0, salado:0, dulce:0, caliente:0, frio:0, 
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
    const [misPrincipales, setMisPrincipales] = useState({
        usuario:0, picante:0, salado:0, dulce:0, caliente:0, frio:0, 
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
    const [misPostres, setMisPostres] = useState({
        usuario:0, picante:0, salado:0, dulce:0, caliente:0, frio:0, 
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
    const [bebidas, setBebidas] = useState([])
    const [entradas, setEntradas] = useState([])
    const [principales, setPrincipales] = useState([])
    const [postres, setPostres] = useState([])
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
            
            const perfilEntradas= misEntradas;
            const perfilBebidas= misBebidas;
            const perfilPrincipal= misPrincipales;
            const perfilPostre= misPostres;
            

            perfilEntradas.usuario = user.codigo;
            perfilBebidas.usuario = user.codigo;
            perfilPrincipal.usuario = user.codigo;
            perfilPostre.usuario = user.codigo;

            allProducts.forEach(product =>{
                switch(product.momento){
                    case "bebida":
                        perfilBebidas[product.origen] += product.calificacion;
                        if(product.picante=='s') perfilBebidas.picante += product.calificacion
                        if(product.saldul=='s') perfilBebidas.salado += product.calificacion
                        if(product.saldul=='d') perfilBebidas.dulce += product.calificacion
                        if(product.saldul=='sd') {
                            perfilBebidas.dulce += product.calificacion;
                            perfilBebidas.salado += product.calificacion
                        }
                        if(product.calfrio=='c') perfilBebidas.caliente += product.calificacion
                        if(product.calfrio=='f') perfilBebidas.frio += product.calificacion
                        break;
                    case "entrada":
                        perfilEntradas[product.origen] += product.calificacion;
                        if(product.picante=='s') perfilEntradas.picante += product.calificacion
                        if(product.saldul=='s') perfilEntradas.salado += product.calificacion
                        if(product.saldul=='d') perfilEntradas.dulce += product.calificacion
                        if(product.saldul=='sd') {
                            perfilEntradas.dulce += product.calificacion;
                            perfilEntradas.salado += product.calificacion
                        }
                        if(product.calfrio=='c') perfilEntradas.caliente += product.calificacion
                        if(product.calfrio=='f') perfilEntradas.frio += product.calificacion
                        break;
                    case "principal":
                        perfilPrincipal[product.origen] += product.calificacion;
                        if(product.picante=='s') perfilPrincipal.picante += product.calificacion
                        if(product.saldul=='s') perfilPrincipal.salado += product.calificacion
                        if(product.saldul=='d') perfilPrincipal.dulce += product.calificacion
                        if(product.saldul=='sd') {
                            perfilPrincipal.dulce += product.calificacion;
                            perfilPrincipal.salado += product.calificacion
                        }
                        if(product.calfrio=='c') perfilPrincipal.caliente += product.calificacion
                        if(product.calfrio=='f') perfilPrincipal.frio += product.calificacion
                        break;
                    case "postre":
                        perfilPostre[product.origen] += product.calificacion;
                        if(product.picante=='s') perfilPostre.picante += product.calificacion
                        if(product.saldul=='s') perfilPostre.salado += product.calificacion
                        if(product.saldul=='d') perfilPostre.dulce += product.calificacion
                        if(product.saldul=='sd') {
                            perfilPostre.dulce += product.calificacion;
                            perfilPostre.salado += product.calificacion
                        }
                        if(product.calfrio=='c') perfilPostre.caliente += product.calificacion
                        if(product.calfrio=='f') perfilPostre.frio += product.calificacion
                        break;
                    default:
                        break;
                }
            });
            
            setMisBebidas(perfilBebidas);
            setMisEntradas(perfilEntradas);
            setMisPrincipales(perfilPrincipal);
            setMisPostres(perfilPostre);

            const bebidaOrdenado = Object.entries(perfilBebidas).sort((a, b) => b[1] - a[1]);
            const entradaOrdenado = Object.entries(perfilEntradas).sort((a, b) => b[1] - a[1]);
            const principalOrdenado = Object.entries(perfilPrincipal).sort((a, b) => b[1] - a[1]);
            const postreOrdenado = Object.entries(perfilPostre).sort((a, b) => b[1] - a[1]);

            console.log("BEBIDAS");
            console.log(bebidaOrdenado);
            console.log("ENTRADAS");
            console.log(entradaOrdenado);
            console.log("PRINCIPAL");
            console.log(principalOrdenado);
            console.log("POSTRE");
            console.log(postreOrdenado);  

            ////const diccionarioOrdenado = Object.fromEntries(arrayOrdenado);

            setBebidas([]);
            setEntradas([]);
            setPrincipales([]);
            setPostres([]);

            const sBebidas = [];
            const sEntradas = [];
            const sPrincipales = [];
            const sPostres = [];

            products.forEach(product =>{
                const productAux = product;
                productAux.estadistica = 0;
                switch(product.momento){
                    case "bebida":
                        //console.log("ENTRA BEBIDA", product.nombre);
                        for(let propiedad = 1; propiedad<4; propiedad++){
                            switch(bebidaOrdenado[propiedad][0]){
                                case "caliente":
                                    if(productAux.calfrio=="c") productAux.estadistica += bebidaOrdenado[propiedad][1];
                                    break;
                                case "frio":
                                    if(productAux.calfrio=="f") productAux.estadistica += bebidaOrdenado[propiedad][1];
                                    break;
                                case "dulce":
                                    if(productAux.saldul=="d" || productAux.saldul=="sd") productAux.estadistica += bebidaOrdenado[propiedad][1];
                                    break;
                                case "salado":
                                    if(productAux.saldul=="s" || productAux.saldul=="sd") productAux.estadistica += bebidaOrdenado[propiedad][1];
                                    break;
                                case "picante":
                                    if(productAux.picante=="s") productAux.estadistica += bebidaOrdenado[propiedad][1];
                                    break;
                                case "mx":
                                    if(productAux.origen == "mx") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "na":
                                    if(productAux.origen == "na") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "sa":
                                    if(productAux.origen == "sa") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "ca":
                                    if(productAux.origen == "ca") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "eur":
                                    if(productAux.origen == "eur") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "afr":
                                    if(productAux.origen == "afr") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "ori":
                                    if(productAux.origen == "ori") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "chn":
                                    if(productAux.origen == "chn") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "jpn":
                                    if(productAux.origen == "mx") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "ita":
                                    if(productAux.origen == "ita") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                case "fra":
                                    if(productAux.origen == "mx") productAux.estadistica+=bebidaOrdenado[propiedad][1];
                                    break;
                                default:
                                    break;
                            }
                        } 
                        sBebidas.push(productAux);
                        break;
                    case "entrada":
                        //console.log("ENTRA ENTRADA", product.nombre);
                        for(let propiedad = 1; propiedad<4; propiedad++){
                            switch(entradaOrdenado[propiedad][0]){
                                case "caliente":
                                    if(productAux.calfrio=="c") productAux.estadistica += entradaOrdenado[propiedad][1];
                                    break;
                                case "frio":
                                    if(productAux.calfrio=="f") productAux.estadistica += entradaOrdenado[propiedad][1];
                                    break;
                                case "dulce":
                                    if(productAux.saldul=="d" || productAux.saldul=="sd") productAux.estadistica += entradaOrdenado[propiedad][1];
                                    break;
                                case "salado":
                                    if(productAux.saldul=="s" || productAux.saldul=="sd") productAux.estadistica += entradaOrdenado[propiedad][1];
                                    break;
                                case "picante":
                                    if(productAux.picante=="s") productAux.estadistica += entradaOrdenado[propiedad][1];
                                    break;
                                case "mx":
                                    if(productAux.origen == "mx") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "na":
                                    if(productAux.origen == "na") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "sa":
                                    if(productAux.origen == "sa") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "ca":
                                    if(productAux.origen == "ca") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "eur":
                                    if(productAux.origen == "eur") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "afr":
                                    if(productAux.origen == "afr") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "ori":
                                    if(productAux.origen == "ori") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "chn":
                                    if(productAux.origen == "chn") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "jpn":
                                    if(productAux.origen == "mx") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "ita":
                                    if(productAux.origen == "ita") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                case "fra":
                                    if(productAux.origen == "mx") productAux.estadistica+=entradaOrdenado[propiedad][1];
                                    break;
                                default:
                                    break;
                            }
                        } 
                        sEntradas.push(productAux);
                        break;
                    case "principal":
                        //console.log("ENTRA PRINCIPAL", product.nombre);
                        for(let propiedad = 1; propiedad<4; propiedad++){
                            switch(principalOrdenado[propiedad][0]){
                                case "caliente":
                                    if(productAux.calfrio=="c") productAux.estadistica += principalOrdenado[propiedad][1];
                                    break;
                                case "frio":
                                    if(productAux.calfrio=="f") productAux.estadistica += principalOrdenado[propiedad][1];
                                    break;
                                case "dulce":
                                    if(productAux.saldul=="d" || productAux.saldul=="sd") productAux.estadistica += principalOrdenado[propiedad][1];
                                    break;
                                case "salado":
                                    if(productAux.saldul=="s" || productAux.saldul=="sd") productAux.estadistica += principalOrdenado[propiedad][1];
                                    break;
                                case "picante":
                                    if(productAux.picante=="s") productAux.estadistica += principalOrdenado[propiedad][1];
                                    break;
                                case "mx":
                                    if(productAux.origen == "mx") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "na":
                                    if(productAux.origen == "na") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "sa":
                                    if(productAux.origen == "sa") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "ca":
                                    if(productAux.origen == "ca") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "eur":
                                    if(productAux.origen == "eur") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "afr":
                                    if(productAux.origen == "afr") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "ori":
                                    if(productAux.origen == "ori") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "chn":
                                    if(productAux.origen == "chn") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "jpn":
                                    if(productAux.origen == "jpn") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "ita":
                                    if(productAux.origen == "ita") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                case "fra":
                                    if(productAux.origen == "fra") productAux.estadistica+=principalOrdenado[propiedad][1];
                                    break;
                                default:
                                    break;
                            }
                        } 
                        sPrincipales.push(productAux);
                        break;
                    case "postre":
                        //console.log("ENTRA POSTRE", product.nombre);
                        for(let propiedad = 1; propiedad<4; propiedad++){
                            switch(postreOrdenado[propiedad][0]){
                                case "caliente":
                                    if(productAux.calfrio=="c") productAux.estadistica += postreOrdenado[propiedad][1];
                                    break;
                                case "frio":
                                    if(productAux.calfrio=="f") productAux.estadistica += postreOrdenado[propiedad][1];
                                    break;
                                case "dulce":
                                    if(productAux.saldul=="d" || productAux.saldul=="sd") productAux.estadistica += postreOrdenado[propiedad][1];
                                    break;
                                case "salado":
                                    if(productAux.saldul=="s" || productAux.saldul=="sd") productAux.estadistica += postreOrdenado[propiedad][1];
                                    break;
                                case "picante":
                                    if(productAux.picante=="s") productAux.estadistica += postreOrdenado[propiedad][1];
                                    break;
                                case "mx":
                                    if(productAux.origen == "mx") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "na":
                                    if(productAux.origen == "na") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "sa":
                                    if(productAux.origen == "sa") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "ca":
                                    if(productAux.origen == "ca") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "eur":
                                    if(productAux.origen == "eur") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "afr":
                                    if(productAux.origen == "afr") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "ori":
                                    if(productAux.origen == "ori") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "chn":
                                    if(productAux.origen == "chn") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "jpn":
                                    if(productAux.origen == "mx") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "ita":
                                    if(productAux.origen == "ita") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                case "fra":
                                    if(productAux.origen == "mx") productAux.estadistica+=postreOrdenado[propiedad][1];
                                    break;
                                default:
                                    break;
                            }
                        } 
                        sPostres.push(productAux);
                        break;
                    default:
                        break;
                }
            })

            //ORDEN DE LOS PRODUCTOS POR ESTADISTICA DE FORMA DESCENDENTE 
            sBebidas.sort((a, b) => b.estadistica - a.estadistica);
            sEntradas.sort((a, b) => b.estadistica - a.estadistica);
            sPrincipales.sort((a, b) => b.estadistica - a.estadistica);
            sPostres.sort((a, b) => b.estadistica - a.estadistica);

            //RECORTANTO ARRAY A LOS PRIMROS 6 PRODUCTOS
            const sBebidas_ = sBebidas.slice(0, 6);
            const sEntradas_ = sEntradas.slice(0, 6);
            const sPrincipales_ = sPrincipales.slice(0, 6);
            const sPostres_ = sPostres.slice(0, 6);

            //ESTABLECIENDO ESTADO FINAL
            setBebidas(sBebidas_);
            setEntradas(sEntradas_);
            setPrincipales(sPrincipales_);
            setPostres(sPostres_);

            setAllProducts([]);
            setCalificarProductos(false);
        }
        
    }, [calificarProductos]);
    
    // console.log("LISTO PARA MOSTRAR")
    // console.log("BEBIDAS");
    // console.log(bebidas);
    // console.log("ENTRADAS");
    // console.log(entradas);
    // console.log("PRINCIPAL");
    // console.log(principales);
    // console.log("POSTRE");
    // console.log(postres);  

    console.log(calificarProductos);
    console.log(historialProductos);

    const handleSubmit = (e) => {
        e.preventDefault();
        setBusqueda(true);
        //router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
      };

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

                {
                    busqueda ?
                        <SearchResults setBusqueda={setBusqueda} term={searchTerm} allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} user={user}/>
                    :
                    <div class="md:w-3/4 w-5/6 mx-auto flex flex-col ml-100 p-0">
                        <div class="mx-auto w-full md:w-3/4 md:py-10 mb-10">
                            <div class="mx-auto w-full md:w-3/4 md:my-5 p-5 md:text-6xl text-4xl">
                                <p class="tracking-tight text-center">¿Lo pensaste?, <b class="text-orange-600">búscalo</b></p>
                            </div>
                            <form onSubmit={handleSubmit} class="w-full m-auto 2xl:w-1/3">   
                                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input onChange={(e) => setSearchTerm(e.target.value)} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hoy quiero comer..." required/>
                                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                                </div>
                            </form>
                        </div>
                        <Separador/>
                        <div class="mx-auto w-full md:my-5 mb-5">
                            <div class="mx-auto w-full md:w-3/4 md:my-5 p-5 md:text-6xl text-4xl">
                                <p class="tracking-tight text-center">Una sección <b class="text-orange-600">solo para ti</b></p>
                            </div>
                            <div class="mx-auto md:w-3/4 md:my-5 md:pb-10 pb-5 md:text-2xl text-lg text-justify">
                                <p class="leading-loose tracking-tight">
                                    Usamos métodos que recopilan tus comidas favoritas y calculan distintos alimentos que podrían gustarte, echa un vistazo a esta sección.
                                </p>
                            </div>
                        </div>
                        <div class="mx-auto w-full md:my-5 p-5 md:text-6xl text-4xl">
                            <h2 class="text-orange-600 font-bold">Bebidas</h2>
                        </div>
                        <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                            {bebidas.map(product => (
                                <div key={product.id} class="grid grid-cols-2 justify-items-center place-content-center rounded-3xl shadow border">
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
                                            <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer border rounded-full bg-orange-500 shadow">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="mx-auto w-full md:my-5 p-5 md:text-6xl text-4xl">
                            <h2 class="text-orange-600 font-bold">Entradas</h2>
                        </div>
                        <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                            {entradas.map(product => (
                                <div key={product.id} class="grid grid-cols-2 justify-items-center place-content-center rounded-3xl shadow border">
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
                                            <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer border rounded-full bg-orange-500 shadow">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="mx-auto w-full md:my-5 p-5 md:text-6xl text-4xl">
                            <h2 class="text-orange-600 font-bold">Platillos Principales</h2>
                        </div>
                        <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                            {principales.map(product => (
                                <div key={product.id} class="grid grid-cols-2 justify-items-center place-content-center rounded-3xl shadow border">
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
                                            <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer border rounded-full bg-orange-500 shadow">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="mx-auto w-full md:my-5 p-5 md:text-6xl text-4xl">
                            <h2 class="text-orange-600 font-bold">Postres o Botanas</h2>
                        </div>
                        <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                            {postres.map(product => (
                                <div key={product.id} class="grid grid-cols-2 justify-items-center place-content-center rounded-3xl shadow border">
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
                                            <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer border rounded-full bg-orange-500 shadow">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="mx-auto w-full md:my-5 p-5 md:text-6xl text-4xl">
                            <h2 class="text-orange-600 font-bold">Todos los productos</h2>
                        </div>
                        <div class="mx-auto w-full mb-10 grid grid-cols-1 md:grid xl:grid-cols-2 gap-4">
                            {products.map(product => (
                                <div key={product.id} class="grid grid-cols-2 justify-items-center place-content-center rounded-3xl shadow border">
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
                                            <svg onClick={() => addProduct(product)} xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer border rounded-full bg-orange-500 shadow">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                
                {/*MAIN*/}
                <Footer/>
            </div>
            <Carrito setRecogerCarrito={setRecogerCarrito} pedirCarrito={pedirCarrito} setPedirCarrito={setPedirCarrito} onCarrito={onCarrito} setOnCarrito={setOnCarrito} setAllProducts={setAllProducts} allProducts={allProducts} setTotal={setTotal} total={total}/>
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