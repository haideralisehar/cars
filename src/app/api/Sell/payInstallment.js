const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const payInstallment = async (Id) => {
  try {
    const response = await fetch(`${BASE_URL}/Sales/pay-installment/${Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //   body: JSON.stringify(payData),
    });

    if (!response.ok) {
      throw new Error("Failed to create installment payment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create installment payment error:", error);
    throw error;
  }
};