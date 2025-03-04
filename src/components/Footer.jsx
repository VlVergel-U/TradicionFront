const Footer = () => {
  return (
    <footer className="bg-[#3D0F09] text-white p-6">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Información de derechos */}
        <p className="font-inlander text-sm">
          © 2025 TRADICION. Todos los derechos reservados.
        </p>
        <p className="font-eb-garamond-italic text-sm">
          Café-Restaurante
        </p>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm">
          Dirección: Calle 25, Bogotá, Colombia
        </p>
        <p className="text-sm">
          Teléfono: 3152006887
        </p>
        <p className="text-sm">
          Correo electrónico: tradicionsas@outlook.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
