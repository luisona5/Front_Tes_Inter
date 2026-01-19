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
                    navigate("/dashboard/estudiante/inscripcionesGenerales", { 
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                        <ShirtIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Registro de Uniforme
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Disciplina: <span className="font-bold text-indigo-600">{inscripcion.deporte?.nombre}</span>
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
                    <form onSubmit={handleSubmit(registerUniEstudiante)} className="space-y-6">
                        
                        {/* Campo Nombre */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <User className="w-4 h-4 text-indigo-500" />
                                Nombre en el Uniforme
                            </label>
                            <input 
                                type="text" 
                                placeholder="ingresa un nombre" 
                                className={`block w-full rounded-xl border-2 py-3 px-4 text-gray-700 transition-all duration-200
                                    ${errors.nombre 
                                        ? 'border-red-400 focus:border-red-500' 
                                        : 'border-gray-200 focus:border-indigo-500'
                                    } outline-none`}
                                {...register("nombre", { required: "El nombre es obligatorio"})}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                        </div>

                        {/* Campo Talla */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Ruler className="w-4 h-4 text-indigo-500" />
                                Talla del Uniforme
                            </label>
                            <select
                                className={`w-full px-4 py-3 border-2 rounded-xl text-gray-700 outline-none
                                    ${errors.talla ? 'border-red-400' : 'border-gray-200 focus:border-indigo-500'}`}
                                {...register("talla", { required: "La talla es obligatoria" })}
                            >
                                <option value="">Selecciona una talla</option>
                                <option value="S">S - Small</option>
                                <option value="M">M - Medium</option>
                                <option value="L">L - Large</option>
                                <option value="XL">XL - Extra Large</option>
                            </select>
                            {errors.talla && <p className="text-red-500 text-sm">{errors.talla.message}</p>}
                        </div>

                        {/* Campo Detalle */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <FileText className="w-4 h-4 text-indigo-500" />
                                Detalles Adicionales (Número preferido)
                            </label>
                            <textarea 
                                rows="4"
                                placeholder="Indica el número que deseas en tu espalda o detalles específicos..." 
                                className={`block w-full rounded-xl border-2 py-3 px-4 text-gray-700 transition-all duration-200 resize-none
                                    ${errors.detalle ? 'border-red-400' : 'border-gray-200 focus:border-indigo-500'} outline-none`}
                                {...register("detalle", { required: "El detalle es obligatorio" })}
                            />
                            {errors.detalle && <p className="text-red-500 text-sm">{errors.detalle.message}</p>}
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl mt-8
                                hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <ShirtIcon className="w-5 h-5" />
                            Confirmar y Registrar Uniforme
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegistroUniforme;