import { useState, useEffect } from "react"
import { DollarSign, Save, AlertCircle } from "lucide-react"
import { useFetch } from "../../../../../hooks/useFetch"
import { ToastContainer, toast } from "react-toastify"

const GestionPrecioUniforme = () => {
    const fetchDataBackend = useFetch()
    const [precio, setPrecio] = useState('')
    const [loading, setLoading] = useState(false)
    const [directorId, setDirectorId] = useState('')

    useEffect(() => {
        obtenerPrecioActual()
        obtenerDirectorId()
    }, [])

    const obtenerDirectorId = () => {
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        // Asumiendo que el ID del director está en el token
        setDirectorId(storedUser.state.userId || storedUser.state.id)
    }

    const obtenerPrecioActual = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const directorIdLocal = storedUser.state.userId || storedUser.state.id
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/director/${directorIdLocal}`
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`,
            }
            
            const response = await fetchDataBackend(url, null, "GET", headers)
            if (response?.precioUniforme) {
                setPrecio(response.precioUniforme)
            }
        } catch (error) {
            console.error("Error al obtener precio:", error)
        }
    }

    const actualizarPrecio = async (e) => {
        e.preventDefault()
        
        if (!precio || precio <= 0) {
            toast.error("Debes ingresar un precio válido mayor a 0")
            return
        }

        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/director/${directorId}/precio-uniforme`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`,
            }
            
            const body = JSON.stringify({ precioUniforme: parseFloat(precio) })
            const response = await fetchDataBackend(url, body, "PUT", headers)
            
            if (response) {
                toast.success("Precio actualizado exitosamente")
            }
        } catch (error) {
            toast.error("Error al actualizar el precio")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer />
            
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Precio de Uniformes</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Establece el precio que se aplicará a todos los uniformes
                            </p>
                        </div>
                    </div>

                    {/* Alerta informativa */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Información importante:</p>
                                <ul className="list-disc list-inside space-y-1 text-blue-700">
                                    <li>Este precio se aplicará automáticamente cuando apruebes una inscripción</li>
                                    <li>Los uniformes ya creados no se verán afectados por este cambio</li>
                                    <li>El precio está en dólares estadounidenses (USD)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={actualizarPrecio} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Precio del Uniforme (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                    $
                                </span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                             text-lg font-medium"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Precio actual: ${precio || '0.00'}
                            </p>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white 
                                     px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200
                                     disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                        >
                            <Save className="w-5 h-5" />
                            <span>{loading ? 'Guardando...' : 'Guardar Precio'}</span>
                        </button>
                    </form>
                </div>

                {/* Información adicional */}
                <div className="mt-6 bg-gray-100 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-3">¿Cómo funciona?</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                            <span className="text-blue-600 font-bold">1.</span>
                            <p>Establece el precio del uniforme aquí</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-600 font-bold">2.</span>
                            <p>Cuando apruebes una inscripción, se creará automáticamente un uniforme</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-600 font-bold">3.</span>
                            <p>El uniforme tendrá el precio que estableciste aquí</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-600 font-bold">4.</span>
                            <p>El estudiante podrá seleccionar su talla y proceder al pago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GestionPrecioUniforme