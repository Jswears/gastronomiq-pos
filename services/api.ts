// services/api.ts

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Create an axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors (e.g., for auth tokens, logging, etc.)
apiClient.interceptors.response.use(
  (response) => {
    // By default, axios returns the response object;
    // often we just want `response.data`.
    return response.data;
  },
  (error) => {
    // Here you can transform or log errors
    // (e.g. show a toast or return a user-friendly message)
    return Promise.reject(error);
  }
);

export default apiClient;
