# Smart Store Locator with Real-Time GPS Navigation (ShopeHunt)

## 📌 Final Year Project (FYP)
This project addresses real-world shopping inefficiencies in Tawau, Sabah by
providing real-time store stock availability and GPS navigation.

## 🚀 Features
- Real-time store and item availability
- GPS-based navigation to nearby stores
- User-focused UI for faster item discovery
- Designed to improve shopping efficiency by ~20%

## 🛠 Tech Stack
- Ionic + Angular
- MySQL
- Google Maps API

## 📍 Problem Statement
During festive seasons such as Hari Raya, users face difficulty locating
essential items due to lack of centralized stock information.

## Database Setup
Import `backend/database/shopehunt.sql` using phpMyAdmin.

## Environment Setup
This project uses environment-based configuration.
Before running the application, update the API base URLs according to your local setup.

1. Copy the example environment file:
   cp src/environments/environment.example.ts src/environments/environment.ts

2. Replace http://localhost/your-api with the URL where your backend API is
   hosted.

3. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your own key.

## How to Run

1.  Import the .sql file to your database. (ex: phpmyadmin).
2.  Change the configuration in connect-example.php to your localhost/server and rename it to connect.php.
3.  Modify the BASE_URL in environment.ts (.prod.ts if deploying in android) to your backend url.
4.  Open a terminal in the project root directory
5.  Install dependencies:
    ```bash
    npm install
6.  Run (for Web View):
    ```bash
    ionic serve
    ```
    This will start a local development server.

    or run (for Android):
    ```bash
    ionic build
    npx cap copy android
    npx cap open android


## 👤 Author
**Jameel** – Computer Science (FYP)
