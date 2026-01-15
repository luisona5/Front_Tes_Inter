import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../../../../../hooks/useFetch"
import { useNavigate } from "react-router"
import { UserRoundCog } from "lucide-react"
import { soloLetras, validacionNombre } from "../../../../../helpers/validaciones";

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

        let response;

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
                categoria:deporte?.categoria._id, 
                cupo: deporte?.cupo,
                lugar: deporte?.lugar,
                horario: deporte?.horario,
                detalle: deporte?.detalle,
                fechaInicio:deporte?.fechaInicio,
                fechaFin:deporte?.fechaFin
            })
        }
    }, [deporte, reset])

    return (
        <div className="max-w-xl mx-auto">
            <ToastContainer />

            <form onSubmit={handleSubmit(registerDeporte)}
                className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 w-full 
                             hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">

                {/* Header del formulario */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-lg">
                            <UserRoundCog size={24} className="text-white" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-bold text-2xl text-slate-800">Formulario de Deporte</h1>
                    </div>
                </div>

                {/* Campo nombre */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Nombre del Deporte</label>
                    <input
                        type="text"
                        placeholder="Ej: Fútbol, Baloncesto"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("nombre", validacionNombre)}
                        onInput={soloLetras}
                    />
                    {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                </div>

                {/* Campo categoría */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Categoría</label>
                    <select
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
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
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Cupo</label>
                    <input
                        type="number"
                        placeholder="Ej: 22"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        min="1"
                        step="0"
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


                {/* Campo lugar */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Lugar</label>
                    <input
                        type="text"
                        placeholder="Ej: Cancha Principal"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("lugar", {
                            required: "El lugar es obligatorio"
                        })}
                    />
                    {errors.lugar && <p className="text-red-600 text-sm mt-1">{errors.lugar.message}</p>}
                </div>



                {/* Campo horario */}
                {/* Fecha */}
                <div className="flex gap-4">

                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Fecha Inicio</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("fechaInicio", {required: "La fecha es obligatoria"})}
                    />
                    {errors.fechaInicio && <p className="text-red-600 text-sm mt-1">{errors.fechaInicio.message}</p>}
                </div>
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Fecha Fin</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                        {...register("fechaFin", {required: "La fecha es obligatoria"})}
                    />
                    {errors.fechaFin && <p className="text-red-600 text-sm mt-1">{errors.fechaFin.message}</p>}
                </div>
                </div>
                {/* Hora */}
                <div className="flex gap-4">
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Hora Inicio</label>
                        <input
                            type="time"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("horaInicio", {
                                required: "La hora es obligatoria"
                            })}
                        />
                        {errors.horaInicio && <p className="text-red-600 text-sm mt-1">{errors.horaInicio.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Hora Fin</label>
                        <input
                            type="time"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                            {...register("horaFin", {
                                required: "La hora es obligatoria"
                            })}
                        />
                        {errors.horaFin && <p className="text-red-600 text-sm mt-1">{errors.horaFin.message}</p>}
                    </div>
                </div>

                {/* Campo detalle */}
                <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Detalle</label>
                    <textarea
                        placeholder="Descripción del deporte"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500 resize-y"
                        rows={4}
                        {...register("detalle", {required: "El detalle es obligatorio"})}
                    />
                    {errors.detalle && <p className="text-red-600 text-sm mt-1">{errors.detalle.message}</p>}
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-slate-700 to-slate-600 w-full p-3 mt-5 text-white uppercase font-bold rounded-lg hover:from-slate-600 hover:to-slate-500 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {deporte ? "Actualizar Deporte" : "Registrar Deporte"}
                </button>
                </form>
            </div>
    );
}

export default CreateDeporte