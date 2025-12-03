import { FaBasketballBall, FaVolleyballBall, FaTableTennis } from "react-icons/fa";
import { Carousel } from "@material-tailwind/react";
import fondo from '../../assets/inflable.jfif';
import futbol1 from '../../assets/futbol.jpg';
import futbol2 from '../../assets/futbol1.jpg';
import futbol3 from '../../assets/atletismo1.jpg';
import esfot from '../../assets/esfot.png';
import { Link, useLocation } from "react-router";

export const Home = () => {

const location = useLocation();

  const images = [
    { src: futbol1, alt: "Slide 1" },
    { src: futbol3, alt: "Slide 2" },
    { src: futbol2, alt: "Slide 3" },
  ];

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
          <ul className="flex justify-center items-center gap-5 my-4">
            <li><img src={esfot} alt="logo" width={100} height={100} /></li>
          </ul>

          <ul className="flex gap-5 justify-center my-4 flex-wrap">
            <li><a href="#" className="font-bold hover:text-amber-700 hover:underline">About US</a></li>
            <li><a href="#" className="font-bold hover:text-amber-700 hover:underline">Services</a></li>
            <li><a href="#site-footer" className="font-bold hover:text-amber-700 hover:underline">Contact</a></li>
          </ul>

          <ul className="flex justify-center items-center gap-5 my-4">
            <Link
              to="/login"
              state={{ background: location }}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-12 py-3"
            >
              Login
            </Link>
          </ul>
        </header>

        <main className="text-center py-6 px-8 md:text-left md:flex justify-between items-center gap-10 md:py-1">
          <div>
            <h1 className="font-lato font-extrabold text-amber-800 uppercase text-4xl my-4 md:text-6xl">
              Deporte y Cultura
            </h1>

            <p className="font-bold text-left my-8 md:text-2xl underline">Powered by</p>
            <p className="text-2xl my-6 font-sans">
              Artificial intelligence, Payment gateway, Realtime chat and much more...
            </p>

            

            <p className="font-bold text-left my-4 md:text-2xl">Find us</p>
          </div>
        </main>
      </div>

      <section className="container mx-auto px-4 my-10">
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
      </section>

      <section className="container mx-auto px-4">
        <div className="container mx-auto relative mt-6">
          <h2 className="font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white">Deporte</h2>
          <div className="text-amber-900 border-2 absolute top-1/2 w-full z-0" />
        </div>

        <div className="my-10 flex justify-between flex-wrap gap-5">
          <div className="text-center shadow-lg hover:shadow-xl transition-shadow bg-red-50 relative pt-4 sm:flex-1">
            <FaVolleyballBall className="inline text-5xl" />
            <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Futball</h4>
            <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="text-center shadow-lg hover:shadow-xl transition-shadow bg-red-50 relative pt-4 sm:flex-1">
            <FaBasketballBall className="inline text-5xl" />
            <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Basketball</h4>
            <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="text-center shadow-lg hover:shadow-xl transition-shadow bg-red-50 relative pt-4 sm:flex-1">
            <FaVolleyballBall className="inline text-5xl" />
            <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Volleyball</h4>
            <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="text-center shadow-lg hover:shadow-xl transition-shadow bg-red-50 relative pt-4 sm:flex-1">
            <FaTableTennis className="inline text-5xl" />
            <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Pinpon</h4>
            <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </section>

      <footer id="site-footer" className="bg-white rounded-lg shadow-sm m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3">
              <img src={esfot} className="h-8" alt="esfot Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
              <li><a href="#" className="hover:underline me-4 md:me-6">About</a></li>
              <li><a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline me-4 md:me-6">Licensing</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 lg:my-8" />
          <span className="block text-sm text-gray-500 text-center">
            © 2025 <a href="#" className="hover:underline">ESFOT™</a>. All Rights Reserved.
          </span>
        </div>
      </footer>

    </>
  );
};
