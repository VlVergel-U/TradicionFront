import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Download } from 'lucide-react';
import { generateInvoicePDF } from "../helpers/generateInvoicePDF";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import clientAxios from "../config/axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log(localStorage.getItem("token"));

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      console.log("MIRA AQUI"+config)
      
      const response = await  clientAxios.get( "/tradicion/order", config);
  
      if (response.data.success) {
        setOrders(response.data.orders); 
        console.log(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen" id="Content">
          <div className="p-12 z-10 overflow-y-auto flex-1">
            <h1 className="text-2xl font-bold mb-4 font-amarante-regular">Pedidos</h1>
            {loading ? (
              <p className="text-gray-400">Cargando pedidos...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-400">No hay pedidos</p>
            ) : (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-800 rounded-lg p-4 shadow-lg flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        <span className="font-bold">Order ID:</span> {order.id}
                      </h2>
                      <p className="text-gray-400">
                        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-400">
                        <strong>Total:</strong> ₹{order.total_price.toFixed(2)}
                      </p>
                      <p className="text-gray-400">
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p className="text-gray-400">
                        <strong>Customer:</strong> {order.customer.first_name} {order.customer.first_last_name} {order.customer.second_last_name}
                      </p>
                      <div className="mt-2">
                        <p><strong>Product Details:</strong></p>
                        {order.orderDetails.map((product) => (
                          <div
                            key={product.id}
                            className="flex justify-between py-1"
                          >
                            <p>{product.product.name}</p>
                            <p>
                              ₹{product.unit_price.toFixed(2)} x {product.quantity} = ₹{product.subtotal.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Download
                      className="text-blue-500 cursor-pointer"
                      onClick={() => generateInvoicePDF(order)}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
