import Image from "next/image"
import logo from "../../public/logo.png"

const Footer = () => {
    return(
        <section class="">
            <footer class="rounded-t-lg shadow dark:bg-gray-900 dark:text-white m-4 my-0">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
                        <Image class={"h-10 w-10 mr-2"} src={logo} alt="ComiCucei Logo"></Image>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ComiCucei</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" class="mr-4 hover:underline md:mr-6 ">Acerca de</a>
                            </li>
                            <li>
                                <a href="#" class="mr-4 hover:underline md:mr-6">Políticas de Privacidad</a>
                            </li>
                            <li>
                                <a href="#" class="mr-4 hover:underline md:mr-6 ">Patrocinios</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Contacto</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">ComiCucei™</a>. Todos los derechos reservados.</span>
                </div>
            </footer>
        </section>
    )
}

export default Footer