# Vedaz Real-Time Chat Application

Welcome to Vedaz Chat! This repository houses the codebase for a high-performance, responsive real-time chat application powered by standard monorepo workspaces.

---

## 1. Techstack

### Frontend

- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4 & Shadcn UI (optimized with vanilla HSL custom property styling and custom transitions)
- **Routing**: React Router v7
- **State & Data Fetching**: TanStack React Query v5 & Axios
- **Real-Time Client**: Socket.io Client
- **Authentication Wrapper**: Better Auth Client (Google Social Login integration)

### Backend

- **Framework**: Node.js & Express
- **Real-Time Server**: Socket.io (managing online/offline list sync and direct message broadcasting)
- **Database Layer**: Neon Serverless PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth (Google OAuth 2.0 flow middleware)

### Infrastructure

- **Monorepo Manager**: `pnpm` workspaces

---

## 2. How to Start Frontend

1. Ensure dependencies are installed from the root workspace directory:

   ```bash
   pnpm install
   ```

2. Populate the environment variables:
   Create a `.env` file in `apps/web/` using the template below (see Section 4).

3. Run the frontend application in development mode:

   ```bash
   pnpm --dir apps/web run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 3. How to Start Backend

1. Populate the backend environment variables:
   Create a `.env` file in `apps/server/` using the template below (see Section 4).

2. Apply database schemas / run Drizzle push to synchronize tables with Neon PostgreSQL:

   ```bash
   pnpm --dir apps/server exec drizzle-kit push
   ```

3. Start the Express & Socket.io server in development mode:
   ```bash
   pnpm --dir apps/server run dev
   ```
   The backend server will run at [http://localhost:3000](http://localhost:3000).

---

## 4. Environment Variables Templates

### Frontend Env Template

Save this as `apps/web/.env`:

```env
# URL where the Express + Socket.io server is running
VITE_BACKEND-URL=http://localhost:3000
```

### Backend Env Template

Save this as `apps/server/.env`:

```env
# Neon PostgreSQL Connection URL
DATABASE_URL=postgresql://user:pass@host/db

# Better Auth Secret Token
BETTER_AUTH_SECRET=your_random_auth_secret_here

# Better Auth Base Address
BETTER_AUTH_URL=http://localhost:3000

# Client Application URL
FRONTEND_URL=http://localhost:5173

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

---

## 5. Features

- **Google Social Authentication**: Safe login flow utilizing Better Auth library and Google SSO.
- **Real-Time Messaging**: Deliver and receive direct chat messages instantly over Socket.io.
- **Online/Offline Tracking**: Visual indicator badges on avatars display active statuses synced automatically through connection socket heartbeats.
- **Persistent Message Store**: Messages are saved in a Neon serverless PostgreSQL database using Drizzle ORM before broadcasting, eliminating client synchronization races.
- **Unified Mobile Layout**: Standardized layout resets margins and features responsive viewport heights (`min-h-screen`) to prevent squishing or clipping on mobile emulation.
- **Integrated Sidebar Menu**: A mobile drawer trigger button integrated directly into active subpage headers (chat and profile settings) allows drawer navigation on mobile viewports.
