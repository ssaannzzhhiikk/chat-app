# 💬 ChatVerse — Реальное время, Supabase + React чат

**ChatVerse** — это веб-приложение для обмена сообщениями в реальном времени, созданное с использованием React, TypeScript и Supabase. Проект демонстрирует ключевые возможности: аутентификация, обмен сообщениями, подписка на обновления и работа с базой данных.

---

## 🚀 Стек технологий

- ⚛️ **React** + **TypeScript**
- 💨 **Tailwind CSS** — адаптивная и быстрая стилизация
- 🐘 **Supabase** — авторизация, подписки, база данных
- ⚙️ **Vite** — быстрый dev-сервер и сборка
- 📦 **npm** — менеджер пакетов

---

## 🧩 Функциональность

- 🔐 Регистрация и вход с помощью Supabase Auth
- 💬 Отправка и получение сообщений в реальном времени
- 💾 Сохранение сообщений в базе данных Supabase
- ♻️ Сброс пароля
- 🛡️ Защищённые маршруты через `ProtectedRoute`
- ⚡ Адаптивный интерфейс с TailwindCSS

---

## 📁 Структура проекта
```
src/
├── auth/ # Компоненты авторизации и защиты маршрутов
├── components/ # ChatRoom, ChatList, BasicMenu и др.
├── contexts/ # Контекст авторизации пользователя
├── pages/ # Chat, Login, SignUp, Reset
├── supabase/ # Supabase клиент
├── App.tsx # Корневой компонент
├── main.tsx # Точка входа
```
---

## 🛠️ Установка и запуск

1. **Клонируй репозиторий**
   ```bash
   #1 Клонируйте репозиторий
   git clone https://github.com/ssaannzzhhiikk/chat-app

   #2 Откройте файл проекта
   cd chat-app

   #3 Устноавите необходимые зависимости:
   npm install

   #5
   Создай .env файл с link & key из SupaBase
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_KEY=your-anon-key

   #4 Запустите проект
   npm run dev


---

### 🗄️ Настройка базы данных (Supabase)

Чтобы развернуть структуру базы данных:

1. Перейди в [SQL Editor на Supabase](https://app.supabase.com/project/_/sql)
2. Скопируй содержимое из [supabase/supabase_schema.sql](./src/supabase/supabase_schema.sql)
3. Вставь и выполни код

📄 Этот файл содержит:
- Таблицы: `profiles`, `messages`, `private_chats`
- Функции: `handle_new_user()`, `get_chatlist_with_last_message()`, `get_users_with_last_message()`
- Политики безопасности (RLS)

> ⚠️ Убедись, что включена RLS и настроены политики доступа
---

#### Недочеты проекта:
1) Без адаптива
2) Чат сыроват, нету поиска, добавление файлов
3) Имеет только функций писать друг к другу и чаты
(p.s сделаю когда руки дойдут)
