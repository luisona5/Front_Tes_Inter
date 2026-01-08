import FormProfileEstudiante from '../../pages/Estudiante/FormProfileEstudiante';
import FormProfileAdministrador from '../Administrador/FormProfileAdministrador';
import storeProfile from '../../context/storeProfile'


const UpdateProfile = () => {

            const { user } = storeProfile()

    return (
        <>
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className='font-black text-4xl text-slate-700'>⚙️ Perfil</h1>
                <hr className='my-3 border-gray-200'/>
                <p className='text-slate-500'>Gestiona tu información personal.</p>
            </div>  
            
            <div className="flex justify-center">
                            {!user ? (
                                <div className="text-center"></div>
                            ) : user && user?.rol === "Estudiante" ? (
                                <div className='w-full max-w-lg'> 
                                    <div className="sticky top-4"> 
                                       <FormProfileEstudiante />
                                    </div>
                                </div>
                            ) : user && user?.rol === "Administrador" ? (
                                <div className='w-full max-w-lg'> 
                                    <div className="sticky top-4"> 
                                        <FormProfileAdministrador />
                                    </div>
                                </div>
                            ): (   
                                // Perfil normal
                               {/* <div className='w-full max-w-lg'> 
                                    <div className="sticky top-4"> 
                                        <CardProfileAdmin />
                                    </div>
                                </div>*/}
                            )}
                        </div>
            
            
        </>
    );
}

export default UpdateProfile