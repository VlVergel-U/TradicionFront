import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import coverimage from '../assets/coverimage.jpg';
import { Mail, Lock, Loader } from "lucide-react";

const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const navigate = useNavigate();
	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
    navigate('/menu');
	};


  

  return (
    <>
            <Header />
      <div className="relative h-screen">
        <img
          src={coverimage}
          alt="cover"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(1px)' }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-amber-50 shadow-md rounded-lg px-8 py-6 max-w-md z-10 min-h-[300px] w-auto">
            <h1 className="text-2xl font-bold text-center mb-4 text-[#c37521] font-amarante-regular">Inicia sesión</h1>
            <p className="text-center text-gray-700 text-sm mb-2 font-amarante-regular">
              Debes iniciar sesión para <br />
              <span className="font-semibold text-[#c37521]">comenzar a realizar pedidos</span>!
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#c37521] mb-2 font-amarante-regular">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  id="email" 
                  className="font-bona-nova-regular shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
                  placeholder="Escribe tu correo" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#c37521] mb-2 font-amarante-regular">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  id="password" 
                  className="font-bona-nova-regular shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
                  placeholder="Escribe tu contraseña" 
                  required 
                />
              </div>
              {error && <p className='text-red-500 mb-4 text-sm font-bona-nova-regular'>{error}</p>}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full font-bona-nova-regular flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A36725] hover:bg-[#a37b25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
              </button>
              <Link to="/register" className="text-amber-700 hover:underline font-bona-nova-regular text-sm">O regístrate</Link>
            </form>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;