import { FaBasketballBall, FaVolleyballBall, FaTableTennis } from "react-icons/fa";
import { Mail, Phone, Facebook, Instagram, Globe } from 'lucide-react';
import esfot from '../../assets/esfot.png';
import { Link } from "react-router";
import {Carrusel} from "../../components/carrusel/carrusel";
import Cronograma from "./Cronograma";

export const Home = () => {


  

  return (
    
    <>
    {/* para desplazamiento suave directamente en el componente */}
      <style>{`
        html { scroll-behavior: smooth; }
        .scroll-section { scroll-margin-top: 70px; } 
      `}</style>


        <header  className="bg-gradient-to-br from-gray-900 to-gray-800   shadow-md">
          <div className="container mx-auto flex justify-between items-center px-2 h-15">
            
            {/* Logo */}
            <div className="flex items-center">
              <img src={esfot} alt="logo" width={84} height={96}  />
            </div>

            <nav className="flex items-center gap-4">
              <a href='#inicio' className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors" >
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a href='#conocenos' className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors" >
                Sobre nosotros
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a href='#deporte' className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors" >
                deportes
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              
            </nav>

            {/* Botones Agrupados */}
            <nav className="flex items-right gap-4 ">
              <Link
                to="/login"
                className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors"
              >
                Iniciar Sesión
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              
            </nav>

          </div>
        </header>

        
      <body>
        <div className="text-center mb-16">
         <h2 className="font-extrabold text-4xl md:text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
  POLISPORT
</h2>
          
           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          No te quedes sin la oportunidad de participar en las diferntes disciplinas         
           </p>
        </div>

        <section className="container mx-auto px-4 my-10">
          <div className="h-100 md:h-100 w-full">
            <Carrusel />
          </div>
        </section>
        <section className="w-full flex justify-center py-10 bg-gray-50">
        
        <Cronograma />
      </section>



        <section id="deportes" className="container mx-auto px-2 py-20">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            Nuestros Deportes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explora las diferentes disciplinas deportivas disponibles en ESFOT
          </p>
        </div>

       

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Card Fútbol */}
    <div className="group relative bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <FaVolleyballBall className="text-white text-3xl" />
        </div>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-3">Fútbol</h4>
        <p className="text-gray-600 leading-relaxed">
          Participa en torneos inter-facultades y desarrolla tus habilidades futbolísticas
        </p>
        
        <button className="mt-6 text-amber-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Ver más 
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>

    {/* Card Basketball */}
    <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <FaBasketballBall className="text-white text-3xl" />
        </div>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-3">Basketball</h4>
        <p className="text-gray-600 leading-relaxed">
          Únete a los equipos de basketball y compite en emocionantes partidos
        </p>
        
        <button className="mt-6 text-orange-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Ver más 
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>

    {/* Card Volleyball */}
    <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <FaVolleyballBall className="text-white text-3xl" />
        </div>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-3">Volleyball</h4>
        <p className="text-gray-600 leading-relaxed">
          Forma parte de nuestros equipos de volleyball y demuestra tu talento
        </p>
        
        <button className="mt-6 text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Ver más 
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>

    {/* Card Tenis de Mesa */}
    <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <FaTableTennis className="text-white text-3xl" />
        </div>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-3">Tenis de Mesa</h4>
        <p className="text-gray-600 leading-relaxed">
          Practica y compite en tenis de mesa con los mejores jugadores
        </p>
        
        <button className="mt-6 text-green-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Ver más 
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  </div>
</section>
<section className="py-16 px-6 md:px-20 bg-gray-50">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* LADO IZQUIERDO: Texto */}
    <div className="space-y-6"
          id='conocenos'>
      <h2 className="font-extrabold text-4xl md:text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 uppercase">
        Sobre Nosotros 
      </h2>
      
      <div className="w-20 h-2 bg-blue-600 rounded-full"></div>

      <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-justify">
        En POLISPORT, transformamos la pasión por el deporte en una experiencia profesional y organizada. 
        Somos la plataforma líder en gestión deportiva universitaria, diseñada para centralizar desde la organización de torneos hasta el seguimiento de categorías, 
         eliminando las barreras administrativas que frenan el talento.
      </p>
      
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-justify">
        Creemos firmemente que el deporte es el motor del desarrollo integral y el bienestar estudiantil; por ello, conectamos a cada atleta con soluciones digitales que facilitan el acceso a la competición en tiempo real. 
        En <span className="italic font-medium text-indigo-700">POLISPORT</span>, construimos el puente tecnológico para que la comunidad deportiva alcance su 
        <span className="font-bold text-blue-600"> máximo potencial</span> en un entorno moderno y transparente.
      </p>

      
    </div>

    {/* LADO DERECHO: Imagen Ajustada */}
    <div className="relative h-full min-h-[400px]">

      {/* Decoración de fondo */}
      <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
      <div className="absolute -bottom-8 right-4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
      
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
        <img 
          src="/src/assets/grupal.jpg" 
          alt="Gestión Deportiva"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-500"
        />
      </div>
    </div>

  </div>
</section>
      
        
      </body>

      


    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Contacto Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contacto
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Dirección:</p>
                  <a href="mailto:diresfot@epn.edu.ec" className="hover:text-blue-400 transition-colors">
                    diresfot@epn.edu.ec
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Subdirección:</p>
                  <a href="mailto:subesfot@epn.edu.ec" className="hover:text-blue-400 transition-colors">
                    subesfot@epn.edu.ec
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                <div>
                  <a href="tel:+59322976300" className="hover:text-blue-400 transition-colors">
                    (+593) 2 2976 300 ext. 2701
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#inicio" className="hover:text-blue-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#sobre-nosotros" className="hover:text-blue-400 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              
              <li>
                <a href="#noticias" className="hover:text-blue-400 transition-colors">
                  Noticias
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-blue-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          

          {/* Redes Sociales */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Síguenos
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Conéctate con nosotros en nuestras redes sociales
            </p>
            <div className="flex gap-4">
              <a 
                href="https://esfot.epn.edu.ec/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Sitio web ESFOT"
              >
                <Globe className="w-5 h-5 text-white" />
              </a>
              <a 
              
                href="https://www.google.com/maps/search/?api=1&query=Av.+Ladr%C3%B3n+de+Guevara+253,+Quito+170143"
                target="_blank"
                rel="noopener noreferrer"                
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              
            </div>
          </div>
        </div>
        

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ESFOT - Escuela de Formación de Tecnólogos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>

    </>
  );
};
