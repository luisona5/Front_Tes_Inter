import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../../../../../hooks/useFetch"
import { useNavigate } from "react-router"
import { UserRoundCog, DollarSign } from "lucide-react"
import { soloLetras, validacionNombre } from "../../../../../helpers/validaciones"

const CreateDeporte = ({ deporte }) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const fetchDataBackend = useFetch()
    const [categorias, setCategorias] = useState([])

    const registerDeporte = async (dataForm) => {
        let url = `${import.meta.env.VITE_BACKEND_URL}/registro/Deporte`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        }

        let response

        if (deporte?._id) {
            url = `${import.meta.env.VITE_BACKEND_URL}/deportes/actualizar/${deporte._id}`
            response = await fetchDataBackend(url, dataForm, "PUT", headers)
        } else {
            response = await fetchDataBackend(url, dataForm, "POST", headers)
        }
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/inscripciones/visualizar/deportes")
            }, 4000)
        }
    }

    useEffect(() => {
        const fetchCategorias = async () => {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/categorias`,
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.state.token}`
                    }
                }
            )
            const data = await response.json()
            setCategorias(data)
        }

        fetchCategorias()

        if (deporte) {
            reset({
                nombre: deporte?.nombre,
                categoria: deporte?.categoria._id, 
                cupo: deporte?.cupo,
                lugar: deporte?.lugar,
                detalle: deporte?.detalle,
                fechaInicio: deporte?.fechaInicio,
                fechaFin: deporte?.fechaFin,
                horaInicio: deporte?.horaInicio,
                horaFin: deporte?.horaFin,
                EntrenamientoDia: deporte?.EntrenamientoDia,
                EntrenamientoHora: deporte?.EntrenamientoHora,
                precioUniforme: deporte?.precioUniforme || 0
            })
        }
    }, [deporte, reset])

    return (
        <div className="max-w-4xl mx-auto p-6">
            <ToastContainer />

            <form onSubmit={handleSubmit(registerDeporte)}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full">

                {/* Header del formulario */}
                <div className="mb-8 pb-4 border-b">
                    <div className="flex items-center gap-3 ">
                        <div className="w-12 h-12 rounded-lg bg-gray-500 flex items-center justify-center">
                            <UserRoundCog size={24} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-900">
                                {deporte ? "Actualizar Deporte" : "Registrar Deporte"}
                            </h1>
                           
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Campo nombre */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nombre del Deporte 
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Fútbol, Baloncesto"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("nombre", validacionNombre)}
                            onInput={soloLetras}
                        />
                        {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                    </div>

                    {/* Campo categoría */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Categoría 
                        </label>
                        <select
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("categoria", { required: "La categoría es obligatoria"})}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.categoria && <p className="text-red-600 text-sm mt-1">{errors.categoria.message}</p>}
                    </div>

                    {/* Campo cupo */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Cupo 
                        </label>
                        <input
                            type="number"
                            placeholder="Ej: 22"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            step="1"
                            {...register("cupo", {
                                required: "El cupo es obligatorio",
                                min: { value: 1, message: "El cupo debe ser un número positivo" },
                                valueAsNumber: true
                            })}
                        />
                        {errors.cupo && (
                            <p className="text-red-600 text-sm mt-1">{errors.cupo.message}</p>
                        )}
                    </div>

                    {/* Campo Precio Uniforme - NUEVO */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Precio del Uniforme (USD)
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="block w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...register("precioUniforme", {
                                    required: "El precio del uniforme es obligatorio",
                                    min: { value: 0, message: "El precio debe ser mayor o igual a 0" },
                                    valueAsNumber: true
                                })}
                            />
                        </div>
                        {errors.precioUniforme && (
                            <p className="text-red-600 text-sm mt-1">{errors.precioUniforme.message}</p>
                        )}
                     
                    </div>

                    {/* Campo lugar */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Lugar 
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Cancha Principal"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("lugar", {
                                required: "El lugar es obligatorio"
                            })}
                        />
                        {errors.lugar && <p className="text-red-600 text-sm mt-1">{errors.lugar.message}</p>}
                    </div>

                    {/* Fechas de Inicio y Fin */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Fecha Inicio 
                        </label>
                        <input
                            type="date"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("fechaInicio", {required: "La fecha de inicio es obligatoria"})}
                        />
                        {errors.fechaInicio && <p className="text-red-600 text-sm mt-1">{errors.fechaInicio.message}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Fecha Fin 
                        </label>
                        <input
                            type="date"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("fechaFin", {required: "La fecha de fin es obligatoria"})}
                        />
                        {errors.fechaFin && <p className="text-red-600 text-sm mt-1">{errors.fechaFin.message}</p>}
                    </div>

                    {/* Horas de Inicio y Fin */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Hora Inicio 
                        </label>
                        <input
                            type="time"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("horaInicio", {
                                required: "La hora de inicio es obligatoria"
                            })}
                        />
                        {errors.horaInicio && <p className="text-red-600 text-sm mt-1">{errors.horaInicio.message}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Hora Fin 
                        </label>
                        <input
                            type="time"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("horaFin", {
                                required: "La hora de fin es obligatoria"
                            })}
                        />
                        {errors.horaFin && <p className="text-red-600 text-sm mt-1">{errors.horaFin.message}</p>}
                    </div>

                    {/* Día y Hora de Entrenamiento */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Entrenamiento Día 
                        </label>
                        <input
                            type="date"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("EntrenamientoDia", {required: "El día de entrenamiento es obligatorio"})}
                        />
                        {errors.EntrenamientoDia && <p className="text-red-600 text-sm mt-1">{errors.EntrenamientoDia.message}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Entrenamiento Hora 
                        </label>
                        <input
                            type="time"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("EntrenamientoHora", {
                                required: "La hora de entrenamiento es obligatoria"
                            })}
                        />
                        {errors.EntrenamientoHora && <p className="text-red-600 text-sm mt-1">{errors.EntrenamientoHora.message}</p>}
                    </div>

                    {/* Campo detalle */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Detalle 
                        </label>
                        <textarea
                            placeholder="Descripción del deporte"
                            className="block w-full rounded-lg border border-gray-300 py-2.5 px-4 text-gray-900 resize-y
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            {...register("detalle", {required: "El detalle es obligatorio"})}
                        />
                        {errors.detalle && <p className="text-red-600 text-sm mt-1">{errors.detalle.message}</p>}
                    </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                            <ul className="list-disc list-inside space-y-1 text-blue-700">
                                <li>El precio del uniforme se aplicará automáticamente al aprobar inscripciones</li>
                               
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    className="bg-gray-800 w-full p-3 mt-6 text-white font-medium rounded-lg 
                             hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md"
                >
                    {deporte ? "Actualizar Deporte" : "Registrar Deporte"}
                </button>
            </form>
        </div>
    )
}

export default CreateDeporte