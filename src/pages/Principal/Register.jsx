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
    const { register, handleSubmit, formState: { errors },reset } = useForm()
    
    const registerUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro/estudiante`
        await fetchDataBackend(url, dataForm, "POST")
        reset()
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
            <ToastContainer />

            <div className="hidden lg:block lg:w-1/2 bg-[url('/src/assets/buho.jpg')] bg-cover bg-center bg-no-repeat relative">
                
                <div className=" z-10 flex flex-col justify-between h-full p-12 text-white ">
                    <div>
                        <h1 className="text-5xl text-center font-bold mb-4 drop-shadow-lg">POLISPORT</h1>
                        
                    </div>


                    <div className="pt-8 border-t border-white/20 text-center">
                        <p className="text-white text-center text-lg mb-3">¿Ya tienes una cuenta?</p>
                        <Link 
                            to="/login" 
                            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-semibold transition-all duration-300 hover:scale-105 "
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>

            {/* Panel derecho  */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
                <div className="w-full max-w-2xl">

                    {/* Header  */}
                    <div className="lg:hidden mb-8 text-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            POLISPORT
                        </h1>
                        <p className="text-gray-600">Registro de Estudiantes</p>
                    </div>

                    {/* Card del formulario */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
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
                                        placeholder="ingresa numero de cédula" 
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
                                        maxLength={10}
                                        {...register("cedulaEstudiante", validacionCedula)}
                                        onInput={soloNumeros}
                                    />
                                </div>
                                {errors.cedulaEstudiante && (<p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">{errors.cedulaEstudiante.message}
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
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
                                            {...register("nombreEstudiante", validacionNombre)}
                                            onInput={soloLetras}
                                        />
                                    </div>
                                    {errors.nombreEstudiante && (
                                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">{errors.nombreEstudiante.message}
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
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
                                            {...register("apellidoEstudiante", validacionApellido)}
                                            onInput={soloLetras}
                                        />
                                    </div>
                                    {errors.apellidoEstudiante && (
                                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"> {errors.apellidoEstudiante.message}
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
                                        placeholder="ingresa número de teléfono" 
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
                                        maxLength={10}
                                        {...register("telefonoEstudiante", validacionTelefono)}
                                        onInput={soloNumeros}
                                    />
                                </div>
                                {errors.telefonoEstudiante && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">{errors.telefonoEstudiante.message}</p>
                                )}
                            </div>

                            {/* Género */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Género <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            value="masculino" 
                                            className="peer sr-only"
                                            {...register("genero", { required: "El género es obligatorio" })}
                                        />
                                        <div className="px-4 py-3.5 border-2 border-gray-200 rounded-xl text-center font-medium text-gray-600 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all hover:border-gray-300">
                                            Masculino
                                        </div>
                                    </label>

                                    <label className="flex-1 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            value="femenino" 
                                            className="peer sr-only"
                                            {...register("genero", { required: "El género es obligatorio" })}
                                        />
                                        <div className="px-4 py-3.5 border-2 border-gray-200 rounded-xl text-center font-medium text-gray-600 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all hover:border-gray-300">
                                            Femenino
                                        </div>
                                    </label>
                                </div>
                                {errors.genero && (<p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"> {errors.genero.message}</p>
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
                                        placeholder="Ingresa tu dirección " 
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
                                        {...register("direccionEstudiante", validacionDireccion)}
                                    />
                                </div>
                                {errors.direccionEstudiante && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">{errors.direccionEstudiante.message}
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
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 appearance-none bg-white cursor-pointer"
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
                                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"> {errors.carreraEstudiante.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Semestre <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 appearance-none bg-white cursor-pointer"
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
                                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"> {errors.semestre.message}
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
                                        placeholder="ingresa tu email" 
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
                                        {...register("emailEstudiante", { required: "El correo electrónico es obligatorio"})}
                                    />
                                </div>
                                {errors.emailEstudiante && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"> {errors.emailEstudiante.message}
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
                                        className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700"
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
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">{errors.passwordEstudiante.message}
                                    </p>
                                )}
                            </div>

                            {/* Botón Submit */}
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl mt-6 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Crear Cuenta
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-200 text-center lg:hidden">
                            <p className="text-gray-600 text-sm mb-3">¿Ya tienes una cuenta?</p>
                            <Link 
                                to="/login" 
                                className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                            >
                                Iniciar Sesión →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}