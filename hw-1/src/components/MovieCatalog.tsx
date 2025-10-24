import { useRef, useState, useMemo } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  isFavorite: boolean;
}

interface MovieCatalogProps {
  movies: Movie[];
  onToggleFavorite: (id: number) => void;
}

type FilterType = "all" | "favorites";
type ViewMode = "grid" | "list";

function MovieCatalog({ movies, onToggleFavorite }: MovieCatalogProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchInputRef.current) {
      setSearchQuery(searchInputRef.current.value);
    }
  };

  // Мемоизация фильтрованных фильмов
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Фильтр по избранному
      const matchesFilter =
        filter === "all" || (filter === "favorites" && movie.isFavorite);

      // Поиск по названию
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [movies, filter, searchQuery]);

  return (
    <div className="movie-catalog">
      <div className="controls">
        {/* Поиск по названию */}
        <div className="search-box">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Поиск по названию..."
            onChange={handleSearch}
          />
        </div>

        {/* Строка с фильтрами и переключателем вида */}
        <div className="controls-row">
          {/* Показывать избранные или все фильмы */}
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Все
            </button>

            <button
              className={filter === "favorites" ? "active" : ""}
              onClick={() => setFilter("favorites")}
            >
              Только избранные
            </button>
          </div>

          {/* Переключатель вида. блочный или строчный */}
          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              aria-label="Плитка"
            >
              ⊞
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              aria-label="Список"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Отображение карточек фильмов */}
      <div className={`movies-container ${viewMode}`}>
        {filteredMovies.length === 0 ? (
          <p className="no-movies">Фильмов нет</p>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              posterUrl={movie.posterUrl}
              isFavorite={movie.isFavorite}
              onToggleFavorite={onToggleFavorite}
              viewMode={viewMode}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MovieCatalog;
