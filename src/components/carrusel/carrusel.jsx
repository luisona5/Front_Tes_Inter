import deporte1 from '../../assets/basquet.jpg'; 
import deporte2 from '../../assets/futbol1.jpg';
import deporte3 from '../../assets/futbol2.jpg';
import deporte4 from '../../assets/esfot1.jpg';
import { Carousel } from "@material-tailwind/react";


export const Carrusel = () => {
    
    const images = [
        { src: deporte1, alt: "Imagen 1" },
        { src: deporte2, alt: "Imagen 2" },
        { src: deporte3, alt: "Imagen 3" },
        { src: deporte4, alt: "Imagen 4" },
    ];

 
    return (
        <div className="container mx-auto px-4 my-12">
        <div className="h-64 md:h-96 w-full">
          <Carousel
            className="rounded-xl mt-4"
            autoplay
            autoplayDelay={5000}
            loop
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
        </div>
      </div>
    );
}