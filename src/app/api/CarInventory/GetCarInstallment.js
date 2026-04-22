// /app/api/Sales/getInstallments.ts
const API_BASE_URL = 'https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net';

export async function getCarInstallments(carId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cars/purchase-installments/car/${carId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch installments: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching installments:', error);
    throw error;
  }
}