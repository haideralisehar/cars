const BASE_URL = "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net";
import Cookies from 'js-cookie';
import { refreshToken } from '@/app/api/Auth/refresh';

export const apiRequest = async (url, options = {}, retry = true) => {
  const accessToken = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    // If unauthorized → try refresh token
    if (response.status === 401 && retry) {
      const newToken = await refreshToken();

      if (newToken) {
        // Retry original request with new token
        return apiRequest(url, options, false);
      } else {
        // Logout user if refresh fails
        handleLogout();
        return null;
      }
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};