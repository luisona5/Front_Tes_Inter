import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router" 
import { useFetch } from "../../../../../hooks/useFetch"
import { User, Phone, Activity, Calendar, Clock, MapPinned, AlertCircle, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'

const UpdateInscripctionEstado = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [inscripcion, setInscripcion] = useState({})
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [accion, setAccion] = useState('') 
    const [comentarios, setComentarios] = useState('')
    const [motivo, setMotivo] = useState('')
    const [procesando, setProcesando] = useState(false)
    
    const fetchDataBackend = useFetch()
    
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
                const response = await fetchDataBackend(url, null, "GET", headers)
                console.log('Inscripción:', response)
                setInscripcion(response)
            } catch (error) {
                console.error("Error al cargar inscripción:", error)
                toast.error("Error al cargar la inscripción")
            } finally {
                setLoading(false)
            }
        }
        detalleInscripcion()
    }, [id])

    // Función para aprobar inscripción
    const handleAprobar = async () => {
        try {
            setProcesando(true)
            const url = `${import.meta.env.VITE_BACKEND_URL}/inscripcion/aprobar//${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            
            const body = JSON.stringify({ comentarios })
            
            const response = await fetchDataBackend(url, body, "PUT", headers)
            
            if (response) {
                toast.success("✅ Inscripción aprobada exitosamente")
                setModalOpen(false)
                setTimeout(() => {
                    navigate("/dashboard/director/inscripciones-pendientes")
                }, 2000)
            }
        } catch (error) {
            console.error("Error al aprobar:", error)
            toast.error("Error al aprobar la inscripción")
        } finally {
            setProcesando(false)
        }
    }

    // Función para rechazar inscripción
    const handleRechazar = async () => {
        if (!motivo.trim()) {
            toast.error("Debes proporcionar un motivo para el rechazo")
            return
        }

        try {
            setProcesando(true)
            const url = `${import.meta.env.VITE_BACKEND_URL}/inscripciones/rechazar/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            
            const body = JSON.stringify({ motivo })
            
            const response = await fetchDataBackend(url, body, "PUT", headers)
            
            if (response) {
                toast.success("✅ Inscripción rechazada")
                setModalOpen(false)
                setTimeout(() => {
                    navigate("/dashboard/director/inscripciones-pendientes")
                }, 2000)
            }
        } catch (error) {
            console.error("Error al rechazar:", error)
            toast.error("Error al rechazar la inscripción")
        } finally {
            setProcesando(false)
        }
    }

    const abrirModal = (tipo) => {
        setAccion(tipo)
        setModalOpen(true)
        setComentarios('')
        setMotivo('')
    }

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
            <ToastContainer />
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Volver</span>
                    </button>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className='text-4xl font-bold text-gray-800'>Detalle de Inscripción</h1>
                                <p className='text-gray-600 mt-2'>Información completa del estudiante</p>
                            </div>
                            
                            {/* Botones de acción solo si está pendiente */}
                            {inscripcion?.estado === 'Pendiente' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => abrirModal('aprobar')}
                                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Aprobar
                                    </button>
                                    
                                    <button
                                        onClick={() => abrirModal('rechazar')}
                                        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Rechazar
                                    </button>
                                </div>
                            )}
                            
                            {/* Estado badge */}
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
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            <p className="text-sm text-blue-700 font-semibold">Fecha</p>
                                        </div>
                                        <p className="text-gray-800 font-semibold">{inscripcion?.deporte?.fecha || 'N/A'}</p>
                                    </div>
                                    
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="w-4 h-4 text-purple-600" />
                                            <p className="text-sm text-purple-700 font-semibold">Hora</p>
                                        </div>
                                        <p className="text-gray-800 font-semibold">{inscripcion?.deporte?.hora || 'N/A'}</p>
                                    </div>
                                    
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPinned className="w-4 h-4 text-indigo-600" />
                                            <p className="text-sm text-indigo-700 font-semibold">Lugar</p>
                                        </div>
                                        <p className="text-gray-800 font-semibold">{inscripcion?.deporte?.lugar || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información Médica */}
                        {inscripcion?.informacionMedica && (
                            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-red-200 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Información Médica</h2>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-800">{inscripcion.informacionMedica}</p>
                                </div>
                            </div>
                        )}
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
                                    <p className="text-sm text-blue-700 font-semibold mb-2">Estado</p>
                                    <span className={`px-4 py-2 text-sm font-bold rounded-full inline-block ${estadoStyles[inscripcion?.estado] || 'bg-gray-100 text-gray-800 ring-2 ring-gray-600'}`}>
                                        {inscripcion?.estado || 'Pendiente'}
                                    </span>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Fecha de Inscripción</p>
                                    <p className="text-gray-800 font-semibold text-sm">
                                        {inscripcion?.fechaInscripcion ? new Date(inscripcion.fechaInscripcion).toLocaleDateString('es-ES') : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {accion === 'aprobar' ? '✅ Aprobar Inscripción' : '❌ Rechazar Inscripción'}
                        </h3>
                        
                        {accion === 'aprobar' ? (
                            <div>
                                <p className="text-gray-600 mb-4">
                                    ¿Estás seguro de aprobar esta inscripción?
                                </p>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Comentarios (opcional)
                                </label>
                                <textarea
                                    value={comentarios}
                                    onChange={(e) => setComentarios(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Agrega comentarios adicionales..."
                                />
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600 mb-4">
                                    Debes proporcionar un motivo para el rechazo
                                </p>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Motivo del rechazo *
                                </label>
                                <textarea
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Explica el motivo del rechazo..."
                                    required
                                />
                            </div>
                        )}
                        
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setModalOpen(false)}
                                disabled={procesando}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={accion === 'aprobar' ? handleAprobar : handleRechazar}
                                disabled={procesando}
                                className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors font-semibold ${
                                    accion === 'aprobar' 
                                        ? 'bg-green-600 hover:bg-green-700' 
                                        : 'bg-red-600 hover:bg-red-700'
                                } ${procesando ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {procesando ? 'Procesando...' : accion === 'aprobar' ? 'Aprobar' : 'Rechazar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateInscripctionEstado