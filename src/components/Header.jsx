import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css'

const Header = () => {
  const location = useLocation();

  return (
    <div>
      <header className="bg-[#3D0F09] text-white p-4 shadow-md">
        <div className="text-center">
          <p className="font-inlander text-xl">TRADICION</p>
          <p className="font-eb-garamond-italic text-sm">Café-Restaurante</p>
        </div>
      </header>

      <div className="bg-[#3D0F09] text-center text-sm text-gray-300 border-y p-1">
        <ul className="flex justify-center items-center space-x-28">
          <li>
            <Link
              to="/"
              className={`link hover:text-gray-300 ml-12 font-bona-nova-regular ${location.pathname === '/' ? 'text-gray-300 font-bold' : ''}`}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`link hover:text-gray-300 font-bona-nova-regular ${location.pathname === '/menu' ? 'text-gray-300 font-bold' : ''}`}
            >
              Menú digital
            </Link>
          </li>
          <li>
            <Link
              to="/work"
              className={`link hover:text-gray-300 font-bona-nova-regular${location.pathname === '/work' ? 'text-gray-300 font-bold' : ''}`}
            >
              Trabaja aquí
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;