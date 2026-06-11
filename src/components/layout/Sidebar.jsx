import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Bell, Settings,
  Heart, Activity, UserCheck, BarChart3, BookOpen,
  ChevronLeft, ChevronRight, LogOut, Shield,
  DollarSign, ClipboardList, Star
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const userNav = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Bookings', icon: Calendar, href: '/bookings' },
  { label: 'Find Caregivers', icon: Users, href: '/marketplace' },
  { label: 'Notifications', icon: Bell, href: '/dashboard', badge: 2 },
  { label: 'Settings', icon: Settings, href: '/dashboard' },
];

const caregiverNav = [
  { label: 'Overview', icon: LayoutDashboard, href: '/caregiver-dashboard' },
  { label: 'Service Requests', icon: ClipboardList, href: '/caregiver-dashboard', badge: 3 },
  { label: 'Availability', icon: Calendar, href: '/caregiver-dashboard' },
  { label: 'Earnings', icon: DollarSign, href: '/caregiver-dashboard' },
  { label: 'Reviews', icon: Star, href: '/caregiver-dashboard' },
  { label: 'Settings', icon: Settings, href: '/caregiver-dashboard' },
];

const adminNav = [
  { label: 'Analytics', icon: BarChart3, href: '/admin' },
  { label: 'Users', icon: Users, href: '/admin' },
  { label: 'Caregivers', icon: UserCheck, href: '/admin' },
  { label: 'Bookings', icon: BookOpen, href: '/admin' },
  { label: 'Verifications', icon: Shield, href: '/admin', badge: 18 },
  { label: 'Settings', icon: Settings, href: '/admin' },
];

export default function Sidebar({ role = 'user' }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const nav = role === 'admin' ? adminNav : role === 'caregiver' ? caregiverNav : userNav;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={clsx(
      'fixed left-0 top-0 h-full z-40 transition-all duration-300',
      'bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col',
      collapsed ? 'w-16' : 'w-60'
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center shrink-0">
            <Heart size={15} className="text-white fill-white" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white truncate">
              Care<span className="text-primary-500">24</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 no-scrollbar">
        {nav.map(item => {
          const Icon = item.icon;
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={clsx(
                'nav-item group relative',
                active && 'active',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto badge badge-blue text-xs">{item.badge}</span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      {user && (
        <div className={clsx('p-3 border-t border-slate-100 dark:border-slate-800', collapsed && 'flex justify-center')}>
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name.split(' ')[0]}</p>
                <p className="text-xs text-slate-400 capitalize">{user.role}</p>
              </div>
              <button onClick={handleLogout} title="Sign out" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
              {user.initials}
            </button>
          )}
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-slate-500 dark:text-slate-400"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
