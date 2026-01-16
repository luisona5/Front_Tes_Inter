import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router" 
import { useFetch } from "../../../../../hooks/useFetch"
import { User, Phone, Activity, Calendar, Clock, MapPin, AlertCircle, ArrowLeft, 
            CheckCircle, XCircle, FileText } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'

const DetailsInscripctionEstadoGeneral = () => {
    
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
                const url = `${import.meta.env.VITE_BACKEND_URL}/inscripciones-estudiantes/detalle/${id}`
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
    }, [])

    const handleAprobar = async () => {
        try {
            setProcesando(true)
            const url = `${import.meta.env.VITE_BACKEND_URL}/inscripcion/aprobar/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            
            const body = JSON.stringify({ comentarios })
            
            const response = await fetchDataBackend(url, body, "PUT", headers)
            
            if (response) {
                setInscripcion(prev => ({
                    ...prev,
                    estado: 'Aprobada',
                    aprobacion: {
                        ...prev.aprobacion,
                        comentarios: comentarios,
                        fechaAprobacion: new Date(),
                        aprobadoPor: prev.aprobacion?.aprobadoPor
                    }
                }))
                
                toast.success("Inscripción aprobada exitosamente")
                setModalOpen(false)
                
                setTimeout(() => {
                    navigate("/dashboard/estados-de-inscripciones/visualizar/estudiantes")
                }, 3000)
            }
        } catch (error) {
            console.error("Error al aprobar:", error)
            toast.error("Error al aprobar la inscripción")
        } finally {
            setProcesando(false)
        }
    }

    const handleRechazar = async () => {
        if (!motivo.trim()) {
            toast.error("Debes proporcionar un motivo para el rechazo")
            return
        }

        try {
            setProcesando(true)
            const url = `${import.meta.env.VITE_BACKEND_URL}/inscripcion/rechazar/${id}`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }
            
            const body = JSON.stringify({ motivo })
            
            const response = await fetchDataBackend(url, body, "PUT", headers)
            
            if (response) {
                setInscripcion(prev => ({
                    ...prev,
                    estado: 'Rechazada',
                    aprobacion: {
                        ...prev.aprobacion,
                        comentarios: motivo,
                        fechaAprobacion: new Date(),
                        aprobadoPor: prev.aprobacion?.aprobadoPor
                    }
                }))
                
                toast.success("Inscripción rechazada")
                setModalOpen(false)
                
                setTimeout(() => {
                    navigate("/dashboard/estados-de-inscripciones/visualizar/estudiantes")
                }, 3000)
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
        'Aprobada': 'bg-green-50 text-green-700 border-green-200',
        'Pendiente': 'bg-amber-50 text-amber-700 border-amber-200',
        'Rechazada': 'bg-red-50 text-red-700 border-red-200'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando información...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <ToastContainer />
            
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver</span>
                    </button>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h1 className='text-2xl font-semibold text-gray-900 mb-1'>Detalle de Inscripción</h1>
                                <p className='text-sm text-gray-500'>El estudiante tiene un estado de inscripción</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {inscripcion?.estado === 'Pendiente' && (
                                    <>
                                        <button
                                            onClick={() => abrirModal('aprobar')}
                                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Aprobar
                                        </button>
                                        
                                        <button
                                            onClick={() => abrirModal('rechazar')}
                                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Rechazar
                                        </button>
                                    </>
                                )}
                                
                                {inscripcion?.estado && (
                                    <span className={`px-3 py-1.5 text-lg font-medium rounded-md border ${estadoStyles[inscripcion.estado] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                        {inscripcion.estado}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Columna principal */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Información Personal */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <User className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Cédula</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.cedula || 'N/A'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Nombre Completo</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.nombre} {inscripcion?.apellido}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Celular</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.telefono || 'N/A'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Correo Electrónico</p>
                                    <p className="text-sm text-gray-900 font-medium break-all">{inscripcion?.email || 'N/A'}</p>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-500 mb-1">Dirección</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.direccion || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contacto de Emergencia */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <Phone className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Contacto de Emergencia</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Nombre</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.contactoEmergencia?.nombre || 'No disponible'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Parentesco</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.contactoEmergencia?.relacion || 'No disponible'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Celular</p>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.contactoEmergencia?.telefono || 'No disponible'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Información Deportiva */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <Activity className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Información Deportiva</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Categoría</p>
                                        <p className="text-sm text-gray-900 font-medium">{inscripcion?.categoria?.nombre || 'N/A'}</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Disciplina</p>
                                        <p className="text-sm text-gray-900 font-medium">{inscripcion?.deporte?.nombre || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                {inscripcion?.deporte?.detalle && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Descripción</p>
                                        <p className="text-sm text-gray-700">{inscripcion.deporte.detalle}</p>
                                    </div>
                                )}
                                
                                <div className="grid md:grid-cols-3 gap-4 pt-2">
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Fecha</p>
                                            <p className="text-sm text-gray-900 font-medium">
                                                {new Date(inscripcion.deporte?.fechaFin).toLocaleDateString('es-EC', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-2">
                                        <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Hora</p>
                                            <p className="text-sm text-gray-900 font-medium">{inscripcion?.deporte?.horaFin || 'N/A'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Lugar</p>
                                            <p className="text-sm text-gray-900 font-medium">{inscripcion?.deporte?.lugar || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información Médica */}
                        {inscripcion?.informacionMedica && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                    <AlertCircle className="w-5 h-5 text-gray-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">Información Médica</h2>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Estado de Salud</p>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {inscripcion.informacionMedica?.estadoSalud || 'No especificado'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Alergias</p>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {inscripcion.informacionMedica?.alergias || 'Ninguna'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Medicamentos</p>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {inscripcion.informacionMedica?.medicamentos || 'Ninguno'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Condiciones Médicas</p>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {inscripcion.informacionMedica?.condicionesMedicas || 'Ninguna'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                   
                        {/* Observaciones */}
                        {inscripcion?.aprobacion?.comentarios && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {inscripcion.estado === 'Aprobada' ? 'Comentarios de Aprobación' : 'Motivo del Rechazo'}
                                    </h2>
                                </div>
                                
                                <p className="text-sm text-gray-700 mb-3">
                                    {inscripcion.aprobacion.comentarios}
                                </p>
                                
                                <div className="flex flex-wrap gap-4 pt-3 border-t border-blue-200 text-xs text-gray-600">
                                    {inscripcion.aprobacion.aprobadoPor && (
                                        <div>
                                            <span className="font-medium">Por:</span> {inscripcion.aprobacion.aprobadoPor}
                                        </div>
                                    )}
                                    {inscripcion.aprobacion.fechaAprobacion && (
                                        <div>
                                            <span className="font-medium">Fecha:</span>{' '}
                                            {new Date(inscripcion.aprobacion.fechaAprobacion).toLocaleDateString('es-EC', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            {accion === 'aprobar' ? 'Aprobar Inscripción' : 'Rechazar Inscripción'}
                        </h3>
                        
                        {accion === 'aprobar' ? (
                            <div>
                                <p className="text-sm text-gray-600 mb-4">
                                    ¿Confirmas que deseas aprobar esta inscripción?
                                </p>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comentarios (opcional)
                                </label>
                                <textarea
                                    value={comentarios}
                                    onChange={(e) => setComentarios(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                    rows="3"
                                    placeholder="Agrega comentarios si lo deseas..."
                                />
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Debes proporcionar un motivo para el rechazo
                                </p>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Motivo del rechazo <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                    rows="3"
                                    placeholder="Explica el motivo del rechazo..."
                                    required
                                />
                            </div>
                        )}
                        
                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => setModalOpen(false)}
                                disabled={procesando}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={accion === 'aprobar' ? handleAprobar : handleRechazar}
                                disabled={procesando}
                                className={`flex-1 px-4 py-2 text-white rounded-md transition-colors text-sm font-medium ${
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

export default DetailsInscripctionEstadoGeneral