import Cookies from 'js-cookie';


const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const createMoneyRecord = async (recordData) => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(`${BASE_URL}/money-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(recordData),
    });

    if (!response.ok) {
      throw new Error("Failed to create money record");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create money record error:", error);
    throw error;
  }
};