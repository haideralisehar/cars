const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const toggleUserStatus = async (userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/Users/${userId}/toggle-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle user status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Toggle status error:", error);
    throw error;
  }
};