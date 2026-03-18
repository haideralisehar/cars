export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(
      "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/cars/upload-image",
      {
        method: "POST",
        body: formData
      }
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    console.log(data);

    return data.url; // Assuming the API returns the image URL in a 'url' field

  } catch (error) {
    console.error("Upload error:", error);
  }
};