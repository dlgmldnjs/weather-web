import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useFeedbackStore = create(
  devtools(
    persist(
      (set, get) => ({
        feedback: {}, // { Seoul: { good: 2, bad: 1 } }

        addFeedback: (city, type) =>
          set((state) => {
            const prev = state.feedback[city] || { good: 0, bad: 0 };
            return {
              feedback: {
                ...state.feedback,
                [city]: {
                  ...prev,
                  [type]: prev[type] + 1,
                },
              },
            };
          }),
      }),
      { name: "feedback-storage" }
    )
  )
);
