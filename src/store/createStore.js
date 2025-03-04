import { create } from "zustand";
import clientAxios from "../config/axios";

clientAxios.defaults.withCredentials = true;

export const createStore = create((set) => ({
	
	user: null,
	error: null,
	isLoading: false,
	message: null,
	users:[],


	createUser: async (first_name, second_name, first_last_name, second_last_name,
		identification, email, password, role, appointment) => {
	   set({ isLoading: true, error: null });
	   try {
		   const response = await clientAxios.post(`/api/user`, { first_name, second_name, first_last_name, second_last_name,
			identification, email, password, role, appointment });
		   set({ user: response.data.user, isAuthenticated: true, isLoading: false });
	   } catch (error) {
		   set({ error: error.response.data.message || "Error creando usuario, revisa los campos", isLoading: false });
		   setTimeout(() => set({ error: null }), 3000);
	   }
   },

   getAllUsers: async () => {
   set({ isLoading: true, error: null });
   try {
	   const response = await clientAxios.get(`/api/user`);
	   set({ users: response.users, isAuthenticated: true, isLoading: false });
   } catch (error) {
	   set({ error: error.response.data.message || "Error obteniendo", isLoading: false });
	   setTimeout(() => set({ error: null }), 3000);
   }
},
	
}));
