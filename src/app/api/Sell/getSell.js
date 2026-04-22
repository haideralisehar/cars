const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const getSales = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Sales`);

    if (!response.ok) {
      throw new Error("Failed to fetch Sales");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Sales:", error);
    return [];
  }
};

