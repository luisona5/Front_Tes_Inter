import inflable from '../../assets/inflable.jfif'
import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router';
import { ToastContainer } from 'react-toastify'
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

const ResetGeneral = () => {
    const navigate = useNavigate()
    const { token } = useParams()
    const fetchDataBackend = useFetch()
    const [tokenback, setTokenBack] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const password = watch("password", "");
    const confirmPassword = watch("confirmpassword", "");

    // Validaciones en tiempo real
    const validations = {
        hasPassword: password.length > 0,
        hasConfirmPassword: confirmPassword.length > 0,
        match: password === confirmPassword && password.length > 0
    };

    const allValid = validations.match;

    const changePassword = async (dataForm) => {
       
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopasswordUniversal/${token}`
        await fetchDataBackend(url, dataForm, 'POST')
        setTimeout(() => {
            if (dataForm.password === dataForm.confirmpassword) {
                navigate('/')
            }
        }, 2000)
    }

    useEffect(() => {
        const verifyToken = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpasswordUniversal/${token}`
            await fetchDataBackend(url, 'GET')
            setTokenBack(true)
        }
        verifyToken()
    }, [])

    // Componente auxiliar para los indicadores
    const ValidationItem = ({ isValid, text }) => (
        <div className="flex items-center gap-2">
            <div className={`rounded-full p-0.5 ${isValid ? 'bg-green-500' : 'bg-red-500/50'}`}>
                {isValid ? (
                    <Check className="text-white" size={14} />
                ) : (
                    <X className="text-white" size={14} />
                )}
            </div>
            <span className={`text-sm ${isValid ? 'text-green-300 font-medium' : 'text-white/80'}`}>
                {text}
            </span>
        </div>
    );

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
            <ToastContainer />

            {/* Imagen de fondo */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${inflable})` }}
            >
                {/* opacar el fondo semitransparente */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Tarjeta de recuperación de contraseña */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/30">
                    {/* Título principal */}
                    <h1 className="text-4xl font-bold text-center text-white mb-2">
                        ¡Olvidaste tu contraseña!
                    </h1>

                    {tokenback && (
                        <form onSubmit={handleSubmit(changePassword)} className="space-y-5">
                            {/* Campo Nueva Contraseña */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-white">
                                    Nueva Contraseña 
                                </label>
                                <div className="relative">
                                    <input 
                                        type={ "password"}
                                        placeholder="Ingresa tu nueva contraseña" 
                                        className="block w-full rounded-xl border-2 border-white/40 bg-white/90 py-3.5 pl-4 pr-12 text-gray-800 placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                                        {...register("password", { required: "La contraseña es obligatoria",
                                            minLength: {
                                                value: 12,
                                                message: "La contraseña debe tener al menos 12 caracteres"
                                            }
                                         })}
                                    />
                                    
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-200 font-medium mt-1.5 bg-red-500/30 px-3 py-1 rounded-lg">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Campo Confirmar Contraseña */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-white">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirma tu contraseña" 
                                        className="block w-full rounded-xl border-2 border-white/40 bg-white/90 py-3.5 pl-4 pr-12 text-gray-800 placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                                        {...register("confirmpassword", {  required: "Confirma tu contraseña" })}
                                       
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>
                                {errors.confirmpassword && (
                                    <p className="text-sm text-red-200 font-medium mt-1.5 bg-red-500/30 px-3 py-1 rounded-lg">
                                        {errors.confirmpassword.message}
                                    </p>
                                )}

                                {/* Indicador de coincidencia - solo se muestra si ambos campos tienen contenido */}
                                {confirmPassword && password && (
                                    <div className="mt-2">
                                        <ValidationItem 
                                            isValid={validations.match} 
                                            text={validations.match ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"} 
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Botón Enviar */}
                            <button
                                type="submit"
                                disabled={!allValid}
                                className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform mt-8 border-2 ${
                                    allValid
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-gray-400 text-gray-200 border-gray-500 cursor-not-allowed opacity-60'
                                }`}
                            >
                                {allValid ? 'Enviar' : 'Enviar'}
                            </button>

                            {/* Link Iniciar Sesión */}
                            <div className="text-center mt-6">
                                <a 
                                    href="/" 
                                    className="text-white hover:text-white/80 font-medium underline transition-colors"
                                >
                                    Iniciar sesión
                                </a>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResetGeneral