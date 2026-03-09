const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const createInvestor = async (investorData) => {
  try {
    const response = await fetch(`${BASE_URL}/Investors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(investorData),
    });

    if (!response.ok) {
      throw new Error("Failed to create investor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create investor error:", error);
    throw error;
  }
};