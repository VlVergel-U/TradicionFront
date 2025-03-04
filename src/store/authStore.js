import { create } from "zustand";
import axios from "axios";
import clientAxios from "../config/axios";

clientAxios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	token: localStorage.getItem("token") || null,

	register: async (first_name, second_name, first_last_name, second_last_name,
		 identification, email, password, payment_method, address, cell_phone_number) => {
		set({ isLoading: true, error: null });
		try {
			const response = await clientAxios.post(`/auth/register`, { first_name, second_name, first_last_name, second_last_name,
				identification, email, password, payment_method, address, cell_phone_number });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await clientAxios.post(`/auth/login`, { email, password });
			const token = response.data.token;
			const expiresIn = 20 * 60 * 1000; //20 minutes for testing
            const expirationTime = Date.now() + expiresIn;

			localStorage.setItem('token', token);
			localStorage.setItem("tokenExpiration", expirationTime);
			localStorage.setItem('email', email)
			localStorage.setItem('role', response.data.role);


			clientAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
				email:email,
				token
			});
			
		} catch (error) {
			set({ error: error.response?.data?.message || "Error iniciando sesión", isLoading: false });
			throw error;
		}
	},

	logout: async (navigate) => {
		set({ isLoading: true, error: null });
		try {
			localStorage.removeItem("token");
			localStorage.removeItem("tokenExpiration");
			localStorage.removeItem('email');
			set({ user: null, isAuthenticated: false, isLoading: false, token:null });
			navigate("/login");
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

	checkAuth: () => {
			const token = localStorage.getItem("token");
			const expirationTime = localStorage.getItem("tokenExpiration");

			if (token && expirationTime) {
				if (Date.now() >= Number(expirationTime)) {
					localStorage.removeItem("token");
					localStorage.removeItem("tokenExpiration");
					localStorage.removeItem('email');

					set({ isAuthenticated: false, token: null });
					window.location.reload();
				} else {
					axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
					set({ isAuthenticated: true, token });
				}
			} else {
				set({ isAuthenticated: false, token: null });
			}
		}
	
}));
