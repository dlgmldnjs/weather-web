import styles from "./App.module.css";
import Header from "./components/Header";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import ForecastCard from "./components/ForecastCard";
import Favorites from "./components/Favorites";
import ClothingSuggestion from "./components/ClothingSuggestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.gridTwoColumn}>
        <CurrentWeatherCard />
        <WeatherDetails />
      </div>

      <div className={styles.gridTwoColumn}>
        <ForecastCard />
        <Favorites />
      </div>

      <div className={styles.bottomRow}>
        <ClothingSuggestion />
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
