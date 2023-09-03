import axios from "axios";

const API = axios.create({ baseURL: " http://localhost:4444" });

export const signUp = (formData) => API.post("/user/signup/userType", formData);
export const signIn = (formData) => API.post("/user/signin", formData);

