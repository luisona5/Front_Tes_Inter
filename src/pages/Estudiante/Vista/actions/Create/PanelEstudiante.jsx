import { useState, useEffect } from "react";

const PanelEstudiante = () => {
    const [deportesInfo, setDeportesInfo] = useState([]);
    const [loading, setLoading] = useState(false);

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
            
            const response = await fetch(url, { headers });
            const data = await response.json();
            setDeportesInfo(Array.isArray(data) ? data : (data.data || []));
        } catch (error) { 
            console.error(error); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { 
        DeporteHome(); 
    }, []);

   ;

    const esFechaPasada = (fechaFinStr, horaFinStr) => {
        if (!fechaFinStr) return false;
        
        try {
            const ahora = new Date();
            const ahoraEcuadorStr = ahora.toLocaleString('en-US', { timeZone: 'America/Guayaquil' });
            const ahoraEcuador = new Date(ahoraEcuadorStr);
            
            let fechaBase;
            if (fechaFinStr.includes('T')) {
                fechaBase = new Date(fechaFinStr);
            } else {
                const [year, month, day] = fechaFinStr.split('-').map(Number);
                fechaBase = new Date(year, month - 1, day);
            }
            
            const fechaEcuadorStr = fechaBase.toLocaleString('en-US', { timeZone: 'America/Guayaquil' });
            let fechaFinEcuador = new Date(fechaEcuadorStr);
            
            if (horaFinStr) {
                const [hora, minutos] = horaFinStr.split(':').map(Number);
                fechaFinEcuador.setHours(hora, minutos, 0, 0);
            } else {
                fechaFinEcuador.setHours(23, 59, 59, 999);
            }
            
            const esPasada = ahoraEcuador > fechaFinEcuador;
            
            console.log('Verificación de fecha:', {
                ahoraEcuador: ahoraEcuador.toLocaleString('es-EC'),
                fechaFinEcuador: fechaFinEcuador.toLocaleString('es-EC'),
                horaFin: horaFinStr || 'Fin del día (23:59)',
                esPasada: esPasada
            });
           
            return esPasada;
        } catch (error) {
            console.error('Error al verificar fecha:', error, fechaFinStr, horaFinStr);
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

    const calcularCuposDisponibles = (cuposTotales, cuposOcupados) => {
        const disponibles = (cuposTotales || 0) - (cuposOcupados || 0);
        return disponibles >= 0 ? disponibles : 0;
    };

    return (
        <div className="w-full">
            
            {/* Cabecera */}
            <div className="bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 p-8 relative rounded-2xl mb-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent rounded-2xl"></div>
                <div className="relative text-center">
                    <h1 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                        Disciplinas Deportivas
                    </h1>
                    <p className="text-blue-200 text-base font-medium">
                        Inscripciones y cupos disponibles
                    </p>
                </div>
            </div>

            {/* Contenido - Tabla */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-4 animate-pulse">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="h-20 bg-gray-100 rounded w-full" />
                        ))}
                    </div>
                ) : deportesInfo.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-semibold text-lg">No hay deportes disponibles</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Disciplina</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Inicio</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Cierre</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Cupos</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {deportesInfo.map((dep, index) => {
                                    const expirado = esFechaPasada(dep.fechaFin, dep.horaFin);
                                    const inicio = formatearMes(dep.fechaInicio);
                                    const fin = formatearMes(dep.fechaFin);
                                    const cuposDisponibles = calcularCuposDisponibles(dep.cupo, dep.cuposOcupados);
                                    const porcentajeOcupado = dep.cupo ? ((dep.cuposOcupados || 0) / dep.cupo) * 100 : 0;
                                    
                                    return (
                                        <tr 
                                            key={dep._id || index}
                                            className={`${
                                                expirado 
                                                ? 'bg-gray-50' 
                                                : 'bg-white hover:bg-blue-50/30'
                                            } transition-colors duration-150`}
                                        >
                                            {/* Disciplina */}
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className={`text-lg font-bold ${expirado ? 'text-gray-400' : 'text-slate-800'}`}>
                                                        {dep.nombre}
                                                    </p>
                                                    {dep.descripcion && (
                                                        <p className={`text-xs mt-1 ${expirado ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            {dep.descripcion}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Fecha Inicio */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <p className={`text-base font-bold ${expirado ? 'text-gray-400' : 'text-blue-600'}`}>
                                                        {inicio.dia}
                                                    </p>
                                                    <p className={`text-xs font-semibold ${expirado ? 'text-gray-400' : 'text-blue-500'}`}>
                                                        {inicio.mes}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Fecha Cierre */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <p className={`text-base font-bold ${expirado ? 'text-gray-400' : 'text-red-600'}`}>
                                                        {fin.dia}
                                                    </p>
                                                    <p className={`text-xs font-semibold ${expirado ? 'text-gray-400' : 'text-red-500'}`}>
                                                        {fin.mes}
                                                    </p>
                                                    {dep.horaFin && (
                                                        <p className={`text-xs mt-1 ${expirado ? 'text-gray-400' : 'text-red-500'}`}>
                                                            {dep.horaFin}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Cupos */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <p className={`text-lg font-bold ${expirado ? 'text-gray-400' : 'text-green-600'}`}>
                                                        {cuposDisponibles} / {dep.cupo || 0}
                                                    </p>
                                                    <p className={`text-xs ${expirado ? 'text-gray-400' : 'text-green-500'}`}>
                                                        disponibles
                                                    </p>
                                                    {/* Barra de progreso */}
                                                    {!expirado && dep.cupo && (
                                                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                                                            <div 
                                                                className={`h-full rounded-full transition-all duration-300 ${
                                                                    porcentajeOcupado >= 90 ? 'bg-red-500' :
                                                                    porcentajeOcupado >= 70 ? 'bg-orange-500' :
                                                                    'bg-green-500'
                                                                }`}
                                                                style={{ width: `${porcentajeOcupado}%` }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Estado */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase ${
                                                    expirado 
                                                    ? 'bg-red-200 text-red-800' 
                                                    : cuposDisponibles === 0 
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {expirado ? 'Inscripción Finalizada' : cuposDisponibles === 0 ? 'Cupos Llenos' : 'Abierto'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PanelEstudiante;