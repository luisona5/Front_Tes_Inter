import { Link, useLocation } from 'react-router' 

const VistaEstudiante = () => {
    const location = useLocation()
    const urlActual = location.pathname


    return (
        
        <div className='md:flex md:min-h-screen'>

            <div className="min-h-screen bg-gray-900 p-6"> 
                <ul className="mt-5">

                    {/* Enlaces individuales (MANTENER IGUAL) */}
                    <li className="text-center">
                        <Link 
                            to='/dashboard' 
                            className={`
                                ${urlActual === '/dashboard' 
                                    ? 'text-slate-200 px-3 py-2 rounded-md block mt-2 text-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                                    : 'text-slate-600 hover:text-slate-200 hover:bg-gray-800/30' 
                                } 
                                text-xl block mt-2 w-full transition-all duration-200
                            `}
                        >
                            <span className="flex items-center justify-start gap-3 px-3 py-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                Panel de control
                            </span>
                        </Link>
                    </li>
                     <li className="text-center">
                        <Link 
                            to='/dashboard/inscripciones/nuevodeporte' 
                            className={`
                                ${urlActual === '/dashboard/inscripciones/nuevodeporte' 
                                    ? 'text-slate-200 px-3 py-2 rounded-md block mt-2 text-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                                    : 'text-slate-600 hover:text-slate-200 hover:bg-gray-800/30' 
                                } 
                                text-xl block mt-2 w-full transition-all duration-200
                            `}
                        >
                            <span className="flex items-center justify-start gap-3 px-3 py-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                Inscripción
                            </span>
                        </Link>
                    </li>
                    
                    {/*Uniforme */}
                    <li className="text-center">
                        <Link 
                            to='/dashboard/Uniforme/informacion-completa/detalle-para-pago' 
                            className={`
                                ${urlActual === '/dashboard/Uniforme/informacion-completa/detalle-para-pago' 
                                    ? 'text-slate-200 px-3 py-2 rounded-md block mt-2 text-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                                    : 'text-slate-600 hover:text-slate-200 hover:bg-gray-800/30' 
                                } 
                                text-xl block mt-2 w-full transition-all duration-200
                            `}
                        >
                            <span className="flex items-center justify-start gap-3 px-3 py-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                Uniforme
                            </span>
                        </Link>
                    </li>


                    {/*Visualizar */}
                    <li className="text-center">
                        <Link 
                            to='/dashboard/estudiante/inscripcionesGenerales' 
                            className={`
                                ${urlActual === '/dashboard/estudiante/inscripcionesGenerales' 
                                    ? 'text-slate-200 px-3 py-2 rounded-md block mt-2 text-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                                    : 'text-slate-600 hover:text-slate-200 hover:bg-gray-800/30' 
                                } 
                                text-xl block mt-2 w-full transition-all duration-200
                            `}
                        >
                            <span className="flex items-center justify-start gap-3 px-3 py-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                Mis Inscripciones
                            </span>
                        </Link>
                    </li>
                   


                </ul>
            </div>
        </div>  
    )
}

export default VistaEstudiante;