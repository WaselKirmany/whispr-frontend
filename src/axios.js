import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://whispr-backend.vercel.app/api",
  withCredentials: true, // This is important for sending cookies
});
