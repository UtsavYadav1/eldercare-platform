# Care24 – Elderly Nursing & Healthcare Assistance Platform

> **India's most trusted home healthcare SaaS platform** — connecting families with verified nurses, physiotherapists, and elderly caregivers.

![Care24](https://img.shields.io/badge/Care24-Healthcare%20SaaS-0ea5e9?style=for-the-badge&logo=heart&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

- 🏥 **Landing Page** — Hero, Services, How It Works, Testimonials, FAQ
- 🔐 **Authentication** — Login (role switcher), Signup, Forgot Password
- 📊 **User Dashboard** — Bookings, patient profiles, notifications, activity feed
- 🔍 **Caregiver Marketplace** — Search, filter, sort with animated card grid
- 👩‍⚕️ **Caregiver Profile** — Certifications, availability calendar, reviews, book now
- 📆 **5-Step Booking Flow** — Service → Caregiver → Schedule → Patient Info → Confirm
- 📋 **Booking History** — Tabs, rate & review modal
- 🩺 **Caregiver Dashboard** — Earnings chart, service requests, care notes
- ⚙️ **Admin Dashboard** — Analytics charts, user table, caregiver verification queue
- 🌙 **Dark Mode** — System-aware, toggleable on every page
- 📱 **Fully Responsive** — Mobile, tablet, and desktop

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Frontend framework & build tool |
| Tailwind CSS v3 | Utility-first styling |
| React Router v6 | Client-side routing with protected routes |
| Framer Motion | Animations & transitions |
| Recharts | Dashboard charts (Area, Bar, Pie) |
| Lucide React | Icon library |
| react-hot-toast | Toast notifications |

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/UtsavYadav1/eldercare-platform.git
cd eldercare-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Login

Navigate to `/login` and select a role:

| Role | Tab | Redirects To |
|---|---|---|
| Patient/Family | Family | `/dashboard` |
| Healthcare Provider | Caregiver | `/caregiver-dashboard` |
| Platform Admin | Admin | `/admin` |

Use the pre-filled credentials and click **Sign In**.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Sidebar, Footer
│   ├── shared/          # CaregiverCard, BookingCard, StatCard
│   └── ui/              # Button, and base UI components
├── context/             # ThemeContext, AuthContext
├── data/                # Mock healthcare data
└── pages/
    ├── auth/            # Login, Signup, ForgotPassword
    ├── dashboard/       # UserDashboard, CaregiverDashboard, AdminDashboard
    ├── Landing.jsx
    ├── Services.jsx
    ├── Marketplace.jsx
    ├── CaregiverProfile.jsx
    ├── Booking.jsx
    └── BookingHistory.jsx
```

---

## 🎨 Design System

- **Primary**: `#0ea5e9` Sky Blue
- **Secondary**: `#0d9488` Teal  
- **Accent**: `#6366f1` Indigo
- **Fonts**: Inter + Nunito (Google Fonts)
- **Effects**: Glassmorphism, premium shadows, smooth animations

---

## 📄 License

MIT © 2026 Care24
