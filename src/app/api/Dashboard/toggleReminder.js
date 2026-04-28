const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const toggleReminder = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Reminders/complete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //   body: JSON.stringify({ isCompleted: true }),
    });


    if (!response.ok & response.status === 400) {
      return { success: false, message: "Reminder Already Marked."};
    }

     if (!response.ok) {
      return { success: false, message: "Failed to mark reminder status"};
    }

    if (response.status === 200) {
      return { success: true, message: "Reminder status marked successfully"};
    }

    

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Toggle reminder error:", error);
    throw error;
  }
};