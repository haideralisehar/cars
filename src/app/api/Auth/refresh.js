import Cookies from "js-cookie";
export const refreshToken = async () => {
  try {
    const response = await fetch(
      "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Auth/refresh",
      {
        method: "POST",
        credentials: "include", // sends refreshToken cookie automatically
      }
    );

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const data = await response.json();

    // Store token in cookies
          Cookies.set("token", data.token, {
            expires: 14,
            secure: true,
            sameSite: "strict",
          });

    return data.token;

  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};