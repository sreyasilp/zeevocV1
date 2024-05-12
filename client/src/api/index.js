import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4444/" });
// const API = axios.create({ baseURL: "https://zeevoc-server.onrender.com" });

export const signUp = (formData) => API.post("/user/signup/userType", formData);
export const signIn = (formData) => API.post("/user/signin", formData);

export const getBlogList = (page) => API.get(`blog/all`);
export const getAllServices = (page) => API.get(`service/all`);
export const getAllExtensions = (page) => API.get(`extension/all`);
