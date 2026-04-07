export async function getRioWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-22.9068&longitude=-43.1729&current=temperature_2m,weather_code"
    );
    return await response.json();
  } catch {
    return null;
  }
}