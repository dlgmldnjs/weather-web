// 현재 날씨 정보
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Missing city parameter" });
  }

  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    const currentRes = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
      },
    });

    const currentData = currentRes.data;

    const response = {
      city,
      current: {
        temp: currentData.main.temp,
        weather: currentData.weather[0].main,
        icon: currentData.weather[0].icon,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        timezone: currentData.timezone,
        coord: currentData.coord
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch current weather" });
  }
}
