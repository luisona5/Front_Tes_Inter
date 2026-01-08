import { useState,useEffect } from "react"
import { useParams } from "react-router" 
import { useFetch } from "../../../../hooks/useFetch"



const DetailsDirector = () => {
    
    const {id}=useParams()

    const [directores, setDirectores]= useState({})
    const fetchDataBackend = useFetch()

    useEffect(() => {

        const detalleDirector = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/detalle/informacion/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers= {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            const response = await fetchDataBackend(url, null, "GET", headers)


            setDirectores(response)
        }
        detalleDirector()
    }, [])




    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Informacion del Director</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                <p className='mb-8'>Detalle completo del perfil asigando</p>
            </div>


            <div>
                <div className='m-5 flex justify-between'>

                    <div>


                        <ul className="list-disc pl-5">

                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Información Personal</li>


                            {/* Datos del propietario */}
                            <ul className="pl-5">
                                

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Cédula:  {directores?.cedulaDirector} </span>
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Nombre:  {directores?.nombreDirector} </span>
                                </li>
                                 <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Apellido:  {directores?.apellidoDirector} </span>
                                </li>

                               
                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Celular:  {directores?.telefonoDirector}</span>
                                </li>

                            </ul>   

                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Datos del Director </li>

                            <ul>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">identificador:  {directores?._id} </span>
                                </li>

                                 <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Correo electrónico:  {directores?.emailDirector} </span>
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Estado: {directores?.status}</span>
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

export default DetailsDirector