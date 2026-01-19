import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Cronograma = () => {
    const [deportesInfo, setDeportesInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchDataBackend = useFetch();
    const navigate = useNavigate();

    const DeporteHome = async () => {
        try {
            setLoading(true);
            const url = `${import.meta.env.VITE_BACKEND_URL}/deportehome/disponible`;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const token = storedUser?.state?.token;

            const headers = {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            };
            
            const response = await fetchDataBackend(url, null, "GET", headers);
            if (response) {
                const data = Array.isArray(response) ? response : (response.data || []);
                setDeportesInfo(data);
            }
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => { DeporteHome(); }, []);

    const esFechaPasada = (f) => f && new Date() > new Date(f);

    const formatearMes = (f) => {
        if (!f) return "---";
        const date = new Date(f);
        return {
            mes: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            dia: date.toLocaleDateString('es-EC', { day: '2-digit' })
        };
    };

    return (
        /* Este contenedor es el que centra TODO en pantalla */
            
            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white">
                
                {/* Cabecera Centrada */}
                <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e293b] to-[#0f172a] p-10 relative flex flex-col items-center text-center">
                   
                    <h2 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                        Sports Cronograma
                    </h2>
                   
                   
                </div>
                

                {/* Lista de Disciplinas */}
                <div className="p-8 space-y-5">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3].map(n => <div key={n} className="h-20 bg-gray-100 rounded-full w-full" />)}
                        </div>
                    ) : (
                        deportesInfo.map((dep, index) => {
                            const expirado = esFechaPasada(dep.fechaFin);
                            const inicio = formatearMes(dep.fechaInicio);
                            const fin = formatearMes(dep.fechaFin);
                            
                            return (
                                <div key={index} className="flex items-center gap-0 group hover:scale-[1.01] transition-transform duration-300">
                                    {/* Bloque Izquierdo */}
                                    <div className={`flex-1 flex items-center justify-between px-6 py-4 rounded-l-full border-2 transition-all ${
                                        expirado ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-600 shadow-sm shadow-blue-50'
                                    }`}>
                                        <span className={`font-black uppercase tracking-tighter text-xl ${expirado ? 'text-gray-300' : 'text-slate-800'}`}>
                                            {dep.nombre}
                                        </span>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Fecha de inicio:</p>
                                            <p className={`text-sm font-black leading-none ${expirado ? 'text-gray-300' : 'text-slate-700'}`}>
                                                {inicio.mes} {inicio.dia}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bloque Derecho */}
                                    <div className={`flex-[1.2] flex items-center justify-between px-6 py-4 rounded-r-full border-2 border-l-0 transition-all -ml-5 ${
                                        expirado ? 'bg-gray-100/50 border-gray-200' : 'bg-red-50/20 border-red-400'
                                    }`}>
                                        <div className="text-left ml-6">
                                            <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">
                                                {expirado ? 'Fecha de cierre ' : 'Fecha de cierre:'}
                                            </p>
                                            <p className={`text-sm font-black leading-none ${expirado ? 'text-gray-300' : 'text-red-600'}`}>
                                                {fin.mes} {fin.dia}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => !expirado && navigate("/login")} // <-- Redirige solo si está activo
                                            className={`ml-4 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shadow-md ${
                                                expirado 
                                                ? 'bg-gray-300 text-white cursor-not-allowed shadow-none' 
                                                : 'bg-blue-600 text-white hover:bg-black active:scale-95 shadow-blue-200'
                                            }`}
                                        >
                                            {expirado ? 'Registrarse' : 'Registrarse >'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

               
            </div>
    );
};

export default Cronograma;