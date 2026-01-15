import { useState,useEffect } from "react"
import { useParams } from "react-router" 
import { useFetch } from "../../../../hooks/useFetch"



const DetailsEstudiante = () => {
    
    const {id}=useParams()

    const [estudiantes, setEstudiantes]= useState({})
    const fetchDataBackend = useFetch()
    
    useEffect(() => {

        const detalleEstudiante = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/detalle/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers= {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            const response = await fetchDataBackend(url, null, "GET", headers)


            setEstudiantes(response)
        }
        detalleEstudiante()
    }, [])




    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Informacion del Estudiante</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                            
                </div>


            <div>
                <div className='m-5 flex justify-between'>

                    <div>


                        <ul className="list-disc pl-5">

                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Información Personal</li>


                            {/* Datos del propietario */}
                            <ul className="pl-5">
                                

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Cédula:  {estudiantes?.cedulaEstudiante} </span>
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Nombre:  {estudiantes?.nombreEstudiante} </span>
                                </li>

                                 <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Apellido:  {estudiantes?.apellidoEstudiante} </span>
                                </li>

                                 <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">genero:  {estudiantes?.genero} </span>
                                </li>
                               
                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Celular:  {estudiantes?.telefonoEstudiante}</span>
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Dirección:  {estudiantes?.direccionEstudiante}</span>
                                </li>

                            </ul>   

                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Información Institucional </li>

                            <ul>

                                

                                 <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Correo electrónico:  {estudiantes?.emailEstudiante} </span>
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Estado: {estudiantes?.status}</span>
                                </li>
                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Carrera: {estudiantes?.carreraEstudiante}</span>
                                </li>
                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Semestre: {estudiantes?.semestre}</span>
                                </li>
                            </ul>

                        </ul>

                    </div>
                    
                    
                    {/* Imagen lateral */}
                    <div>
                        <img src="https://static4.depositphotos.com/1013084/343/v/450/depositphotos_3430480-stock-illustration-sport-silhouettes.jpg" 
                            alt="dogandcat" className='h-80 w-150' />
                    </div>
                </div>

            </div>
        </>

    )
}

export default DetailsEstudiante