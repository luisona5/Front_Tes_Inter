import { useFetch } from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"


import { ToastContainer, } from 'react-toastify';
import {  UserRoundCog} from 'lucide-react';


const NuevoDirector = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const fetchDataBackend = useFetch()

    const registerDirector = async (dataForm) => {
   const url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/registro`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        }
        const response = await fetchDataBackend(url, dataForm, "POST", headers)
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/inscripciones/visualizar/directores")
            }, 3000)
        }
    }

    return (
        <div className="max-w-xl mx-auto"> 
            <ToastContainer />
            
            <form onSubmit={handleSubmit(registerDirector)} 
                  className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 w-full 
                             hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
                
                {/* Header del formulario */}
                <div className="mb-8">
                    <div className=" flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-lg">
                            <UserRoundCog size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                        <h1 className="font-bold text-2xl text-slate-800">Formulario Director</h1>
                    </div>
                </div>
                
                  {/* Campo cédula */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Cédula</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu cédula" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("cedulaDirector", { required: "La cédula es obligatoria"})}
                        />
                        {errors.cedulaDirector && <p className="text-red-600 text-sm mt-1">{errors.cedulaDirector.message}</p>}
                    </div>

                {/* Campo nombre */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Nombre</label>
                    <input 
                        type="text" 
                        placeholder="Ingresa tu nombre" 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("nombreDirector", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombreDirector && <p className="text-red-600 text-sm mt-1">{errors.nombreDirector.message}</p>}
                </div>

                {/* Campo apellido */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Apellido</label>
                    <input 
                        type="text" 
                        placeholder="Ingresa tu apellido" 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("apellidoDirector", { required: "El apellido es obligatorio" })}
                    />
                    {errors.apellidoDirector && <p className="text-red-600 text-sm mt-1">{errors.apellidoDirector.message}</p>}
                </div>

                    {/* Campo celular */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Celular</label>
                    <input 
                        type="tel" 
                        placeholder="Ingresa tu celular" 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("telefonoDirector", { required: "El celular es obligatorio"})}
                    />
                    {errors.telefonoDirector && <p className="text-red-600 text-sm mt-1">{errors.telefonoDirector.message}</p>}
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
                            {...register("emailDirector", { required: "El correo electrónico es obligatorio"})}
                        />
                        {errors.emailDirector && <p className="text-red-600 text-sm mt-1">{errors.emailDirector.message}</p>}
                    </div>
                                    
                {/* Botón de envío */}
                <button
                    type="submit"
                    className="w-full  bg-blue-600  hover:from-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wide"
                >
                    registrar director
                </button>
            </form>
        </div>
    );
};

export default NuevoDirector;