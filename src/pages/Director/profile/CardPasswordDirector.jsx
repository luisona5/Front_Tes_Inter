import { Lock, Key, Eye, EyeOff } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { useForm } from "react-hook-form"
import storeProfile from "../../../context/storeProfile"
import storeAuth from "../../../context/storeAuth"
import { useState } from 'react';


const CardPasswordDirector = () => {

    const { register, handleSubmit, formState: { errors } = {} } = useForm()
    const {user, updatePasswordProfile} = storeProfile()
    const { clearToken } = storeAuth()
    const [showNewPassword, setShowNewPassword] = useState(false);

    const updatePassword = async (dataForm) => {
        // para que se muestre el aviso en la pantalla de windows
        //const confirmupdate = confirm("Advertencia: Esta acción cerrará sesión se manera automática. ¿Deseas continuar?");
        
       /* if (!confirmupdate) {
            return;
        }
        */
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarpasswordDirector/${user._id}`
        const response = await updatePasswordProfile(url, dataForm)
        if(response){

            setTimeout(() => {
                    clearToken();
                }, 3000);
            
        }
    }

    return (
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 max-w-md w-full 
                        hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 mx-auto">
            <ToastContainer />
            <form onSubmit={handleSubmit(updatePassword)}>

                {/* Campo contraseña actual */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Contraseña actual
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Key size={18} className="text-slate-400" />
                        </div>
                        <input 
                            type="password"
                            placeholder="Ingresa tu contraseña actual" 
                            className="block w-full rounded-xl border border-slate-300 py-3 pl-10 pr-12 text-slate-700 placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-200 bg-white hover:border-slate-400"
                            {...register("passwordactual", { required: "La contraseña actual es obligatoria" })}
                        />
                    </div>
                    {errors.passwordactual && <p className="text-sm text-red-600 font-medium mt-1">{errors.passwordactual.message}</p>}
                </div>

                {/* Campo contraseña nueva */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Nueva contraseña
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock size={18} className="text-slate-400" />
                        </div>
                        <input 
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Ingresa la nueva contraseña" 
                            className="block w-full rounded-xl border border-slate-300 py-3 pl-10 pr-12 text-slate-700 placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-200 bg-white hover:border-slate-400"
                            {...register("passwordnuevo", { 
                                required: "La nueva contraseña es obligatoria",
                                minLength: { value: 8, message: "Debe tener al menos 8 caracteres" }
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.passwordnuevo && <p className="text-sm text-red-600 font-medium mt-1">{errors.passwordnuevo.message}</p>}
                </div>

                {/* Divisor decorativo */}
                <div className="mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                </div>

                {/* Botón para actualizar la contraseña */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
                >
                    Cambiar
                </button>

            </form>
        </div>
    );
};

export default CardPasswordDirector;