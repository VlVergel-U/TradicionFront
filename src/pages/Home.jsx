import Header from "../components/Header";
import coverimage from "../assets/coverimage.jpg";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const navigateButton = () => {
        navigate('/menu')
    }

  return (
    <>
      <Header />
      <div className="relative">
        <img
          src={coverimage}
          alt="cover"
          className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] object-cover"
          style={{ filter: 'blur(1px)' }}
        />
        <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-center space-y-3 w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <p className="text-lg sm:text-xl md:text-1xl font-amarante-regular">Bienvenidos al auténtico</p>
          <p className="text-3xl sm:text-4xl md:text-3xl font-bona-nova-regular">
            <span className="font-bold">MUNDO</span> TRADICIÓN
          </p>
          <button className="mt-4 bg-[#A36725] hover:bg-[#a37525] 
        text-white py-2 px-4 rounded cursor-pointer 
        font-bona-nova-bold transition duration-300 ease-in-out absolute -translate-x-1/2
        transform hover:scale-105" onClick={navigateButton}>
            PIDE TU DOMICILIO AQUÍ
          </button>
        </div>
      </div>

            <div className="max-w-2xl mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl sm:text-3xl font-bona-nova-bold text-[#3D0F09] mb-4">Sobre Nosotros</h2>
        <p className="text-lg sm:text-lg text-gray-700 font-bona-nova-regular">
          En <strong>Tradición</strong>, cada visita es una experiencia única que celebra la riqueza de nuestra cultura gastronómica. 
          Nuestro menú está cuidadosamente elaborado con ingredientes frescos y de alta calidad, 
          ofreciendo una fusión de sabores que rinden homenaje a nuestras raíces. 
          Desde el aroma del café recién hecho hasta la presentación de cada plato, 
          buscamos crear momentos memorables para nuestros comensales. 
          Te invitamos a disfrutar de un ambiente acogedor y elegante, donde cada detalle cuenta.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 p-4 sm:p-10 mb-10">
        <img 
          src="https://images.unsplash.com/photo-1586011066531-f3a64f20d51d?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="image"
          className="w-full sm:w-1/2 h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="bg-[#3D0F09] h-40 sm:h-48 w-full sm:w-1/3 flex items-center justify-center mt-8 sm:mt-0 sm:-ml-16">
          <p className="text-white p-4 text-sm sm:text-base font-bona-nova-regular text-center">
            “Tradición es un espacio donde cada taza de café cuenta una historia y cada plato refleja el sabor de nuestras raíces.”
          </p>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;