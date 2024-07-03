import jwtDecode from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
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
export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  const googleLogin = localStorage.getItem("googleLogin");
  console.log(token)
  if (!token) return null;
  if (googleLogin) {
    console.log("gl", true);
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch user details from Google API');
      }
      const userInfo = await response.json();
      console.log(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Failed to fetch Google user details", error);
      return null;
    }
  } else {
    console.log("gl", false);
    try {
      const userDetails = jwtDecode(token);
      console.log(userDetails)
      return userDetails;
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  }
};
