import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API URL:", process.env.NEXT_PUBLIC_API_URI);
export default apiClient;