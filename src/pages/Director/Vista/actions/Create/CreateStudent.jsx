import {  useEffect } from "react"

import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../../../../../hooks/useFetch"
import { useNavigate } from "react-router"
import { UserRoundCog } from "lucide-react"
import { validacionNombre,validacionApellido,
        validacionTelefono,validacionCedula, 
        soloNumeros,soloLetras,
        validacionDireccion} from "../../../../../helpers/validaciones";



const CreateStudent = ({estudiante}) => {

    const navigate = useNavigate()
        const { register, handleSubmit, formState: { errors },reset } = useForm()
        const fetchDataBackend = useFetch()
    
        const registerEstudiante = async (dataForm) => {
       let url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/registro`
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
            }

            let response; 
            
            if (estudiante?._id) {
                url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/actualizar/${estudiante._id}`
                response = await fetchDataBackend(url, dataForm, "PUT", headers)
            }else{
                response = await fetchDataBackend(url, dataForm, "POST", headers)
            }
            if (response) {
                setTimeout(() => {
                    navigate("/dashboard/inscripciones/visualizar/estudiantes")
                }, 4000)
            }
        }
        useEffect(() => {
            if (estudiante) {
                reset({
                    cedulaEstudiante: estudiante?.cedulaEstudiante,
                    nombreEstudiante: estudiante?.nombreEstudiante,
                    apellidoEstudiante: estudiante?.apellidoEstudiante,
                    telefonoEstudiante: estudiante?.telefonoEstudiante,
                    emailEstudiante: estudiante?.emailEstudiante,
                    direccionEstudiante: estudiante?.direccionEstudiante,
                    carreraEstudiante: estudiante?.carreraEstudiante,
                    semestre:estudiante?.semestre

                })
            }
        }, [])


    return (
        <div className="max-w-xl mx-auto"> 
            <ToastContainer />
            
            <form onSubmit={handleSubmit(registerEstudiante)} 
                  className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 w-full 
                             hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
                
                {/* Header del formulario */}
                <div className="mb-8">
                    <div className=" flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-lg">
                            <UserRoundCog size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                        <h1 className="font-bold text-2xl text-slate-800">Formulario Estudiante</h1>
                    </div>
                </div>
                
                  {/* Campo cédula */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Cédula</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu cédula" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("cedulaEstudiante", validacionCedula)}
                            onInput={soloNumeros}
                            disabled={!!estudiante}

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
                        {...register("nombreEstudiante", validacionNombre)}
                        onInput={soloLetras}
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
                        {...register("apellidoEstudiante", validacionApellido)}
                        onInput={soloLetras}
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
                        {...register("telefonoEstudiante", validacionTelefono)}
                        onInput={soloNumeros}
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
                                    disabled={!!estudiante}

                                />
                                <span>Masculino</span>
                            </label>

                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="radio" 
                                    value="femenino" 
                                    className="mr-2"
                                    {...register("genero", { required: "El género es obligatorio" })}
                                    disabled={!!estudiante}
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
                            {...register("direccionEstudiante", validacionDireccion)}
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
                        <label className="mb-2 block text-sm font-semibold">Nivel</label>
                        <select
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                            {...register("semestre", { required: "El semestre es obligatorio" })}
                        >
                            <option value="">----Selecciona Semestre----</option>
                            <option value="Primer Semestre">Primer Semestre</option>
                            <option value="Segundo Semestre">Segundo Semestre</option>
                            <option value="Tercer Semestre">Tercer Semestre</option>
                            <option value="Cuarto Semestre">Cuarto Semestre</option>
                            <option value="Quinto Semestre">Quinto Semestre</option>

                        </select>
                        {errors.semestre && <p className="text-red-600 text-sm mt-1">{errors.semestre.message}</p>}
                    </div>


                
                {/* Campo correo electrónico */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico" 
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500" 
                            {...register("emailEstudiante", { required: "El correo electrónico es obligatorio"})}
                            disabled={!!estudiante}

                        />
                        {errors.emailEstudiante && <p className="text-red-600 text-sm mt-1">{errors.emailEstudiante.message}</p>}
                    </div>
                                    
                {/* Botón de envío */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-slate-700 to-slate-600 w-full p-3 mt-5 text-white uppercase font-bold rounded-lg hover:from-slate-600 hover:to-slate-500 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {estudiante ? "Actualizar Estudiante" : "Registrar Estudiante"}
                </button>
            </form>
        </div>
    );
}

export default CreateStudent