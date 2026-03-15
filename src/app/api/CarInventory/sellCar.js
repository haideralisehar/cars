const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const soldCar = async (soldCarData) => {
  try {
    const response = await fetch(`${BASE_URL}/cars/sell`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(soldCarData),
    });

    console.log("Response status:", soldCarData);

    if (!response.ok) {
      throw new Error("Failed to create inventory item", response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create inventory item error:", error);
    throw error;
  }
};