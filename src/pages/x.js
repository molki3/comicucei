import axios from "axios"
import { useState } from "react";
import { useRouter } from "next/router";

export default function X() {
  
    //USE STATE PARA LOS DATOS DE USUARIO
    const [user, setUser] = useState({
        codigo: "",
        nombre: ""
    })

    const router = useRouter();

    //MANDA UNA PETICION GET AL BACKEND PARA TRAER EL PERFIL
    const getProfile = async () =>{
        //retorna un objeto con codigo y nombre
        const response = await axios.get('/api/profile');
        console.log(response);
        setUser(response.data);
    }

    //MANDA PETICION AL BACKEND PARA CAMBIAR EL TOKEN A NULO Y CERRAR SESION
    const logout = async () => {
        await axios.post('/api/auth/logout');
        router.push("/login");
    }

    return (
        <div class="bg-black text-white">
            <h1>Dashboard</h1>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            <button onClick={getProfile}>
              get profile
            </button>
            <button onClick={logout}>
              logout
            </button>
        </div>
    )
  }
