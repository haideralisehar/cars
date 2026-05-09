import Cookies from 'js-cookie';
import { apiRequest } from '@/app/api/AuthService/helperService';
  
const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const ChangetoPaid = async (recordId) => {
  try {
    const response = await apiRequest(
      `/api/money-records/mark-as-paid/${recordId}`,
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Mark as paid successfully",
      };
    }

    if (!response.ok) {
      throw new Error("Failed to toggle money record status");
    }

    return await response.json();
  } catch (error) {
    console.error("money record error:", error);
    throw error;
  }
};