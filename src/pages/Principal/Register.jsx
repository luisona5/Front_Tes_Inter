import { MdVisibility, MdVisibilityOff, MdPerson, 
    MdEmail, MdPhone, MdHome, MdSchool, MdLock, MdBadge } from "react-icons/md"
import { useState } from "react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../../hooks/useFetch"
import { validacionCedula, validacionTelefono, 
         soloNumeros,validacionNombre,soloLetras,
        validacionDireccion,validacionApellido, 
        validacionPassword} from "../../helpers/validaciones"

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const fetchDataBackend = useFetch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    
    const registerUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro/estudiante`
        await fetchDataBackend(url, dataForm, "POST")
        reset()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Panel Izquierdo - Imagen */}
                <div className="hidden lg:flex lg:w-2/5 relative bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800">
                    <div 
                        className="absolute inset-0 bg-[url('/src/assets/buho.jpg')] bg-cover bg-center opacity-30"
                    ></div>
                    
                    <div className="relative z-10 flex flex-col justify-between text-white p-12">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-3 text-center">POLISPORT</h1>
                        </div>

                        

                        <div className="pt-6 border-t border-white/20 text-center">
                            <p className="text-white text-lg mb-3">¿Ya tienes una cuenta?</p>
                            <Link 
                                to="/login" 
                                className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Panel Derecho - Formulario */}
                <div className="w-full lg:w-3/5 p-8 lg:p-12 overflow-y-auto max-h-screen">
                    <div className="max-w-2xl mx-auto">

                        {/* Header Mobile */}
                        <div className="lg:hidden mb-6 text-center">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                                POLISPORT
                            </h1>
                            <p className="text-gray-600">Registro de Estudiantes</p>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl text-center font-bold text-gray-800 mb-2">
                                Crear Cuenta
                            </h2>
                          
                        </div>

                        <form onSubmit={handleSubmit(registerUser)} className="space-y-5">
                            
                            {/* Cédula */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Cédula <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Ingresa número de cédula" 
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                            errors.cedulaEstudiante 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                            : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                        }`}
                                        maxLength={10}
                                        {...register("cedulaEstudiante", validacionCedula)}
                                        onInput={soloNumeros}
                                    />
                                </div>
                                {errors.cedulaEstudiante && (
                                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                        {errors.cedulaEstudiante.message}
                                    </p>
                                )}
                            </div>

                            {/* Nombre y Apellido */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input 
                                            type="text" 
                                            placeholder="Ingresa tu nombre" 
                                            className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                                errors.nombreEstudiante 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                                : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                            }`}
                                            {...register("nombreEstudiante", validacionNombre)}
                                            onInput={soloLetras}
                                        />
                                    </div>
                                    {errors.nombreEstudiante && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.nombreEstudiante.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Apellido <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input 
                                            type="text" 
                                            placeholder="Ingresa tu apellido" 
                                            className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                                errors.apellidoEstudiante 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                                : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                            }`}
                                            {...register("apellidoEstudiante", validacionApellido)}
                                            onInput={soloLetras}
                                        />
                                    </div>
                                    {errors.apellidoEstudiante && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.apellidoEstudiante.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Celular */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Celular <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input 
                                        type="tel" 
                                        placeholder="Ingresa número de teléfono" 
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                            errors.telefonoEstudiante 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                            : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                        }`}
                                        maxLength={10}
                                        {...register("telefonoEstudiante", validacionTelefono)}
                                        onInput={soloNumeros}
                                    />
                                </div>
                                {errors.telefonoEstudiante && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.telefonoEstudiante.message}
                                    </p>
                                )}
                            </div>

                            {/* Género */}
                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-3">
                                    Género <span className="text-red-500">*</span>
                                </label>
                                
                                <div className="flex flex-row gap-3 ml-2">
                                    {/* Opción Masculino */}
                                    <label className="flex items-center cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            value="Masculino" 
                                            className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2 cursor-pointer"
                                            {...register("genero", { required: "El género es obligatorio" })}
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors">
                                            Masculino
                                        </span>
                                    </label>

                                    {/* Opción Femenino */}
                                    <label className="flex items-center cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            value="Femenino" 
                                            className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2 cursor-pointer"
                                            {...register("genero", { required: "El género es obligatorio" })}
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors">
                                            Femenino
                                        </span>
                                    </label>
                                </div>

                                {errors.genero && (
                                    <p className="text-red-500 text-[10px] mt-2 font-bold italic">
                                        {errors.genero.message}
                                    </p>
                                )}
                            </div>

                            


                            {/* Dirección */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Dirección <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MdHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Ingresa tu dirección" 
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                            errors.direccionEstudiante 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                            : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                        }`}
                                        {...register("direccionEstudiante", validacionDireccion)}
                                    />
                                </div>
                                {errors.direccionEstudiante && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.direccionEstudiante.message}
                                    </p>
                                )}
                            </div>

                            {/* Carrera y Semestre */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Carrera <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MdSchool className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={20} />
                                        <select 
                                            className={`w-full pl-12 pr-10 py-3 rounded-lg border-2 transition-all duration-200 appearance-none bg-white ${
                                                errors.carreraEstudiante 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                                : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                            }`}
                                            {...register("carreraEstudiante", { required: "La carrera es obligatoria" })}
                                        >
                                            <option value="">Selecciona una carrera</option>
                                            <option value="Electromecánica">Electromecánica</option>
                                            <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                                            <option value="Agua y Saneamiento Ambiental">Agua y Saneamiento Ambiental</option>
                                            <option value="Desarrollo de Software">Desarrollo de Software</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.carreraEstudiante && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.carreraEstudiante.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Semestre <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 appearance-none bg-white ${
                                                errors.semestre 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                                : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                            }`}
                                            {...register("semestre", { required: "Semestre es obligatorio" })}
                                        >
                                            <option value="">Selecciona semestre</option>
                                            <option value="Primer Semestre">Primer Semestre</option>
                                            <option value="Segundo Semestre">Segundo Semestre</option>
                                            <option value="Tercer Semestre">Tercer Semestre</option>
                                            <option value="Cuarto Semestre">Cuarto Semestre</option>
                                            <option value="Quinto Semestre">Quinto Semestre</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.semestre && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.semestre.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input 
                                        type="email" 
                                        placeholder="Ingresa tu email" 
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                            errors.emailEstudiante 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                            : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                        }`}
                                        {...register("emailEstudiante", { required: "El correo electrónico es obligatorio"})}
                                    />
                                </div>
                                {errors.emailEstudiante && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.emailEstudiante.message}
                                    </p>
                                )}
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all duration-200 ${
                                            errors.passwordEstudiante 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                            : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                                        }`}
                                        {...register("passwordEstudiante", validacionPassword)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
                                    </button>
                                </div>
                                {errors.passwordEstudiante && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.passwordEstudiante.message}
                                    </p>
                                )}
                            </div>

                            {/* Botón Submit */}
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-lg mt-6 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Crear Cuenta
                            </button>
                        </form>

                        {/* Link Login Mobile */}
                        <div className="mt-6 text-center lg:hidden">
                            <p className="text-sm text-gray-600">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
                                    Iniciar Sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}