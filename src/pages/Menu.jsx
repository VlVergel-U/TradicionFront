import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";
import { Plus, Minus, ShoppingCart, Trash, Pencil } from "lucide-react";
import useStore from "../store/useStore";
import Sidebar from "../components/SideBar";
import ProductDetailsPopup from "../components/ProductDetailsPopup";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CreateProductModal from "../components/CreateProduct";
import Swal from 'sweetalert2'

const Menu = () => {
  
  const {
    products,
    cart,
    search,
    sortBy,
    sortOrder,
    page,
    hasMore,
    loading,
    setSearch,
    setPage,
    fetchProducts,
    addToCart,
    updateCartQuantity,
    deleteProduct,

  } = useStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const role = localStorage.getItem('role');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    console.log
  }, [page, sortBy, sortOrder, search, fetchProducts]);

  const handleScroll = useCallback(() => {
    const container = document.querySelector("#Content");
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
      setPage(page + 1);
    }
  }, [hasMore, loading, page, setPage]);

  useEffect(() => {
    const container = document.querySelector("#Content");
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleUpdateProduct = (event, product) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setIsAddOpen(true);
  };

  const handleAddToCartClick = (event, product) => {
    event.stopPropagation();
    addToCart(product);
  };

const handleDeleteProduct = async (event, id) => {
  event.stopPropagation();
  
  try {
    const result = await Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este producto?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    });

    if (result.isConfirmed) {
      await deleteProduct(id);
      Swal.fire("Producto eliminado con éxito!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Eliminación cancelada", "", "info");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Hubo un error al eliminar el producto";
    Swal.fire({
      title: '¡Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
};


  const handleUpdateCartQuantity = (event, productId, quantityChange) => {
    event.stopPropagation();
    updateCartQuantity(productId, quantityChange);
  };

  return (
    <>
    <Header></Header>
    <div className="flex h-screen font-bona-nova-regular">
      <Sidebar></Sidebar>
    <div className="flex-1 p-14 z-10 overflow-y-auto h-screen" id="Content">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearchChange}
          className="p-3 text-sm rounded-xl border border-gray-300 shadow-sm text-gray-800 w-full sm:w-1/2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <h1 className="text-2xl font-bold mb-4 font-amarante-regular">Menú</h1>

      {(role === "seller" || role === "administrative") && (
      <button
        className="bg-amber-800 text-white px-4 py-2 rounded-lg mb-4 cursor-pointer"
        onClick={() => setIsAddOpen(true)}
      >
        Agregar Producto
      </button>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-sm overflow-hidden shadow-md cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">

              <h2 className="text-lg font-medium">{product.name}</h2>
              {(product.stock != 1 ) && (
                <p className="text-red-900">No disponible</p>
              )}
              {(product.stock != 0 ) && (
                <p className="text-green-900">Disponible</p>
              )}
              <div className="text-gray-600 mt-2 flex items-center justify-between">
                <p>${product.price}</p>
                <div className="flex items-center gap-1">
                <div>
                      {role === 'customer'|| role === 'administrative' ? (
                        cart.find((item) => item.id === product.id) ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => handleUpdateCartQuantity(e, product.id, -1)}
                              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
                              disabled={
                                (cart.find((item) => item.id === product.id)?.quantity || 1) <= 1
                              }
                            >
                              <Minus className="w-4 h-4 text-gray-300" />
                            </button>
                            <span className="text-gray-700">
                              {cart.find((item) => item.id === product.id)?.quantity || 1}
                            </span>

                            <button
                              onClick={(e) => handleUpdateCartQuantity(e, product.id, 1)}
                              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
                            >
                              <Plus className="w-4 h-4 text-gray-300" />
                            </button>
                          </div>
                        ) : (
                        <button
                          onClick={(e) => handleAddToCartClick(e, product)} 
                          className={`p-2 z-20 rounded-full text-white ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500'}`}
                          disabled={product.stock === 0}
                        >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )
                      ) : (
                          null
                      )}
                    </div>

                  {(role === "seller" || role === "administrative") && (
                        <>
                          <button
                            onClick={(e) => handleUpdateProduct(e, product)}
                            className="p-2 z-20 rounded-full bg-amber-700 hover:bg-amber-800 text-white cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProduct(e, product.id)}
                            className="p-2 z-20 rounded-full bg-amber-900 hover:bg-amber-950 text-white cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </>
                      )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {loading && (
        <p className="text-gray-400 text-center mt-4">
          Cargando más productos...
        </p>
      )}

      {selectedProduct && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isAddOpen && (
        <CreateProductModal
          isOpen={isAddOpen}
          onClose={() => {
            setIsAddOpen(false); 
            setSelectedProduct(null);
          }}
          productToEdit={selectedProduct}
        />
      )}


    </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Menu;