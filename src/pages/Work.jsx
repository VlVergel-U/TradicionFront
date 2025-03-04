import Header from "../components/Header";
import Footer from "../components/Footer";

const Work = () => {
  return (
    <>
      <Header />

      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1726160186122-79e560fdcf17?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="cover"
          className="w-full h-150 object-cover"
          style={{ filter: 'blur(2px)' }}
        />
        
        <div className="text-white absolute inset-0 flex items-center justify-center p-6 text-center space-y-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <p className="text-2xl font-amarante-regular">
            Buscamos el mejor talento <br />
            para nuestra familia <strong>Tradición</strong>
          </p>
        </div>
      </div>

      <div className="p-30">
        <p>
          Si amas la gastronomía, disfrutas el buen café y trabajas con pasión, en <strong>Tradición</strong> estamos buscando talentos como tú. Queremos sumar a nuestro equipo a personas creativas, comprometidas y con actitud de servicio para diferentes áreas, como:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Chefs, sous chefs, cocineros, itamaes, susheros, maestros parrilleros, maestros chocolateros, maestros de sake.</strong></li>
          <li><strong>Baristas, sommeliers, bartenders.</strong></li>
          <li><strong>Maitres, asesores gastronómicos (meseros), capitanes de servicio, hostess, jefe de hostess.</strong></li>
          <li><strong>Auxiliares de cocina fría, caliente y pastelería; auxiliares logísticos, de eventos, de almacén, de compras y de calidad.</strong></li>
          <li><strong>Cajeros, domiciliarios, supervisores de almacén, ingenieros de alimentos, stewards y expertos en servicio al cliente.</strong></li>
        </ul>
        <p>
          <br />
          Si quieres formar parte de nuestra familia, envía tu hoja de vida aquí:
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.location.href = 'mailto:tradicionsas@outlook.com'}
            className="bg-[#3D0F09] text-white p-2 rounded-md hover:bg-[#5A0F09] transition duration-300 font-black cursor-pointer"
          >
            Enviar un correo
          </button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Work;