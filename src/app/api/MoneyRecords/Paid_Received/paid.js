const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const ChangetoPaid = async (recordId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/money-records/mark-as-paid/${recordId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // ✅ Handle specific 200 error
    if (response.status === 200) {
      return {
        success: true,
        message: "Mark as paid successfully",
      };
    }

    if (!response.ok) {
      throw new Error("Failed to toggle money record status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("money record error:", error);
    throw error;
  }
};