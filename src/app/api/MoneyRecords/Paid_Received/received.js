import Cookies from 'js-cookie';
  
const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const ChangetoReceived = async (recordId) => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(
      `${BASE_URL}/money-records/mark-as-received/${recordId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    // ✅ Handle specific 400 error
    if (response.status === 400) {
      throw new Error("no receivable record found for this money record");
    }
    // ✅ Handle specific 200 error
    if (response.status === 200) {
      return {
        success: true,
        message: "Mark as Received successfully",
      };
    }

    if (!response.ok) {
      throw new Error("Failed to create money record log activity");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("money record error:", error);
    throw error;
  }
};