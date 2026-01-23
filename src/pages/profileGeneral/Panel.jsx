import PanelEstudiante from "../Estudiante/Vista/actions/Create/PanelEstudiante";
import storeProfile from "../../context/storeProfile";
import PanelAdministrador from "../Administrador/PanelAdmin";
import PanelDirector from "../Director/Vista/PanelDirector";

export default function Panel() {


    const { user } = storeProfile();

  return (
    <div>
      {user && user.rol?.toLowerCase() === 'estudiante' && (
        <PanelEstudiante />
      )}
      {user && user.rol?.toLowerCase() === 'director' && (
        <PanelDirector />
      )}
      {user && user.rol?.toLowerCase() === 'administrador' && (
        <PanelAdministrador />
      )}
    </div>
  );

    
  
}