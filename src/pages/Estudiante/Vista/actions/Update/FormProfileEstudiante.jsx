import  { useEffect } from 'react';
import storeProfile from "../../../../../context/storeProfile"; 
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import {  UserRoundCog} from 'lucide-react';


const FormularioPerfilEstudiante = () => {

    const { user, updateProfile } = storeProfile()
    const { register, handleSubmit, reset, formState: { errors } = {} } = useForm() 

    const updateUser = (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarperfilEstudiante/${user._id}`
        updateProfile(url, dataForm)
    }

    useEffect(() => {
        if (user) {
            reset({
                nombreEstudiante: user?.nombreEstudiante,
                apellidoEstudiante: user?.apellidoEstudiante,
                telefonoEstudiante: user?.telefonoEstudiante,
                carreraEstudiante: user?.carreraEstudiante,
                direccionEstudiante: user?.direccionEstudiante,
            })
        }
    }, [user, reset])

    return (
        <div className="max-w-xl mx-auto"> 
            <ToastContainer />
            
            <form onSubmit={handleSubmit(updateUser)} 
                  className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 w-full 
                             hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
                
                {/* Header del formulario */}
                <div className="mb-8">
                    <div className=" flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-lg">
                            <UserRoundCog size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                        <h1 className="font-bold text-2xl text-slate-800">Actualizar Informacion</h1>
                    </div>
                </div>
                
                  {/* Campo cédula */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Cédula</label>
                    <input disabled
                        type="text" 
                        placeholder={user?.cedulaEstudiante} 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                    />
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
                    <input disabled
                        type="email" 
                        placeholder={user?.emailEstudiante} 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500" 
                    />
                </div>
                                    
                {/* Botón de envío */}
                <button
                    type="submit"
                    className="w-full  bg-blue-600  hover:from-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wide"
                >
                    Actualizar Perfil
                </button>
            </form>
        </div>
    );
};

export default FormularioPerfilEstudiante