import FormInscripcion from '../../pages/Inscripciones/FormInscripcion';
import storeProfile from '../../context/storeProfile'
    
const Create = () => {
        const { user } = storeProfile()


    return (
         <div className="flex justify-center">
                        {!user ? (
                            <div className="text-center"></div>
                        ) : user && user?.rol === "Estudiante" ? (
                            <div className='w-full max-w-lg'> 
                                <div className="sticky top-4"> 
                                   <FormInscripcion />
                                </div>
                            </div>
                        ): (   
                            // Perfil normal
                            <div className='w-full max-w-lg'>       
                                <div className="sticky top-4">
                                    <FormInscripcion />
                                </div>
                            </div>
                        )
                        }
        </div>  

    )   

}


export default Create