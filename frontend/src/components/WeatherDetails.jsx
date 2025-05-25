import { useWeatherStore } from "../stores/weatherStore";
import styles from "./WeatherDetails.module.css";
import { WiDust, WiThermometer, WiRaindrop, WiSunrise, WiSunset } from "react-icons/wi";
import { LiaTachometerAltSolid } from "react-icons/lia";

const formatTime = (unix, offset) => {
  const date = new Date((unix + offset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getAQILevel = (aqi) => {
  switch (aqi) {
    case 1: return "좋음";
    case 2: return "양호";
    case 3: return "약간 나쁨";
    case 4: return "나쁨";
    case 5: return "매우 나쁨";
    default: return "정보 없음";
  }
};

function WeatherDetails() {
  const current = useWeatherStore((state) => state.weather.current);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>오늘의 주요정보</h2>

      {!current ? (
        <p className={styles.message}>주요 정보를 표시할 수 없습니다.</p>
      ) : (
        (() => {
          const { humidity, pressure, feels_like, sunrise, sunset, timezone, aqi } = current;

          return (
            <div className={styles.card}>
              {/* 첫 줄 */}
              <div className={styles.row}>
                <div className={styles.cell}>
                  <WiDust className={styles.icon} />
                  <div className={styles.value}>{getAQILevel(aqi)}</div>
                  <div className={styles.label}>대기오염지수</div>
                </div>
                <div className={styles.cell}>
                  <WiThermometer className={styles.icon} />
                  <div className={styles.value}>{Math.round(feels_like)}°C</div>
                  <div className={styles.label}>체감온도</div>
                </div>
                <div className={styles.cell}>
                  <WiRaindrop className={styles.icon} />
                  <div className={styles.value}>{humidity}%</div>
                  <div className={styles.label}>습도</div>
                </div>
              </div>

              {/* 두 번째 줄 */}
              <div className={styles.row}>
                <div className={styles.cell}>
                  <LiaTachometerAltSolid className={styles.icon} />
                  <div className={styles.value}>{pressure}hPa</div>
                  <div className={styles.label}>기압</div>
                </div>
                <div className={styles.cell}>
                  <WiSunrise className={styles.icon} />
                  <div className={styles.value}>{formatTime(sunrise, timezone)}</div>
                  <div className={styles.label}>일출</div>
                </div>
                <div className={styles.cell}>
                  <WiSunset className={styles.icon} />
                  <div className={styles.value}>{formatTime(sunset, timezone)}</div>
                  <div className={styles.label}>일몰</div>
                </div>
              </div>
            </div>
          );
        })()
      )}
    </section>
  );
}

export default WeatherDetails;
