/* eslint-disable react/prop-types */
import { useState, useEffect } from "react" 
import { useNavigate } from "react-router" 
import { ToastContainer } from "react-toastify"
import storeAuth from "../../../../../context/storeAuth"
import { useFetch } from "../../../../../hooks/useFetch"
import { ShoppingCart,  Search, Loader2 } from 'lucide-react'



const TableUniforms = ({ uniforms: uniformsProp }) => {
    const { rol } = storeAuth()
    const fetchDataBackend = useFetch()
    const navigate = useNavigate()
    
    const [uniforms, setUniforms] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [loading, setLoading] = useState(true)

    const listCategory = async () => {
        try {
            setLoading(true)
            const url = `${import.meta.env.VITE_BACKEND_URL}/lista-de-uniforme/listar`
            
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`,
            }
            
            const response = await fetchDataBackend(url, null, "GET", headers)
            
            if (response) {
                setUniforms(Array.isArray(response) ? response : (response.data || []))
            }
        } catch (error) {
            console.error("Error al cargar uniformes:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listCategory()
    }, [])

    // Filtrado de uniformes
    const uniformesFiltrados = uniforms.filter(uniform => 
        uniform.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        uniform.detalle?.toLowerCase().includes(busqueda.toLowerCase()) ||
        uniform.talla?.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <div className="w-full px-4 py-6">
            <ToastContainer />

            {/* Header con búsqueda */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, detalle o talla..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">N°</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Nombre</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Detalle</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Talla</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Precio</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                                            <span className="text-gray-500 text-sm">Cargando uniformes...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : uniformesFiltrados.length > 0 ? (
                                uniformesFiltrados.map((uniform, index) => (
                                    <tr
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                        key={uniform._id || index}
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-600">{index+1}</td>

                                        <td className="px-4 py-4 text-sm text-gray-600">{uniform?.nombre}</td>

                                        <td className="px-4 py-4 text-sm text-gray-600">{uniform?.detalle}</td>

                                        <td className="px-4 py-4 text-sm text-gray-600">{uniform?.talla}</td>

                                        <td className="px-4 py-4 text-sm text-gray-600"> $ {uniform?.precioUniforme} (USD)</td>



                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <ShoppingCart className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-gray-500 font-medium">
                                                {busqueda ? "No se encontraron uniformes" : "No hay uniformes registrados"}
                                            </p>
                                            {busqueda && (
                                                <button
                                                    onClick={() => setBusqueda('')}
                                                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                                >
                                                    Limpiar búsqueda
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default TableUniforms