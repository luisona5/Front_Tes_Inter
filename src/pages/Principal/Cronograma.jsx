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
            const url = `${import.meta.env.VITE_BACKEND_URL}/deportes/disponibles`;
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
        } catch (error) { 
            console.error(error); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { 
        DeporteHome(); 
    }, []);

    // Obtener fecha actual en zona horaria de Ecuador
    const obtenerFechaEcuador = () => {
        const opciones = { 
            timeZone: 'America/Guayaquil', 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            hour12: false 
        };
        const formatter = new Intl.DateTimeFormat('en-US', opciones);
        const partes = formatter.formatToParts(new Date());
        
        const d = {};
        partes.forEach(({ type, value }) => d[type] = value);
        
        return new Date(d.year, d.month - 1, d.day, d.hour, d.minute, d.second);
    };

    // Verificar si la fecha ya pasó (comparando con zona horaria Ecuador)
    const esFechaPasada = (fechaFinStr, horaFinStr) => {
        if (!fechaFinStr) return false;
        
        try {
            // Obtener fecha actual de Ecuador
            const ahoraEcuador = obtenerFechaEcuador();
            
            // Parsear la fecha que viene del backend (formato YYYY-MM-DD)
            const fechaParts = fechaFinStr.split('T')[0].split('-');
            const [year, month, day] = fechaParts.map(Number);
            
            // Crear fecha en zona horaria de Ecuador
            const fechaFin = new Date(year, month - 1, day);
            
            // Si tenemos hora de fin, la usamos
            if (horaFinStr) {
                const [hora, minutos] = horaFinStr.split(':').map(Number);
                fechaFin.setHours(hora, minutos, 59, 999);
            } else {
                // Si no hay hora, asumimos final del día
                fechaFin.setHours(23, 59, 59, 999);
            }
            
            console.log('Ahora Ecuador:', ahoraEcuador);
            console.log('Fecha Fin:', fechaFin);
            console.log('¿Expirado?:', ahoraEcuador > fechaFin);
            
            // Comparar fechas
            return ahoraEcuador > fechaFin;
        } catch (error) {
            console.error('Error al verificar fecha:', error);
            return false;
        }
    };

    const formatearMes = (f) => {
        if (!f) return { mes: "---", dia: "--" };
        try {
            const date = new Date(f);
            return {
                mes: date.toLocaleDateString('es-EC', { month: 'long' }).toUpperCase(),
                dia: date.toLocaleDateString('es-EC', { day: '2-digit' })
            };
        } catch (error) {
            return { mes: "---", dia: "--" };
        }
    };

    return (
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
                ) : deportesInfo.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-400 font-semibold">No hay deportes disponibles</p>
                    </div>
                ) : (
                    deportesInfo.map((dep, index) => {
                        const expirado = esFechaPasada(dep.fechaFin, dep.horaFin);
                        const inicio = formatearMes(dep.fechaInicio);
                        const fin = formatearMes(dep.fechaFin);
                        
                        return (
                            <div key={dep._id || index} className="flex items-center gap-0 group hover:scale-[1.01] transition-transform duration-300">
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
                                            Fecha de cierre:
                                        </p>
                                        <p className={`text-sm font-black leading-none ${expirado ? 'text-gray-300' : 'text-red-600'}`}>
                                            {fin.mes} {fin.dia}
                                        </p>
                                        {dep.horaFin && (
                                            <p className={`text-[10px] font-semibold mt-0.5 ${expirado ? 'text-gray-300' : 'text-red-500'}`}>
                                                {dep.horaFin}
                                            </p>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => !expirado && navigate("/login")}
                                        disabled={expirado}
                                        className={`ml-4 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shadow-md ${
                                            expirado 
                                            ? 'bg-gray-300 text-white cursor-not-allowed shadow-none' 
                                            : 'bg-blue-600 text-white hover:bg-black active:scale-95 shadow-blue-200'
                                        }`}
                                    >
                                        {expirado ? 'Cerrado' : 'Registrarse >'}
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