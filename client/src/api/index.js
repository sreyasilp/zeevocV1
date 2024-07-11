import API from './apiClient';

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
export const forgotPassword = (email) => API.post(`user/forgot-password`, email);
export const resetPassword = (data) => API.post(`user/reset-password`, data);
export const updateProfile = (userEmail, profileData) => API.put(`user/${userEmail}`, profileData);
export const getProfile = (userEmail) => API.get(`user/${userEmail}`);
export const getAllUsers = () => API.get("/user/all");
export const getUserDetails = () => API.get("user/get-user");

// Blog APIs
export const createBlogPost = (data) => API.post("/blog/create", data);
export const getAllBlogPosts = () => API.get("/blog/all");
export const getBlogPostById = (id) => API.get(`/blog/getbyid/${id}`);
export const getBlogByUrlKey = (urlKey) => API.get(`/blog/${urlKey}`);
export const updateBlogPost = (id, data) => API.patch(`/blog/updatebyid/${id}`, data);
export const deleteBlogPost = (id) => API.delete(`/blog/deletebyid/${id}`);

// Extension APIs
export const createExtension = (data) => API.post("/extension/create", data);
export const getAllExtensions = () => API.get("/extension/all");
export const getExtensionById = (id) => API.get(`/extension/getbyid/${id}`);
export const getExtensionByUrlKey = (urlKey) => API.get(`/extension/${urlKey}`);
export const updateExtension = (id, data) => API.patch(`/extension/${id}`, data);
export const deleteExtension = (id) => API.delete(`/extension/deletebyid/${id}`);

// Order APIs
export const createOrder = (orderData) => API.post(`/orders`, orderData);
export const getAllOrders = () => API.get(`/orders`);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getOrdersByUserId = (userId) => API.get(`/orders/user/${userId}`);
export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

// Payment APIs
export const createPaymentOrder = (orderData) => API.post(`/payment/createrporder`, orderData);
export const postPaymentSuccess = (orderData) => API.post(`/payment/success`, orderData);

// Service APIs
export const createService = (data) => API.post("/service/create", data);
export const getAllServices = () => API.get("/service/all");
export const getServiceById = (id) => API.get(`/service/getbyid/${id}`);
export const getServiceByUrlKey = (urlKey) => API.get(`/service/${urlKey}`);
export const updateService = (id, data) => API.patch(`/service/updatebyid/${id}`, data);
export const deleteService = (id) => API.delete(`/service/deletebyid/${id}`);

// Additional User APIs
export const refreshToken = (data) => API.post("/user/refresh-token", data);
