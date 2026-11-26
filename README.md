# 🧩 Jumble Word Game

A real-time **multiplayer word game** where players compete against an opponent by solving scrambled words as quickly as possible.

The application uses **Next.js, Socket.IO, Prisma, PostgreSQL, NextAuth, and Groq** to provide authentication, matchmaking, real-time gameplay, and persistent player statistics.

## 🎮 Features

* 🔐 **User Authentication**

  * Credentials authentication
  * Google authentication
  * GitHub authentication
  * Secure session management with NextAuth

* ⚔️ **Real-Time Multiplayer**

  * Players can enter matchmaking
  * Automatic opponent matching
  * Dedicated game rooms
  * Real-time communication using Socket.IO

* 🔤 **Jumbled Word Gameplay**

  * Words are scrambled before each round
  * Players rearrange letters to form the correct word
  * Score tracking during the game
  * Wrong-answer feedback and animations

* 🏆 **Game Statistics**

  * Games played
  * Games won
  * Player profile statistics
  * Persistent statistics stored in PostgreSQL

* 🎨 **Modern User Interface**

  * Responsive design
  * Drag-and-drop letter interaction
  * Framer Motion animations
  * Tailwind CSS styling
  * Component-based UI

* 🤖 **Dynamic Word Generation**

  * Uses Groq to generate/fetch words for gameplay

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* dnd-kit

### Backend

* Next.js API Routes
* Node.js
* Socket.IO

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* NextAuth.js
* Google OAuth
* GitHub OAuth
* Credentials Authentication

### Other Tools

* Groq SDK
* Zod
* React Hook Form

## 🏗️ Project Structure

```text
jumble-word-game/
│
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── api/             # API routes
│   ├── home/            # Home page
│   ├── play/            # Multiplayer game pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Application entry page
│
├── components/
│   └── ui/              # Reusable UI components
│
├── lib/
│   └── utils.ts         # Utility functions
│
├── prisma/
│   └── schema.prisma    # Database schema
│
├── public/
│   └── images/          # Static assets
│
├── src/
│   └── ...              # Client-side logic/hooks
│
├── types/
│   └── ...              # TypeScript types
│
├── auth.ts              # Authentication configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md
```

## 🔄 How the Game Works

```text
User Login
    │
    ▼
Home Page
    │
    ▼
Find Match
    │
    ▼
Matchmaking Queue
    │
    ▼
Opponent Found
    │
    ▼
Game Room Created
    │
    ▼
Jumbled Word Generated
    │
    ▼
Players Solve the Word
    │
    ▼
Scores Updated in Real Time
    │
    ▼
Game Over
    │
    ▼
Statistics Updated
```

## ⚡ Real-Time Architecture

The multiplayer functionality is powered by **Socket.IO**.

When a player searches for a match:

1. The player connects to the Socket.IO server.
2. The player is added to the matchmaking queue.
3. When another player becomes available, both players are matched.
4. A unique game room is created.
5. Game information is synchronized between both clients.
6. Player actions and scores are communicated in real time.
7. When the game ends, the result is stored in the database.

## 🗄️ Database

The application uses **PostgreSQL** with **Prisma ORM**.

The database stores information such as:

* Users
* Authentication accounts
* Sessions
* Games played
* Games won

Prisma is used to interact with PostgreSQL from the application.

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="your_postgresql_connection_string"

AUTH_SECRET="your_nextauth_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

GROQ_API_KEY="your_groq_api_key"
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NasirAli786091/jumble-word-game.git
```

### 2. Navigate to the project

```bash
cd jumble-word-game
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file and add the required credentials.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Set up the database

Make sure PostgreSQL is configured and your `DATABASE_URL` is valid.

Then run the appropriate Prisma migration:

```bash
npx prisma migrate dev
```

### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📜 Available Scripts

```bash
npm run dev
```

Runs the application in development mode.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs the project's linting checks.

## 🔮 Future Improvements

* 👥 Private game rooms
* 🏅 Global leaderboard
* 📊 Detailed player statistics
* 🎯 Difficulty levels
* ⏱️ Custom game timers
* 🏆 Ranking system
* 🔄 Improved reconnect/disconnect handling
* 📱 Further mobile UI optimization

## 👨‍💻 Author

**Nasir Ali**

GitHub: [@NasirAli786091](https://github.com/NasirAli786091)

---

⭐ If you find this project interesting, consider giving the repository a star!
