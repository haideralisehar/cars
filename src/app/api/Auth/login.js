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

    if (!response.ok) {
      throw new Error(data?.message || "Login failed");
    }

    if (data.success) {
      const token = data.token;

      // Store token in cookies
      Cookies.set("token", token, {
        expires: 14,
        secure: true,
        sameSite: "None",
      });
       // redirect to dashboard
     

      console.log("Login success");
      return data;
    }

  } catch (error) {
    console.error("Login error:", error.message);
  }
};