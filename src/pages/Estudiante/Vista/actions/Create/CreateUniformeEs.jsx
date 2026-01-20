import { useNavigate, useLocation } from 'react-router'; 
import { User, ShirtIcon, Ruler, FileText } from 'lucide-react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify'; 
import { useFetch } from "../../../../../hooks/useFetch";

const RegistroUniforme = () => { 
    const navigate = useNavigate();
    const location = useLocation(); 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const fetchDataBackend = useFetch();

    const { inscripcion } = location.state || {};

    const registerUniEstudiante = async (dataForm) => {
        if (!inscripcion?._id) {
            toast.error("Error: No se encontró información de la inscripción.");
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/uniforme/registro`;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const token = storedUser?.state?.token; 
            
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };

            const dataFinal = {
                ...dataForm,
                inscripcion: inscripcion._id    
            };

            const response = await fetchDataBackend(url, dataFinal, "POST", headers);
            
            if (response) {
                setTimeout(() => {
                    navigate("/dashboard/Uniforme/informacion-completa/detalle-para-pago", { 
                        state: { inscripcion } 
                    });
                    reset();
                }, 2000);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    if (!inscripcion) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-600 mb-4">No hay una inscripción seleccionada.</p>
                <button onClick={() => navigate(-1)} className="text-indigo-600 underline">Volver</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Registro de Uniforme
                </h1>
               
            </div>

            <form onSubmit={handleSubmit(registerUniEstudiante)} className="space-y-6">
                
                {/* Sección Detalles del Uniforme */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <ShirtIcon className="w-5 h-5 text-indigo-500" />
                        Detalles del Uniforme
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Campo Nombre en el Uniforme */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Nombre en el Uniforme
                            </label>
                            <input 
                                type="text" 
                                placeholder="Ingresa el nombre" 
                                className={`block w-full rounded-md border py-2 px-3 text-gray-700 outline-none transition-all
                                    ${errors.nombre ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'}`}
                                {...register("nombre", { required: "El nombre es obligatorio"})}
                            />
                            {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                        </div>

                        {/* Campo Talla */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Ruler className="w-4 h-4" />
                                Talla del Uniforme
                            </label>
                            <select
                                className={`block w-full rounded-md border py-2 px-3 text-gray-700 outline-none transition-all
                                    ${errors.talla ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'}`}
                                {...register("talla", { required: "La talla es obligatoria" })}
                            >
                                <option value="">Selecciona una talla</option>
                                <option value="S">S - Small</option>
                                <option value="M">M - Medium</option>
                                <option value="L">L - Large</option>
                                <option value="XL">XL - Extra Large</option>
                            </select>
                            {errors.talla && <p className="text-red-600 text-sm mt-1">{errors.talla.message}</p>}
                        </div>
                    </div>

                    {/* Campo Detalles/Número (Textarea estilo Información Médica) */}
                    <div className="mb-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-indigo-200">
                        <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Detalles Adicionales (Número preferido)
                        </label>
                        <textarea 
                            rows="3"
                            placeholder="Indica el número que deseas en tu espalda o detalles específicos..." 
                            className={`block w-full rounded-lg border py-3 px-4 text-gray-700 transition-all duration-200 resize-none outline-none
                                ${errors.detalle ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'}`}
                            {...register("detalle", { required: "El detalle es obligatorio" })}
                        />
                        {errors.detalle && <p className="text-red-600 text-sm mt-1">{errors.detalle.message}</p>}
                    </div>
                </div>

                {/* Botón de Registro con el estilo del segundo formulario */}
                <div className="pt-4">
                    <button 
                        type="submit"
                        className="bg-indigo-600 text-white font-semibold py-3 w-full rounded-xl mt-5 
                        hover:scale-[1.02] duration-300 hover:bg-indigo-700 shadow-md flex items-center justify-center gap-2"
                    >
                        <ShirtIcon className="w-5 h-5" />
                        Confirmar y Registrar Uniforme
                    </button>
                </div>
            </form>
        </div>
    </div>
    <ToastContainer />
</div>
    );
};

export default RegistroUniforme;