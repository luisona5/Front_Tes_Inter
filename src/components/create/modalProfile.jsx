import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import storeAuth from '../../context/storeAuth';
import storeProfile from '../../context/storeProfile';
import { User } from 'lucide-react';


export const UserMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { clearToken } = storeAuth();
    const { user } = storeProfile();

    const salir = () => {
        clearToken();
        setIsMenuOpen(false);
        navigate('/');
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mouzsedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>

            {/* Botón  */}
            <div 
                className="group flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg hover:bg-white/25 hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center shadow-md group-hover:border-cyan-400 transition-colors duration-200">
                    <User size={20} className="text-white" />
                </div>
                <span className="text-white font-semibold group-hover:text-cyan-100 transition-colors duration-200">
                    {user?.nombre || 
                    user?.nombreDirector||
                    user?.nombreEstudiante}
                </span>
            </div>

            {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in-0 zoom-in-95">
                    
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                        <p className="text-sm text-center font-semibold text-slate-800 truncate">
                            {user?.nombre || 
                            user?.nombreDirector||
                            user?.nombreEstudiante}</p>
                        <p className="text-xs text-center text-slate-500 truncate">
                            {user?.email || 
                            user?.emailDirector||
                            user?.emailEstudiante}</p>
                    </div>
                    
                    {/* Opciones del menú */}
                    <div className="space-y-1">
                        <button 
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-all duration-150 rounded-lg mx-2"
                            onClick={() => handleNavigation('/dashboard/profile')}
                        >
                            Mi Perfil
                        </button>
                        
                        <button 
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-all duration-150 rounded-lg mx-2"
                            onClick={() => handleNavigation('/dashboard/UpdateProfile')}
                        >
                            
                            Actualizar
                        </button>
                        
                        <button 
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-all duration-150 rounded-lg mx-2"
                            onClick={() => handleNavigation('/dashboard/UpdatePassword')}
                        >
                            
                            Cambiar Contraseña
                        </button>
                    </div>
                    
                    {/* Separador */}
                    <div className="border-t border-slate-100 my-2"></div>
                    
                    {/* Cerrar sesión */}
                    <button 
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 transition-all duration-150 rounded-lg mx-2"
                        onClick={salir}
                    >
                       
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
}