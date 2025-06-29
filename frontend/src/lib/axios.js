import axios from "axios";

// Create a new axios instance
const api = axios.create({
    baseURL: "http://localhost:2121/api",
    withCredentials: true,
});

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Don't redirect if on public pages (home, login, register)
            const publicPages = ["/", "/login", "/register"];
            const currentPath = window.location.pathname;
            
            if (!publicPages.includes(currentPath)) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)

export default api;