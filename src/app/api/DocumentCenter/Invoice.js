const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const createInvoice = async (invoiceData) => {
  try {
    const response = await fetch(`${BASE_URL}/documents/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });
    

    if (!response.ok) {
      throw new Error("Failed to create document");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create create document error:", error);
    throw error;
  }
};