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
src/
├── auth/ # Компоненты авторизации и защиты маршрутов
├── components/ # ChatRoom, ChatList, BasicMenu и др.
├── contexts/ # Контекст авторизации пользователя
├── pages/ # Chat, Login, SignUp, Reset
├── supabase/ # Supabase клиент
├── App.tsx # Корневой компонент
├── main.tsx # Точка входа

---

## 🛠️ Установка и запуск

1. **Клонируй репозиторий**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   npm install
   Создай .env файл
   npm run dev


Создай .env файл с 
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
---