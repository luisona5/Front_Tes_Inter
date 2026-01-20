import { Link } from 'react-router';
import { Mail} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify'
import { useFetch } from '../../hooks/useFetch'
import casona from '../../../public/images/casona.jpg'

export const ForgotGeneral = () => {
   

        const { register, handleSubmit, formState: { errors } } = useForm()
    const fetchDataBackend = useFetch()

    const sendMail = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`
        await fetchDataBackend(url, dataForm,'POST')
    }
        
      
    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            <ToastContainer/>

            {/* Imagen de fondo con overlay */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${casona})` }}
            >
                <div className="fixed inset-0 bg-black/50"></div>
            </div>

            {/* Contenedor principal centrado */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md">
                    {/* Card glassmorphism */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
                        
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="font-bold text-4xl text-white text-center w-full">
                                ¡Olvidaste tu contraseña!                       
                            </h1>
                        </div>

                        {/* descripción */}
                        <div className="text-center mb-4">
                            <p className="text-gray-200 text-sm sm:text-base drop-shadow-md">
                                No te preocupes
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit(sendMail)}>
                            <div className="space-y-6">
                                
                                

                                {/* Campo de correo */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-semibold text-white">
                                        Correo electrónico
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Mail size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Ingresa tu correo"
                                            className="block w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-slate-700 placeholder:text-slate-400 focus:ring-orange-500/20 focus:outline-none transition-all duration-200 bg-white hover:border-slate-400"
                                            {...register("email", { required: "El correo es obligatorio" })}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>

                                {/* Botón principal */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Enviar 
                                    </span>
                                </button>
                            </div>
                        </form>

                        {/* linea de separacion */}
                        <div className="my-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                        </div>

                        {/* Enlace para ir a la pagina principal */}
                        <div className="text-center space-y-2">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-8 py-3 underline text-amber-50 hover:text-white transition"
                            >
                                <span>Iniciar sesión</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};