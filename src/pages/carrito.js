import Menu from "@sspis-comicucei/components/menu"
import Footer from "@sspis-comicucei/components/footer"
import Separador from "@sspis-comicucei/components/separador"

const Carrito = () =>{
    return(
        <section class="bg-white text-black">
            <Menu/>
            <div class="w-3/4 mx-auto flex flex-col ml-100 p-0">
                <div class="mx-auto w-full md:w-3/4 md:my-5 md:pt-5">
                    <p class="text-8xl font-bold tracking-tight text-orange-700">Mi pedido</p>
                </div>
                <div class="mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5">
                    <p class="text-2xl leading-loose tracking-tight ">
                        Una vez pedido tu carrito, te daremos un código único con el que podrás pagar y recoger tu comida.
                    </p>
                </div>
                <Separador/>
                <div class="h-screen mx-auto w-full md:w-3/4 my-5 md:pb-10 pb-5 bg-gray-900 rounded-3xl text-center align-middle text-gray-300 text-5xl">
                    Carrito
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default Carrito