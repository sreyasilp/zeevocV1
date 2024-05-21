import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    // const token = getCookie('token');
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token")
    if (!token) return null;

    try {
        const userDetails = jwtDecode(token);
        return userDetails;
    } catch (e) {
        return null;
    }
};

// NOT WORKING
// export const getCookie = (name) => {
//     const cookies = new Cookies();
//     let cookieValue = cookies.get("refreshToken");
//     console.log(cookieValue+"authutils")
//     return cookieValue;
// };