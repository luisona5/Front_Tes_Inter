import { useForm } from "react-hook-form"
import storeUniforms from "../../../../context/store/storeUniforme"
import { X, ShoppingBag } from 'lucide-react'

const ModalUniforms = ({inscripcionID}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { toggleModal, registerUniform } = storeUniforms()

    const registerUniformForm = (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/uniforme/registro`
        const newData = { ...dataForm, inscripcion: inscripcionID }
        registerUniform(url, newData)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <div className="bg-gray-800 rounded-lg shadow-2xl overflow-y-auto max-w-lg w-full border-2 border-gray-700 relative pointer-events-auto">
                
                {/* Header del Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h2 className="text-white font-bold text-lg">Registrar Uniforme</h2>
                    </div>
                    <button
                        onClick={() => toggleModal()}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Formulario */}
                <form className="p-6" onSubmit={handleSubmit(registerUniformForm)}>
                    
                    {/* Campo nombre */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-50">
                            Nombre 
                        </label>
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre completo"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                        {errors.nombre && (
                            <p className="text-red-400 text-sm mt-1">{errors.nombre.message}</p>
                        )}
                    </div>

                    {/* Campo detalle */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-50">
                            Detalle / Observaciones 
                        </label>
                        <textarea
                            placeholder="Ingresa detalles sobre el uniforme (talla preferida, características especiales, etc.)"
                            rows="3"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 bg-gray-50 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            {...register("detalle", { required: "El detalle es obligatorio" })}
                        />
                        {errors.detalle && (
                            <p className="text-red-400 text-sm mt-1">{errors.detalle.message}</p>
                        )}
                    </div>

                    {/* Campo talla */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-gray-50">
                            Talla 
                        </label>
                        <select
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            {...register("talla", { required: "La talla es obligatoria" })}
                        >
                            <option value="">--- Seleccionar Talla ---</option>
                            <option value="S">S - Small</option>
                            <option value="M">M - Medium</option>
                            <option value="L">L - Large</option>
                            <option value="XL">XL - Extra Large</option>
                            <option value="XXL">XXL - Extra Extra Large</option>
                        </select>
                        {errors.talla && (
                            <p className="text-red-400 text-sm mt-1">{errors.talla.message}</p>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4 border-t border-gray-700">
                        <button 
                            type="button"
                            className="flex-1 px-6 py-3 text-center text-white rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-medium" 
                            onClick={() => toggleModal()}
                        >
                            Cancelar
                        </button>
                        
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer font-medium"
                        >
                            Registrar
                        </button>
                    </div>

                
                </form>
            </div>
        </div>
    )
}

export default ModalUniforms