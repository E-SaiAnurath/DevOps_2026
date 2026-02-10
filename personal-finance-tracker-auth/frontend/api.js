import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token to every request (if exists)
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // or localStorage
 if (token) config.headers.Authorization = `Bearer ${token}`;


  return config;
});

// If token expired/invalid -> auto logout + redirect
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      // simple redirect (works even outside React components)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;