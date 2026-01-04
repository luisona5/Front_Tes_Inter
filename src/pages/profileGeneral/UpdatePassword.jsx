import { Lock } from 'lucide-react'
import CardPasswordEstudiante from '../../pages/Estudiante/CardPasswordEstudiante'

const UpdatePassword = () => {
    return (
        <>
            {/* Encabezado para consistencia visual */}
            <div className="mb-8 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-lg">
                            <Lock size={24} className="text-white" strokeWidth={2.5} />
                        </div>
                <h1 className='font-black text-4xl text-slate-700 text-center'> Actualizar Contraseña</h1>
            </div>
            <div className="mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </div>
        
            {/* Contenedor centrado */}
            <div className="flex justify-center">
                <CardPasswordEstudiante/>
            </div>
        </>
    )
}
export default UpdatePassword