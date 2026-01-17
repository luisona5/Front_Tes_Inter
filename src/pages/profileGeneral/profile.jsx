import { CardProfileAdmin } from '.././Administrador/profile/CardProfileAdmin'
import { CardProfileEstudiante } from '../Estudiante/Profile/CardProfileEstudiante'

import storeProfile from '../../context/storeProfile'
import { CardProfileDirector } from '../Director/profile/CardProfileDirector'

const Profile = () => {
    const { user } = storeProfile()
    
    
    return (
        <>
            <div className="mb-8">
                <h1 className='font-black text-4xl text-slate-700'>⚙️ Perfil</h1>
                <hr className='my-3 border-gray-200'/>
            </div>

            <div className="flex justify-center">
                {!user ? (
                    <div className="text-center"></div>
                ) : user && user?.rol === "Estudiante" ? (
                    <div className='w-full max-w-lg'> 
                        <div className="sticky top-4"> 
                           <CardProfileEstudiante />
                        </div>
                    </div>
                ) : user && user?.rol === "Administrador" ? (
                    <div className='w-full max-w-lg'> 
                        <div className="sticky top-4"> 
                            <CardProfileAdmin />
                        </div>
                    </div>
                ): (   
                    // Perfil normal
                    <div className='w-full max-w-lg'> 
                        <div className="sticky top-4"> 
                            <CardProfileDirector />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile