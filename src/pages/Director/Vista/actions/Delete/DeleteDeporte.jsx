import { MdInfo, MdUpdate } from "react-icons/md"
import { useFetch } from "../../../../../hooks/useFetch"
import { useEffect, useState } from "react"
import { FileDown, Trash2, Search, Download, Plus, AlertCircle } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer"
import SimpleSportPDF from "../../pdf/Sport"

const TablaDeporte = () => {
    const fetchDataBackend = useFetch()
    const [deportes, setDeportes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    
    const navigate = useNavigate()

    const listDeporte = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/deportesEsfot/visualizarDeportes`
        
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setDeportes(response)
    }

    const deleteDeporte = async(id) => {
        const confirmDelete = confirm("Advertencia: Esta acción se eliminara de manera permanente. ¿Deseas continuar?")
        
        if (confirmDelete) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/Deporte/eliminar/${id}` 
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const options = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
                const body = JSON.stringify({ estadoDeporte: false })
                await fetchDataBackend(url, body, "DELETE", options)
                setDeportes((prevDeportes) => prevDeportes.filter(deporte => deporte._id !== id))
                listDeporte()
            } catch (error) {
                console.error("Error al deshabilitar deporte.", error)
            }
        }
    }

    useEffect(() => {
        listDeporte()
    }, [])

    const filteredDeporte = deportes.slice().sort((a, b) => {
        const nombreComparison = a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
        if (nombreComparison !== 0) {
            return nombreComparison
        }
        return a.nombre.localeCompare(b.fecha, 'es', { sensitivity: 'base' })
    }).filter(deporte => {
        if (!busqueda) return true
        const buscar = busqueda.toLowerCase()
        return deporte.nombre.toLowerCase().includes(buscar)
    })

    // Estado vacío cuando no hay deportes
    if (deportes.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <ToastContainer />
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="mb-6">
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No hay Deportes Registrados
                            </h3>
                           
                        </div>
                        
                        <Link to='/dashboard/inscripciones/Deporte/nuevo/Director'>
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Registrar Deporte
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer />

            {/* Header con búsqueda y botones */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">

                <div className="flex items-center justify-between gap-6">
                    {/* Buscador */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Botón de descarga PDF */}
                    <PDFDownloadLink
                        document={<SimpleSportPDF deportes={filteredDeporte} />}
                        fileName={`deportes-${new Date().toISOString().split('T')[0]}.pdf`}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                        {({ loading }) => (
                            <>
                                <Download className="w-5 h-5" />
                                <span>{loading ? 'Generando...' : 'Descargar PDF'}</span>
                            </>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>

            {/* Mensaje cuando no hay resultados de búsqueda */}
            {filteredDeporte.length === 0 && busqueda && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <p className="font-medium text-yellow-800 text-lg mb-1">No se encontraron resultados</p>
                    <p className="text-yellow-600 text-sm">
                        No hay deportes que coincidan con {busqueda}
                    </p>
                </div>
            )}
            <Link to='/dashboard/inscripciones/Deporte/nuevo/Director'>
                        <button className="flex items-center gap-3 bg-blue-900 text-white px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium transform hover:scale-105">
                    Nuevo Deporte
                </button>
            </Link>
            {/* Tabla de deportes */}
            {filteredDeporte.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Encabezado */}
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">N°</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Nombre</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Categoría</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Fecha Inicio</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Fecha Fin</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Estado</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase">Acciones</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase">PDF</th>
                                </tr>
                            </thead>

                            {/* Cuerpo */}
                            <tbody className="divide-y divide-gray-200">
                                {filteredDeporte.map((deporte, index) => (
                                    <tr 
                                        key={deporte._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700">{deporte.nombre}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">{deporte.categoria?.nombre}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {new Date(deporte.fechaInicio).toLocaleDateString('es-EC', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {new Date(deporte.fechaFin).toLocaleDateString('es-EC', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span 
                                                className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full
                                                ${deporte.estadoDeporte
                                                    ? 'bg-green-100 text-green-800 ring-1 ring-green-600' 
                                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}
                                            >
                                                {deporte.estadoDeporte ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>

                                        {/* Acciones */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => navigate(`/dashboard/Deporte-esfot-epn/informacion-Deporte/${deporte._id}`)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Ver información"
                                                >
                                                    <MdInfo className="h-5 w-5" /> 
                                                </button>

                                                <button 
                                                    onClick={() => navigate(`/dashboard/update/Deporte-esfot-epn/informacion-Deporte/${deporte._id}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Actualizar"
                                                >
                                                    <MdUpdate className="h-5 w-5" />                                
                                                </button>

                                                <button 
                                                    onClick={() => deleteDeporte(deporte._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="h-5 w-5" /> 
                                                </button>
                                            </div>
                                        </td>

                                        {/* Botón PDF */}
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center">
                                                <BlobProvider document={<SimpleSportPDF data={deporte} />}>
                                                    {({ url, loading }) => (
                                                        <button
                                                            disabled={loading}
                                                            onClick={() => {
                                                                if (url) window.open(url, "_blank")
                                                            }}
                                                            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium disabled:bg-gray-400"
                                                        >
                                                            <FileDown className="h-4 w-4" />
                                                            <span>{loading ? "Generando..." : "Ver PDF"}</span>
                                                        </button>
                                                    )}
                                                </BlobProvider>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TablaDeporte