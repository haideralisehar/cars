const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const getMoneyRecord = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/money-records/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch money record");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching record:", error);
    return [];
  }
};

