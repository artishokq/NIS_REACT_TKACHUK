import React, {
  useReducer,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Pet, PetState, PetAction } from "./types";
import { useEventLog } from "../../hooks/useEventLog";
import { usePetLifecycle } from "../../hooks/usePetLifecycle";

import { ActionButton, ResetButton } from "../PetActions/ActionButton.styled";
import styles from "./PetCard.module.scss";

interface PetCardProps {
  pet: Pet;
}

// Редьюсер для управления состоянием питомца
const petReducer = (state: PetState, action: PetAction): PetState => {
  switch (action.type) {
    case "FEED":
      return {
        ...state,
        energy: Math.min(state.energy + 20, 100),
      };
    case "LEVEL_UP":
      return {
        ...state,
        level: state.level + 1,
      };
    case "CHEER":
      return {
        ...state,
        mood: "happy",
        // небольшой буст энергии, чтобы cheer имел практический эффект
        energy: Math.min(state.energy + 5, 100),
      };
    case "RESET":
      return action.payload;
    case "DECREASE_ENERGY":
      return {
        ...state,
        energy: Math.max(state.energy - 5, 0),
      };
    case "SET_MOOD":
      return {
        ...state,
        mood: action.payload,
      };
    default:
      return state;
  }
};

const PetCardComponent: React.FC<PetCardProps> = ({ pet }) => {
  const { addEvent } = useEventLog();
  const avatarRef = useRef<HTMLDivElement>(null);

  // флаг иммунитета настроения после cheer
  const [cheerProtected, setCheerProtected] = useState(false);
  const CHEER_DURATION = 7000; // 7 секунд защиты

  // Мемоизация начального состояния для предотвращения пересоздания при каждом рендере
  const initialState: PetState = useMemo(
    () => ({
      mood: pet.mood,
      energy: pet.energy,
      level: pet.level,
    }),
    [pet.mood, pet.energy, pet.level]
  );

  const [state, dispatch] = useReducer(petReducer, initialState);

  // Мемоизированные коллбэки для действий
  const handleFeed = useCallback(() => {
    if (state.energy >= 100) return;
    dispatch({ type: "FEED" });
    addEvent(`${pet.name} был покормлен! Энергия +20`);
  }, [addEvent, pet.name, state.energy]);

  const handleLevelUp = useCallback(() => {
    dispatch({ type: "LEVEL_UP" });
    addEvent(`${pet.name} был апгрейднут до уровня ${state.level + 1}!`);
  }, [addEvent, pet.name, state.level]);

  const handleCheer = useCallback(() => {
    dispatch({ type: "CHEER" });
    setCheerProtected(true);
    // таймер, по окончании которого защита снимается
    setTimeout(() => setCheerProtected(false), CHEER_DURATION);
    addEvent(
      `${pet.name} чувствует себя счастливее! Настроение защищено на ${
        CHEER_DURATION / 1000
      } сек.`
    );
  }, [addEvent, pet.name]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET", payload: initialState });
    setCheerProtected(false);
    addEvent(`${pet.name} был сброшен до начального состояния`);
  }, [addEvent, pet.name, initialState]);

  const handleEnergyDecrease = useCallback(() => {
    dispatch({ type: "DECREASE_ENERGY" });
    addEvent(`${pet.name} энергия была понижена на 5`);
  }, [addEvent, pet.name]);

  const handleMoodChange = useCallback(
    (newMood: PetState["mood"]) => {
      // если включена защита и новое настроение хуже текущего - игнорируем
      if (cheerProtected) {
        const priority: Record<PetState["mood"], number> = {
          sad: 1,
          neutral: 2,
          happy: 3,
        };
        if (priority[newMood] < priority[state.mood]) {
          return;
        }
      }

      if (newMood !== state.mood) {
        dispatch({ type: "SET_MOOD", payload: newMood });
        addEvent(`${pet.name} настроение поменялось на ${newMood}`);
      }
    },
    [addEvent, pet.name, state.mood, cheerProtected]
  );

  // Использование кастомного хука жизненного цикла
  usePetLifecycle({
    energy: state.energy,
    onEnergyDecrease: handleEnergyDecrease,
    onMoodChange: handleMoodChange,
  });

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.transform =
        state.mood === "happy" ? "scale(1.1)" : "scale(1)";
    }
  }, [state.mood]);

  const isDisabled = state.energy <= 0;

  // Инлайн стили на основе настроения
  const getMoodColor = () => {
    switch (state.mood) {
      case "happy":
        return "#4ade80";
      case "neutral":
        return "#fbbf24";
      case "sad":
        return "#f87171";
      default:
        return "#9ca3af";
    }
  };

  const cardStyle: React.CSSProperties = {
    boxShadow: `0 0 10px ${getMoodColor()}`,
  };

  return (
    <div className={styles.petCard} style={cardStyle}>
      <div className={styles.avatarContainer} ref={avatarRef}>
        <div className={styles.avatar}>{pet.avatar}</div>
      </div>
      <h3 className={styles.petName}>{pet.name}</h3>
      <p className={styles.species}>{pet.species}</p>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Настроение:</span>
          <span className={styles.statValue}>
            {state.mood}
            {cheerProtected && " (поддержка активна)"}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Энергия:</span>
          <span className={styles.statValue}>{state.energy}/100</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Уровень:</span>
          <span className={styles.statValue}>{state.level}</span>
        </div>
      </div>

      {isDisabled && (
        <div className={styles.disabledBadge}>
          Питомец недоступен (нет энергии)!
        </div>
      )}

      <div className={styles.actions}>
        <ActionButton
          onClick={handleFeed}
          disabled={isDisabled || state.energy >= 100}
        >
          Покормить
        </ActionButton>
        <ActionButton onClick={handleLevelUp} disabled={isDisabled}>
          Апгрейднуть
        </ActionButton>
        <ActionButton onClick={handleCheer} disabled={isDisabled}>
          Порадовать
        </ActionButton>
        <ResetButton onClick={handleReset}>Сбросить</ResetButton>
      </div>
    </div>
  );
};

// Оптимизация с помощью React.memo
export const PetCard = React.memo(PetCardComponent);
