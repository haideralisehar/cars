const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

// 🔹 Get logged-in investor (requires Bearer token)
export const getMyInvestor = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/Investors/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Important
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current investor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current investor:", error);
    return null;
  }
};

