// const BASE_URL =
//   "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

// export const addInventory = async (inventoryData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/cars`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(inventoryData),
//     });

//     console.log("Response status:", inventoryData);

//     if (!response.ok) {
//       throw new Error("Failed to create inventory item", response.status);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Create inventory item error:", error);
//     throw error;
//   }
// };

const BASE_URL =
  "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api";

export const addInventory = async (inventoryData) => {
  try {

    const formData = new FormData();

    Object.keys(inventoryData).forEach((key) => {
      const value = inventoryData[key];

      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await fetch(`${BASE_URL}/cars`, {
      method: "POST",
      body: formData
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create inventory item");
    }

    const data = await response.json();
    return data;

  } catch (error) {

    console.error("Create inventory item error:", error);
    throw error;

  }
};