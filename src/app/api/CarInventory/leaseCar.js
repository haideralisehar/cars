const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const leaseCar = async (leaseCarData) => {
  try {
    const response = await fetch(`${BASE_URL}/Lease/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leaseCarData),
    });

    console.log("Response status:", leaseCarData);

    if (!response.ok) {
      throw new Error("Failed to create lease item", response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create lease item error:", error);
    throw error;
  }
};