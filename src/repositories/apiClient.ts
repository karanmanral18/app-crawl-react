import axios from "axios";

const host = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: host,
});

export default apiClient;
