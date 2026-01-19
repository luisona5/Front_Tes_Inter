import {  useEffect } from "react"

import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../../../../../hooks/useFetch"
import { useNavigate } from "react-router"
import { UserRoundCog } from "lucide-react"
import { soloLetras, validacionNombre} from "../../../../../helpers/validaciones";



const CreateCategory = ({categoria}) => {

    const navigate = useNavigate()
        const { register, handleSubmit, formState: { errors },reset } = useForm()
        const fetchDataBackend = useFetch()
    
        const registerCategory = async (dataForm) => {
       let url = `${import.meta.env.VITE_BACKEND_URL}/categoriadeEvento/registro`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }

            let response; 
            
            if (categoria?._id) {
                url = `${import.meta.env.VITE_BACKEND_URL}/categoriadeEvento/actualizar/${categoria._id}`
                response = await fetchDataBackend(url, dataForm, "PUT", headers)
            }else{
                response = await fetchDataBackend(url, dataForm, "POST", headers)
            }
            if (response) {
                setTimeout(() => {
                    navigate("/dashboard/inscripciones/visualizar/categorias")
                }, 4000)
            }
        }
        useEffect(() => {
            if (categoria) {
                reset({
                    nombre: categoria?.nombre,
                    descripcion: categoria?.descripcion
                    

                })
            }
        }, [])


    return (
        <div className="max-w-xl mx-auto"> 
            <ToastContainer />
            
            <form onSubmit={handleSubmit(registerCategory)} 
                  className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 w-full 
                             hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
                
                {/* Header del formulario */}
                <div className="mb-8">
                    <div className=" flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-lg">
                            <UserRoundCog size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                        <h1 className="font-bold text-2xl text-slate-800">Formulario de  Categoria</h1>
                    </div>
                </div>

                {/* Campo nombre */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Nombre de Categoria</label>
                    <input 
                        type="text" 
                        placeholder="Ingresa tu nombre" 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("nombre", validacionNombre)}
                        onInput={soloLetras}
                    />
                    {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                </div>


                    {/* Campo Descripcion */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Descripción</label>
                    <textarea 
                        placeholder="Ingresa una descripción" 
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500 resize-y"
                        rows={4}
                        {...register("descripcion",{required:'la descripcion es obligatoria'})}

                    />
                    {errors.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion.message}</p>}
                </div>
                 
                {/* Botón de envío */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-slate-700 to-slate-600 w-full p-3 mt-5 text-white uppercase font-bold rounded-lg hover:from-slate-600 hover:to-slate-500 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {categoria ? "Actualizar Categoria" : "Registrar Categoria"}
                </button>
            </form>
        </div>
    );
}

export default CreateCategory