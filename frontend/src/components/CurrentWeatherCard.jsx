import { useWeatherStore } from "../stores/weatherStore";
import styles from "./CurrentWeatherCard.module.css";

function formatDate() {
  const today = new Date();
  return today.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function CurrentWeatherCard() {
  const { city, current } = useWeatherStore((state) => state.weather);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>현재 날씨</h2>
      {!current ? (
        <p className={styles.message}>현재 날씨 정보를 찾을 수 없습니다.</p>
      ) : (
        <div className={styles.card}>
          <div className={styles.topRow}>
            <div className={styles.leftInfo}>
              <span className={styles.temp}>{Math.round(current.temp)}°C</span>
              <span className={styles.description}>{current.weather}</span>
            </div>
            <img
              className={styles.icon}
              src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
              alt={current.weather}
            />
          </div>

          <div className={styles.divider}></div>

          <div className={styles.bottomRow}>
            <span className={styles.city}>{city}</span>
            <span>{formatDate()}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default CurrentWeatherCard;
