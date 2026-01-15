import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router" 
import { User, Phone, Activity, MapPinned, ArrowLeft, Heart, AlertCircle } from 'lucide-react'

const DetailsInscripction = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [inscripcion, setInscripcion] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const detalleInscripcion = async () => {
            try {
                setLoading(true)
                const url = `${import.meta.env.VITE_BACKEND_URL}/inscripciones/detalle/${id}`
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`
                }
                const response = await fetch(url, { method: "GET", headers })
                const data = await response.json()
                setInscripcion(data)
            } catch (error) {
                console.error("Error al cargar inscripción:", error)
            } finally {
                setLoading(false)
            }
        }
        detalleInscripcion()
    }, [id])

    const estadoStyles = {
        'Aprobada': 'bg-green-100 text-green-800 ring-2 ring-green-600',
        'Pendiente': 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-600',
        'Rechazada': 'bg-red-100 text-red-800 ring-2 ring-red-600'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-semibold">Cargando información...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header con botón de regreso */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Volver</span>
                    </button>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className='text-4xl font-bold text-gray-800'>Información de Inscripción</h1>
                                <p className='text-gray-600 mt-2'>Para adquirir el uniforme debe estar en estado aprobado</p>
                            </div>
                            
                            {/* Estado de inscripción */}
                            {inscripcion?.estado && (
                                <span className={`px-6 py-3 text-sm font-bold rounded-full ${estadoStyles[inscripcion.estado] || 'bg-gray-100 text-gray-800 ring-2 ring-gray-600'}`}>
                                    {inscripcion.estado}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Grid de información */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Columna principal */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Información Personal */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Cédula</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.cedula || 'N/A'}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Nombre Completo</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.nombre} {inscripcion?.apellido}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Celular</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.telefono || 'N/A'}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Correo Electrónico</p>
                                    <p className="text-gray-800 font-semibold break-all">{inscripcion?.email || 'N/A'}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                    <p className="text-sm text-gray-500 mb-1">Dirección</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.direccion || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Información Médica */}
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-red-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b border-red-200 pb-4">
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <Heart className="w-6 h-6 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Información Médica</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <p className="text-sm text-red-700 font-semibold">Estado de Salud</p>
                                    </div>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.informacionMedica?.estadoSalud || 'Bueno'}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-red-700 font-semibold mb-2">Alergias</p>
                                        <p className="text-gray-800">{inscripcion?.informacionMedica?.alergias || 'Ninguna'}</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-red-700 font-semibold mb-2">Medicamentos</p>
                                        <p className="text-gray-800">{inscripcion?.informacionMedica?.medicamentos || 'Ninguno'}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-red-700 font-semibold mb-2">Condiciones Médicas</p>
                                    <p className="text-gray-800">{inscripcion?.informacionMedica?.condicionesMedicas || 'Ninguna'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contacto de Emergencia */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b border-amber-200 pb-4">
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <Phone className="w-6 h-6 text-amber-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Contacto de Emergencia</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-amber-700 mb-1 font-semibold">Nombre</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.contactoEmergencia?.nombre || 'No disponible'}</p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-amber-700 mb-1 font-semibold">Parentesco</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.contactoEmergencia?.relacion || 'No disponible'}</p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-amber-700 mb-1 font-semibold">Celular</p>
                                    <p className="text-gray-800 font-semibold">{inscripcion?.contactoEmergencia?.telefono || 'No disponible'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Información Deportiva */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Activity className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Información Deportiva</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-700 mb-1 font-semibold">Categoría</p>
                                        <p className="text-gray-800 font-semibold">{inscripcion?.categoria?.nombre || 'N/A'}</p>
                                    </div>
                                    
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-700 mb-1 font-semibold">Disciplina</p>
                                        <p className="text-gray-800 font-semibold">{inscripcion?.deporte?.nombre || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Descripción</p>
                                    <p className="text-gray-800">{inscripcion?.deporte?.detalle || 'Sin descripción'}</p>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4">
                                    
                                    
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPinned className="w-4 h-4 text-indigo-600" />
                                            <p className="text-sm text-indigo-700 font-semibold">Lugar</p>
                                        </div>
                                        <p className="text-gray-800 font-semibold">{inscripcion?.deporte?.lugar || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Fecha de Inscripción</p>
                                    <p className="text-gray-800 font-semibold">
                                        {inscripcion?.fechaInscripcion ? new Date(inscripcion.fechaInscripcion).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna lateral */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <img 
                                src="https://static4.depositphotos.com/1013084/343/v/450/depositphotos_3430480-stock-illustration-sport-silhouettes.jpg" 
                                alt="deportes" 
                                className='w-full rounded-xl shadow-md mb-6' 
                            />
                            
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-700 font-semibold mb-2">Estado de Inscripción</p>
                                    <span className={`px-4 py-2 text-sm font-bold rounded-full inline-block ${estadoStyles[inscripcion?.estado] || 'bg-gray-100 text-gray-800 ring-2 ring-gray-600'}`}>
                                        {inscripcion?.estado || 'Pendiente'}
                                    </span>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">ID de Inscripción</p>
                                    <p className="text-gray-800 font-mono text-xs break-all">{inscripcion?._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsInscripction