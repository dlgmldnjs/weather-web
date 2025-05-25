// 대기오염지수
import axios from "axios";

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!lat || !lon) return res.status(400).json({ error: "Missing coordinates" });

  try {
    const airRes = await axios.get("https://api.openweathermap.org/data/2.5/air_pollution", {
      params: { lat, lon, appid: API_KEY },
    });

    const aqi = airRes.data.list[0].main.aqi;

    res.status(200).json({ aqi });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch air quality" });
  }
}
