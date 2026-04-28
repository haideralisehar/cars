const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const createReminder = async (value) => {
  try {
    const response = await fetch(`${BASE_URL}/Reminders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      throw new Error("Failed to create reminder");
    }

    if (response.status === 200) {
      return { success: true, message: "Reminder created successfully" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create reminder error:", error);
    throw error;
  }
};