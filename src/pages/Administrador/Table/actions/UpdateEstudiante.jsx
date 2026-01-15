import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {useFetch} from "../../../../hooks/useFetch"
import  FormEstudiante from "../../../Administrador/FormEstudiante"

const UpdateEstudiante = () => {

    const { id } = useParams()
    const [estudiante, setEstudiante] = useState({})
    const fetchDataBackend = useFetch()

    useEffect(() => {
        const searchEstudiante = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/detalle/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers= {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`
            }
            const response = await fetchDataBackend(url, null, "GET", headers)
            setEstudiante(response || {})
        }
        searchEstudiante()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite actualizar informacion </p>
            
            {
                Object.keys(estudiante).length !== 0 ?
                    (
                        <FormEstudiante estudiante={estudiante} />
                    )
                    :
                    (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">No existen registros </span>
                        </div>
                    )
            }
                    
        </div>
    )
}

export default UpdateEstudiante