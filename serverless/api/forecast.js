// 날씨 예보보
import axios from "axios";

export default async function handler(req, res) {
  const { city } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "Missing city parameter" });

  try {
    const forecastRes = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: { q: city, units: "metric", appid: API_KEY },
    });

    const filtered = forecastRes.data.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5);

    const result = filtered.map((item) => ({
      date: item.dt_txt.split(" ")[0],
      temp: item.main.temp,
      weather: item.weather[0].main,
      icon: item.weather[0].icon,
    }));

    res.status(200).json({ city, forecast: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
}
