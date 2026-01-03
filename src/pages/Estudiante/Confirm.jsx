import {Link} from 'react-router'
import {useParams} from 'react-router'
import { useEffect } from 'react'
import { ToastContainer} from 'react-toastify'
import { useFetch } from '../../hooks/useFetch'

export const Confirm = () => {

    const fetchDataBackend = useFetch()
    const { token } = useParams()
    
    const verifyToken = async()=>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/estudiante/${token}`
        await fetchDataBackend(url)
    }

    useEffect(() => {
        verifyToken()
    },[])


    return (
        
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 p-4">
        <ToastContainer />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700"></div>
        </div>
        {/* tarjeta de presentacion  */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border border-gray-200/50 animate-fade-in">
            
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-500 rounded-full p-3 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>

            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                    ¡Muchas Gracias!
                </h1>
                
                <p className="text-lg text-gray-600 font-medium">
                    Tu cuenta ha sido verificada exitosamente
                </p>

                {/* Button */}
                <Link 
                    to="/" 
                    className="inline-block mt-6 px-8 py-3 w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 hover:from-gray-800 hover:to-black"
                >
                    Iniciar Sesión
                </Link>
            </div>

            
        </div>
    </div>
    )
}