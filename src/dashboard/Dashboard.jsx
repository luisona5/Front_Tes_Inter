import { Outlet } from 'react-router' 
import storeProfile from "../context/storeProfile"
import { UserMenu } from '../components/create/modalProfile'
import DashboardEstudiante from '../pages/Estudiante/DashboardEstudiante'
import DashboardAdministrador from '../pages/Administrador/DashboardAdministrador'


const Dashboard = () => {
    

    const {user} = storeProfile()

    return (
        
        <div className='md:flex h-screen overflow-hidden'>

            <div className="bg-gray-900 p-6 overflow-y-auto"> 
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
                            <p className="text-slate-300 text-sm font-medium">{user?.status}</p>
                        </div>
                        
                        <p className="text-white text-center font-semibold text-lg mb-2">
                            {user?.nombreEstudiante|| user?.nombre || user?.nombreDirector } 
                        </p>                 
                        
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className="text-slate-400 text-sm">{user?.rol }</p>
                        </div>
                    </div>
                </div>
            
                {user && user.rol?.toLowerCase() === 'estudiante' && (
                    <DashboardEstudiante />
                )}
                {user && user.rol?.toLowerCase() === 'administrador' && (
                    <DashboardAdministrador />
                )}
                
               
            </div>

{/*---------------------------------------------------------barra superior----------------------------------- */}
            
            <div className='flex-1 flex flex-col bg-gray-50 overflow-hidden'>
                {/* Barra superior */}
                <div className="bg-gradient-to-r from-gray-900 via-blue-500 to-gray-900 py-4 px-6 flex justify-between items-center shadow-xl flex-shrink-0">
                    <div className="flex items-center gap-4"> 
                        {/* Espacio para elementos de la barra superior izquierda */}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <UserMenu />
                    </div>
                </div>
                
                {/* Contenido para mostrar el contenido de las páginas internas */}
                <div className='flex-1 overflow-y-auto p-8'>
                    <Outlet />
                </div>

{/*---------------------------------------------------------FOOTER----------------------------------- */}
                {/* Footer se queda al final automáticamente */}
                <footer className='bg-white/80 backdrop-blur-xl border-t border-gray-200/50 py-4 px-6 flex-shrink-0'>
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