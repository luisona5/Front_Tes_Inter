import { FaBasketballBall, FaVolleyballBall, FaTableTennis, FaFutbol } from "react-icons/fa";

import imagen1 from "../../assets/futbol.jpg"
import imagen2 from "../../assets/basquet4.jpg"
import imagen3 from "../../assets/boli.jpg"
import imagen4 from "../../assets/pinpon.webp"


export const CardInformativo =()=>{

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Card Fútbol */}
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        
        <div className="h-48 overflow-hidden">
          <img 
            src={imagen1} 
            alt="Deporte Grupal" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-8 relative">
          <div className="absolute -top-8 left-8 bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FaFutbol className="text-white text-3xl" />
          </div>
          
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">¡A la cancha!</h4>
            <p className="text-gray-600 leading-relaxed">
            Defiende los colores de tu facultad en el torneo más apasionante.
             ¡Demuestra tu técnica y trabajo en equipo!            </p>
            
            
          </div>
        </div>
      </div>
    {/* Card Basketball */}
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        
        <div className="h-48 overflow-hidden">
          <img 
            src={imagen2} 
            alt="Deporte Grupal" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-8 relative">
          <div className="absolute -top-8 left-8 bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FaBasketballBall className="text-white text-3xl" />
          </div>
          
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">Domina la Red</h4>
            <p className="text-gray-600 leading-relaxed">
        Sé parte del equipo de baloncesto. Velocidad, estrategia y precisión en cada salto hacia la victoria.            </p>
            
          
          </div>
        </div>
      </div>

    {/* Card Volleyball */}
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        
        <div className="h-48 overflow-hidden">
          <img 
            src={imagen3} 
            alt="Deporte Grupal" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-8 relative">
          <div className="absolute -top-8 left-8 bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FaVolleyballBall className="text-white text-3xl" />
          </div>
          
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">Fuerza en la Red</h4>
            <p className="text-gray-600 leading-relaxed">
        La unión hace la fuerza. Únete a la disciplina de vóley y vive la intensidad de cada remate y defensa.            </p>
            
          
          </div>
        </div>
      </div>

    {/* Card Tenis de Mesa */}
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        
        <div className="h-48 overflow-hidden">
          <img 
            src={imagen4} 
            alt="Deporte Grupal" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-8 relative">
          <div className="absolute -top-8 left-8 bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FaTableTennis className="text-white text-3xl" />
          </div>
          
          <div className="mt-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">Reflejos de Acero</h4>
            <p className="text-gray-600 leading-relaxed">
        Desafía tu velocidad mental y física en tenis de mesa. Un juego de precisión donde cada segundo cuenta.            </p>
            
         
          </div>
        </div>
      </div>







  </div>
  );
}