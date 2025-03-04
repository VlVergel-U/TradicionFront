import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import coverimage from '../assets/coverimage.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from "lucide-react";
import PasswordStrength from '../components/passwordValidation';

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [identification, setIdentification] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [cellPhoneNumber, setCellPhoneNumber] = useState("");

	const navigate = useNavigate();

	const { register, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await register(firstName, secondName,
         firstLastName, secondLastName, identification, 
         email, password, paymentMethod, address, cellPhoneNumber);

			navigate("/login");
      
		} catch (error) {
			console.log(error);
		}
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
          <div className="bg-amber-50 shadow-md rounded-lg px-8 py-6 max-w-md z-10 min-h-[400px] w-auto"> 
            
            <h1 className="text-2xl font-bold text-center mb-4 text-[#c37521] font-amarante-regular">Registro</h1>

            <form onSubmit={handleSignUp} className="space-y-4">

              <input type="text" name="first_name" placeholder="Primer Nombre" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="font-bona-nova-regular 
              shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200
               focus:border-amber-500" required />

              <input type="text" name="second_name" placeholder="Segundo Nombre" onChange={(e) =>setSecondName(e.target.value)} value={secondName}  className="font-bona-nova-regular 
              shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none
               focus:ring-amber-200 focus:border-amber-500" />

              <input type="text" name="first_last_name" placeholder="Primer Apellido" onChange={(e) =>setFirstLastName(e.target.value)} value={firstLastName}  className="font-bona-nova-regular shadow-sm 
              rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200
               focus:border-amber-500" required />

              <input type="text" name="second_last_name" placeholder="Segundo Apellido" onChange={(e) =>setSecondLastName(e.target.value)} value={secondLastName} className="font-bona-nova-regular 
              shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200
               focus:border-amber-500" required/>

              <input type="text" name="identification" placeholder="Identificación" onChange={(e) =>setIdentification(e.target.value)} value={identification} className="font-bona-nova-regular
               shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none
                focus:ring-amber-200 focus:border-amber-500" required />

              <input type="email" name="email" placeholder="Correo Electrónico" onChange={(e) =>setEmail(e.target.value)} value={email}  className="font-bona-nova-regular
               shadow-sm rounded-md w-full px-3 py-2 border
                border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" required />

              <input type="password" name="password" placeholder="Contraseña" onChange={(e) =>setPassword(e.target.value)} value={password} className="font-bona-nova-regular
               shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
               focus:outline-none focus:ring-amber-200 focus:border-amber-500" required />
               <PasswordStrength password={password} />
              
              <select name="payment_method" onChange={(e) =>setPaymentMethod(e.target.value)} value={paymentMethod}  className="font-bona-nova-regular 
              shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none
               focus:ring-amber-200 focus:border-amber-500" required>

                <option value="">Seleccione un método de pago</option>
                <option value="card">Tarjeta de Crédito o Débito</option>
                <option value="cash_payment">Efectivo</option>
             
              </select>

              <input type="text" name="address" placeholder="Dirección" onChange={(e) =>setAddress(e.target.value)} value={address} className="font-bona-nova-regular
               shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200
                focus:border-amber-500" required />

              <input type="text" name="cell_phone_number" placeholder="Número de Celular " onChange={(e) =>setCellPhoneNumber(e.target.value)} value={cellPhoneNumber}  className="font-bona-nova-regular
               shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200
                focus:border-amber-500" required />
              {error && <p className='text-red-500 mb-4 font-bona-nova-regular text-sm'>{error}</p>}

              <button 
                disabled={isLoading}
                type="submit" 
                className="w-full font-bona-nova-regular flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-[#A36725] hover:bg-[#a37b25] 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
              {isLoading ? (
                        <Loader className='w-6 h-6 animate-spin mx-auto' />
                      ) : (
                        "Registrarse"
                      )}
              </button>
              <Link to="/login" className="text-amber-700 hover:underline font-bona-nova-regular text-sm">O inicia sesión</Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;