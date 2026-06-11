import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Bell, ChevronDown, Heart, Phone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Find Caregivers', href: '/marketplace' },
  { label: 'About', href: '/#about' },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'caregiver') return '/caregiver-dashboard';
    return '/dashboard';
  };

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-700/50'
        : 'bg-transparent'
    )}>
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-primary-600 text-white text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Phone size={11} /> 1800-XXX-XXXX (Toll Free)</span>
          <span>Available 24/7 for emergencies</span>
        </div>
        <div className="flex items-center gap-4">
          <span>India's Most Trusted Home Healthcare Platform</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Heart size={18} className="text-white fill-white" />
          </div>
          <div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">Care<span className="text-primary-500">24</span></span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                location.pathname === link.href
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(d => !d)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.initials}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 card shadow-lg py-1 animate-slide-down z-50">
                    <Link to={getDashboardLink()} onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">Dashboard</Link>
                    <Link to="/bookings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">My Bookings</Link>
                    <hr className="my-1 border-slate-100 dark:border-slate-700" />
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 transition-colors">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-teal-500 text-white hover:opacity-90 transition-all shadow-md hover:shadow-premium">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-1 animate-slide-down">
          {navLinks.map(link => (
            <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">{link.label}</Link>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-center text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-center text-sm font-semibold bg-gradient-to-r from-primary-500 to-teal-500 text-white">Get Started</Link>
              </>
            )}
            <button onClick={toggle} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
