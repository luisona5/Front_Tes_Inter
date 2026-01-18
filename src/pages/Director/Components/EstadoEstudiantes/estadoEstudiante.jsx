import { MdInfo } from "react-icons/md"
import { useFetch } from "../../../../hooks/useFetch"
import { useEffect, useState } from "react"
import { FileDown, Search, Download } from "lucide-react"
import {  useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer"
import SimpleCategoryPDF from "../../../../pages/Estudiante/pdf/Inscripcion"



const TablaEstadoEstudiante = () => {
    const fetchDataBackend = useFetch()
    const [estados, setEstados] = useState([])
    const [busqueda, setBusqueda] = useState('')

    
    const navigate = useNavigate()

    const listEstados = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/listado-estados-director`
        
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setEstados(response)
    }

    
    const estadoStyles = {
    'Aprobada':'bg-green-100 text-green-800 ring-1 ring-green-600',
    'Pendiente': 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-600',
    'Rechazada': 'bg-red-100 text-red-800 ring-1 ring-red-600'
};
    useEffect(() => {
        listEstados()
    }, [])

    const filteredEstado = estados.slice().sort((a, b) => {
        const apellidoComparison = a.apellido.localeCompare(b.apellido, 'es', { sensitivity: 'base' });
        if (apellidoComparison !== 0) {
            return apellidoComparison; 
        }
        return a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' });
    }).filter(Inscription => {
        if (!busqueda) return true
        const buscar = busqueda.toLowerCase()
        return (
            Inscription.nombre.toLowerCase().includes(buscar) ||
            Inscription.apellido.toLowerCase().includes(buscar) ||
            Inscription.cedula.toLowerCase().includes(buscar) ||
            Inscription.email.toLowerCase().includes(buscar)||
            Inscription.deporte?.nombre.toLowerCase().includes(buscar)||
            Inscription.categoria?.nombre.toLowerCase().includes(buscar)
        )
    })

    if (estados.length === 0) {
        return (
            <div className="p-6 text-center">
                <div className="inline-block p-8 bg-red-50 rounded-2xl shadow-md">
                    <p className="text-red-800 font-semibold text-lg">No existen inscripciones hechas por el estudiante actualmente</p>
                </div>
            </div>
        )
    }


    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <ToastContainer />

            {/* Header con búsqueda y botón de descarga */}
            <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between gap-6">
                    {/* Buscador mejorado */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, apellido, cédula o email..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full px-4 py-3.5 pl-12 border-2 border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                                     shadow-sm hover:border-gray-300 transition-all duration-200 text-sm"
                        />
                    </div>

                    {/* Botón de descarga mejorado */}
                    <PDFDownloadLink
                        document={<SimpleCategoryPDF categories={filteredEstado} />}
                        fileName={`estudiantes${new Date().toISOString().split('T')[0]}.pdf`}
                        className="flex items-center gap-3 bg-blue-900 text-white px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium transform hover:scale-105"
                    >
                        {({ loading }) => (
                            <>
                                <Download className="w-5 h-5" />
                                <span>{loading ? 'Generando PDF...' : 'Descargar Listado'}</span>
                            </>
                        )}
                    </PDFDownloadLink>
                </div>

               
            </div>

            {/* Mensaje cuando no hay resultados */}
            {filteredEstado.length === 0 && busqueda && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center">
                        <div>
                            <p className="font-semibold text-yellow-800 text-lg">No se encontraron resultados</p>
                            
                        </div>
                    </div>
                </div>
            )}
            

            {/* Tabla mejorada */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Encabezado */}
                        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">N°</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">cédula</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Nombre</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Apellido</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Deporte</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Categoria</th>

                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Email</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Estado</th>

                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Acciones</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">PDF</th>
                            </tr>
                        </thead>

                        {/* Cuerpo */}
                        <tbody className="divide-y divide-gray-200">
                            {filteredEstado.map((Inscription, index) => (
                                <tr 
                                    key={Inscription._id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{index + 1} </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{Inscription.cedula}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{Inscription.nombre}</td>
                                    <td className="px-4 py-4 text-sm text-gray-700"> {Inscription.apellido} </td>
                                    <td className="px-4 py-4 text-sm text-gray-700"> {Inscription.deporte?.nombre} </td>
                                    <td className="px-4 py-4 text-sm text-gray-700"> {Inscription.categoria?.nombre} </td>



                                    <td className="px-4 py-4 text-sm text-gray-600">{Inscription.email}</td>

                                    <td className="px-4 py-4 text-center">
                                        <span 
                                            className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full ${
                                                estadoStyles[Inscription.estado] || 'bg-green-100 text-green-800 ring-1 ring-green-600'
                                            }`}
                                        >
                                            {Inscription.estado}
                                        </span>
                                    </td>

                                    {/* Acciones con mejor diseño */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => navigate(`/dashboard/details-inscripcion-estudinates/${Inscription._id}`)}
                                                className="p-2 text-green-600 hover:text-white hover:bg-green-600 
                                                         rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                title="Ver información"
                                            >
                                                <MdInfo className="h-5 w-5" /> 
                                            </button>


                                           
                                        </div>
                                    </td>

                                    {/* Botón PDF mejorado */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <BlobProvider document={<SimpleCategoryPDF data={Inscription} />}>
                                                {({ url, loading }) => (
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => {
                                                            if (url) window.open(url, "_blank");
                                                        }}
                                                        className="flex items-center gap-3 bg-blue-900 text-white px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium transform hover:scale-105"

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
        </div>
    )
}

export default TablaEstadoEstudiante