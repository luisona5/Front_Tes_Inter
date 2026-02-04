import { MdInfo, MdUpdate } from "react-icons/md"
import { useFetch } from "../../../../../hooks/useFetch"
import { useEffect, useState } from "react"
import { FileDown, Trash2, Search, Download } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer"
import SimpleCategoryPDF from "../../pdf/Category"
import TableCategoriaPDF from "../../pdf/TableCategory"

const TablaCategoria = () => {
    const fetchDataBackend = useFetch()
    const [categories, setCategorias] = useState([])
    const [busqueda, setBusqueda] = useState('')
    
    const navigate = useNavigate()

    const listCategory = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/categoriadeEvento/visualizarDirectores`
        
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setCategorias(response)
    }

    const deleteCategory = async(id) => {
        const confirmDelete = confirm("Advertencia: Esta acción se eliminara de manera permanente. ¿Deseas continuar?");
        
        if (confirmDelete) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/categoriadeEvento/eliminar/${id}` 
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const options = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
                const body = JSON.stringify({ estadoCategoria: false });
                await fetchDataBackend(url, body, "DELETE", options);
                setCategorias((prevCategories) => prevCategories.filter(category => category._id !== id))
                listCategory(); 
            } catch (error) {
                console.error("Error al deshabilitar categoria.", error);
            }
        }
    };

    useEffect(() => {
        listCategory()
    }, [])

    const filteredCategorias = categories.slice().sort((a, b) => {
        const nombreComparison = a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' });
        if (nombreComparison !== 0) {
            return nombreComparison; 
        }
        return a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' });
    }).filter(category => {
        if (!busqueda) return true
        const buscar = busqueda.toLowerCase()
        return (
            category.nombre.toLowerCase().includes(buscar)
            
        )
    })

    if (categories.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <ToastContainer />
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="mb-6">
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No hay Categorías Registrados
                            </h3>
                           
                        </div>
                        
                        <Link to='/dashboard/Director/inscripciones/nuevo/categorias'>
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Registrar Categoría
                            </button>
                        </Link>
                    </div>
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
                        document={<TableCategoriaPDF categories={filteredCategorias} />}
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
            {filteredCategorias.length === 0 && busqueda && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center">
                        <div>
                            <p className="font-semibold text-yellow-800 text-lg">No se encontraron resultados</p>
                            
                        </div>
                    </div>
                </div>
            )}
             <td className="px-4 py-3">
                <div className="flex justify-center">
                    <Link to='/dashboard/Director/inscripciones/nuevo/categorias'>
                        <button className="flex items-center gap-3 bg-blue-900 text-white px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium transform hover:scale-105">
                            Nueva Categoría
                        </button>
                    </Link>
                </div>
            </td>

            {/* Tabla mejorada */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Encabezado */}
                        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">N°</th>
                                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Nombre</th>
                                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Descripción</th>
                                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Estado</th>

                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Acciones</th>
                                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">PDF</th>
                            </tr>
                        </thead>

                        {/* Cuerpo */}
                        <tbody className="divide-y divide-gray-200">
                            {filteredCategorias.map((Category, index) => (
                                <tr 
                                    key={Category._id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{index + 1} </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">{Category.nombre} </td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{Category.descripcion}</td>

                                    <td className="px-4 py-4 text-center">
                                        <span 
                                            className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full
                                            ${Category.estadoCategoria
                                                ? 'bg-green-100 text-green-800 ring-1 ring-green-600' 
                                                : 'bg-red-100 text-red-800 ring-1 ring-red-600'
                                            }`}
                                        >
                                            {Category.estadoCategoria ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>

                                    {/* Acciones con mejor diseño */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => navigate(`/dashboard/Category-esfot-epn/informacion-completa/${Category._id}`)}
                                                className="p-2 text-green-600 hover:text-white hover:bg-green-600 
                                                         rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                title="Ver información"
                                            >
                                                <MdInfo className="h-5 w-5" /> 
                                            </button>

                                            <button 
                                                onClick={() => navigate(`/dashboard/update/Category-esfot-epn/informacion-completa/${Category._id}`)}
                                                className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 
                                                         rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                title="Actualizar"
                                            >
                                                <MdUpdate className="h-5 w-5" />                                
                                            </button>

                                            <button 
                                                onClick={() => deleteCategory(Category._id)}
                                                className="p-2 text-red-600 hover:text-white hover:bg-red-600 
                                                         rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="h-5 w-5" /> 
                                            </button>
                                        </div>
                                    </td>

                                    {/* Botón PDF mejorado */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <BlobProvider document={<SimpleCategoryPDF data={Category} />}>
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

export default TablaCategoria