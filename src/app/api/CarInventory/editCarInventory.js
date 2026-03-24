
const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const editInventory = async (id, inventoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryData),
    });

    const contentType = response.headers.get("content-type");

    // Read response safely
    const data = contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(data || "Failed to edit inventory");
    }

    return data;
  } catch (error) {
    console.error("Edit inventory error:", error.message);
    throw error;
  }
};