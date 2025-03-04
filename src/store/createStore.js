import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api/auth";

axios.defaults.withCredentials = true;

export const createStore = create((set) => ({
	
	user: null,
	error: null,
	isLoading: false,
	message: null,


	createUser: async (first_name, second_name, first_last_name, second_last_name,
		identification, email, password, role, appointment) => {
	   set({ isLoading: true, error: null });
	   try {
		   const response = await axios.post(`${API_URL}/user`, { first_name, second_name, first_last_name, second_last_name,
			identification, email, password, role, appointment });
		   set({ user: response.data.user, isAuthenticated: true, isLoading: false });
	   } catch (error) {
		   set({ error: error.response.data.message || "Error creando usuario, revisa los campos", isLoading: false });
		   throw error;
	   }
   },
	
}));
