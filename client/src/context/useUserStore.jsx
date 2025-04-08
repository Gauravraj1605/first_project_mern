// src/store/userStore.js
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseUrl = "http://localhost:5000/api"; // Update this with env in production

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  checkingAuth: true,

  // Register (Signup)
  register: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, formData);
      toast.success(res.data.message || "Registration successful");
      
      set({ user: res.data.user, loading: false });
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
      set({ loading: false });
    }
  },

  // Login
  login: async ({ emailOrMobile, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        `${baseUrl}/auth/login`,
        { emailOrMobile, password },
        { withCredentials: true }
      );

      if (res.data.success === true) {
        toast.success(res.data.message || "Login successful");
        console.log(res.data);
        set({ user: res.data.user, loading: false });
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } else {
        toast.error("Login failed, please check your credentials");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      set({ loading: false });
    }
  },

  // Check auth status on app load
  checkAuth: async () => {
    set({ checkingAuth: true });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser), checkingAuth: false });
    } else {
      set({ user: null, checkingAuth: false });
    }

    // Optional: If you want to validate token/session with backend:
    // try {
    //   const res = await axios.get(`${baseUrl}/auth/profile`, { withCredentials: true });
    //   set({ user: res.data.user, checkingAuth: false });
    // } catch (err) {
    //   set({ user: null, checkingAuth: false });
    //   localStorage.removeItem('user');
    // }
  },

  // Logout
  logout: async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });
      toast.success("Logged out");
      set({ user: null });
      localStorage.removeItem('user');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  },
}));