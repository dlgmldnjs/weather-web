import { useWeatherStore } from "../stores/weatherStore";
import { useFeedbackStore } from "../stores/feedbackStore";
import styles from "./ClothingSuggestion.module.css";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";

const clothingCategories = {
  hot: ["sleeveless.png", "shorts.png", "cap.png", "sandals.png"],
  warm: ["tshirt.png", "long-shorts.png", "skirt.png", "sneakers.png"],
  mild: ["jacket.png", "shirt.png", "trousers.png", "sneakers.png"],
  cool: ["tracksuit.png", "hoodie.png", "jumper.png", "jeans.png"],
  cold: ["coat.png", "sweater.png", "jeans.png"],
  freezing: ["puffer-jacket.png", "beanie.png", "scarf.png", "boots.png"],
};

const getClothingCategory = (temp) => {
  if (temp >= 27) return "hot";
  if (temp >= 22) return "warm";
  if (temp >= 17) return "mild";
  if (temp >= 12) return "cool";
  if (temp >= 6) return "cold";
  return "freezing";
};

function ClothingSuggestion() {
  const { city, current } = useWeatherStore((state) => state.weather);
  const feedback = useFeedbackStore((state) => state.feedback);
  const addFeedback = useFeedbackStore((state) => state.addFeedback);

  const feedbackData = feedback[city] || { good: 0, bad: 0 };

  const temp = current?.temp;
  const category = current ? getClothingCategory(temp) : null;
  const images = current ? clothingCategories[category] : [];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>오늘의 옷차림 추천</h2>

      {!current ? (
        <p className={styles.message}>옷차림 정보를 표시할 수 없습니다.</p>
      ) : (
        <div className={styles.card}>
          <div className={styles.clothes}>
            {images.map((img, index) => (
              <img
                key={index}
                src={`/clothes/${category}/${img}`}
                alt={`${category}-${img}`}
              />
            ))}
          </div>

          <div className={styles.feedback}>
            <button
              onClick={() => addFeedback(city, "good")}
              className={styles.goodButton}
            >
              <FaRegThumbsUp className={styles.icon} /> 잘 맞아요 ({feedbackData.good})
            </button>
            <button
              onClick={() => addFeedback(city, "bad")}
              className={styles.badButton}
            >
              <FaRegThumbsDown className={styles.icon} /> 너무 덥거나 추워요 ({feedbackData.bad})
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ClothingSuggestion;
