import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

export const useWeatherStore = create(
  devtools(
    persist(
      (set) => ({
        weather: {
          city: "",
          current: null,
          input: "",
          forecast: [],
        },

        // 입력창만 업데이트
        setInput: (value) =>
          set((state) => ({
            weather: {
              ...state.weather, // 입력중일때 기존 상태 유지
              input: value,     // 입력값만 업데이트
            },
          })),

        fetchWeather: async (cityName) => {
          try {
            // 현재 날씨 정보
            const weatherRes = await axios.get(`/api/weather?city=${cityName}`);
            const weatherData = weatherRes.data;

            // 예보 정보
            const forecastRes = await axios.get(`/api/forecast?city=${cityName}`);
            const forecast = forecastRes.data.forecast;

            // 대기오염 정보 (위도, 경도 기준)
            const { lat, lon } = weatherData.current.coord;
            const airRes = await axios.get(`/api/air?lat=${lat}&lon=${lon}`);
            const aqi = airRes.data.aqi;

            set((state) => ({
              weather: {
                city: cityName,
                input: state.weather.input, // 사용자 입력 유지
                current: {
                  ...weatherData.current,
                  aqi,
                },
                forecast,
              },
            }));
          } catch (error) {
            toast.error("도시를 찾을 수 없습니다.");
          }
        },

        reset: () =>
          set(() => ({
            weather: {
              city: "",
              current: null,
              input: "",
              forecast: [],
            },
          })),
      }),
      {
        name: "weather-storage",
      }
    ),
    {
      name: "WeatherStore",
    }
  )
);
