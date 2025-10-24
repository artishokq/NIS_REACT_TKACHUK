import { memo } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  viewMode: "grid" | "list";
}

// React.memo предотвращает перерисовку компонента
// При изменении только одного фильма перерисуется только одна карточка
const MovieCard = memo(function MovieCard({
  id,
  title,
  year,
  posterUrl,
  isFavorite,
  onToggleFavorite,
  viewMode,
}: MovieCardProps) {
  return (
    <div
      className={`movie-card ${
        viewMode === "list" ? "list-view" : "grid-view"
      }`}
    >
      <img src={posterUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <div>
          <h3>{title}</h3>
          <p className="movie-year">{year}</p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(id)}
          aria-label={
            isFavorite ? "Удалить из избранного" : "Добавить в избранное"
          }
        >
          ⭐
        </button>
      </div>
    </div>
  );
});

export default MovieCard;
