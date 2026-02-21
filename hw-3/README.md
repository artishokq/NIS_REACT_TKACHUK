# E-Commerce Admin Panel

SPA административная панель для e-commerce системы на React + TypeScript.

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

## Демо-доступ

Приложение использует [DummyJSON API](https://dummyjson.com/).

- **Username:** `artemtk`
- **Password:** `arttka237`

## Архитектура

Проект построен по Feature Sliced Design с чётким разделением слоёв:

```
src/
├── app/                    # Инициализация приложения
│   ├── hooks/              # useAuthInit — автоинициализация сессии
│   ├── providers/          # StoreProvider, ThemeProvider
│   ├── router/             # AppRouter, ProtectedRoute, PublicRoute
│   ├── store/              # Redux store, типизированные хуки
│   ├── styles/             # Глобальные стили, CSS-переменные, темы
│   └── index.tsx           # Корневой компонент App
│
├── pages/                  # Страницы приложения (lazy loaded)
│   ├── LoginPage/          # /login — авторизация
│   ├── RegisterPage/       # /register — заглушка регистрации
│   ├── DashboardPage/      # / — главная панель
│   ├── ProductsPage/       # /products — каталог с поиском и пагинацией
│   ├── ProductDetailPage/  # /products/:id — детальная страница товара
│   ├── ProfilePage/        # /profile — профиль пользователя
│   ├── SettingsPage/       # /settings — настройки (язык, тема, pageSize)
│   ├── NotFoundPage/       # * — страница 404
│   └── LogoutPage/         # /logout — выход из системы
│
├── widgets/                # Составные блоки интерфейса
│   ├── Header/             # Шапка с информацией о пользователе
│   ├── Sidebar/            # Боковое меню навигации
│   ├── Layout/             # Общий layout для приватных страниц
│   └── ErrorBoundary/      # Обработка ошибок React
│
├── features/               # Фичи — бизнес-логика
│   ├── auth/               # Аутентификация
│   │   ├── api/            # RTK Query: login, getMe
│   │   ├── model/          # authSlice, selectors
│   │   └── ui/             # LoginForm
│   ├── products/           # Работа с товарами
│   │   └── api/            # RTK Query: getProducts, getProductById, search
│   └── settings/           # Настройки приложения
│       ├── model/          # settingsSlice, selectors
│       └── ui/             # SettingsForm
│
├── entities/               # Бизнес-сущности
│   ├── user/               # Типы пользователя
│   │   └── model/types.ts
│   └── product/            # Типы и UI продукта
│       ├── model/types.ts
│       └── ui/ProductCard
│
└── shared/                 # Переиспользуемый код
    ├── api/                # baseApi (RTK Query createApi)
    ├── config/             # Константы маршрутов (ROUTES)
    ├── lib/
    │   └── i18n/           # Настройка i18next + переводы (en/ru)
    └── ui/                 # UI-компоненты: Button, Input, Loader
```

## Технологии

| Технология       | Назначение                  |
| ---------------- | --------------------------- |
| React 19         | UI-фреймворк                |
| TypeScript       | Типизация                   |
| Redux Toolkit    | Управление состоянием       |
| RTK Query        | Взаимодействие с API        |
| React Router DOM | Маршрутизация               |
| i18next          | Интернационализация (ru/en) |
| Vite             | Сборка и dev-сервер         |

## Функциональность

### Аутентификация

- Логин через `POST /auth/login` (RTK Query mutation)
- Автоинициализация сессии через `GET /auth/me` при перезагрузке
- Хранение `accessToken` в localStorage и Redux (auth slice)
- Protected routes — редирект на `/login` для неавторизованных
- Logout — очистка токена, Redux state и редирект

### Каталог продуктов

- Список продуктов с пагинацией (`limit` / `skip`)
- Поиск по названию через query-параметры (`GET /products/search?q=`)
- Детальная страница продукта с изображениями, описанием и отзывами
- Кэширование данных через RTK Query (`providesTags`)
- Обработка `loading` / `error` / `empty` состояний

### Настройки

- Переключение языка интерфейса (ru/en) — мгновенно, без перезагрузки
- Переключение темы (light/dark) — через CSS custom properties
- Настройка количества товаров на странице каталога
- Persist всех настроек в localStorage

### i18n

- Полная поддержка русского и английского языков
- Переведены все страницы, формы, ошибки, пустые состояния
- JSON-файлы переводов: `shared/lib/i18n/locales/`

## Ключевые решения

1. **Изоляция API-слоя**: единый `baseApi` в `shared/api/`, endpoints инжектируются в `features/` через `injectEndpoints`
2. **Типизация**: строгий TypeScript (`strict: true`, `verbatimModuleSyntax`, `erasableSyntaxOnly`)
3. **Lazy loading**: все страницы загружаются лениво через `React.lazy()`
4. **Мемоизация**: `React.memo()` для компонентов, `useCallback` / `useMemo` для оптимизации
5. **Error Boundary**: класс-компонент `ErrorBoundary` в widgets ловит ошибки рендера
6. **Темизация**: CSS Custom Properties + `data-theme` атрибут на `<html>`
7. **Селекторы**: вся бизнес-логика чтения состояния вынесена в селекторы, компоненты не содержат логику доступа к store

## Маршруты

| Маршрут         | Тип       | Страница               |
| --------------- | --------- | ---------------------- |
| `/login`        | Публичный | Авторизация            |
| `/register`     | Публичный | Регистрация (заглушка) |
| `/`             | Приватный | Dashboard              |
| `/products`     | Приватный | Каталог продуктов      |
| `/products/:id` | Приватный | Детальная страница     |
| `/profile`      | Приватный | Профиль пользователя   |
| `/settings`     | Приватный | Настройки              |
| `/logout`       | Приватный | Выход из системы       |
| `*`             | —         | 404                    |
