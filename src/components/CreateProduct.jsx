import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import useStore from "../store/useStore";
import { Loader } from "lucide-react";

const CreateProductModal = ({ isOpen, onClose, productToEdit}) => {

    const { createProduct, isLoading, error, updateProduct } = useStore();
    const [name, setName] = useState(productToEdit ? productToEdit.name : "");
    const [price, setPrice] = useState(productToEdit ? productToEdit.price : "");
    const [description, setDescription] = useState(productToEdit ? productToEdit.description : "");
    const [category, setCategory] = useState(productToEdit ? productToEdit.category.name : "");
    const [img, setImg] = useState(productToEdit ? productToEdit.img : "");
    const [stock, setStock] = useState(productToEdit ? productToEdit.stock.toString() : "1");
    const [errors, setErrors] = useState({});
  
    if (!isOpen) return null;
  
    const handleAddProduct = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      try {
          if (productToEdit) {
              await updateProduct(productToEdit.id, name, description, price, Number(stock), img, category);
          } else {
              await createProduct(name, description, price, Number(stock), img, category);
          }
          onClose();
      } catch (error) {
          console.log(error);
      }
  };
  
    const validateForm = () => {
      let newErrors = {};
      if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
      if (!price || isNaN(price) || Number(price) <= 0)
        newErrors.price = "El precio debe ser un número válido.";
      if (!description.trim()) newErrors.description = "La descripción es obligatoria.";
      if (!category) newErrors.category = "Selecciona una categoría.";
      if (!img.trim()) newErrors.img = "La URL de la imagen es obligatoria.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
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
              <h2 className="text-xl font-bold text-gray-800">{productToEdit ? "Modificar Producto" : "Agregar Producto"}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
  
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre del producto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
  
              <div>
                <input
                  type="number"
                  name="price"
                  placeholder="Precio (COP)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>
  
              <div>
                <input
                  type="text"
                  name="description"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
  
              <div>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded bg-white cursor-pointer"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="cold drinks">Bebidas frías</option>
                  <option value="hot drinks">Bebidas calientes</option>
                  <option value="salty food">Comida salada</option>
                  <option value="sweet food">Comida dulce</option>
                  <option value="desserts">Postres</option>

                </select>

                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

              </div>
  
              <div>
                <input
                  type="text"
                  name="img"
                  placeholder="URL de la imagen"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}
              </div>
  
              <div>
                <label className="block text-gray-700">Disponibilidad:</label>
                <select
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-2 border rounded bg-white cursor-pointer"
                >
                  <option value="1">Disponible</option>
                  <option value="0">No disponible</option>
                </select>
              </div>
              {error && <p className='text-red-500 mb-4 font-bona-nova-regular text-sm'>{error}</p>}
  
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition cursor-pointer"
              >
                {isLoading ? (
                  <Loader className='w-6 h-6 animate-spin mx-auto' />
                ) : (
                  productToEdit ? "Actualizar producto" : "Agregar producto"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  export default CreateProductModal;