import { Link, useNavigate } from "react-router"; 
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import storeAuth from "../../context/storeAuth";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen flex">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Panel Izquierdo - Imagen con Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800">
        <div 
          className="absolute inset-0 bg-[url('/src/assets/futbol.jpg')] bg-cover bg-center opacity-20"
        ></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Bienvenido 
            </h2>
            <p className="text-gray-500">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <div className="space-y-5">
            
            {/* Selector de Rol */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Tipo de usuario
              </label>
              <div className="relative">
                <select 
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 appearance-none bg-white
                    ${errors.rol 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  {...register("rol", { 
                    required: "Selecciona un tipo de usuario",
                    validate: value => value !== "" || "Selecciona un tipo de usuario"
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona tu rol</option>
                  <option value="estudiante"> Estudiante</option>
                  <option value="director"> Director</option>
                  <option value="administrador">Administrador</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.rol && (<p className="mt-2 text-sm text-red-600 flex items-center gap-1">{errors.rol.message}</p>)}</div>

            {/* Campo Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="ingresa tu email"
                  className={`w-full px-4 py-3 pl-11 rounded-xl border-2 transition-all duration-200
                    ${errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  {...register("email", { required: "El correo es obligatorio"})}
                />
              </div>
              {errors.email && (<p className="mt-2 text-sm text-red-600 flex items-center gap-1">{errors.email.message}</p>)}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className={`w-full px-4 py-3 pl-11 pr-11 rounded-xl border-2 transition-all duration-200
                    ${errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  {...register("password", { required: "La contraseña es obligatoria"})}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ?<MdVisibility size={22} />: <MdVisibilityOff size={22} />  }
                </button>
              </div>
              {errors.password && (<p className="mt-2 text-sm text-red-600 flex items-center gap-1">{errors.password.message}</p>)}
            </div>

            {/* Olvidaste contraseña */}
            <div className="flex justify-end">
              <Link 
                to="/forgot/recuperacion-password/" 
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de Login */}
            <button 
              type="button"
              onClick={handleSubmit(loginUser)}
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Links adicionales */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Regresar
            </Link>
            <Link 
              to="/register/nuevo-estudiantes" 
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Crear cuenta
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;