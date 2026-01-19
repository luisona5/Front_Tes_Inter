import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router" 
import { User, Phone, Activity, MapPinned, ArrowLeft, Heart, AlertCircle, 
    CheckCircle, XCircle, MessageSquare, Calendar, Clock, ShoppingBag, Ruler, DollarSign} from 'lucide-react'

const DetailsInscripction = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [inscripcion, setInscripcion] = useState({})
    const [uniformeRegistrado, setUniformeRegistrado] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const detalleInscripcion = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/inscripciones/detalle/${id}`
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`
                }
                const response = await fetch(url, { method: "GET", headers })
                const data = await response.json()
                setInscripcion(data)

                if (data.estado === 'Aprobada') {
                    await verificarUniforme(data._id)
                }

            } catch (error) {
                console.error("Error al cargar inscripción:", error)
            } finally {
                setLoading(false)
            }
        }

        const verificarUniforme = async (inscripcionId) => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/lista-de-uniforme/listar`
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`
                }
                const response = await fetch(url, { method: "GET", headers })
                
                if (response.ok) {
                    const uniformes = await response.json()
                    
                    const uniformeEncontrado = uniformes.find(u => {
                        const uniformeInscripcionId = typeof u.inscripcion === 'object' 
                            ? u.inscripcion._id 
                            : u.inscripcion
                        return uniformeInscripcionId === inscripcionId
                    })
                    
                    if (uniformeEncontrado) {
                        setUniformeRegistrado(uniformeEncontrado)
                    }
                }
            } catch (error) {
                console.error("Error al verificar uniforme:", error)
            }
        }
        detalleInscripcion()
    }, [id])

    const estadoStyles = {
        'Aprobada': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        'Pendiente': 'bg-amber-50 text-amber-700 border border-amber-200',
        'Rechazada': 'bg-rose-50 text-rose-700 border border-rose-200'
    }

   

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Volver</span>
                    </button>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className='text-2xl font-semibold text-gray-900'>Detalles de Inscripción</h1>
                                <p className='text-sm text-gray-500 mt-1'>Información completa del estudiante</p>
                            </div>
                            
                            {inscripcion?.estado && (
                                <span className={`px-4 py-2 text-xs font-medium rounded-md ${estadoStyles[inscripcion.estado] || 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                                    {inscripcion.estado}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">

                        {/* SECCIÓN DE UNIFORME */}
                        {inscripcion?.estado === 'Aprobada' && (
                            <>
                                {!uniformeRegistrado && (
                                    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 rounded-xl p-6 shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-emerald-500 p-3 rounded-full shadow-md">
                                                <ShoppingBag className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-emerald-900 mb-2">
                                                    ¡Felicidades! Tu inscripción fue aprobada
                                                </h3>
                                                <p className="text-sm text-emerald-800 mb-4">
                                                    Ya puedes registrar y adquirir tu uniforme de <span className="font-semibold">{inscripcion?.deporte?.nombre}</span>
                                                </p>
                                                
                                                <div className="bg-white rounded-lg p-5 border-2 border-emerald-200 shadow-sm">
                                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                                                        <span className="text-sm font-semibold text-gray-700">Valor del uniforme</span>
                                                        <span className="text-2xl font-bold text-emerald-700">
                                                            ${inscripcion?.deporte?.precioUniforme}
                                                        </span>
                                                    </div> 
                                                    
                                                    <Link 
                                                        to='/dashboard/Uniforme/registro/detalle-para-pago' 
                                                        state={{ inscripcion: inscripcion }} 
                                                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-3.5 rounded-lg block mt-2 text-base font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                                                    >
                                                        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                        Registrar uniforme
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {uniformeRegistrado && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                                            <ShoppingBag className="w-5 h-5 text-indigo-600" />
                                            <h2 className="text-lg font-semibold text-gray-900">Información del Uniforme</h2>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Detalles del uniforme */}
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                        <ShoppingBag className="w-3 h-3" />
                                                        Nombre del uniforme
                                                    </p>
                                                    <p className="text-sm text-gray-700">{uniformeRegistrado?.nombre || 'N/A'}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Detalle</p>
                                                    <p className="text-sm text-gray-700">{uniformeRegistrado?.detalle || 'Sin descripción'}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                        <Ruler className="w-3 h-3" />
                                                        Talla
                                                    </p>
                                                    <p className="text-sm text-gray-700">{uniformeRegistrado?.talla }</p>

                                                </div>
                                            </div>

                                            
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        
                        {/* Estado de Aprobación/Rechazo */}
                        {inscripcion?.estado !== 'Pendiente' && inscripcion?.aprobacion && (
                            <div className={`bg-white rounded-lg shadow-sm border p-6 ${
                                inscripcion?.estado === 'Aprobada' 
                                    ? 'border-emerald-200' 
                                    : 'border-rose-200'
                            }`}>
                                <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                                    {inscripcion?.estado === 'Aprobada' ? (
                                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-rose-600" />
                                    )}
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {inscripcion?.estado === 'Aprobada' ? 'Aprobación' : 'Rechazo'}
                                    </h2>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                {inscripcion?.estado === 'Aprobada' ? 'Aprobado por' : 'Rechazado por'}
                                            </p>
                                            <p className="text-sm text-gray-900 font-medium">
                                                {inscripcion.aprobacion?.aprobadoPor || 'No especificado'}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Fecha</p>
                                            <p className="text-sm text-gray-900 font-medium">
                                                {inscripcion.aprobacion?.fechaAprobacion
                                                    ? new Date(inscripcion.aprobacion.fechaAprobacion).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : 'No especificada'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {inscripcion.aprobacion?.comentarios && (
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="w-4 h-4 text-gray-400" />
                                                <p className="text-xs text-gray-600 font-medium">Comentarios</p>
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {inscripcion.aprobacion.comentarios}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Información del Estudiante */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                                <User className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Información del Estudiante</h2>
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

                        {/* Información Médica */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                                <Heart className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Información Médica</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-4 h-4 text-gray-400" />
                                        <p className="text-xs text-gray-600 font-medium">Estado de Salud</p>
                                    </div>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.informacionMedica?.estadoSalud || 'Bueno'}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Alergias</p>
                                        <p className="text-sm text-gray-900">{inscripcion?.informacionMedica?.alergias || 'Ninguna'}</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Medicamentos</p>
                                        <p className="text-sm text-gray-900">{inscripcion?.informacionMedica?.medicamentos || 'Ninguno'}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Condiciones Médicas</p>
                                    <p className="text-sm text-gray-900">{inscripcion?.informacionMedica?.condicionesMedicas || 'Ninguna'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contacto de Emergencia */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b">
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
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b">
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
                                
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="text-xs text-gray-500 mb-1">Descripción del Deporte</p>
                                    <p className="text-sm text-gray-700">{inscripcion?.deporte?.detalle || 'Sin descripción'}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />  
                                            <p className="text-xs text-gray-500 font-medium">Fecha de entrenamiento</p>
                                        </div>
                                        <p className="text-sm text-gray-900 font-medium">
                                            {inscripcion?.deporte?.EntrenamientoDia   
                                                ? new Date(inscripcion?.deporte?.EntrenamientoDia).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                }) 
                                                : 'N/A'}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="w-4 h-4 text-gray-400" />  
                                            <p className="text-xs text-gray-500 font-medium">Hora de entrenamiento</p>
                                        </div>
                                        <p className="text-sm text-gray-900 font-medium">{inscripcion?.deporte?.EntrenamientoHora || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPinned className="w-4 h-4 text-gray-400" />
                                        <p className="text-xs text-gray-500 font-medium">Lugar de Entrenamiento</p>
                                    </div>
                                    <p className="text-sm text-gray-900 font-medium">{inscripcion?.deporte?.lugar || 'N/A'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Fecha de Inscripción</p>
                                    <p className="text-sm text-gray-900 font-medium">
                                        {inscripcion?.fechaInscripcion ? new Date(inscripcion.fechaInscripcion).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna lateral */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-6">
                            <img 
                                src="https://static4.depositphotos.com/1013084/343/v/450/depositphotos_3430480-stock-illustration-sport-silhouettes.jpg" 
                                alt="deportes" 
                                className='w-full rounded-lg mb-5' 
                            />
                            
                            <div className="bg-gray-50 p-4 rounded-md mb-4">
                                <p className="text-xs text-gray-500 mb-2">Estado de inscripción</p>
                                <span className={`px-3 py-1.5 text-xs font-medium rounded-md inline-block ${estadoStyles[inscripcion?.estado] || 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                                    {inscripcion?.estado || 'Pendiente'}
                                </span>
                            </div>

                            {uniformeRegistrado && (
                                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-blue-900 mb-1">
                                            Pago de Uniforme
                                        </p>
                                        <p className="text-xs text-blue-800 leading-relaxed">
                                            Para cancelar el valor del uniforme, por favor acércate a la 
                                            <span className="font-semibold text-blue-900"> oficina de deportes</span>.
                                        </p>
                                    </div>
                                </div>
                            )}

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsInscripction