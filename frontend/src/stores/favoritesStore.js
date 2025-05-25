import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

export const useFavoritesStore = create(
  devtools(
    persist(
      (set, get) => ({
        favorites: [], // [{ city, icon, tempMin, tempMax }]
        weatherData: {}, // { [city]: currentWeather }

        addFavorite: async (cityName) => {
          const { favorites } = get();
          const exists = favorites.find(
            (f) => f.city.toLowerCase() === cityName.toLowerCase()
          );
          if (exists) return;

          try {
            const res = await axios.get(`/api/weather?city=${cityName}`);
            const data = res.data;

            const icon = data.current.icon;
            const min = Math.round(data.current.temp - 2);
            const max = Math.round(data.current.temp + 2);

            const newFavorite = {
              city: cityName,
              icon,
              tempMin: min,
              tempMax: max,
            };

            set({ favorites: [...favorites, newFavorite] });

            // 최신 날씨도 저장
            set((state) => ({
              weatherData: {
                ...state.weatherData,
                [cityName]: data.current,
              },
            }));
          } catch (err) {
            toast.error(`${cityName}의 날씨를 불러오지 못했습니다.`);
          }
        },

        removeFavorite: (cityName) => {
          const { favorites, weatherData } = get();
          set({
            favorites: favorites.filter((f) => f.city !== cityName),
            weatherData: Object.fromEntries(
              Object.entries(weatherData).filter(([key]) => key !== cityName)
            ),
          });
        },

        // 즐겨찾기 날씨 갱신
        fetchAllWeather: async () => {
          const { favorites } = get();
          for (const fav of favorites) {
            const city = fav.city;
            try {
              const res = await axios.get(`/api/weather?city=${city}`);
              const data = res.data;
              set((state) => ({
                weatherData: {
                  ...state.weatherData,
                  [city]: data.current,
                },
              }));
            } catch {
              toast.error(`${city}의 날씨를 불러오지 못했습니다.`);
            }
          }
        },
      }),
      { name: "favorites-storage" }
    ),
    { name: "FavoritesStore" }
  )
);
