import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; // ✅ CORRECTO: react-router-dom
import { Loader2, User, Mail, Phone, MapPin, Activity, Heart } from 'lucide-react';
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { useFetch } from "../../../../../hooks/useFetch";

const InscripcionDeportiva = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const fetchDataBackend = useFetch()
    const [deportes, setDeportes] = useState([])
    const [loadingDeportes, setLoadingDeportes] = useState(true)

    const registerInscripcion = async (dataForm) => {
        let url = `${import.meta.env.VITE_BACKEND_URL}/registro/estudiante/Incripcion`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        }

        const response = await fetchDataBackend(url, dataForm, "POST", headers)
        
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/inscripciones/visualizar/inscripcion-estudiante")
                reset()
            }, 4000)
        }
    }

    // ✅ Cargar deportes
    useEffect(() => {
        const fetchDeportes = async () => {
            try {
                setLoadingDeportes(true)
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/deporte/disponible`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedUser.state.token}`
                        }
                    }
                )
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                
                const data = await response.json()
                console.log("Deportes recibidos:", data)
                
                // Ajusta según la estructura de tu respuesta
                const deportesArray = Array.isArray(data) ? data : (data.deportes || data.data || [])
                setDeportes(deportesArray)
            } catch (error) {
                console.error("Error al cargar deportes:", error)
                setDeportes([])
            } finally {
                setLoadingDeportes(false)
            }
        }

        fetchDeportes()
    }, [])


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Formulario de Inscripción 
                        </h1>
                        <p className="text-gray-600">ESFOT</p>
                    </div>

                    <form onSubmit={handleSubmit(registerInscripcion)} className="space-y-6">
                        {/* Datos Personales */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Datos Personales
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Campo cédula */}
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Cédula</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ingresa tu cédula" 
                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                        {...register("cedula", { required: "La cédula es obligatoria"})}
                                    />
                                    {errors.cedula && <p className="text-red-600 text-sm mt-1">{errors.cedula.message}</p>}
                                </div>

                                {/* Campo celular */}
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Celular</label>
                                    <input 
                                        type="tel" 
                                        placeholder="Ingresa tu celular" 
                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                        {...register("telefono", { required: "El celular es obligatorio"})}
                                    />
                                    {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Campo nombre */}
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Nombre</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ingresa tu nombre" 
                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                        {...register("nombre", { required: "El nombre es obligatorio" })}
                                    />
                                    {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                                </div>

                                {/* Campo apellido */}
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Apellido</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ingresa tu apellido" 
                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                        {...register("apellido", { required: "El apellido es obligatorio" })}
                                    />
                                    {errors.apellido && <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">
                                    <Mail className="w-5 h-5 inline mr-1" />
                                    Correo electrónico
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Ingresa tu correo electrónico" 
                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500" 
                                    {...register("email", { required: "El correo electrónico es obligatorio"})}
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Campo dirección */}
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">
                                    <MapPin className="w-5 h-5 inline mr-1" />
                                    Dirección
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Ingresa tu dirección de domicilio" 
                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                    {...register("direccion", { required: "La dirección es obligatoria" })}
                                />
                                {errors.direccion && <p className="text-red-600 text-sm mt-1">{errors.direccion.message}</p>}
                            </div>
                        </div>

                        {/* Información Deportiva */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Información Deportiva
                            </h2>

                            {/* ✅ Campo Deporte */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deporte *
                                </label>
                
                                <select
                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                                    {...register("deporte", { required: "La deporte es obligatoria"})}
                                >
                                    <option value="">Selecciona un Deporte</option>
                                    {deportes.map(sport => (
                                        <option key={sport._id} value={sport._id}>
                                            {sport.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.deporte && <p className="text-red-600 text-sm mt-1">{errors.deporte.message}</p>}
                            </div>

                            </div>

                            

                           {/* ✅ Información Médica */}
                        <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Información Médica</h3>
                            </div>

                            <div className="space-y-4">
                                {/* Estado de Salud */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Estado de Salud General
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register("informacionMedica.estadoSalud",{ required: "Este campo es obligatorio" })}
                                    >
                                        <option value="Excelente">---- Selecciona Estado ----</option>
                                        <option value="Excelente">Excelente</option>
                                        <option value="Bueno">Bueno</option>
                                        <option value="Regular">Regular</option>
                                        <option value="Delicado">Delicado/a</option>
                                    </select>
                                    {errors.informacionMedica?.estadoSalud && (
                                    <p className="text-red-500 text-sm mt-1">{errors.informacionMedica?.estadoSalud.message}</p>
                                )}
                                </div>

                                {/* Alergias */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Alergias
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: Polen, penicilina, mariscos... (Escribe 'Ninguna' si no tiene)"
                                        {...register("informacionMedica.alergias",{ required: "Este campo es obligatorio" })}
                                    />
                                    {errors.informacionMedica?.alergias && (
                                    <p className="text-red-500 text-sm mt-1">{errors.informacionMedica?.alergias.message}</p>
                                )}
                                </div>

                                {/* Condiciones Médicas */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Condiciones Médicas
                                    </label>
                                    <textarea
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                        placeholder="Enfermedades crónicas, condiciones especiales... (Escribe 'Ninguna' si no tiene)"
                                        {...register("informacionMedica.condicionesMedicas",{ required: "Este campo es obligatorio" })}
                                    />
                                    {errors.informacionMedica?.condicionesMedicas && (
                                    <p className="text-red-500 text-sm mt-1">{errors.informacionMedica?.condicionesMedicas.message}</p>
                                )}
                                </div>

                                {/* Medicamentos */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Medicamentos Actuales
                                    </label>
                                    <textarea
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                        placeholder="Medicamentos que toma regularmente... (Escribe 'Ninguno' si no toma)"
                                        {...register("informacionMedica.medicamentos",{ required: "Este campo es obligatorio" })}
                                    />
                                    {errors.informacionMedica?.medicamentos && (
                                    <p className="text-red-500 text-sm mt-1">{errors.informacionMedica?.medicamentos.message}</p>
                                )}
                                </div>
                            </div>
                        </div>
                        

                        {/* Contacto de Emergencia */}
                        <div className="space-y-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Contacto de Emergencia
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                        errors.contactoEmergencia?.nombre ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="María García"
                                    {...register("contactoEmergencia.nombre", { required: "El nombre del contacto es obligatorio" })}
                                />
                                {errors.contactoEmergencia?.nombre && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contactoEmergencia.nombre.message}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono *
                                    </label>
                                    <input
                                        type="text"
                                        maxLength="10"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                            errors.contactoEmergencia?.telefono ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0987654321"
                                        {...register("contactoEmergencia.telefono", { required: "El teléfono del contacto es obligatorio" })}
                                    />
                                    {errors.contactoEmergencia?.telefono && (
                                        <p className="text-red-500 text-sm mt-1">{errors.contactoEmergencia.telefono.message}</p>
                                    )}
                                </div>

                                {/* Campo relacion */}
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Relación</label>
                                    <select
                                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                                        {...register("contactoEmergencia.relacion", { required: "La relación es obligatoria" })}
                                    >
                                        <option value="">----Selecciona ----</option>
                                        <option value="Padre">Padre</option>
                                        <option value="Madre">Madre</option>
                                        <option value="Tío/a">Tío/a</option>
                                        <option value="Abuelo/a">Abuelo/a</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    {errors.contactoEmergencia?.relacion && (
                                        <p className="text-red-600 text-sm mt-1">{errors.contactoEmergencia.relacion.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Botón Register */}
                        <div className="mb-3">
                            <button 
                                type="submit"
                                className="bg-gray-500 text-white font-semibold border py-2.5 w-full rounded-xl mt-5 
                                hover:scale-105 duration-300 hover:bg-gray-900"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};    

export default InscripcionDeportiva;