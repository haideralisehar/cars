import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = Cookies.get("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    return {
      role: decoded.role,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};