import { useWeatherStore } from "../stores/weatherStore";
import { useFavoritesStore } from "../stores/favoritesStore";
import { convertToEnglish } from "../stores/convertToEnglish";
import { toast } from "react-toastify";
import styles from "./Header.module.css";
import { IoIosSearch } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import { IoSunny } from "react-icons/io5";

function Header() {
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const reset = useWeatherStore((state) => state.reset);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const input = useWeatherStore((state) => state.weather.input);
  const setInput = useWeatherStore((state) => state.setInput);
  
  const handleSearch = () => {
    if (!input.trim()) {
      toast.info("도시를 입력해 주세요.");
      return;
    }
    const cityName = convertToEnglish(input.trim());
    fetchWeather(cityName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogoClick = () => {
    reset();
    setInput("");
  };

  const handleAddFavorite = async () => {
    if (!input.trim()) {
      toast.info("도시를 입력해 주세요.");
      return;
    }
    const cityName = convertToEnglish(input.trim());
    const already = favorites.some(
      (f) => f.city.toLowerCase() === cityName.toLowerCase()
    );

    if (already) {
      toast.info(`${cityName}은(는) 이미 즐겨찾기에 있습니다.`);
    } else {
      const success = await addFavorite(cityName);
      if (success) {
        toast.success(`${cityName}이(가) 즐겨찾기에 추가되었습니다.`);
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.logo} onClick={handleLogoClick}>
          <IoSunny className={styles.logoIcon} />
          <span> Weather</span>
        </h1>
      </div>

      <div className={styles.center}>
        <div className={styles.searchContainer}>
          <IoIosSearch className={styles.searchIcon} />
          <input
            type="text"
            value={input || ""} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="도시를 입력하세요"
            className={styles.searchInput}
          />
        </div>
        <button className={styles.searchbutton} onClick={handleSearch}>
          검색
        </button>
      </div>

      <div className={styles.right}>
        <button className={styles.favbutton} onClick={handleAddFavorite}>
          <TiStarFullOutline className={styles.favIcon} />
          <span className={styles.favlabel}>즐겨찾기 추가</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
