const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

// Update your API function to return the response properly
export const uploadAdditoinal = async (docx) => {
  const response = await fetch(`${BASE_URL}/cars/upload-additional-document`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docx),
  });

  if (!response.ok) {
    throw new Error(`Failed to upload docx: ${response.status}`);
  }

  // For 204 No Content, return a success object
  if (response.status === 204) {
    return { success: true, message: "Document uploaded successfully" };
  }

  // For 200 OK with JSON response
  const data = await response.json();
  return { success: true, data };
};