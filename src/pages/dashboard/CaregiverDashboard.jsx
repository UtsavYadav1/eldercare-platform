import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Activity, Heart, ArrowRight, CheckSquare, XCircle, Plus, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/shared/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const earningsData = [
  { week: 'W1', earnings: 12400, sessions: 8 },
  { week: 'W2', earnings: 18200, sessions: 12 },
  { week: 'W3', earnings: 14600, sessions: 10 },
  { week: 'W4', earnings: 22800, sessions: 15 },
];

const requests = [
  { id: 'REQ-301', patient: 'Ramesh Gupta (72)', service: 'Nursing Care', date: 'June 12, 2026', time: '9:00 AM', duration: '4 hrs', amount: 1800, status: 'pending' },
  { id: 'REQ-298', patient: 'Kamala Singh (68)', service: 'Wound Care', date: 'June 13, 2026', time: '11:00 AM', duration: '2 hrs', amount: 900, status: 'pending' },
  { id: 'REQ-295', patient: 'Mohan Sharma (75)', service: 'IV Therapy', date: 'June 11, 2026', time: '8:00 AM', duration: '2 hrs', amount: 900, status: 'accepted' },
];

const careNotes = [
  { patient: 'Mohan Sharma', note: 'IV therapy administered successfully. BP 128/82, SpO2 98%. Patient is stable.', date: 'Today 8:30 AM', icon: '✅' },
  { patient: 'Lakshmi Devi', note: 'Wound dressing changed. No signs of infection. Advised daily cleaning.', date: 'Yesterday', icon: '🩹' },
  { patient: 'Vijay Kumar', note: 'Morning vitals — Temp: 98.6°F, BP: 120/80, Pulse: 76/min. Patient in good spirits.', date: '2 days ago', icon: '📋' },
];

const availability = {
  Mon: true, Tue: true, Wed: false, Thu: true, Fri: true, Sat: false, Sun: false
};

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function CaregiverDashboard() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();
  const [reqStates, setReqStates] = useState({});

  const handleRequest = (id, action) => {
    setReqStates(s => ({ ...s, [id]: action }));
    import('react-hot-toast').then(({ default: toast }) =>
      toast.success(action === 'accepted' ? 'Booking accepted! 🎉' : 'Booking declined')
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar role="caregiver" />
      <div className="flex-1 flex flex-col overflow-hidden ml-60">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">Good morning, {user?.name?.split(' ')[0] || 'Dr. Priya'} 👋</h1>
            <p className="text-xs text-slate-400">You have {requests.filter(r => r.status === 'pending').length} pending service requests</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div variants={fadeUp}><StatCard label="This Month Earnings" value="₹68,000" icon={Activity} color="primary" trend="+22% vs last month" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Sessions Completed" value="45" icon={CheckCircle} color="emerald" trend="+8 this week" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Avg Rating" value="4.9★" icon={Heart} color="amber" subtitle="128 reviews" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Pending Requests" value={requests.filter(r => r.status === 'pending').length} icon={Clock} color="indigo" subtitle="Awaiting response" /></motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left col */}
            <div className="lg:col-span-2 space-y-6">
              {/* Earnings chart */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900 dark:text-white">Monthly Earnings</h2>
                  <span className="badge badge-green">+22% ↑</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="earningGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#1e293b' : '#f1f5f9'} />
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Earnings']} contentStyle={{ background: dark ? '#1e293b' : '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="earnings" stroke="#0ea5e9" strokeWidth={2} fill="url(#earningGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Service requests */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-slate-900 dark:text-white">Service Requests</h2>
                  <span className="badge badge-blue">{requests.filter(r => r.status === 'pending').length} pending</span>
                </div>
                <div className="space-y-3">
                  {requests.map(req => {
                    const state = reqStates[req.id] || req.status;
                    return (
                      <motion.div key={req.id} layout className="card p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-900 dark:text-white text-sm">{req.patient}</span>
                              <span className={`badge ${state === 'accepted' ? 'badge-green' : state === 'declined' ? 'badge-red' : 'badge-amber'}`}>
                                {state === 'pending' ? 'New Request' : state === 'accepted' ? 'Accepted' : 'Declined'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{req.service} · {req.date} at {req.time} · {req.duration}</p>
                            <p className="text-sm font-bold text-primary-600 dark:text-primary-400">₹{req.amount}</p>
                          </div>
                          {state === 'pending' && (
                            <div className="flex gap-2 items-center">
                              <button onClick={() => handleRequest(req.id, 'declined')} className="p-2.5 rounded-xl border border-red-200 dark:border-red-800/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                <XCircle size={18} />
                              </button>
                              <button onClick={() => handleRequest(req.id, 'accepted')} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white text-sm font-bold hover:opacity-90">
                                <CheckSquare size={15} /> Accept
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Care Notes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-slate-900 dark:text-white">Care Notes</h2>
                  <button className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline"><Plus size={13} /> Add Note</button>
                </div>
                <div className="card divide-y divide-slate-100 dark:divide-slate-700/50">
                  {careNotes.map((n, i) => (
                    <div key={i} className="p-4 flex gap-3">
                      <span className="text-lg shrink-0">{n.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{n.patient}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{n.note}</p>
                        <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">{n.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col */}
            <div className="space-y-5">
              {/* Profile completeness */}
              <div className="card p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Profile Strength</h3>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-500 w-[88%]" />
                  </div>
                  <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">88%</span>
                </div>
                <p className="text-xs text-slate-400">Add a profile photo to reach 100%</p>
                <button className="mt-3 w-full py-2 rounded-lg text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                  Complete Profile
                </button>
              </div>

              {/* Weekly availability */}
              <div className="card p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Weekly Availability</h3>
                <div className="grid grid-cols-7 gap-1">
                  {Object.entries(availability).map(([day, avail]) => (
                    <div key={day} className="text-center">
                      <p className="text-xs text-slate-400 mb-1">{day[0]}</p>
                      <button className={`w-full aspect-square rounded-lg text-xs font-bold transition-all ${avail ? 'bg-primary-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                        {avail ? '✓' : ''}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">{Object.values(availability).filter(Boolean).length} days available this week</p>
              </div>

              {/* Quick stats */}
              <div className="card p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Acceptance Rate', value: '94%', color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'On-Time Rate', value: '98%', color: 'text-primary-600 dark:text-primary-400' },
                    { label: 'Patient Satisfaction', value: '4.9/5', color: 'text-amber-600 dark:text-amber-400' },
                    { label: 'Total Patients Served', value: '312', color: 'text-indigo-600 dark:text-indigo-400' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                      <span className={`font-bold ${s.color}`}>{s.value}</span>
                    </div>
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
