import { useWeatherStore } from "../stores/weatherStore";
import styles from "./ForecastCard.module.css";

const formatDateWithWeekday = (dateString) => {
  const date = new Date(dateString);
  const d = date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
  const w = date.toLocaleDateString("ko-KR", { weekday: "short" });
  return `${d} (${w})`;
};

function ForecastCard() {
  const forecast = useWeatherStore((state) => state.weather.forecast);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>날씨 예보</h2>

      {forecast.length === 0 ? (
        <p className={styles.message}>예보 정보를 찾을 수 없습니다.</p>
      ) : (
        <div className={styles.forecastWrapper}>
          <div className={styles.forecastList}>
            {forecast.slice(0, 5).map((day, index) => {
              const date = formatDateWithWeekday(day.date);
              return (
                <div className={styles.forecastItem} key={index}>
                  <img
                    className={styles.icon}
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.weather}
                  />
                  <p className={styles.temp}>{Math.round(day.temp)}°C</p>
                  <p className={styles.date}>{date}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default ForecastCard;
