import { useState, useCallback, useMemo, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieCatalog from "./components/MovieCatalog";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface Movie {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  isFavorite: boolean;
}

// Массив фильмов
const initialMovies: Movie[] = [
  {
    id: 1,
    title: "Интерстеллар",
    year: 2014,
    posterUrl: "https://i.redd.it/p3l8y8n0nlee1.jpeg",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Унесённые призраками",
    year: 2001,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/ae3b699c-3db7-4196-a869-39b610bfe706/600x900",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Бойцовский клуб",
    year: 1999,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/85b585ea-410f-4d1c-aaa5-8d242756c2a4/600x900",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Шрэк",
    year: 2001,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/7ade06a8-4178-4386-9ee2-87fec5a172eb/600x900",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Назад в будущее",
    year: 1985,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/73cf2ed0-fd52-47a2-9e26-74104360786a/600x900",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Титаник",
    year: 1997,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/10592371/7f0e6761-4635-46ad-b804-59d5cf1ae85c/600x900",
    isFavorite: false,
  },
  {
    id: 7,
    title: "Достать ножи",
    year: 2019,
    posterUrl:
      "https://avatars.mds.yandex.net/get-ott/2385704/2a00000198a30c2e0a2b2d3b3b63d61e1c19/600x900",
    isFavorite: false,
  },
  {
    id: 8,
    title: "Один дома",
    year: 1990,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/022a58e3-5b9b-411b-bfb3-09fedb700401/600x900",
    isFavorite: false,
  },
  {
    id: 9,
    title: "Шрэк 2",
    year: 2004,
    posterUrl:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/27a3c989-e883-40f3-806f-f3ef27fe7177/600x900",
    isFavorite: false,
  },
];

function App() {
  // Сохраняем избранное в localStorage
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "favoriteMovies",
    []
  );

  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  // Восстанавливаем избранное из localStorage при загрузке
  useEffect(() => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => ({
        ...movie,
        isFavorite: favoriteIds.includes(movie.id),
      }))
    );
  }, [favoriteIds]);

  // Предотвращает создание новой функции при каждом рендере
  const handleToggleFavorite = useCallback(
    (id: number) => {
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
        )
      );

      // Обновляем localStorage
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
      );
    },
    [setFavoriteIds]
  );

  // Мемоизированные данные для Header
  const headerData = useMemo(
    () => ({
      title: "Каталог фильмов",
      description: "Коллекция любимых фильмов для просмотра",
    }),
    []
  );

  // Мемоизированные данные для Footer
  const footerData = useMemo(
    () => ({
      fullName: "Ткачук Артём Сергеевич",
      educationGroup: "БПИ237",
      email: "astkachuk_2@edu.hse.ru",
    }),
    []
  );

  return (
    <div className="app-container">
      <Header {...headerData} />

      <main>
        <MovieCatalog movies={movies} onToggleFavorite={handleToggleFavorite} />
      </main>

      <Footer {...footerData} />
    </div>
  );
}

export default App;
