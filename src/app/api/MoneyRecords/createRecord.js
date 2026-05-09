import Cookies from 'js-cookie';


import { apiRequest } from "@/app/api/AuthService/helperService";

export const createMoneyRecord = async (recordData) => {
  try {
    const response = await apiRequest(
      `/api/money-records`,
      {
        method: "POST",
        body: JSON.stringify(recordData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create money record");
    }

    return await response.json();
  } catch (error) {
    console.error("Create money record error:", error);
    throw error;
  }
};