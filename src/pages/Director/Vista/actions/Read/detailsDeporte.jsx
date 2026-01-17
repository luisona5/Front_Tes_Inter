import { useState,useEffect } from "react"
import { useParams } from "react-router" 
import { useFetch } from "../../../../../hooks/useFetch"



const DetailsDeporte= () => {
    
    const {id}=useParams()

    const [deporte, setCaDeportes]= useState({})
    const fetchDataBackend = useFetch()
    
    useEffect(() => {

        const detalleDeporte = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/detalleDeporte/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers= {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            const response = await fetchDataBackend(url, null, "GET", headers)


            setCaDeportes(response)
        }
        detalleDeporte()
    }, [])




    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Informacion de Deporte</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                <p className='mb-8'>Detalle completo de Deporte seleccionado</p>
            </div>


            <div>
                <div className='m-5 flex justify-between'>

                    <div>


                        <ul className="list-disc pl-5">

                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Información completa</li>


                            {/* Datos del propietario */}
                            <ul className="pl-5">

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Nombre:  {deporte?.nombre} </span>
                                </li>
                                 <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Detalle:  {deporte?.detalle} </span>
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Categoria:  {deporte.categoria?.nombre} </span>
                                </li>
                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">descripción:  {deporte.categoria?.descripcion} </span>
                                </li>
                                 

                            </ul>  
                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Detalle para inscripción </li>

                                <ul className="pl-5">
                                    <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">fecha inicio:  {new Date(deporte.fechaInicio).toLocaleDateString('es-EC', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} </span>
                                    </li>
                                     <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">fecha fin:  {new Date(deporte.fechaFin).toLocaleDateString('es-EC', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} </span>
                                    </li>
                                    
                                    <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">hora Inicio:  {deporte?.horaInicio} </span>
                                    </li>
                                     <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">hora Fin:  {deporte?.horaFin} </span>
                                    </li>
                                    <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">lugar:  {deporte?.lugar} </span>
                                    </li>
                                    <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">Cupos:  {deporte?.cupo} </span>
                                    </li>
                                    <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">fecha para entrenamientos:  {new Date(deporte.EntrenamientoDia).toLocaleDateString('es-EC', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} </span>
                                    </li>

                                    <li className="text-md mt-2">
                                        <span className="text-gray-600 font-bold">hora para entrenamientos:  {deporte?.EntrenamientoHora} </span>
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

export default DetailsDeporte