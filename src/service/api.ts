import axios from "axios";

const api = axios.create({
  baseURL: "https://api-calories.vercel.app/api",
});

export default api;
