import { CardProfileAdmin } from '.././Administrador/profile/CardProfileAdmin'
//import { CardProfileDirector } from '../components/profile/CardProfileDirector'
import storeProfile from '../context/storeProfile'

const Profile = () => {
    const { user } = storeProfile()
    
    
    return (
        <>
            {/* Encabezado del perfil */}
            <div className="mb-8">
                <h1 className='font-black text-4xl text-slate-700'>⚙️ Perfil</h1>
                <hr className='my-3 border-gray-200'/>
            </div>

            {/* Contenedor principal */}
            <div className="flex justify-center">
                {!user ? (
                    <div className="text-center"></div>
                ) : user && user?.rol === "Director" ? (
                    <div className='w-full max-w-lg'> 
                        <div className="sticky top-4"> 
                          {/*  <CardProfileDirector /> */}
                        </div>
                    </div>
                ) : (   
                    // Perfil normal
                    <div className='w-full max-w-lg'> 
                        <div className="sticky top-4"> 
                            <CardProfileAdmin />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile