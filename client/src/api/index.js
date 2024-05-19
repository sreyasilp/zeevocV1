import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:4444/" });
const API = axios.create({ baseURL: "https://zeevoc-server.onrender.com" });

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);

export const getBlogList = (page) => API.get(`blog/all`);
export const getProfile = (userEmail) => API.get(`user/${userEmail}`);
export const getAllServices = (page) => API.get(`service/all`);
export const getAllOrders = (page) => API.get(`orders`);
export const getAllExtensions = (page) => API.get(`extension/all`);
export const getServiceById = (serviceId) => API.get(`service/getbyid/${serviceId}`);
export const getBlogById = (blogId) => API.get(`blog/getbyid/${blogId}`);
export const getExtensionById = (extensionId) => API.get(`extension/getbyid/${extensionId}`);

// New API endpoint for creating payment orders
export const createPaymentOrder = (orderData) => API.post(`payment/orders`, orderData);

export const updateProfile = (userEmail, profileData) => API.put(`user/${userEmail}`, profileData);
