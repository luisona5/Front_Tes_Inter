import { useState, useEffect } from 'react';
import {  Loader2, User, Mail, Phone, MapPin, Activity, Heart } from 'lucide-react';
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { useFetch } from "../../hooks/useFetch";

const InscripcionDeportiva = () => {
  const [deportes, setDeportes] = useState([]);
  const [loadingDeportes, setLoadingDeportes] = useState(true);
  const fetchDataBackend = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();
      
  const inscripcion = async (dataForm) => {
   
    
    const url = `${import.meta.env.VITE_BACKEND_URL}/registro/estudiante/Incripcion`;
    
    try {
      // Opción 1: Si el estudiante está logueado, usa useFetch (con token)
      const token = localStorage.getItem('token'); // o sessionStorage, según tu implementación
      
      if (token) {
        // Usuario autenticado - usa useFetch
        const response = await fetchDataBackend(url, dataForm, "POST");
        console.log("✅ Respuesta del servidor:", response);
        
        if (response && response.msg) {
          alert("✅ " + response.msg);
          window.location.reload();
        } else if (response && !response.error) {
          alert("✅ ¡Inscripción realizada con éxito!");
          window.location.reload();
        }
      } else {
        // Usuario NO autenticado - usa fetch directo
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm)
        });

        const data = await response.json();
        console.log("✅ Respuesta del servidor:", data);
        
        if (response.ok) {
          alert("✅ " + (data.msg || "¡Inscripción realizada con éxito!"));
          window.location.reload();
        } else {
          alert("⚠️ " + (data.msg || "Error en la inscripción"));
        }
      }
    } catch (error) {
      console.error("❌ Error en inscripción:", error);
      alert("❌ Error: " + (error.message || "No se pudo completar la inscripción"));
    }
  };

  const cargarDeportes = async () => {
    try {
      setLoadingDeportes(true);
      const url = `${import.meta.env.VITE_BACKEND_URL}/deportes/disponibles`;
      
      // Usa fetch directo para GET público (sin autenticación)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Deportes recibidos:", data);
        
        // Maneja diferentes estructuras de respuesta del backend
        if (data.data) {
          setDeportes(data.data);
        } else if (Array.isArray(data)) {
          setDeportes(data);
        } else {
          console.error("Formato de respuesta inesperado:", data);
        }
      } else {
        console.error("Error en la respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error cargando deportes:", error);
    } finally {
      setLoadingDeportes(false);
    }
  };

  useEffect(() => {
    cargarDeportes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Formulario de Inscripción 
            </h1>
            <p className="text-gray-600">ESFOT</p>
          </div>

          <form onSubmit={handleSubmit(inscripcion)} className="space-y-6">
            {/* Datos Personales */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                Datos Personales
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Campo cédula */}
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Cédula</label>
                  <input 
                    type="text" 
                    placeholder="Ingresa tu cédula" 
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                    {...register("cedula", { required: "La cédula es obligatoria"})}
                  />
                  {errors.cedula && <p className="text-red-600 text-sm mt-1">{errors.cedula.message}</p>}
                </div>

                {/* Campo celular */}
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Celular</label>
                  <input 
                    type="tel" 
                    placeholder="Ingresa tu celular" 
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                    {...register("telefono", { required: "El celular es obligatorio"})}
                  />
                  {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Campo nombre */}
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Ingresa tu nombre" 
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                  />
                  {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                </div>

                {/* Campo apellido */}
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">
            
                    Apellido</label>
                  <input 
                    type="text" 
                    placeholder="Ingresa tu apellido" 
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                    {...register("apellido", { required: "El apellido es obligatorio" })}
                  />
                  {errors.apellido && <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>}
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold">
                  <Mail className="w-5 h-5 inline mr-1" />
                    Correo electrónico</label>
                <input 
                  type="email" 
                  placeholder="Ingresa tu correo electrónico" 
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500" 
                  {...register("email", { required: "El correo electrónico es obligatorio"})}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Campo dirección */}
              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold">
                  <MapPin className="w-5 h-5 inline mr-1" />
                  Dirección
                </label>
                <input 
                  type="text" 
                  placeholder="Ingresa tu dirección de domicilio" 
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-500"
                  {...register("direccion", { required: "La dirección es obligatoria" })}
                />
                {errors.direccion && <p className="text-red-600 text-sm mt-1">{errors.direccion.message}</p>}
              </div>
            </div>

            {/* Información Deportiva */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Información Deportiva
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deporte *
                </label>
                {loadingDeportes ? (
                  <div className="flex items-center gap-2 text-gray-500 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cargando deportes disponibles...
                  </div>
                ) : deportes.length === 0 ? (
                  <div className="p-3 border border-yellow-300 rounded-lg bg-yellow-50 text-yellow-800 text-sm">
                    ⚠️ No hay deportes disponibles. Contacta al administrador.
                  </div>
                ) : (
                  <>
                    <select
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 font-medium bg-white cursor-pointer hover:border-indigo-400 transition-colors ${
                        errors.deporte ? 'border-red-500' : 'border-gray-300'
                      }`}
                      defaultValue=""
                      {...register("deporte", { required: "Debes seleccionar un deporte" })}
                    >
                      <option value="" disabled className="text-gray-500">
                        -- Seleccione un deporte --
                      </option>
                      {deportes.map(deporte => (
                        <option 
                          key={deporte._id} 
                          value={deporte._id}
                          className="text-gray-900 font-medium py-2"
                        >
                          {deporte.nombreDeporte}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      {deportes.length} deporte(s) disponible(s) para inscripción
                    </p>
                  </>
                )}
                {errors.deporte && (
                  <p className="text-red-500 text-sm mt-1 font-medium">⚠️ {errors.deporte.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Heart className="w-4 h-4 inline mr-1" />
                  Información Médica 
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Alergias, condiciones médicas, medicamentos..."
                  {...register("informacionMedica")}
                />
              </div>
            </div>

            {/* Contacto de Emergencia */}
            <div className="space-y-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contacto de Emergencia
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.contactoEmergencia?.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="María García"
                  {...register("contactoEmergencia.nombre", { required: "El nombre del contacto es obligatorio" })}
                />
                {errors.contactoEmergencia?.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactoEmergencia.nombre.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="text"
                    maxLength="10"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.contactoEmergencia?.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0987654321"
                    {...register("contactoEmergencia.telefono", { required: "El teléfono del contacto es obligatorio" })}
                  />
                  {errors.contactoEmergencia?.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactoEmergencia.telefono.message}</p>
                  )}
                </div>

                {/* Campo relacion */}
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Relación</label>
                  <select
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                    {...register("contactoEmergencia.relacion", { required: "La relación es obligatoria" })}
                  >
                    <option value="">----Selecciona ----</option>
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Tío/a">Tío/a</option>
                    <option value="Abuelo/a">Abuelo/a</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errors.contactoEmergencia?.relacion && (
                    <p className="text-red-600 text-sm mt-1">{errors.contactoEmergencia.relacion.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botón Register */}
            <div className="mb-3">
              <button 
                type="submit"
                className="bg-gray-500 text-white font-semibold border py-2.5 w-full rounded-xl mt-5 
                hover:scale-105 duration-300 hover:bg-gray-900"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};    

export default InscripcionDeportiva;