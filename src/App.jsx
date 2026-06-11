import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import UserDashboard from './pages/dashboard/UserDashboard';
import CaregiverDashboard from './pages/dashboard/CaregiverDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Services from './pages/Services';
import Marketplace from './pages/Marketplace';
import CaregiverProfile from './pages/CaregiverProfile';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/services" element={<Services />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/caregivers/:id" element={<CaregiverProfile />} />

      {/* Protected: User */}
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
      <Route path="/book" element={<ProtectedRoute><Booking /></ProtectedRoute>} />

      {/* Protected: Caregiver */}
      <Route path="/caregiver-dashboard" element={<ProtectedRoute role="caregiver"><CaregiverDashboard /></ProtectedRoute>} />

      {/* Protected: Admin */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="text-center">
            <div className="text-8xl mb-6">🏥</div>
            <h1 className="text-4xl font-black font-display text-slate-900 dark:text-white mb-3">404</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Oops! This page doesn't exist.</p>
            <a href="/" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold hover:opacity-90 shadow-md">
              Back to Home
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
