# 🎓 StudyNook (Client-Side)

A seamless, user-centric web platform designed for discovering and booking premium study spaces, conference rooms, and collaborative hubs. StudyNook ensures distraction-free learning environments with dynamic scheduling, room filtering, and absolute authentication security.

---

## 🚀 Key Features

* **🔒 Secure Authentication:** Managed via `Better Auth` for fluid Google OAuth and credentials-based sign-ins.
* **🔍 Advanced Live Filtering:** Instantly filter spaces by hourly rate range, specific floors, available amenities, and real-time text search.
* **📅 Dynamic Slot Booking:** Real-time conflict checking to ensure overlapping hours cannot be booked for the same room.
* **📊 Personal Dashboard:** Track ongoing, past, or cancelled bookings, and manage custom-listed rooms (with dynamic booking counts).
* **🎨 Responsive UI:** Built with an elegant aesthetic featuring subtle animations, dark/light optimization, and fluid grid layouts.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js / React.js |
| **Styling** | Tailwind CSS + DaisyUI |
| **Auth Client** | Better Auth (React SDK) |
| **State & Fetching** | Axios / TanStack Query (React Query) |
| **Icons & Media** | Lucide React / React Icons |

---

## 📁 Core Folder Structure

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts & Route Handlers)
├── components/           # Reusable UI Components (Cards, Navbar, Modals, Loaders)
├── hooks/                # Custom React Hooks for data fetching and mutations
├── context/              # Global state providers (Theme, Auth wrappers)
├── lib/                  # Auth clients and configuration files (Better Auth client)
└── utils/                # Helper functions (Date-time formatting, cost calculators)
