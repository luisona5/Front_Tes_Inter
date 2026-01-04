// src/App.jsx o similar
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute' 

import{ Home }      from "../src/pages/Principal/Home";
import Login        from "./pages/Principal/Login";
import { Register } from "./pages/Principal/Register";
import { Forgot }   from "./pages/Principal/Forgot";
import { NotFound } from "./pages/Principal/Nofound";

import    Panel       from "./pages/profileGeneral/Panel";
import    Profile     from "./pages/profileGeneral/profile";
import UpdateProfile  from "./pages/profileGeneral/UpdateProfile";
import UpdatePassword from "./pages/profileGeneral/UpdatePassword";

import Dashboard from "./dashboard/Dashboard";
import { Confirm } from "./pages/Estudiante/Confirm";
import ResetEstudiante from "./pages/Estudiante/ResetEstudiante";


function App() {
  const { profile} = storeProfile()
  const { token } = storeAuth()

  useEffect(() => {
    if(token){
      profile()
    }
  }, [token])
  
  return (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); 
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        {/* Ruta HOME - siempre accesible */}
        <Route index element={<Home />} />

        
        
        {/* Rutas Públicas */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register/nuevo-estudiantes" element={<Register />} />
          <Route path="confirm/registro-estudiante/:token" element={<Confirm />} />
          <Route path="forgot/recuperacion-password/:id" element={<Forgot />} />
          <Route path="reset/recuperacion-password/estudiante/:token" element={<ResetEstudiante />} />
          <Route path="*" element={<NotFound />} />


        
        </Route>




        {/*Usuarios Registrados en la base de datos */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>

            <Route index element={<Panel />} />
            <Route path="profile" element={<Profile />} />
            <Route path='UpdateProfile' element={<UpdateProfile />}/>
            <Route path='UpdatePassword' element={<UpdatePassword />}/>

          </Route>
        </Route>
      </Routes>

      {/* Modal para login */}
      {background && (
        <Routes>
          <Route path="/login" element={<Login isModal={true} />} />
        </Routes>
      )}
    </>
  );
}

export default App;