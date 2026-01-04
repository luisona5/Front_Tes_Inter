import { Link } from 'react-router';

export const NotFound = () => {
  
   return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-4 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-2xl w-full text-center">
            
            <div className="space-y-4">
                
                <div className="flex items-center justify-center gap-6">
                    <div className="relative">
                        <svg className="relative w-20 h-40 text-cyan-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-8xl md:text-9xl font-bold text-slate-800 tracking-wider">
                        404
                    </h1>
                    
                </div>
            </div>

            {/* 2. Imagen */}
            <div className="w-full max-w-md">
                <img 
                    src="/images/deporte1.png" 
                    alt="Deporte" 
                    className="w-full h-auto object-cover rounded-2xl shadow-xl"
                />
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                    Página no encontrada
                </h2>
                
                <p className="text-lg text-slate-600 max-w-md">
                    El recurso que buscas no se encuentra disponible.
                </p>
            </div>

            <div className="pt-4">
                <Link 
                    to="/" 
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al inicio
                </Link>
            </div>
        </div>
    </div>
);
};