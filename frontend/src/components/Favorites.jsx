import { useEffect } from "react";
import { useWeatherStore } from "../stores/weatherStore";
import { useFavoritesStore } from "../stores/favoritesStore";
import styles from "./Favorites.module.css";
import { IoRemoveCircle } from "react-icons/io5";

function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const weatherData = useFavoritesStore((state) => state.weatherData);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const fetchAllWeather = useFavoritesStore((state) => state.fetchAllWeather);
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const setInput = useWeatherStore((state) => state.setInput);
  
  useEffect(() => {
    fetchAllWeather(); // 페이지 렌더링 시 즐겨찾기에 최신 날씨 fetch
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>즐겨찾기 도시</h2>
      {favorites.length === 0 ? (
        <p className={styles.message}>즐겨찾기 도시가 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((item, index) => {
            const current = weatherData[item.city];
            return (
              <li className={styles.item} key={index}>
                <span className={styles.cityButton} 
                  onClick={async () => {
                    setInput(item.city);  // 입력창에 도시명 업데이트
                    await fetchWeather(item.city);// 날씨 정보 fetch
                  }}
                >
                  {item.city}
                </span>

                {current ? (
                  <>
                    <img
                      className={styles.icon}
                      src={`https://openweathermap.org/img/wn/${current.icon}.png`}
                      alt="icon"
                    />
                    <span className={styles.temp}>
                      {Math.round(current.temp + 2)}°C / {Math.round(current.temp - 2)}°C
                    </span>
                  </>
                ) : (
                  <span className={styles.message}>날씨 불러오는 중...</span>
                )}

                <button
                  className={styles.removeButton}
                  onClick={() => removeFavorite(item.city)}
                >
                  <IoRemoveCircle className={styles.removeIcon} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Favorites;

