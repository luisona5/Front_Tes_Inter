import {  useEffect } from "react"


import { useFetch } from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { validacionNombre,validacionApellido,
        validacionTelefono,validacionCedula, 
        soloNumeros,soloLetras} from "../../helpers/validaciones";

import { ToastContainer } from 'react-toastify';
import {  UserRoundCog} from 'lucide-react';


const NuevoDirector = ({director}) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors },reset } = useForm()
    const fetchDataBackend = useFetch()

    const registerDirector = async (dataForm) => {
   let url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/registro`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        }

        let response; 

        if (director?._id) {
            url = `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/actualizar/${director._id}`
            response = await fetchDataBackend(url, dataForm, "PUT", headers)
        }else{
         response = await fetchDataBackend(url, dataForm, "POST", headers)
        }
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/inscripciones/visualizar/directores")
            }, 4000)
        }
    }
    useEffect(() => {
        if (director) {
            reset({
                cedulaDirector: director?.cedulaDirector,
                nombreDirector: director?.nombreDirector,
                apellidoDirector: director?.apellidoDirector,
                telefonoDirector: director?.telefonoDirector,
                emailDirector: director?.emailDirector,
                status: director?.status
            })
        }
    }, [])

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
                            {...register("cedulaDirector", validacionCedula)}
                            onInput={soloNumeros}
                            disabled={!!director}

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
                        {...register("nombreDirector", validacionNombre)}
                        onInput={soloLetras}
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
                        {...register("apellidoDirector", validacionApellido)}
                        onInput={soloLetras}
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
                        {...register("telefonoDirector", validacionTelefono)}
                        onInput={soloNumeros}
                    />
                    {errors.telefonoDirector && <p className="text-red-600 text-sm mt-1">{errors.telefonoDirector.message}</p>}
                </div>
                 

                
                {/* Campo correo electrónico */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500" 
                            {...register("emailDirector", { required: "El correo electrónico es obligatorio"})}
                            disabled={!!director}

                        />
                        {errors.emailDirector && <p className="text-red-600 text-sm mt-1">{errors.emailDirector.message}</p>}
                    </div>
                                    
                {/* Botón de envío */}
                {/* Botón de registro */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-slate-700 to-slate-600 w-full p-3 mt-5 text-white uppercase font-bold rounded-lg hover:from-slate-600 hover:to-slate-500 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {director ? "Actualizar Director" : "Registrar Director"}
                </button>

            </form>
        </div>
    );
};

export default NuevoDirector;