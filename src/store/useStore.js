import { create } from 'zustand';
import axios from 'axios';
import clientAxios from '../config/axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

export const useStore = create((set, get) => ({

  products: [],
  cart: [],
  search: '',
  sortOrder: '',
  sortBy: 'price',
  page: 1,
  hasMore: true,
  loading: false,
  user: null, 
  total:0,
  error: null,
  isLoading: false,

  clearCart: () => set({ cart: [] }),
  setSearch: (search) => set({ search }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSortBy: (sortBy) => set({ sortBy }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setLoading: (loading) => set({ loading }),
  
  fetchProducts: async () => {
    const { page, sortBy, sortOrder, search, loading } = get();
    if (loading) return;
  
    set({ loading: true });
    try {
      let url = `${API_URL}/tradicion/product`;
  
      if (search) {
        url = `${API_URL}/tradicion/productUnique/${encodeURIComponent(search)}`;
      } else {
        const queryParams = new URLSearchParams({
          limit: 12,
          skip: (page - 1) * 12,
          sortBy,
          order: sortOrder,
        }).toString();
  
        url += `?${queryParams}`;
      }
  
      console.log("Fetching from:", url);
      const response = await axios.get(url, { withCredentials: false });
      console.log("Fetched products:", response.data);
  
      set({
        products: response.data, 
        hasMore: response.data.length >= 12,
      });
    } catch (error) {
			set({ error: error.response.data.message || "Error obteniendo productos", isLoading: false });

    } finally {
      set({ loading: false });
    }
  },

  createProduct: async (name, description, price, stock, img, categoryName) => {
    try {
      set({ isLoading: true, error: null });
      const response = await clientAxios.post(`/tradicion/product`, {
        name, description, price, stock, img, categoryName
      });
      console.log("Producto creado:", response.data);
      await get().fetchProducts(); 
      set({ isLoading: false });
    } catch (error) {
      console.error("Error creating product:", error);
			set({ error: error.response.data.message || "Error creando producto", isLoading: false });
      setTimeout(() => set({ error: null }), 3000);
    }
  },
  
  updateProduct: async (id, name, description, price, stock, img, categoryName) => {
    try {
        set({ isLoading: true, error: null });
        const response = await clientAxios.put(`/tradicion/product/${id}`, {
            name, description, price, stock, img, categoryName
        });
        console.log("Product updated:", response.data);
        await get().fetchProducts(); 
    } catch (error) {
        console.error("Error updating product:", error);
        set({ error: error.response.data.message || "Error modificando producto", isLoading: false });
        setTimeout(() => set({ error: null }), 3000);
    } finally {
        set({ isLoading: false });
    }
},

  deleteProduct: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const response = await clientAxios.delete(`/tradicion/product/${id}`);
      
      console.log("Producto eliminado:", response.data);

      set(prevState => ({
        products: prevState.products.filter(product => product.id !== id)
      }));

      
      await get().fetchProducts(); 
      set({ isLoading: false });
    } catch (error) {
      console.error("Error deleting product:", error);
			set({ error: error.response.data.message || "Error eliminando producto", isLoading: false });
    }
  },

  changeAvailable: async (id, stock) => {
    try {
      const response = await clientAxios.put(`/tradicion/product/${id}`, {stock});
      set({ isLoading: true, error: null });
      console.log("Product updated:", response.data);
      await get().fetchProducts(); 
      set({ loading: false });

    } catch (error) {
      console.error("Error updating product:", error);
			set({ error: error.response.data.message || "Error modificando producto", isLoading: false });
    }
  },


  addToCart: async (product) => {
    const { cart,calculateTotal } = get();

    const existingProduct = cart.find((item) => item.id === product.id);

    const updatedCart = existingProduct
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    set({ cart: updatedCart });
    calculateTotal(updatedCart);
  },

  updateCartQuantity: async (id, increment) => {
    const { cart } = get();
    const {calculateTotal} =get();
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max((item.quantity || 1) + increment, 1),
          }
        : item
    );

    set({ cart: updatedCart });
    calculateTotal(updatedCart);
  },

  removeCartItem: (id) => {
    const { cart, calculateTotal } = get();
  
    const updatedCart = cart.filter((item) => item.id !== id);
  
    set({ cart: updatedCart });
    calculateTotal(updatedCart);
  },

  calculateTotal : (items) => {
    console.log('Calculating total')
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    set({total: totalAmount});
  },

  sendOrder: async (emailUser, subtotalAllProducts, products) => {
    try {
      set({ isLoading: true, error: null });
      const response = await clientAxios.post(`/tradicion/order`, {
        emailUser: emailUser,
        subtotalAllProducts: parseFloat(subtotalAllProducts),
        products: products,
      });

      console.log("Orden enviada:", response.data);
      set({ loading: false });

    } catch (error) {
      console.error("Error en la solicitud:", error.response?.data || error.message);
			set({ error: error.response.data.message || "Error enviando orden", isLoading: false });
      setTimeout(() => set({ error: null }), 3000);
    }  

  }
  

}));

export default useStore;
