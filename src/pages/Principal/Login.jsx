import { Link, useNavigate } from "react-router"; 
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import storeAuth from "../../context/storeAuth";

const Login = ( ) => { 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();
  const { setToken, setRol } = storeAuth();

  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (dataForm) => {
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
  };

  

  
    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <ToastContainer />

            {/* Imagen */}
            <div className="hidden sm:block sm:w-1/2 bg-[url('/src/assets/futbol.jpg')] bg-cover bg-center"></div>


            <div className="w-full sm:w-1/2 flex justify-center items-center bg-white">

                <div className="w-4/5">

                    <h1 className="text-3xl font-semibold text-center text-gray-500">Bienvenido(a)</h1>
                
                    <p className="text-gray-400 text-center my-4">Por favor ingresa tus datos</p>


                    {/* Formulario */}
                    <form onSubmit={handleSubmit(loginUser)}>
                      <div className="mb-3">
                        <label className="block text-sm font-semibold mb-1">Tipo de usuario</label>
                        <select 
                          className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2 text-gray-700"
                          {...register("rol", { required: "Selecciona un rol",
                            validate: value => value !== "" || "Selecciona un rol"
                          })}
                          defaultValue=""
                        >
                          <option value="" disabled>Selecciona un rol</option>
                          <option value="estudiante">Estudiante</option>
                          <option value="director">Director</option>
                          <option value="administrador">Administrador</option>
                        </select>
                        {errors.rol && <p className="text-red-600 text-sm mt-1">{errors.rol.message}</p>}
                      </div>

                        {/* Campo Correo */}
                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo"
                                className="w-full rounded-md border border-gray-300 focus:ring-1 px-2 py-1 text-gray-500"
                                {...register("email", { required: "El correo es obligatorio" })}
                            />
                                {errors.email && <p className="text-red-800">{errors.email.message}</p>}
                        </div>


                        {/* Campo Contraseña */}
                        <div className="mb-3">
                            
                            <label className="block text-sm font-semibold mb-1">Contraseña</label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                />
                                    {errors.password && <p className="text-red-800">{errors.password.message}</p>}

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                        </div>


                        {/* Botón login */}
                            <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl 
                            hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</button>

                    </form>


                    {/* Separador */}
                    <div className="mt-6 flex items-center text-gray-400">
                        <hr className="flex-1" />
                        <span className="px-2 text-sm">O</span>
                        <hr className="flex-1" />
                    </div>


                   


                    {/* Enlace para olvidaste tu contraseña */}
                    <div className="mt-5 text-xs border-b-2 py-4 text-left">
                        <Link to="/forgot/recuperacion-password/" className="underline text-gray-400 hover:text-gray-900">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>



                    {/* Enlaces para volver o registrarse */}
                    <div className="mt-3 flex justify-between text-sm">
                        <Link to="/" className="underline text-gray-400 hover:text-gray-900">Regresar</Link>
                        <Link to="/register" className="py-2 px-5 bg-gray-600 text-white rounded-xl hover:bg-gray-900">Registrarse</Link>
                    </div>


                </div>
            </div>
        </div>
    );
};


export default Login;