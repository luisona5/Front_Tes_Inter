import { Link, useNavigate } from "react-router"; 
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import storeAuth from "../../context/storeAuth";

const Login = () => { 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();
  const { setToken, setRol } = storeAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (dataForm) => {
    setIsLoading(true);
    const endpoints = {
      administrador: `${import.meta.env.VITE_BACKEND_URL}/administrador/login`,
      director: `${import.meta.env.VITE_BACKEND_URL}/directordeEvento/login`,
      estudiante: `${import.meta.env.VITE_BACKEND_URL}/estudiante/login`
    };
    
    const url = endpoints[dataForm.rol];
    
    const response = await fetchDataBackend(url, dataForm, "POST");
    
    if (response) {
      setToken(response.token);
      setRol(response.rol);
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Panel Izquierdo - Imagen */}
        <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800">
          <div 
            className="absolute inset-0 bg-[url('/src/assets/futbol.jpg')] bg-cover bg-center opacity-30"
          ></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
              </div>
              
              <h1 className="text-4xl font-bold mb-3">POLISPORT</h1>
           
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                  <p className="text-sm">Gestión de inscripciones</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                  <p className="text-sm">Control de eventos deportivos</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                  <p className="text-sm">Reportes en tiempo real</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl text-center font-bold text-gray-800 mb-2">Iniciar sesión</h2>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(loginUser)} className="space-y-5">
              
              {/* Tipo de Usuario */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de usuario
                </label>
                <select 
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 appearance-none bg-white
                    ${errors.rol 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                    }`}
                  {...register("rol", { 
                    required: "Selecciona un rol",
                    validate: value => value !== "" || "Selecciona un rol"
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="director">Director</option>
                  <option value="administrador">Administrador</option>
                </select>
                {errors.rol && (<p className="text-red-600 text-sm mt-1 flex items-center gap-1"> {errors.rol.message}
                  </p>
                )}
              </div>

              {/* Correo electrónico */}
              <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
              <input
                type="email"
                placeholder="ingresa tu correo"
                className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2 text-gray-700"
                {...register("email", { required: "El correo es obligatorio" })}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg border-2 pr-12 transition-all duration-200
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                      }`}
                    {...register("password", { required: "La contraseña es obligatoria"})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ?  <MdVisibility size={22} />:<MdVisibilityOff size={22} /> }
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">{errors.password.message}
                  </p>
                )}
              </div>

              {/*Olvida contraseña */}
              <div className="flex items-center justify-between text-sm text-right">
                
                <Link 
                  to="/forgot/recuperacion-password/" 
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón Entrar */}
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transform hover:scale-[1.02] active:scale-[0.98]'"
                    >
                Ingresar
                </button>
              
            </form>


            {/* Registro */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link to="/register/nuevo-estudiantes" className="text-teal-600 hover:text-teal-700 font-semibold">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;