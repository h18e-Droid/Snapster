
---

## 📂 Структура проекта по Feature-Sliced Design (FSD)

| Слой             | Назначение                                                           |
|------------------|----------------------------------------------------------------------|
| `app/`           | 💡 Точка входа и маршруты (использует App Router от Next.js)         |
| `views/`         | 📄 UI-страницы, собирающие виджеты, фичи и сущности                  |
| `widgets/`       | 🧱 Готовые секции страницы (Header, Sidebar), объединяющие фичи      |
| `features/`      | 🚀 Фичи с бизнес-логикой (LoginForm, AddToCart и др.)                |
| `entities/`      | 🧩 Сущности данных + UI (UserCard, ArticleList и т.д.)               |
| `shared/ui/`     | ⚙️ Переиспользуемые UI-компоненты (Button, Input, Loader)            |
| `shared/lib/`    | 🧠 Утилиты, кастомные хуки, конфигурации                             |
| `shared/assets/` | 🎨 Статические ресурсы: изображения, иконки, шрифты                  |
| `shared/styles/` | 💅 Глобальные стили, переменные, темы, reset                         |
| `shared/types/`  | 🧾 Общие типы и интерфейсы                                           |

---

## ✅ Принципы организации

- ❌ **Не размещаем UI и логику в `app/`** — только роутинг (`PostModal.tsx`, `layout.tsx`, `error.tsx`)
- ✅ **Все UI-страницы хранятся в `views/` и подключаются через импорт**
- ✅ **Слои строго изолированы и не нарушают границы**
- ✅ **Глобальные стили и ассеты находятся в `shared/`**
- ✅ **Alias `@/` указывает на `/src`**
- **Оригинальную документацию по архитектуре Feature-Sliced Design вы можете найти здесь: 👉 https://feature-sliced.github.io/documentation/ru/docs**
- **По NextJs здесь: 👉 https://feature-sliced.github.io/documentation/ru/docs/guides/tech/with-nextjs#see-also**


---