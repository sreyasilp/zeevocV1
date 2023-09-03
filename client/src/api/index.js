import axios from "axios";

const API = axios.create({ baseURL: "https://zeevoc-server.onrender.com" });

export const signUp = (formData) => API.post("/user/signup/userType", formData);
export const signIn = (formData) => API.post("/user/signin", formData);

