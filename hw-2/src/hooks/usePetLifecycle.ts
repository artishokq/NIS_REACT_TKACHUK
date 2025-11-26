import { useEffect } from "react";

type Mood = "happy" | "neutral" | "sad";

interface UsePetLifecycleProps {
  energy: number;
  onEnergyDecrease: () => void;
  onMoodChange: (mood: Mood) => void;
}

export const usePetLifecycle = ({
  energy,
  onEnergyDecrease,
  onMoodChange,
}: UsePetLifecycleProps): void => {
  // Автоматическое уменьшение энергии каждые 10 секунд
  useEffect(() => {
    if (energy <= 0) return;

    const interval = setInterval(() => {
      onEnergyDecrease();
    }, 10000);

    return () => clearInterval(interval);
  }, [energy, onEnergyDecrease]);

  // Обновление настроения на основе уровня энергии
  useEffect(() => {
    if (energy <= 0) {
      onMoodChange("sad");
    } else if (energy <= 20) {
      onMoodChange("sad");
    } else if (energy <= 50) {
      onMoodChange("neutral");
    } else {
      onMoodChange("happy");
    }
  }, [energy, onMoodChange]);
};
