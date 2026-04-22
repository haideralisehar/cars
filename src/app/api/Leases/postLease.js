const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const createLease = async (leaseData) => {
  try {
    const response = await fetch(`${BASE_URL}/Lease/add-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leaseData),
    });

    if (!response.ok) {
      throw new Error("Failed to create lease");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create lease error:", error);
    throw error;
  }
};