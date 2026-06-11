import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, Bell, Clock, ArrowRight, Plus, Activity, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/shared/StatCard';
import BookingCard from '../../components/shared/BookingCard';
import { bookings, notifications } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const patients = [
  { id: 1, name: 'Ramesh Gupta', relation: 'Father', age: 72, conditions: ['Diabetes', 'Hypertension'], initials: 'RG', color: 'from-primary-400 to-primary-600' },
  { id: 2, name: 'Kamala Gupta', relation: 'Mother', age: 68, conditions: ['Arthritis'], initials: 'KG', color: 'from-teal-400 to-teal-600' },
];

const activities = [
  { icon: '✅', text: 'Booking confirmed — Dr. Priya Sharma for June 12', time: '2h ago', color: 'text-emerald-500' },
  { icon: '⭐', text: 'You rated Rajesh Kumar 5 stars', time: '1d ago', color: 'text-amber-500' },
  { icon: '📋', text: 'Care note added by Sunita Devi', time: '2d ago', color: 'text-primary-500' },
  { icon: '💳', text: 'Payment of ₹2,000 processed', time: '3d ago', color: 'text-indigo-500' },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function UserDashboard() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const upcoming = bookings.filter(b => b.status === 'upcoming');
  const completed = bookings.filter(b => b.status === 'completed');

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar role="user" />
      <div className="flex-1 flex flex-col overflow-hidden ml-60 transition-all duration-300">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">Good morning, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-xs text-slate-400">Thursday, June 11, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="relative p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <Link to="/book" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md">
              <Plus size={15} /> Book Care
            </Link>
          </div>
        </header>

        {/* Main scroll area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div variants={fadeUp}><StatCard label="Upcoming Bookings" value={upcoming.length} icon={Calendar} color="primary" trend="+1 this week" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Total Sessions" value="24" icon={Activity} color="teal" trend="+3 this month" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Active Caregivers" value="2" icon={Users} color="indigo" subtitle="Currently assigned" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Total Spent" value="₹18,400" icon={Heart} color="emerald" trend="+₹2,800 this month" /></motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upcoming bookings */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-slate-900 dark:text-white">Upcoming Bookings</h2>
                <Link to="/bookings" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
              </div>
              {upcoming.length > 0 ? (
                upcoming.map(b => <motion.div key={b.id} variants={fadeUp}><BookingCard booking={b} /></motion.div>)
              ) : (
                <div className="card p-10 text-center">
                  <Calendar size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No upcoming bookings</p>
                  <Link to="/marketplace" className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                    <Plus size={14} /> Book a Caregiver
                  </Link>
                </div>
              )}

              {/* Patient profiles */}
              <div className="flex items-center justify-between mt-2">
                <h2 className="font-bold text-slate-900 dark:text-white">Patient Profiles</h2>
                <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"><Plus size={12} /> Add Patient</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {patients.map(p => (
                  <motion.div key={p.id} variants={fadeUp} className="card p-5 hover:shadow-card-hover transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold`}>{p.initials}</div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.relation} · Age {p.age}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.conditions.map(c => <span key={c} className="badge badge-blue">{c}</span>)}
                    </div>
                    <button className="mt-3 w-full py-2 rounded-lg text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                      View Care Plan
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Notifications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-slate-900 dark:text-white">Notifications</h2>
                  <span className="badge badge-blue">{notifications.filter(n => !n.read).length} new</span>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className={`card p-3.5 flex items-start gap-3 ${!n.read ? 'border-primary-200 dark:border-primary-800/50 bg-primary-50/50 dark:bg-primary-900/10' : ''}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.type === 'booking' ? 'bg-primary-100 dark:bg-primary-900/30' : n.type === 'reminder' ? 'bg-amber-100 dark:bg-amber-900/30' : n.type === 'review' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                        {n.type === 'booking' ? <CheckCircle size={14} className="text-primary-500" /> : n.type === 'reminder' ? <Clock size={14} className="text-amber-500" /> : n.type === 'review' ? <Activity size={14} className="text-teal-500" /> : <Bell size={14} className="text-indigo-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{n.message}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white mb-3">Recent Activity</h2>
                <div className="card divide-y divide-slate-100 dark:divide-slate-700/50">
                  {activities.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5">
                      <span className="text-base">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{a.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Book Now', icon: '📅', href: '/book', color: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' },
                    { label: 'Find Caregivers', icon: '🔍', href: '/marketplace', color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' },
                    { label: 'My Bookings', icon: '📋', href: '/bookings', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
                    { label: 'Call Support', icon: '📞', href: '#', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
                  ].map(qa => (
                    <Link key={qa.label} to={qa.href} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl ${qa.color} hover:opacity-80 transition-opacity text-center`}>
                      <span className="text-xl">{qa.icon}</span>
                      <span className="text-xs font-semibold">{qa.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
