import { useState, useEffect } from "react";

const PanelDirector = () => {
    const [deportesInfo, setDeportesInfo] = useState([]);
    const [estadisticas, setEstadisticas] = useState(null);
    const [loadingDeportes, setLoadingDeportes] = useState(false);
    const [loadingEstadisticas, setLoadingEstadisticas] = useState(false);
    const [activeTab, setActiveTab] = useState('estadisticas');
    const [error, setError] = useState(null);

    const fetchDeportes = async () => {
        try {
            setLoadingDeportes(true);
            setError(null);
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/deportes/disponibles`;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const token = storedUser?.state?.token;

            const headers = {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            };
            
            console.log('📤 Obteniendo deportes desde:', url);
            const response = await fetch(url, { headers });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('✅ Deportes recibidos:', data);
            setDeportesInfo(Array.isArray(data) ? data : (data.data || []));
        } catch (error) { 
            console.error('❌ Error obteniendo deportes:', error); 
            setError('Error al cargar deportes: ' + error.message);
        } finally { 
            setLoadingDeportes(false); 
        }
    };

    const fetchEstadisticas = async () => {
        try {
            setLoadingEstadisticas(true);
            setError(null);
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/director`;
            
            
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            
            if (!storedUser) {
                throw new Error('No hay usuario autenticado');
            }
            
            const token = storedUser?.state?.token;
            
            if (!token) {
                throw new Error('Token no disponible');
            }


            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            
            console.log('📤 Enviando petición...');
            const response = await fetch(url, { headers });
            
            console.log('📥 Respuesta recibida:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });
            
            
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error del servidor:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('📈 Estadísticas recibidas:', data);
            setEstadisticas(data);
        } catch (error) { 
            console.error('❌ Error obteniendo estadísticas:', error); 
            setError(error.message);
        } finally { 
            setLoadingEstadisticas(false); 
        }
    };

    useEffect(() => { 
        fetchDeportes();
        fetchEstadisticas();
    }, []);

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
            
            return ahoraEcuador > fechaFinEcuador;
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

    const calcularCuposDisponibles = (cuposTotales, cuposOcupados) => {
        const disponibles = (cuposTotales || 0) - (cuposOcupados || 0);
        return disponibles >= 0 ? disponibles : 0;
    };

    // Función para recargar estadísticas
    const handleRecargarEstadisticas = () => {
        fetchEstadisticas();
    };

    

    // Función para formatear números
    const formatNumber = (num) => {
        if (num === undefined || num === null) return '0';
        return num.toLocaleString('es-EC');
    };

    // Función para calcular porcentaje seguro
    const calcularPorcentaje = (parcial, total) => {
        if (!total || total === 0) return 0;
        return Math.round((parcial / total) * 100);
    };

    return (
        <div className="w-full p-4 md:p-6">
            {/* Cabecera */}
            <div className="bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 p-8 relative rounded-2xl mb-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent rounded-2xl"></div>
                <div className="relative text-center">
                    <h1 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-blue-200 text-base font-medium">
                        Gestión completa del sistema deportivo
                    </p>
                    
                </div>
            </div>

            {/* Botones de recarga */}
            <div className="flex justify-end mb-4 gap-2">
               
                <button
                    onClick={handleRecargarEstadisticas}
                    disabled={loadingEstadisticas}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                    {loadingEstadisticas ? (
                        <>
                            <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Cargando...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Actualizar Estadísticas
                        </>
                    )}
                </button>
            </div>

            {/* Mostrar error si existe */}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                    <button
                        onClick={() => {
                            setError(null);
                            fetchEstadisticas();
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* Pestañas */}
            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('estadisticas')}
                        className={`px-6 py-3 font-medium text-sm ${
                            activeTab === 'estadisticas'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        📊 Estadísticas Generales
                    </button>
                    <button
                        onClick={() => setActiveTab('deportes')}
                        className={`px-6 py-3 font-medium text-sm ${
                            activeTab === 'deportes'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        ⚽ Gestión de Deportes
                    </button>
                </div>
            </div>

            {activeTab === 'estadisticas' ? (
                /* CONTENIDO DE ESTADÍSTICAS */
                loadingEstadisticas ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
                    </div>
                ) : estadisticas ? (
                    <div className="space-y-6">
                        {/* Tarjetas de resumen */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Tarjeta Estudiantes */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">ESTUDIANTES</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {formatNumber(estadisticas.estudiantes?.total || 0)}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 3.943a8.25 8.25 0 00-13.668-4.486" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">✓ Activos: {formatNumber(estadisticas.estudiantes?.activos || 0)}</span>
                                        <span className="font-bold text-gray-900">
                                            {estadisticas.estudiantes?.porcentajeActivos || calcularPorcentaje(estadisticas.estudiantes?.activos || 0, estadisticas.estudiantes?.total || 0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-600 font-medium">✗ Inactivos: {formatNumber(estadisticas.estudiantes?.inactivos || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            

                            {/* Tarjeta Deportes */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">DEPORTES</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {formatNumber(estadisticas.deportes?.total || 0)}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">✓ Activos: {formatNumber(estadisticas.deportes?.activos || 0)}</span>
                                        <span className="font-bold text-gray-900">
                                            {estadisticas.deportes?.porcentajeActivos || calcularPorcentaje(estadisticas.deportes?.activos || 0, estadisticas.deportes?.total || 0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-600 font-medium">✗ Inactivos: {formatNumber(estadisticas.deportes?.inactivos || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta Inscripciones */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">INSCRIPCIONES</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {formatNumber(estadisticas.inscripciones?.total || 0)}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">✓ Aprobadas: {formatNumber(estadisticas.inscripciones?.aprobadas || 0)}</span>
                                        <span className="font-bold text-gray-900">
                                            {calcularPorcentaje(estadisticas.inscripciones?.aprobadas || 0, estadisticas.inscripciones?.total || 0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-yellow-600 font-medium">⏳ Pendientes: {formatNumber(estadisticas.inscripciones?.pendientes || 0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-600 font-medium">✗ Rechazadas: {formatNumber(estadisticas.inscripciones?.rechazadas || 0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Segunda fila de tarjetas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Tarjeta Categorías */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">CATEGORÍAS</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {formatNumber(estadisticas.categorias?.total || 0)}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-indigo-100 rounded-lg">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">✓ Activas: {formatNumber(estadisticas.categorias?.activas || 0)}</span>
                                        <span className="font-bold text-gray-900">
                                            {calcularPorcentaje(estadisticas.categorias?.activas || 0, estadisticas.categorias?.total || 0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-600 font-medium">✗ Inactivas: {formatNumber(estadisticas.categorias?.inactivas || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta Cupos */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">CUPOS TOTALES</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {formatNumber(estadisticas.cupos?.total || 0)}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-teal-100 rounded-lg">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-blue-600 font-medium">🏆 Ocupados: {formatNumber(estadisticas.cupos?.ocupados || 0)}</span>
                                        <span className="font-bold text-gray-900">
                                            {estadisticas.cupos?.porcentajeOcupacion || calcularPorcentaje(estadisticas.cupos?.ocupados || 0, estadisticas.cupos?.total || 0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">✅ Disponibles: {formatNumber(estadisticas.cupos?.disponibles || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-semibold text-lg">No hay estadísticas disponibles</p>
                        <p className="text-gray-400 text-sm mt-1">Intenta cargar las estadísticas nuevamente</p>
                        <button
                            onClick={fetchEstadisticas}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Cargar Estadísticas
                        </button>
                    </div>
                )
            ) : (
                /* CONTENIDO DE DEPORTES */
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {loadingDeportes ? (
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
                            <button
                                onClick={fetchDeportes}
                                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Recargar Deportes
                            </button>
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
            )}
        </div>
    );
};

export default PanelDirector;