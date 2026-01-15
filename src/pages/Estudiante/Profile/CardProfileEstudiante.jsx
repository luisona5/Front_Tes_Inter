import { Camera, CreditCard, Mail, Phone, User, Briefcase, MapPin, Users } from "lucide-react";
import storeProfile from "../../../context/storeProfile"


export const CardProfileEstudiante = () => {

    const { user } = storeProfile()

    return (
    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-between hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 max-w-md w-full backdrop-blur-sm">
      
      {/* Imagen de perfil */}
      <div className="relative group mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" 
            alt="img-client" 
            className="w-full h-full rounded-full border-4 border-white object-cover" 
          />
        </div>
        
        <label className="absolute bottom-1 right-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-3 cursor-pointer shadow-lg transition-all duration-200 hover:scale-110 group-hover:shadow-xl">
          <Camera size={18} strokeWidth={2.5} />
        </label>
      </div>

      {/* Campo cedula */}
      <div className="self-start w-full mb-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <CreditCard size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              cedula
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.cedulaEstudiante }
            </p>
          </div>
        </div>
      </div>

      {/* Campo Nombre */}
      <div className="self-start w-full mb-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <User size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Nombre
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.nombreEstudiante } {user?.apellidoEstudiante }
            </p>
          </div>
        </div>
      </div>

     
      {/* Campo Celular */}
      <div className="self-start w-full mb-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <Phone size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Contacto
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.telefonoEstudiante }
            </p>
          </div>
        </div>
      </div>
        {/* Campo genero */}
      <div className="self-start w-full mb-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <Users size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Genero
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.genero}
            </p>
          </div>
        </div>
      </div>


        {/* Campo Correo Electrónico */}
      <div className="self-start w-full mb-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <Mail size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Correo Electrónico
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.emailEstudiante }
            </p>
          </div>
        </div>
      </div>

      {/* Campo Carrera */}
      <div className="self-start w-full">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <Briefcase size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Carrera
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.carreraEstudiante }
            </p>
          </div>
        </div>
      </div>

      
    {/* Campo Direccion */}
      <div className="self-start w-full mb-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 hover:border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
            <MapPin size={20} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Dirección
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.direccionEstudiante }
            </p>
          </div>
        </div>
      </div>










    </div>
  
    );
}