import { Link, useNavigate } from "react-router"; 
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import storeAuth from "../../context/storeAuth";

const Login = ({ isModal = false }) => { 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();
  const { setToken, setRol } = storeAuth();

  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (dataForm) => {
    const url =  `${import.meta.env.VITE_BACKEND_URL}/administrador/login`

    const response = await fetchDataBackend(url, dataForm, "POST");
    setToken(response.token);
    setRol(response.rol);
        
    if (response) {
      navigate("/dashboard");
    }
  };

  const handleClose = () => {
    navigate(-1); 
  };

  // Vista MODAL
  if (isModal) { 
    return (
      <div 
        className="fixed inset-0 flex justify-center items-center z-50 bg-black/50"
        onClick={handleClose}
      >
        <ToastContainer />
        <div 
          className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Cerrar modal"
            >
              
            </button>
          </div>

          <form onSubmit={handleSubmit(loginUser)}>
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

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2 pr-10"
                  {...register("password", { required: "password es obligatoria" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Ingresar
            </button>

          
            <div className="flex justify-between items-center mt-4">

              <button
                type="button"
                onClick={handleClose}
                className="text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Cancelar
              </button>

              
              <div className="text-xs">
                <Link to="/forgot/id" className="underline text-gray-400 hover:text-gray-900">
                  ¿Olvidaste tu password?
                </Link>
              </div>

            </div>

          </form>
        </div>
      </div>
    );
  }

}
export default Login;