import { Link, useLocation } from 'react-router' 

const DashboardAdministrador = () => {
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
                                
                                Panel de control
                            </span>
                        </Link>
                    </li>
                    
                    

                    <span className="flex items-center justify-start  px-3 py-2 text-xl  mt-2 w-full  text-red-500 gap-2 font-bold">
                    
                                Usuarios
                            </span>  
                    {/*Visualizar */}
                    <li className="text-center">
                        <Link 
                            to='/dashboard/inscripciones/visualizar/directores' 
                            className={`
                                ${urlActual === '/dashboard/inscripciones/visualizar/directores' 
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
                                Directores
                            </span>
                        </Link>
                    </li>
                    {/*Visualizar */}
                    <li className="text-center">
                        <Link 
                            to='/dashboard/inscripciones/visualizar/estudiantes' 
                            className={`
                                ${urlActual === '/dashboard/inscripciones/visualizar/estudiantes' 
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
                                Estudiantes
                            </span>
                        </Link>
                    </li>

                    
                </ul>
                </div>
        </div>  
    )
}

export default DashboardAdministrador;