import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = getCookie('token');
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};

export const getUserDetails = () => {
    const token = getCookie('token');
    console.log("token"+token)
    if (!token) return null;

    try {
        const userDetails = jwtDecode(token);
        return userDetails;
    } catch (e) {
        return null;
    }
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log(value+"valtok")
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};
