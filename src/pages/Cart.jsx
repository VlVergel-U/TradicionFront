import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";
import { useStore } from "../store/useStore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/SideBar.jsx";
import Swal from 'sweetalert2'

const Cart = () => {
  const { cart, updateCartQuantity, removeCartItem, total, sendOrder, error, clearCart} = useStore();
  const email = localStorage.getItem('email');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);


const handleOrder = async (e) => {
  e.preventDefault();
  const emailUser = email;
  const subtotal = total.toFixed(2);
  console.log("Email del usuario:", emailUser);
  console.log("Subtotal de la orden:", subtotal);
  const products = cart.map((product) => ({
    idProduct: product.id,
    quantity: product.quantity,
    priceUnity: product.price,
  }));
  console.log("Productos en el carrito:", products);
  
  try {
    await sendOrder(emailUser, subtotal, products);
    const role = localStorage.getItem('role')
    if(role == 'administrative' || role == 'seller'){
        Swal.fire("No estás autorizado para realizar pedidos", "", "danger");
    } else {
      clearCart(); 
      Swal.fire("Orden enviada!", "", "success");
    }

    
  } catch (err) {
    console.error("Error al enviar la orden:", err);
  }
};

  
  return (
    <>
    <Header></Header>
    <div className="flex h-screen">
      <Sidebar></Sidebar>
    <div className="flex-1 p-12 mx-10 z-10 overflow-y-auto h-screen" id="Content">
        <h1 className="text-2xl font-bold mb-4 font-amarante-regular">Carrito</h1>
        {loading ? (
          <p className="text-gray-400">Cargando carrito...</p>
        ) : cart.length === 0 ? (
          <p className="text-gray-400">Tu carro está vacío</p>
        ) : (
          <motion.div
            className="space-y-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cart.map((product) => (
              <div
                key={product.id}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <div className="text-gray-700 mt-2 flex items-center justify-between">
                    <p>${product.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                        disabled={product.quantity === 1}
                      >
                        <Minus className="w-4 h-4 text-gray-300" />
                      </button>
                      <span className="text-gray-800">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                      >
                        <Plus className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => removeCartItem(product.id)}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-lg p-4 mt-4 shadow-lg">
              <h2 className="text-lg font-semibold">Total</h2>
              <p className="text-gray-700">${total.toFixed(2)}</p>
              
            </div>
                    <button
      onClick={handleOrder}
          className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600  hover:to-amber-700 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Realizar pedido
        </button>
        {error && <p className='text-red-500 mb-4 font-bona-nova-regular text-sm'>{error}</p>}


          </motion.div>
        )}
    </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Cart;
