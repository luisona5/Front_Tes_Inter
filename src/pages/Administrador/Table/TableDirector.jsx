import {  MdInfo, MdInsertDriveFile,  MdUpdate} from "react-icons/md"
import { useFetch } from "../../../hooks/useFetch"
import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { useNavigate } from "react-router"
import { Search } from "lucide-react"
import { ToastContainer } from "react-toastify"
import SimpleDirectorPDF from "../pdf/ConversePDF"; // o donde lo guardes
import { BlobProvider } from "@react-pdf/renderer"


const TableDirector = () => {
    const fetchDataBackend = useFetch()
    const [directores, setDirectores] = useState([])
    const [busqueda, setBusqueda] = useState('')
    
    
    const navigate = useNavigate()

    const listDirector = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/visualizarDirectores`
        
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setDirectores(response)
    }

    

    const deleteDirector = async(id) => {
    const confirmDelete = 
    confirm("Advertencia: Esta acción se eliminara de manera permanente. ¿Deseas continuar?");
    
    if (confirmDelete) {
        try {
           
            const url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/eliminar/${id}` 

            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const options = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`,
            }

            const body = JSON.stringify({ estadoDirector: false });

            await fetchDataBackend(url, body, "DELETE", options);
            setDirectores((prevDirectores) => prevDirectores.filter(director => director._id !== id))


            listDirector(); 

        } catch (error) {
            console.error("Error al desabihilitar director.", error);
        }
    }
};


    
    useEffect(() => {
        listDirector()
    }, [])

    const filteredDirectores = directores.slice().sort((a, b) => {

            const apellidoComparison = a.apellidoDirector.localeCompare(b.apellidoDirector, 'es', { sensitivity: 'base' });
            
            if (apellidoComparison !== 0) {
                return apellidoComparison; 
            }

            return a.nombreDirector.localeCompare(b.nombreDirector, 'es', { sensitivity: 'base' });
        })

        .filter(director => {
            if (!busqueda) return true
            
            const buscar = busqueda.toLowerCase()
            return (
                director.nombreDirector.toLowerCase().includes(buscar) ||
                director.apellidoDirector.toLowerCase().includes(buscar) ||
                director.cedulaDirector.toLowerCase().includes(buscar) ||
                director.emailDirector.toLowerCase().includes(buscar)
            )
        })


    if (directores.length === 0) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50
            dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">No existen registros</span>
            </div>
        )
    }

    return (
        <div>
            <ToastContainer/>

            {/* PASO 4: Barra de búsqueda */}
            <div className='mb-6'>
               <div className="relative w-1/2">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent shadow-sm"
                />
                </div>
                
            </div>

            {/* Mensaje cuando la búsqueda no encuentra resultados */}
            {filteredDirectores.length === 0 && busqueda && (
                <div className="p-4 mb-4 text-sm text-yellow-600 rounded-lg bg-yellow-100" role="alert">
                    <span className="font-medium">
                        No se encontraron resultados 
                    </span>
                </div>
            )}

            {/* PASO 5: Usar filteredDirectores en lugar de directores */}
            <table className="w-full mt-5 table-fixed shadow-xl bg-white rounded-lg overflow-hidden">


                {/* Encabezado */}
                <thead className="bg-gray-500 border-b-2 border-cyan-500 text-white uppercase tracking-wider text-xs font-bold">
                    <tr>
                        {["N°","apellido","nombre",  "Email", "Estado", "Acciones","PDF"].map((header) => (
                            <th key={header} className="p-2">{header}</th>
                        ))}
                    </tr>
                </thead>

                {/* Cuerpo de la tabla */}
                <tbody>
                    {filteredDirectores.map((Director, index) => (
                        <tr className="hover:bg-gray-300 text-center" key={Director._id}>
                            <td>{index + 1}</td>
                            <td>{Director.apellidoDirector}</td>
                            <td>{Director.nombreDirector}</td>
                            <td>{Director.emailDirector}</td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <span 
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${Director.estadoDirector 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {Director.estadoDirector ? "Activo" : "Inactivo"}
                                </span>
                            </td>

                            {/* Columna de acciones */}
                            <td className="py-2 text-center">
                                <button 
                                    onClick={() => navigate(`/dashboard/Director-de-Evento/informacion-completa/${Director._id}`)}
                                    className="text-green-600 hover:text-green-900 p-1.5 rounded-full hover:bg-green-100 transition"
                                    title="Más información"
                                >
                                    <MdInfo className="h-5 w-5" /> 
                                </button>

                                <button 
                                
                                    onClick={() => navigate(`/dashboard/update/Director-de-Evento/informacion-completa/${Director._id}`)}
                                    className="text-blue-600 hover:text-blue-900 p-1.5 rounded-full hover:bg-blue-100 transition ml-2"
                                    title="Actualizar"
                                >
                                    <MdUpdate className="h-5 w-5" />                                
                                </button>

                                


                                <button 
                                    onClick={()=>{deleteDirector(Director._id)}}
                                    className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-100 transition ml-2"
                                    title="Eliminar"

                                >
                                    <Trash2 className="h-5 w-5" /> 
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">

                                <BlobProvider document={<SimpleDirectorPDF data={Director} />}>
                                    {({  url, loading }) => (
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                        if (url) window.open(url, "_blank");
                                        }}
                                        className="text-black hover:text-red-900 p-1.5 rounded-full hover:bg-red-100 transition ml-2"
                                        title="Ver PDF"
                                    >
                                        <MdInsertDriveFile className="h-5 w-5" /> 

                                    </button>
                                    )}
                                </BlobProvider>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableDirector