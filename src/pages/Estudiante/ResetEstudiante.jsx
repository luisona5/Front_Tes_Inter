import inflable from '../../assets/inflable.jfif'
import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify'
import { Eye, EyeOff, Key, Lock, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

const ResetEstudiante = () => {
    const navigate = useNavigate()
    const { token } = useParams()
    const fetchDataBackend = useFetch()
    const [tokenback, setTokenBack] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const password = watch("password", "");
    const confirmPassword = watch("confirmpassword", "");

    // Validaciones en tiempo real
    const validations = {
        length: password.length >= 8,
        minuscula: /[a-z]/.test(password),
        mayuscula: /[A-Z]/.test(password),
        numero: /\d/.test(password),
        special: /[@$!%*?&]/.test(password),
        match: password && confirmPassword && password === confirmPassword
    };

    const allValid = Object.values(validations).every(Boolean);

    const changePassword = async (dataForm) => {
        if (!allValid) {
            toast.error("Por favor, cumple con todos los requisitos de contraseña");
            return;
        }

        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopasswordEstudiante/${token}`
        await fetchDataBackend(url, dataForm, 'POST')
        setTimeout(() => {
            if (dataForm.password === dataForm.confirmpassword) {
                navigate('/')
            }
        }, 2000)
    }

    useEffect(() => {
        const verifyToken = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpasswordEstudiante/${token}`
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
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <Lock size={20} className="text-gray-500" />
                                    </div>
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Ingresa tu nueva contraseña" 
                                        className="block w-full rounded-xl border-2 border-white/40 bg-white/90 py-3.5 pl-12 pr-12 text-gray-800 placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                                        {...register("password", { required: "La contraseña es obligatoria"})}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
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
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <Key size={20} className="text-gray-500" />
                                    </div>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirma tu contraseña" 
                                        className="block w-full rounded-xl border-2 border-white/40 bg-white/90 py-3.5 pl-12 pr-12 text-gray-800 placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 backdrop-blur-sm"
                                        {...register("confirmpassword", { 
                                            required: "Confirma tu contraseña"
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmpassword && (
                                    <p className="text-sm text-red-200 font-medium mt-1.5 bg-red-500/30 px-3 py-1 rounded-lg">
                                        {errors.confirmpassword.message}
                                    </p>
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

                            {/* Indicadores de validación */}
                            {password && (
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-2 border border-white/20">
                                    <p className="text-sm font-semibold text-white mb-3">
                                        La contraseña debe contener:
                                    </p>
                                    
                                    <ValidationItem 
                                        isValid={validations.length} 
                                        text="Mínimo 8 caracteres" 
                                    />
                                    <ValidationItem 
                                        isValid={validations.minuscula} 
                                        text="Minúscula (a-z)" 
                                    />
                                    <ValidationItem 
                                        isValid={validations.mayuscula} 
                                        text="Mayúscula (A-Z)" 
                                    />
                                    <ValidationItem 
                                        isValid={validations.numero} 
                                        text="Número (0-9)" 
                                    />
                                    <ValidationItem 
                                        isValid={validations.special} 
                                        text="Carácter especial (@$!%*?&)" 
                                    />
                                </div>
                            )}


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

export default ResetEstudiante