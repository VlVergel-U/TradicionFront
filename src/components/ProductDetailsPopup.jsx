// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ProductDetailsPopup = ({ product, onClose }) => {
  if (!product) return null;

  const categoryMap = {
    'cold drinks': 'Bebidas frías',
    'hot drinks': 'Bebidas calientes',
    'salty food': 'Comida salada',
    'sweet food': 'Comida dulce',
    'desserts': 'Postres'
  };

  return (
    <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover my-4 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-gray-800 font-semibold mb-2">Price: ${product.price}</p>
          <p className="text-gray-700 mb-2">
            Category: <span className="font-medium text-amber-600">{categoryMap[product.category.name] || product.category.name}</span>
          </p>
          <p className="text-gray-700">
            Availability: {product.stock > 0 ? <span className="text-green-600 font-medium">Disponible</span> : <span className="text-red-600 font-medium">No disponible</span>}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
  );
};

export default ProductDetailsPopup;
