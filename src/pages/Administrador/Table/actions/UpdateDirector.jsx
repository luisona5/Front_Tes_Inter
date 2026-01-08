import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {useFetch} from "../../../../hooks/useFetch"
import  FormDirector  from "../../../Administrador/FormDirector"

const UpdateDirector = () => {

    const { id } = useParams()
    const [director, setDirector] = useState({})
    const fetchDataBackend = useFetch()

    useEffect(() => {
        const searchDirector = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/actualizar/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers= {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`
            }
            const response = await fetchDataBackend(url, null, "GET", headers)
            setDirector(response || {})
        }
        searchDirector()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite actualizar informacion </p>
            
            <FormDirector 
                director={director} 
                isUpdate={true}
            />
                    
        </div>
    )
}

export default UpdateDirector