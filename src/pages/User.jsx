import { useState, useEffect } from 'react';
import { Mail, Lock, Loader } from "lucide-react";
import { createStore } from '../store/createStore';
import Swal from 'sweetalert2'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [identification, setIdentification] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [appointment, setAppointment] = useState("");

  const { createUser, isLoading, error } = createStore();

  useEffect(() => {
    if (role === "seller") {
      setAppointment("");
    } else if (role === "administrative") {
      setAppointment("");
    }
  }, [role]);

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (password.length < 12) {
      Swal.fire("La contraseña debe tener al menos 12 caracteres", "", "error");
      return;
    }

    try {
      await createUser(firstName, secondName, firstLastName, secondLastName, identification, email, password, role, appointment);
          Swal.fire("Usuario creado con éxito!", "", "success");
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
<Header></Header>
    <div className="flex h-screen font-bona-nova-regular">
      <Sidebar></Sidebar>
  <div className="bg-white rounded-lg max-w-md z-10 min-h-[400px] w-auto p-10">
    
    <h1 className="text-2xl font-bold mb-4 font-amarante-regular">Crear Usuarios</h1>

    <form onSubmit={handleCreate} className="space-y-4 absolute mr-20">
      <input 
        type="text" 
        name="first_name" 
        placeholder="Primer Nombre" 
        onChange={(e) => setFirstName(e.target.value)} 
        value={firstName} 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required 
      />
      <input 
        type="text" 
        name="second_name" 
        placeholder="Segundo Nombre" 
        onChange={(e) =>setSecondName(e.target.value)} 
        value={secondName}  
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
      />
      <input 
        type="text" 
        name="first_last_name" 
        placeholder="Primer Apellido" 
        onChange={(e) =>setFirstLastName(e.target.value)} 
        value={firstLastName}  
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required 
      />
      <input 
        type="text" 
        name="second_last_name" 
        placeholder="Segundo Apellido" 
        onChange={(e) =>setSecondLastName(e.target.value)} 
        value={secondLastName} 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required
      />
      <input 
        type="text" 
        name="identification" 
        placeholder="Identificación" 
        onChange={(e) =>setIdentification(e.target.value)} 
        value={identification} 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Correo Electrónico" 
        onChange={(e) =>setEmail(e.target.value)} 
        value={email}  
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Contraseña" 
        onChange={(e) =>setPassword(e.target.value)} 
        value={password} 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required 
      />
      
      <select 
        name="role" 
        onChange={(e) => setRole(e.target.value)} 
        value={role}  
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required
      >
        <option value="">Seleccione un rol</option>
        <option value="seller">Vendedor</option>
        <option value="administrative">Administrativo</option>
      </select>

      <select 
        name="appointment" 
        onChange={(e) => setAppointment(e.target.value)} 
        value={appointment} 
        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-amber-200 focus:border-amber-500" 
        required
      >
        <option value="">Seleccione un cargo</option>
        {role === "seller" && (
          <option value="cashier">Cajero</option>
        )}
        {role === "administrative" && (
          <>
            <option value="programmer">Programador</option>
            <option value="owner">Propietario</option>
            <option value="technical support">Soporte Técnico</option>
            <option value="tester">Testeador</option>
          </>
        )}
      </select>

      {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}

      <button 
        disabled={isLoading}
        type="submit" 
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        {isLoading ? (
          <Loader className='w-6 h-6 animate-spin mx-auto' />
        ) : (
          "Crear"
        )}
      </button>
    </form>
  </div>
</div>
<Footer></Footer>
    </>
  );
};

export default CreateUser;