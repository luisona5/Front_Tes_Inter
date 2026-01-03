import { useState } from "react";
import { Link, useLocation } from 'react-router'

export const ModalSidebar = ( ) => {
    
    const location = useLocation()
    const urlActual = location.pathname

    const [isOpen, setIsOpen] = useState(false);

    const Menu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };


    return (
        <li className="text-center relative"> 
                        <button 
                            onClick={Menu}
                            className={`
                                ${(urlActual.includes('/dashboard/create') || isOpen)
                                    ? 'text-slate-200 px-3 py-2 rounded-md block mt-2 text-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                                    : 'text-slate-600 hover:text-slate-200 hover:bg-gray-800/30' 
                                } 
                                text-xl block mt-2 w-full transition-all duration-200
                            `}
                            aria-expanded={isOpen}
                        >
                            <span className="flex items-center justify-between gap-3 px-3 py-2">
                                <span className="flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Ingreso
                                </span>
                                <svg 
                                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                                </svg>
                            </span>
                        </button>
                    
                        {isOpen && (
                                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 p-4">
                                    <ul className="space-y-2">
                                        <li>
                                            <Link 
                                                to="/dashboard/create"
                                                onClick={closeMenu} 
                                                className={`
                                                    ${urlActual === '/dashboard/create'
                                                        ? 'text-slate-200 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-inner'
                                                        : 'text-slate-400 hover:text-slate-200 hover:bg-gray-800/50'
                                                    }
                                                    block px-4 py-3 text-lg rounded-lg transition-all duration-200
                                                `}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Director
                                                </span>
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <Link 
                                                to="/dashboard/create_Estudiante"
                                                onClick={closeMenu} 
                                                className={`
                                                    ${urlActual === '/dashboard/create-Estudiante'
                                                        ? 'text-slate-200 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-inner'
                                                        : 'text-slate-400 hover:text-slate-200 hover:bg-gray-800/50'
                                                    }
                                                    block px-4 py-3 text-lg rounded-lg transition-all duration-200
                                                `}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    Estudiante
                                                </span>
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <Link 
                                                to="/dashboard/create-estudiante"
                                                onClick={closeMenu} 
                                                className={`
                                                    ${urlActual === '/dashboard/create-estudiante'
                                                        ? 'text-slate-200 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-inner'
                                                        : 'text-slate-400 hover:text-slate-200 hover:bg-gray-800/50'
                                                    }
                                                    block px-4 py-3 text-lg rounded-lg transition-all duration-200
                                                `}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                                    </svg>
                                                    Estudiante
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                            </div>
                        )}
                    </li> 
    )

}
