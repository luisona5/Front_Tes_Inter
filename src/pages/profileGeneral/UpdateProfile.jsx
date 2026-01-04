import FormProfileEstudiante from '../../pages/Estudiante/FormProfileEstudiante';

const UpdateProfile = () => {
    return (
        <>
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className='font-black text-4xl text-slate-700'>⚙️ Perfil</h1>
                <hr className='my-3 border-gray-200'/>
                <p className='text-slate-500'>Gestiona tu información personal.</p>
            </div>  
            
            {/* FormProfile centrado */}
            <div className='w-full max-w-4xl mx-auto'>
                <FormProfileEstudiante/>
            </div>
        </>
    );
}

export default UpdateProfile