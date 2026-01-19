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
import { NotFound } from "./pages/Principal/NotFound";
import ResetGeneral  from "./pages/Principal/ResetGeneral";


import    Panel       from "./pages/profileGeneral/Panel";
import    Profile     from "./pages/profileGeneral/profile";
import UpdateProfile  from "./pages/profileGeneral/UpdateProfile";
import UpdatePassword from "./pages/profileGeneral/UpdatePassword";

import NuevoDirector        from "./pages/Administrador/FormDirector";
import  NuevoEstudiante     from "./pages/Administrador/FormEstudiante";
import TableDirectores      from "./pages/Administrador/Table/TableDirector";
import TableEstudiantes     from "./pages/Administrador/Table/TableEstudiante";
import   DetailsDirector    from "./pages/Administrador/Table/actions/DetailsDirector";
import   UpdateDirector     from "./pages/Administrador/Table/actions/UpdateDirector";

import Dashboard from "./dashboard/Dashboard";
import { Confirm }      from "./pages/Estudiante/Confirm";
import InscripcionDeportiva from "../src/pages/Estudiante/Vista/actions/Create/CreateInscripcion";
import DetailsEstudiante from "./pages/Administrador/Table/actions/DetailsEstudiante";
import UpdateEstudiante from "./pages/Administrador/Table/actions/UpdateEstudiante";
import CreateStudent from "./pages/Director/Vista/actions/Create/CreateStudent";
import CreateCategory from "./pages/Director/Vista/actions/Create/CreateCategory";
import DetailsCategory from "./pages/Director/Vista/actions/Read/DetailsCategory";
import UpdateCategoria from "./pages/Director/Vista/actions/Update/Updatecategoria";
import TablaCategoria from "./pages/Director/Vista/actions/Delete/DeleteCategory";
import CreateDeporte from "./pages/Director/Vista/actions/Create/createDeporte";
import TablaDeporte from "./pages/Director/Vista/actions/Delete/DeleteDeporte";
import DetailsDeporte from "./pages/Director/Vista/actions/Read/detailsDeporte";
import UpdateDeporte from "./pages/Director/Vista/actions/Update/UpdateDeporte";
import DetailsInscripction from "./pages/Estudiante/Vista/actions/Read/DetailsInscription";
import TablaInscripcion from "./pages/Estudiante/Vista/actions/Delete/DeleteInscripcion";
import { ForgotGeneral } from "./pages/Principal/forgotGeneral";
import TablaEstadoEstudiante from "./pages/Director/Components/EstadoEstudiantes/estadoEstudiante";
import DetailsInscripctionEstadoGeneral from "./pages/Director/Vista/actions/Read/DetailsEstado";
import TableUniforms from "./pages/Estudiante/Vista/actions/Delete/DeleteUniforme";
import RegistroUniforme from "./pages/Estudiante/Vista/actions/Create/CreateUniformeEs";





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
          <Route path="forgot/recuperacion-password/" element={<ForgotGeneral />} />
          <Route path="reset/recuperar-password/usuarios/:token" element={<ResetGeneral />} />
          <Route path="*" element={<NotFound />} />


        
        </Route>




        {/*Usuarios Registrados en la base de datos */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>

            <Route index element={<Panel />} />
            <Route path="profile" element={<Profile />} />
            <Route path='UpdateProfile' element={<UpdateProfile />}/>
            <Route path='UpdatePassword' element={<UpdatePassword />}/>
            <Route path='inscripciones/nuevo/director' element={<NuevoDirector/>} />
            <Route path='inscripciones/nuevo/estudiante/politecnico' element={<NuevoEstudiante/>} />
            <Route path='inscripciones/visualizar/directores' element={<TableDirectores/>} />
            <Route path='Director-de-Evento/informacion-completa/:id' element={<DetailsDirector/>} />
            <Route path='update/Director-de-Evento/informacion-completa/:id' element={<UpdateDirector/>} />
            <Route path='Estudiantes-esfot-epn/informacion-completa/:id' element={<DetailsEstudiante/>} />
            <Route path='update/Estudiantes-esfot-epn/informacion-completa/:id' element={<UpdateEstudiante/>} />
            <Route path='estados-de-inscripciones/visualizar/estudiantes' element={<TablaEstadoEstudiante/>} />


            {/*DIRECTOR */}
            <Route path='inscripciones/Director/nuevo/estudiante/politecnico' element={< CreateStudent />} />
            <Route path='Director/inscripciones/nuevo/categorias' element={< CreateCategory />} />
            <Route path='inscripciones/visualizar/estudiantes' element={< TableEstudiantes />} />

            <Route path='inscripciones/visualizar/categorias' element={< TablaCategoria />} />
            <Route path='Category-esfot-epn/informacion-completa/:id' element={< DetailsCategory />} />
            <Route path='update/Category-esfot-epn/informacion-completa/:id' element={< UpdateCategoria />} />

            <Route path='inscripciones/visualizar/deportes' element={< TablaDeporte />} />
            <Route path='inscripciones/Deporte/nuevo/Director' element={< CreateDeporte />} />
            <Route path='Deporte-esfot-epn/informacion-deporte/:id' element={< DetailsDeporte />} />
            <Route path='update/Deporte-esfot-epn/informacion-deporte/:id' element={< UpdateDeporte/>} />
            <Route path='details-inscripcion-estudinates/:id' element={< DetailsInscripctionEstadoGeneral/>} />


            

            {/*ESTUDIANTE */}
            <Route path='inscripciones/nuevodeporte' element={<InscripcionDeportiva />} />
            <Route path='estudiante/inscripcionesGenerales'element={<TablaInscripcion />} />
            <Route path='Inscription-esfot-epn/informacion-completa/:id'element={<DetailsInscripction />} />
            <Route path='Uniforme/informacion-completa/detalle-para-pago'element={<TableUniforms />} />
            <Route path='Uniforme/registro/detalle-para-pago'element={<RegistroUniforme />} />









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