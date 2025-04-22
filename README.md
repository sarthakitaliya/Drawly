# ✏️ Drawly

**Drawly** is a real-time collaborative drawing application where users can create blank documents or join shared rooms for live drawing. It supports both solo and collaborative experiences with persistent canvas states, role-based access, and live cursor presence.

---

## 🚀 Features

- 🎨 Tools: Rectangle, Circle, Line, Rhombus, Freehand
- 👥 Collaboration: Real-time canvas sync across multiple users
- ✏️ Solo Mode: Create non-collaborative documents
- 🖱️ Live Cursors: See who is online and where they're drawing
- 🔐 Authentication: Google OAuth with JWT via NextAuth.js
- 📜 Authorization: Access limited to document owner or members
- 🧠 Undo/Redo: Works in both solo and collaborative sessions
- 🌎 Zoom, Pan & Reset: Navigate large canvases easily
- 🧾 Persistent Shape Storage with PostgreSQL (via Prisma)

---

## 🧱 Tech Stack

| Layer         | Tech                                 |
|---------------|--------------------------------------|
| Frontend      | Next.js (App Router), Canvas API     |
| Realtime      | WebSocket (Socket.IO)                |
| Backend       | Express.js                           |
| State Mgmt    | Zustand (shared via Turborepo)       |
| Auth          | NextAuth.js (Google OAuth + JWT)     |
| Database      | PostgreSQL + Prisma ORM              |

---
