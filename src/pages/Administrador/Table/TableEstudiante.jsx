import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md"
import { Search, Users } from "lucide-react"
import { useFetch } from "../../../hooks/useFetch"
import { useEffect, useState } from "react"

const TableEstudiantes = () => {
    const fetchDataBackend = useFetch()
    const [estudiantes, setEstudiantes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState("asc")

    const listEstudiantes = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/visualizarEstudiantes`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setEstudiantes(response)
    }

    useEffect(() => {
        listEstudiantes()
    }, [])

    // Filtrar estudiantes según el término de búsqueda
    const filteredEstudiantes = estudiantes.filter(estudiante =>
        estudiante.nombreEstudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellidoEstudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.emailEstudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.carreraEstudiante?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Ordenar alfabéticamente
    const sortedEstudiantes = [...filteredEstudiantes].sort((a, b) => {
        const nombreA = `${a.nombreEstudiante} ${a.apellidoEstudiante}`.toLowerCase()
        const nombreB = `${b.nombreEstudiante} ${b.apellidoEstudiante}`.toLowerCase()
        
        if (sortOrder === "asc") {
            return nombreA.localeCompare(nombreB)
        } else {
            return nombreB.localeCompare(nombreA)
        }
    })

    // Función para obtener color según el estado
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'activo':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    border: 'border-green-200',
                    dot: 'bg-green-500',
                    hover: 'hover:bg-green-200'
                }
            case 'graduado':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    border: 'border-blue-200',
                    dot: 'bg-blue-500',
                    hover: 'hover:bg-blue-200'
                }
            case 'retirado':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-700',
                    border: 'border-yellow-200',
                    dot: 'bg-yellow-500',
                    hover: 'hover:bg-yellow-200'
                }
            case 'inactivo':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-700',
                    border: 'border-red-200',
                    dot: 'bg-red-500',
                    hover: 'hover:bg-red-200'
                }
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    border: 'border-gray-200',
                    dot: 'bg-gray-500',
                    hover: 'hover:bg-gray-200'
                }
        }
    }

    if (estudiantes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
                <Users size={64} className="text-slate-400 mb-4" />
                <p className="text-xl font-semibold text-slate-700 mb-2">
                    No existen registros
                </p>
                <p className="text-sm text-slate-500">
                    Agrega el primer estudiante para comenzar
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Barra de búsqueda y controles */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Búsqueda */}
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg 
                                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                     transition-all duration-200 text-sm"
                        />
                    </div>

                    
                </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Encabezado */}
                        <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
                            <tr>
                                {["N°", "Nombre", "Apellido", "Carrera","Estado", "Acciones"].map((header) => (
                                    <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-slate-100 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Cuerpo de la tabla */}
                        <tbody className="divide-y divide-slate-200">
                            {sortedEstudiantes.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center">
                                        <div className="flex flex-col items-center">
                                            <Search size={48} className="text-slate-300 mb-3" />
                                            <p className="text-slate-500 font-medium">
                                                No se encontraron resultados de: {searchTerm}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sortedEstudiantes.map((estudiante, index) => {
                                    const statusColors = getStatusColor(estudiante.status)
                                    return (
                                        <tr 
                                            key={estudiante._id}
                                            className="hover:bg-slate-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                                                {estudiante.nombreEstudiante}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                                                {estudiante.apellidoEstudiante}
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {estudiante.carreraEstudiante }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`
                                                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                                                    transition-all duration-200
                                                    ${statusColors.bg} ${statusColors.text} ${statusColors.border} ${statusColors.hover}
                                                    border
                                                `}>
                                                    <span className={`
                                                        w-2 h-2 rounded-e-md
                                                        ${statusColors.dot}
                                                    `}></span>
                                                    {estudiante.status.charAt(0).toUpperCase() + estudiante.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        title="Actualizar"
                                                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 
                                                                 text-blue-600 transition-all duration-200
                                                                 hover:scale-110 active:scale-95"
                                                    >
                                                        <MdPublishedWithChanges className="h-5 w-5" />
                                                    </button>

                                                    <button
                                                        title="Más información"
                                                        className="p-2 rounded-lg bg-green-50 hover:bg-green-100 
                                                                 text-green-600 transition-all duration-200
                                                                 hover:scale-110 active:scale-95"
                                                    >
                                                        <MdInfo className="h-5 w-5" />
                                                    </button>

                                                    <button
                                                        title="Eliminar"
                                                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 
                                                                 text-red-600 transition-all duration-200
                                                                 hover:scale-110 active:scale-95"
                                                    >
                                                        <MdDeleteForever className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableEstudiantes