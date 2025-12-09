// src/App.jsx o similar
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'
import PublicRoute from './routes/PublicRoute'; 

import{ Home }from "../src/pages/Principal/Home";
import Login from "./pages/Principal/Login";

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
        
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
        
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