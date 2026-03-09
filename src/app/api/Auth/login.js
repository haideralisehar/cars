import Cookies from "js-cookie";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: data?.message || "Login failed",
      };
    }

    // Handle Unauthorized
    if (response.status === 401) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Handle other errors
    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Login failed",
      };
    }

    // Success
    if (data.success) {
      const token = data.token;

      Cookies.set("token", token, {
        expires: 14,
        secure: true,
        sameSite: "strict",
      });

      console.log("Login success");

      return {
        success: true,
        data: data,
      };
    }

  } catch (error) {
    console.error("Login error:", error.message);

    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};