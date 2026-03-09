export const logoutUser = async () => {
  try {
    const response = await fetch(
      "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Auth/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Logout response:", data.success);
    localStorage.setItem("logout", data.success); // Trigger logout across tabs


  } catch (error) {
    console.error("Logout API error:", error);
  }

  // Remove cookies
  deleteCookie("token");
  deleteCookie("refreshToken");


  // Redirect
  window.location.href = "/";
};

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}