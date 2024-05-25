import API from './apiClient';

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
export const forgotPassword = (email) => API.post(`user/forgot-password`, email);
export const resetPassword = (data) => API.post(`user/reset-password`, data);
export const updateProfile = (userEmail, profileData) => API.put(`user/${userEmail}`, profileData);
export const getBlogList = (page) => API.get(`blog/all`);
export const getProfile = (userEmail) => API.get(`user/${userEmail}`);
export const getAllServices = (page) => API.get(`service/all`);
export const getAllOrders = (page) => API.get(`orders`);
export const getOrdersByUserId = (userId) => API.get(`orders/user/${userId}`);
export const getAllExtensions = (page) => API.get(`extension/all`);
export const getServiceById = (serviceId) => API.get(`service/getbyid/${serviceId}`);
export const getBlogById = (blogId) => API.get(`blog/getbyid/${blogId}`);
export const getExtensionById = (extensionId) => API.get(`extension/getbyid/${extensionId}`);
export const createPaymentOrder = (orderData) => API.post(`payment/createrporder`, orderData);
export const createOrder = (orderData) => API.post(`orders`, orderData);
export const postPaymentSuccess = (orderData) => API.post(`/payment/success`, orderData);

