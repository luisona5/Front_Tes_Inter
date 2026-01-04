import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../../hooks/useFetch"



export const Register = () => {

		const [showPassword, setShowPassword] = useState(false)
    const fetchDataBackend = useFetch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const registerUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro/estudiante`
        await fetchDataBackend(url, dataForm, "POST")
    }


    return (
    <div className="flex flex-col sm:flex-row h-screen">

        <ToastContainer />

        {/* Panel del formulario con scroll */}
        <div className="w-full sm:w-1/2 bg-white flex justify-center items-start overflow-y-auto">
            <div className="w-11/12 md:w-4/5 py-4 px-4">

                <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center uppercase text-sky-700"> REGISTRO POLISPORT</h1>

                
                {/* Formulario */}
                <form onSubmit={handleSubmit(registerUser)}>

                     {/* Campo cédula */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Cédula</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu cédula" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("cedulaEstudiante", { required: "La cédula es obligatoria"})}
                        />
                        {errors.cedulaEstudiante && <p className="text-red-600 text-sm mt-1">{errors.cedulaEstudiante.message}</p>}
                    </div>

                    {/* Campo nombre */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Nombre</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu nombre" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("nombreEstudiante", { required: "El nombre es obligatorio" })}
                        />
                        {errors.nombreEstudiante && <p className="text-red-600 text-sm mt-1">{errors.nombreEstudiante.message}</p>}
                    </div>

                    {/* Campo apellido */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Apellido</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu apellido" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("apellidoEstudiante", { required: "El apellido es obligatorio" })}
                        />
                        {errors.apellidoEstudiante && <p className="text-red-600 text-sm mt-1">{errors.apellidoEstudiante.message}</p>}
                    </div>

                     {/* Campo celular */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Celular</label>
                        <input 
                            type="tel" 
                            placeholder="Ingresa tu celular" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("telefonoEstudiante", { required: "El celular es obligatorio"})}
                        />
                        {errors.telefonoEstudiante && <p className="text-red-600 text-sm mt-1">{errors.telefonoEstudiante.message}</p>}
                    </div>

                    {/* Campo género */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Género</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    value="masculino" 
                                    className="mr-2"
                                    {...register("genero", { required: "El género es obligatorio" })}
                                />
                                <span>Masculino</span>
                            </label>

                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    value="femenino" 
                                    className="mr-2"
                                    {...register("genero", { required: "El género es obligatorio" })}
                                />
                                <span>Femenino</span>
                            </label>
                        </div>
                        {errors.genero && <p className="text-red-600 text-sm mt-1">{errors.genero.message}</p>}
                    </div>

                    {/* Campo dirección */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Dirección</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu dirección de domicilio" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("direccionEstudiante", { required: "La dirección es obligatoria" })}
                        />
                        {errors.direccionEstudiante && <p className="text-red-600 text-sm mt-1">{errors.direccionEstudiante.message}</p>}
                    </div>

                     {/* Campo carrera */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Carrera</label>
                        <select 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("carreraEstudiante", { required: "La carrera es obligatoria" })}
                        >
                            <option value="">----Selecciona una carrera----</option>
                            <option value="Electromecánica">Electromecánica</option>
                            <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                            <option value="Agua y Saneamiento Ambiental">Agua y Saneamiento Ambiental</option>
                            <option value="Desarrollo de Software">Desarrollo de Software</option>
                        </select>
                        {errors.carreraEstudiante && <p className="text-red-600 text-sm mt-1">{errors.carreraEstudiante.message}</p>}
                    </div>

                    {/* Campo status */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Estado</label>
                        <select
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                            {...register("status", { required: "El estado es obligatorio" })}
                        >
                            <option value="">----Selecciona un estado----</option>
                            <option value="activo">Activo</option>
                            <option value="graduado">Graduado</option>
                            <option value="retirado">Retirado</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>}
                    </div>


                    {/* Campo correo electrónico */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500" 
                            {...register("emailEstudiante", { required: "El correo electrónico es obligatorio"})}
                        />
                        {errors.emailEstudiante && <p className="text-red-600 text-sm mt-1">{errors.emailEstudiante.message}</p>}
                    </div>

                    {/* Campo Contraseña */}
                    <div className="mb-3">
                        <label className="block text-sm font-semibold mb-2">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="*********"
                                className="w-full rounded-md border border-gray-300 py-2 px-3 pr-10 text-gray-500"
                                {...register("passwordEstudiante", { required: "La contraseña es obligatoria"})}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                            </button>
                        </div>
                        {errors.passwordEstudiante && <p className="text-red-600 text-sm mt-1">{errors.passwordEstudiante.message}</p>}
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

                {/* Enlace para iniciar sesión */}
                <div className="mt-6 mb-4 text-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-gray-600">¿Ya posees una cuenta?</p>
                    <Link 
                        to="/" 
                        className="py-2 px-5 bg-gray-500 text-white font-medium rounded-xl hover:scale-110 
                        duration-300 hover:bg-gray-900"
                    >
                        Iniciar sesión
                    </Link>
                </div>

            </div>
        </div>

        {/* Imagen de fondo */}
        <div className="w-full sm:w-1/2 h-64 sm:h-screen bg-[url('/src/assets/buho.jpg')] bg-no-repeat 
            bg-cover bg-center">
        </div>

    </div>
)
}
