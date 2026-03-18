const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const editInvestor = async ( id, investorData) => {
  try {
    const response = await fetch(`${BASE_URL}/Investors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(investorData),
    });

    if (!response.ok) {
      throw new Error("Failed to edit investor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Edit investor error:", error);
    throw error;
  }
};