import { Link, Outlet, useLocation } from 'react-router' 
import storeProfile from "../context/storeProfile"
import { UserMenu } from '../components/create/modalProfile'
import { ModalSidebar } from '../components/create/modalSidebar'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const {user} = storeProfile()

    return (
        
        <div className='md:flex md:min-h-screen'>

            <div className="min-h-screen bg-gray-900 p-6"> 
                <div className="md:w-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl px-6 py-8 border border-gray-700">
                    
                    {/* ... Contenido del logo y perfil ... */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                            POLISPORT
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-50"></div>
                        <img 
                            src="https://www.citypng.com/public/uploads/preview/png-white-football-player-with-ball-silhouette-704081694878826rmmx59uvth.png" 
                            alt="Perfil de usuario" 
                            className="relative w-full h-full p-2 bg-gray-800 border-4 border-gray-700 rounded-full object-cover shadow-xl"
                        />
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-gray-800 shadow-lg animate-pulse"></div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700/50 backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                            <p className="text-slate-300 text-sm font-medium">Activo</p>
                        </div>
                        
                        <p className="text-white text-center font-semibold text-lg mb-2">
                            {user?.nombre || user?.nombreDirector } 
                        </p>                 
                        
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className="text-slate-400 text-sm">{user?.rol }</p>
                        </div>
                    </div>
                </div>
            
                {/*Enlaces de navegación*/}
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
                            to='/dashboard/list' 
                            className={`
                                ${urlActual === '/dashboard/list' 
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
                                Registros
                            </span>
                        </Link>
                    </li>

                    <li className="text-center">
                        <ModalSidebar />
                    </li>

                    

                </ul>
            </div>

{/*---------------------------------------------------------barra superior----------------------------------- */}
            
            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-50'>
                {/* ... Contenido de la barra superior, Outlet y Footer (MANTENER IGUAL) ... */}
                <div className="bg-gradient-to-r from-gray-900 via-blue-500 to-gray-900 py-4 px-6 flex justify-between items-center shadow-xl">
                    <div className="flex items-center gap-4"> 
                        {/* Espacio para elementos de la barra superior izquierda */}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <UserMenu />
                    </div>

                </div>
                
                
                
                {/* Contenido para mostra el contenido de las páginas internas */}
                <div className='overflow-y-scroll p-8'>
                    <Outlet />
                </div>
{/*---------------------------------------------------------FOOTER----------------------------------- */}

                <footer className='bg-white/80 backdrop-blur-xl border-t border-gray-200/50 py-4 px-6'>
                    <div className='flex flex-col sm:flex-row justify-center items-center gap-3'>
                        <p className='text-sm text-gray-600 flex items-center gap-2'>
                            <span>©</span>
                            <span>2025</span>
                            <span className='font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>POLISPORT </span>
                            <span>•</span>
                            <span>Todos los derechos reservados</span>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Dashboard