export default function Panel() {

  const inputCls = "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent";

  return (


    <div className="min-h-screen bg-gray-100">


      <h1 className='font-black text-3xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>Métricas Generales</h1>
      <hr className='my-4 border-t-2 border-gradient-to-r from-cyan-500 to-blue-500' />



      {/* Resultados generales */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-100">Estudiantes Activos</p>
              <p className="text-4xl font-bold mt-2">450</p>
            </div>
            <svg className="w-12 h-12 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100">Disciplinas Deportivas</p>
              <p className="text-4xl font-bold mt-2">12</p>
            </div>
            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100">Entrenamientos Hoy</p>
              <p className="text-4xl font-bold mt-2">8</p>
            </div>
            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-100">Competencias</p>
              <p className="text-4xl font-bold mt-2">5</p>
            </div>
            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
        </div>

      </section>



      <h1 className='font-black text-3xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>Gestión de Actividades</h1>
      <hr className='my-4 border-t-2 border-gradient-to-r from-cyan-500 to-blue-500' />


      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Agendar Entrenamiento */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-cyan-500">

          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Agendar Entrenamiento</h2>
          </div>
          <hr className="mb-4 border-gray-200" />

          {/* Formulario */}
          <form className="space-y-4">

            <div>
              <label htmlFor="estudiante" className="block text-sm font-semibold text-gray-700 mb-1">Estudiante</label>
              <input 
                id="estudiante" 
                className={inputCls} 
                placeholder="Nombre completo del estudiante" 
              />
            </div>

            <div>
              <label htmlFor="disciplina" className="block text-sm font-semibold text-gray-700 mb-1">Disciplina Deportiva</label>
              <select id="disciplina" className={inputCls}>
                <option value="">Selecciona una disciplina</option>
                <option value="futbol">Fútbol</option>
                <option value="basketball">Baloncesto</option>
                <option value="voleibol">Voleibol</option>
                <option value="atletismo">Atletismo</option>
                <option value="natacion">Natación</option>
                <option value="tenis">Tenis</option>
                <option value="taekwondo">Taekwondo</option>
                <option value="gimnasia">Gimnasia</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fecha" className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                <input id="fecha" type="date" className={inputCls} />
              </div>
              <div>
                <label htmlFor="hora" className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
                <input id="hora" type="time" className={inputCls} />
              </div>
            </div>

            <div>
              <label htmlFor="entrenador" className="block text-sm font-semibold text-gray-700 mb-1">Entrenador</label>
              <input 
                id="entrenador" 
                className={inputCls} 
                placeholder="Nombre del entrenador" 
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-1">Descripción (opcional)</label>
              <textarea 
                id="descripcion" 
                className={inputCls} 
                rows="2"
                placeholder="Detalles adicionales sobre el entrenamiento..."
              />
            </div>

            <button 
              type="button" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg py-3 font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Agendar Entrenamiento
            </button>

          </form>

        </div>



        {/* Listar Entrenamientos */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Entrenamientos de Hoy</h2>
                <p className="text-sm text-gray-500">{new Date().toLocaleDateString("es-EC", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <button 
              type="button" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-2 px-6 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg font-semibold"
            >
              Actualizar
            </button>
          </div>

          <hr className="mb-4 border-gray-200" />

          <div className="space-y-4 max-h-96 overflow-y-auto">
            
            {/* Entrenamiento 1 */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border-l-4 border-cyan-500 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">09:00 AM</span>
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">Fútbol</span>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">Estudiante: Carlos Pérez</p>
                  <p className="text-sm text-gray-600 mt-1">👨‍🏫 Entrenador: Juan Martínez</p>
                  <p className="text-sm text-gray-600">📋 Entrenamiento técnico-táctico</p>
                </div>
                <button className="text-cyan-600 hover:text-cyan-800 font-semibold text-sm">
                  Ver detalles →
                </button>
              </div>
            </div>

            {/* Entrenamiento 2 */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">10:30 AM</span>
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">Natación</span>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">Estudiante: María González</p>
                  <p className="text-sm text-gray-600 mt-1">👨‍🏫 Entrenador: Ana López</p>
                  <p className="text-sm text-gray-600">📋 Técnica de estilo libre</p>
                </div>
                <button className="text-cyan-600 hover:text-cyan-800 font-semibold text-sm">
                  Ver detalles →
                </button>
              </div>
            </div>

            {/* Entrenamiento 3 */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">02:00 PM</span>
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Baloncesto</span>
                  </div>
                  <p className="font-bold text-gray-800 text-lg">Estudiante: Luis Rodríguez</p>
                  <p className="text-sm text-gray-600 mt-1">👨‍🏫 Entrenador: Pedro Sánchez</p>
                  <p className="text-sm text-gray-600">📋 Práctica de tiros libres</p>
                </div>
                <button className="text-cyan-600 hover:text-cyan-800 font-semibold text-sm">
                  Ver detalles →
                </button>
              </div>
            </div>

          </div>

        </div>
        
      </section>

    </div>
  )
}