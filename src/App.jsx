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

import NuevoDirector        from "./pages/Administrador/FormDirector";
import { NuevoEstudiante }  from "./pages/Administrador/FormEstudiante";
import TableDirectores      from "./pages/Administrador/Table/TableDirector";
import TableEstudiantes     from "./pages/Administrador/Table/TableEstudiante";
import   DetailsDirector    from "./pages/Administrador/Table/actions/DetailsDirector";
import   UpdateDirector     from "./pages/Administrador/Table/actions/UpdateDirector";

import Dashboard from "./dashboard/Dashboard";
import { Confirm }      from "./pages/Estudiante/Confirm";
import ResetEstudiante  from "./pages/Estudiante/ResetEstudiante";
import InscripcionDeportiva from "./pages/Inscripcion/FormInscripcion";




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
            <Route path='inscripciones/nuevodeporte' element={<InscripcionDeportiva />} />
            <Route path='inscripciones/nuevo/director' element={<NuevoDirector/>} />
            <Route path='inscripciones/nuevo/estudiante/politecnico' element={<NuevoEstudiante/>} />
            <Route path='inscripciones/visualizar/directores' element={<TableDirectores/>} />
            <Route path='inscripciones/visualizar/estudiantes' element={<TableEstudiantes/>} />
            <Route path='Director-de-Evento/informacion-completa/:id' element={<DetailsDirector/>} />
            <Route path='update/Director-de-Evento/informacion-completa/:id' element={<UpdateDirector/>} />
          

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