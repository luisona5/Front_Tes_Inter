import { Mail, Phone, Facebook, Instagram, Globe } from 'lucide-react';
import esfot from '../../assets/esfot.png';
import imagenGrupal from "../../assets/grupal.jpg"
import { Link } from "react-router";
import {Carrusel} from "../../components/carrusel/carrusel";
import Cronograma from "./Cronograma";
import { CardInformativo } from '../../components/CardInformativo/Cards';

export const Home = () => {

  return (
    
    <>
    {/* para desplazamiento suave directamente en el componente */}
      <style>{`
        html { scroll-behavior: smooth; }
        .scroll-section { scroll-margin-top: 70px; } 
      `}</style>


        <header id="inicio" className="bg-gradient-to-br from-gray-900 to-gray-800   shadow-md">
          <div className="container mx-auto flex justify-between items-center px-2 h-15">
            
            {/* Logo */}
            <div className="flex items-center">
              <img src={esfot} alt="logo" width={84} height={96}  />
            </div>

            <nav className="flex items-center gap-4">
              <a href='#contacto' className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors" >
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a href='#conocenos' className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors" >
                Sobre nosotros
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a href='#noticias' className="relative group text-white hover:text-orange-600 font-semibold text-sm px-5 py-2 transition-colors" >
                Noticias
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
        

        <section className="container mx-auto px-4 my-10">
          <div className="h-100 md:h-100 w-full">
            <Carrusel />
          </div>
        </section>

        <div className="text-center mb-16">
         <h2 className="font-extrabold text-4xl md:text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
          POLISPORT
        </h2>
          
           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          No te quedes sin la oportunidad de participar en las diferentes disciplinas         
           </p>
        </div>

        <section id='noticias' className="w-full flex justify-center py-10 bg-gray-50">
        <Cronograma />
      </section>



        <section id="deportes" className="container mx-auto px-2 py-20">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            Deportes
          </h2>
         
        </div>

       
        <div>
          <CardInformativo/>
        </div>
  
</section>
<section className="py-16 px-6 md:px-20 bg-gray-50">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* LADO IZQUIERDO: Texto */}
    <div className="space-y-6"
          id='conocenos'>
      <h2 className="font-extrabold text-4xl md:text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 uppercase">
      DONDE NACE EL ORGULLO DE NUESTRA FACULTAD      </h2>
      
      <div className="w-20 h-2 bg-blue-600 rounded-full"></div>

      
      
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-justify">
        ¡REPRESENTA A TU FACULTAD! 🏆
        En POLISPORT, sabemos que el honor de tu carrera no solo se defiende en las aulas,
         sino también en la cancha. Olvídate de los trámites y la desinformación. 
         Hemos creado la plataforma definitiva para que tú seas el protagonista de cada torneo.

      ¿Estás listo para dejar tu huella? 
      Inscríbete, lleva a tu equipo a lo más alto. 
      No dejes que nadie te impida en participar, aquí lo único que importa es tu talento
      </p>

      
    </div>

    {/* LADO DERECHO: Imagen Ajustada */}
    <div className="relative h-full min-h-[400px]">

      {/* Decoración de fondo */}
      <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
      <div className="absolute -bottom-8 right-4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
      
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
        <img 
          src={imagenGrupal}
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
          <div id="contacto">
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
                <a href="#conocenos" className="hover:text-blue-400 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              
              <li>
                <a href="#noticias" className="hover:text-blue-400 transition-colors">
                  Noticias
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
