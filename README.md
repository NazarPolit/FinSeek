# 📘 FinSeek

> *Комплексна фінансова веб-платформа для аналізу ринкових даних, відстеження інвестиційного портфеля та прогнозування цін за допомогою математичних моделей і штучного інтелекту.*

---

## 👤 Автор

| | |
|---|---|
| **ПІБ** | Політовський Назар |
| **Група** | ФЕІ-44 |
| **Керівник** | [Прізвище Ім'я, науковий ступінь, посада] |
| **Дата виконання** | [дд.мм.рррр] |

---

## 📌 Загальна інформація

- **Тип проєкту:** Веб-застосунок (Single Page Application) за принципами Clean Architecture
- **Бекенд:** C#, .NET 8.0, ASP.NET Core Web API, Entity Framework Core (SQL Server)
- **Фронтенд:** TypeScript, React 19, Tailwind CSS 3.4

**Ключові бібліотеки:**

| Сторона | Бібліотеки |
|---|---|
| Backend | MediatR, AutoMapper, Google.GenAI, MailKit, FluentValidation, JWT Bearer |
| Frontend | Recharts, Axios, React Hook Form, Yup, React Toastify, React Router |

---

## 🧠 Функціонал

| Модуль | Опис |
|---|---|
| 🔐 **Автентифікація** | Реєстрація та авторизація з підтвердженням email (JWT + MailKit SMTP) |
| 📈 **Ринкові дані** | Актуальні макроекономічні показники та котирування в реальному часі (Financial Modeling Prep API) |
| 💼 **Інвестиційний портфель** | Збереження та управління персональними фінансовими активами (CQRS патерн) |
| 🤖 **ШІ-Аналітика** | Гібридне прогнозування цін (Лінійна регресія, EMA) + аналіз настрою ринку через Google Gemini 2.5 Flash |
| 💬 **Коментарі** | Залишення, редагування та безпечне видалення аналітичних коментарів під профілями компаній |

---

## 🧱 Структура проєкту

| Директорія / Проєкт | Призначення |
|---|---|
| `FinSeek.API` | Точка входу бекенду, REST API контролери, налаштування DI та CORS |
| `FinSeek.Application` | Шар бізнес-логіки: CQRS (Commands/Queries), DTO, AutoMapper профілі |
| `FinSeek.Infrastructure` | Робота з БД (EF Core), зовнішні сервіси (FMPService, GeminiFundamentalService) |
| `FinSeek.Domain` | Доменні сутності (Entities) та інтерфейси репозиторіїв |
| `frontend/src/` | Вихідний код React-додатка (компоненти, сервіси, моделі, контекст авторизації) |

---

## ▶️ Запуск проєкту

### 1. Передумови

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (версія 18+ або 20+ LTS)
- SQL Server + SQL Server Management Studio (SSMS)

---

### 2. Налаштування бази даних

Відкрийте `FinSeek.API/appsettings.json` та вкажіть ваш сервер:

````json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=FinSeekDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
````

> **Примітка:** Саму БД створювати вручну не потрібно — вона згенерується автоматично під час міграцій.

---

### 3. Запуск бекенду

1. Відкрийте `.sln` у Visual Studio.
2. Встановіть **`FinSeek.API`** як Startup Project.
3. Відкрийте `Tools → NuGet Package Manager → Package Manager Console`.
4. У випадаючому списку **Default project** оберіть **`FinSeek.Infrastructure`**.
5. Застосуйте міграції:

````powershell
Update-Database
````

6. Налаштуйте ключі у `appsettings.json`:

````json
{
  "FMPKey": "ВАШ_КЛЮЧ_FINANCIAL_MODELING_PREP",
  "GeminiKey": "ВАШ_КЛЮЧ_GOOGLE_GEMINI",
  "EmailSettings": {
    "SmtpServer": "smtp.gmail.com",
    "Port": 587,
    "SenderEmail": "ваша_пошта@gmail.com",
    "SenderPassword": "пароль_додатку"
  }
}
````

> Якщо email не налаштовано — посилання для підтвердження з'явиться в консолі сервера.

7. Запустіть бекенд (**Start** або `dotnet run` у папці `FinSeek.API`).  
   Сервер працюватиме на: **`https://localhost:7002`**

---

### 4. Запуск фронтенду

````bash
cd frontend
npm install
npm start
````

Додаток відкриється автоматично за адресою: **`http://localhost:3000`**

---

## 🔌 API — Основні ендпоінти

### 🔐 Автентифікація (`/api/account`)

<details>
<summary><b>POST</b> <code>/api/account/register</code></summary>

**Request:**
````json
{
  "userName": "NewUser123",
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
````

**Response `200 OK`:**
````json
{
  "message": "Registration successful. Please check your email to confirm your account."
}
````
</details>

<details>
<summary><b>POST</b> <code>/api/account/login</code></summary>

**Request:**
````json
{
  "userName": "NewUser123",
  "password": "StrongPassword123!"
}
````

**Response `200 OK`:**
````json
{
  "userName": "NewUser123",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzUxMiIsInR5..."
}
````
</details>

---

### 💬 Коментарі (`/api/comment`)

| Метод | Ендпоінт | Авторизація | Опис |
|---|---|---|---|
| `GET` | `/api/comment?Symbol=AAPL` | — | Отримати коментарі для акції |
| `POST` | `/api/comment/{symbol}` | ✅ | Додати коментар |
| `PUT` | `/api/comment/{id}` | ✅ | Оновити коментар (лише власник) |
| `DELETE` | `/api/comment/{id}` | ✅ | Видалити коментар (лише власник) |

<details>
<summary>Приклад тіла запиту для POST / PUT</summary>

````json
{
  "title": "Бичачий тренд",
  "content": "Очікую ріст на тлі нових квартальних звітів."
}
````
</details>

---

### 💼 Портфель (`/api/portfolio`)

| Метод | Ендпоінт | Опис |
|---|---|---|
| `GET` | `/api/portfolio` | Отримати список активів |
| `POST` | `/api/portfolio?symbol={symbol}` | Додати акцію |
| `DELETE` | `/api/portfolio?symbol={symbol}` | Видалити акцію |

> Всі ендпоінти потребують авторизації ✅

---

### 🤖 ШІ та Прогнозування

| Метод | Ендпоінт | Авторизація | Опис |
|---|---|---|---|
| `GET` | `/api/prediction/{symbol}` | — | Масив цінових прогнозів (Linear, EMA, AI Gemini) |
| `GET` | `/api/market/mood` | ✅ | ШІ-аналіз загального настрою ринку |

---

## 🖱️ Сценарій тестування

1. Відкрийте `http://localhost:3000`
2. Перейдіть на **Register** → створіть обліковий запис
3. Знайдіть посилання підтвердження в консолі бекенду та перейдіть за ним
4. Авторизуйтесь на сторінці **Login**
5. Перейдіть на вкладку **Markets** → протестуйте `Ask the AI Analyst`
6. Знайдіть компанію (`AAPL`) через пошук → перейдіть на її профіль
7. Додайте компанію до портфеля
8. Перегляньте графік прогнозів та залиште коментар

---

## 📷 Скриншоти

| Файл | Опис |
|---|---|
| `dashboard.png` | Огляд ринку та AI Market Insight |
| `prediction_chart.png` | Гібридний графік прогнозування цін |
| `portfolio.png` | Управління інвестиційним портфелем |
| `comments.png` | Інтерфейс коментарів та модальне вікно видалення |

---

## 🧪 Типові проблеми

| Симптом | Причина та рішення |
|---|---|
| **401 Unauthorized** під час входу | Пошта не підтверджена. Знайдіть лінк у консолі бекенду |
| **404 Not Found** при роботі з API | Переконайтесь, що бекенд працює на порту `7002` |
| **429 Too Many Requests** або порожні графіки | Вичерпано денний ліміт Financial Modeling Prep API |
| **AI Forecast Error** | Перевірте `GeminiKey` та інтернет-з'єднання. Gemini може бути тимчасово перевантажений |
| **CORS Error** у консолі браузера | React-додаток має працювати на порту `3000` |
