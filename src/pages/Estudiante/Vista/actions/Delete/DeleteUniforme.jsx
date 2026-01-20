import { useEffect, useState } from "react"
import { ShoppingBag} from "lucide-react"
import { ToastContainer, toast } from "react-toastify"

const TableUniforms = () => {
    const [uniformes, setUniformes] = useState([])
    const [loading, setLoading] = useState(true)

    const getAuthData = () => {
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        return {
            token: storedUser?.state?.token,
            id: storedUser?.state?.id,  
            estudianteNombre: storedUser?.state?.nombre
        }
    }

    const listarUniformes = async () => {
        try {
            setLoading(true)
            const { token, id } = getAuthData();

            const url = `${import.meta.env.VITE_BACKEND_URL}/lista-de-uniforme/listar/${id}`;
            
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const response = await fetch(url, { method: "GET", headers });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Uniformes obtenidos:", data);
                
                const uniformesConInscripcion = data.filter(uniforme => 
                    uniforme.inscripcion
                );
                
                setUniformes(uniformesConInscripcion);
                
                if (uniformesConInscripcion.length === 0) {
                    toast.info("No tienes uniformes registrados");
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.msg || "Error al cargar uniformes");
            }
        } catch (error) {
            console.error("Error al cargar uniformes:", error);
            toast.error("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listarUniformes()
    }, [])

    // Formatear fecha
    const formatFecha = (fechaString) => {
        if (!fechaString) return 'N/A';
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

   


    if (loading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando uniformes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Mis Uniformes Registrados</h1>
                <p className="text-gray-600">Lista de uniformes de mis inscripciones aprobadas</p>
            </div>

           

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {uniformes.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg font-medium mb-2">No tienes uniformes registrados</p>
                        <p className="text-gray-400 text-sm max-w-md mx-auto">
                            Registra un uniforme desde una inscripción aprobada para verlo aquí
                        </p>
                        <button 
                            onClick={listarUniformes}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            Recargar
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                                <tr>
                                    <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">N°</th>
                                    <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Deporte</th>
                                    <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Detalle</th>
                                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Nombre Unif.</th>
                                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Talla </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Fecha Registro</th>

                                    
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {uniformes.map((uniforme, index) => (
                                    <tr 
                                        key={uniforme._id} 
                                        className="hover:bg-blue-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{uniforme.deporte?.nombre || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{uniforme.deporte?.detalle || ''}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{uniforme.nombre || ''}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Talla-{uniforme.talla || ''}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$ {uniforme.deporte?.precioUniforme || ''}</td>   
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {formatFecha(uniforme.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

           
        </div>
    )
}

export default TableUniforms;