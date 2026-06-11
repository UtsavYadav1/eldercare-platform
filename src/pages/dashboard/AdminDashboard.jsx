import { useState } from 'react';
import { Users, UserCheck, BookOpen, BarChart3, TrendingUp, Shield, CheckCircle, XCircle, Eye, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/shared/StatCard';
import { adminStats, revenueData, serviceBreakdown, users, pendingCaregivers, bookings } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const TABS = ['Overview', 'Users', 'Caregivers', 'Bookings'];

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function AdminDashboard() {
  const { dark, toggle } = useTheme();
  const [tab, setTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleVerify = (name, action) => {
    toast.success(`${name} ${action === 'approve' ? 'approved ✅' : 'rejected ❌'}`);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden ml-60">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Platform overview — June 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <Shield size={13} /> {adminStats.pendingVerifications} pending verifications
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all ${tab === t ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >{t}</button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ── OVERVIEW ── */}
          {tab === 'Overview' && (
            <>
              <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div variants={fadeUp}><StatCard label="Total Users" value={adminStats.totalUsers.toLocaleString()} icon={Users} color="primary" trend={`+${adminStats.newUsersThisMonth} this month`} /></motion.div>
                <motion.div variants={fadeUp}><StatCard label="Verified Caregivers" value={adminStats.totalCaregivers} icon={UserCheck} color="teal" trend="+12 this month" /></motion.div>
                <motion.div variants={fadeUp}><StatCard label="Active Bookings" value={adminStats.activeBookings} icon={BookOpen} color="indigo" subtitle="Right now" /></motion.div>
                <motion.div variants={fadeUp}><StatCard label="Monthly Revenue" value={`₹${(adminStats.monthlyRevenue / 100000).toFixed(1)}L`} icon={TrendingUp} color="emerald" trend="+18% vs last month" /></motion.div>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue chart */}
                <div className="lg:col-span-2 card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-slate-900 dark:text-white">Revenue & Bookings</h2>
                    <span className="badge badge-green">+18% ↑ YoY</span>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#1e293b' : '#f1f5f9'} />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(1)}L`} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: dark ? '#1e293b' : '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(v, name) => [name === 'revenue' ? `₹${v.toLocaleString()}` : v, name === 'revenue' ? 'Revenue' : 'Bookings']}
                      />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="revenue" name="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#revGrad)" />
                      <Area yAxisId="right" type="monotone" dataKey="bookings" name="bookings" stroke="#0d9488" strokeWidth={2} fill="url(#bookGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Service breakdown pie */}
                <div className="card p-5">
                  <h2 className="font-bold text-slate-900 dark:text-white mb-4">Service Mix</h2>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                        {serviceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background: dark ? '#1e293b' : '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {serviceBreakdown.map(s => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                          <span className="text-slate-600 dark:text-slate-400">{s.name}</span>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bookings bar chart */}
              <div className="card p-5">
                <h2 className="font-bold text-slate-900 dark:text-white mb-4">Monthly Bookings Trend</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={revenueData} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#1e293b' : '#f1f5f9'} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: dark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: dark ? '#1e293b' : '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                    <Bar dataKey="bookings" name="Bookings" fill="url(#barGrad)" radius={[6, 6, 0, 0]}>
                      {revenueData.map((_, i) => <Cell key={i} fill={i === revenueData.length - 1 ? '#0ea5e9' : '#bae6fd'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ── USERS ── */}
          {tab === 'Users' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 dark:text-white">User Management</h2>
                <input type="text" placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} className="input w-64 py-2" />
              </div>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      {['Name', 'Email', 'Phone', 'Bookings', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                              {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{u.email}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{u.phone}</td>
                        <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">{u.bookings}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-slate'}`}>{u.status}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{u.joined}</td>
                        <td className="px-4 py-3">
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"><Eye size={15} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── CAREGIVERS ── */}
          {tab === 'Caregivers' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900 dark:text-white">Pending Verifications</h2>
                  <span className="badge badge-amber">{pendingCaregivers.length} awaiting review</span>
                </div>
                <div className="space-y-3">
                  {pendingCaregivers.map(c => (
                    <div key={c.id} className="card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white font-bold shrink-0">
                        {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{c.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{c.role} · {c.experience} yrs experience · Applied: {c.submitted}</p>
                      </div>
                      <span className={`badge ${c.docs === 'Complete' ? 'badge-green' : 'badge-amber'}`}>{c.docs === 'Complete' ? 'Docs Complete' : 'Docs Pending'}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleVerify(c.name, 'reject')} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 transition-colors flex items-center gap-1">
                          <XCircle size={13} /> Reject
                        </button>
                        <button onClick={() => handleVerify(c.name, 'approve')} disabled={c.docs !== 'Complete'} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-teal-500 hover:opacity-90 transition-all disabled:opacity-40 flex items-center gap-1">
                          <CheckCircle size={13} /> Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── BOOKINGS ── */}
          {tab === 'Bookings' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 dark:text-white">All Bookings</h2>
                <div className="flex gap-2">
                  {['All', 'Upcoming', 'Completed', 'Cancelled'].map(f => (
                    <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-300 transition-colors first:bg-primary-500 first:text-white first:border-primary-500">{f}</button>
                  ))}
                </div>
              </div>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      {['Booking ID', 'Caregiver', 'Service', 'Patient', 'Date', 'Status', 'Amount'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{b.id}</td>
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{b.caregiver}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{b.service}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{b.patient}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{b.date}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${b.status === 'upcoming' ? 'badge-blue' : b.status === 'completed' ? 'badge-green' : 'badge-red'}`}>{b.status}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">₹{b.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
