import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import BookingCard from '../components/shared/BookingCard';
import { bookings } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell } from 'lucide-react';

const TABS = ['Upcoming', 'Completed', 'Cancelled'];

export default function BookingHistory() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const { dark, toggle } = useTheme();

  const filtered = bookings.filter(b =>
    activeTab === 'Upcoming' ? b.status === 'upcoming' :
    activeTab === 'Completed' ? b.status === 'completed' : b.status === 'cancelled'
  );

  const handleRate = (booking) => {
    setRatingModal(booking);
    setRating(5);
    setReview('');
  };

  const submitReview = () => {
    setRatingModal(null);
    import('react-hot-toast').then(({ default: toast }) => toast.success('Review submitted! Thank you 🙏'));
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar role="user" />
      <div className="flex-1 flex flex-col overflow-hidden ml-60">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">My Bookings</h1>
            <p className="text-xs text-slate-400">Track and manage all your care sessions</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link to="/book" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white text-sm font-semibold hover:opacity-90 shadow-md">
              <Plus size={15} /> Book New
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Bookings', value: bookings.length, color: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' },
              { label: 'Completed', value: bookings.filter(b=>b.status==='completed').length, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' },
              { label: 'Total Spent', value: `₹${bookings.filter(b=>b.status!=='cancelled').reduce((s,b)=>s+b.amount,0).toLocaleString()}`, color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' },
            ].map(s => (
              <div key={s.label} className={`card p-4 text-center ${s.color}`}>
                <p className="text-2xl font-black font-display">{s.value}</p>
                <p className="text-xs font-semibold mt-1 opacity-80">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 w-fit mb-6">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-gradient-to-r from-primary-500 to-teal-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >
                {tab}
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  {bookings.filter(b => tab === 'Upcoming' ? b.status === 'upcoming' : tab === 'Completed' ? b.status === 'completed' : b.status === 'cancelled').length}
                </span>
              </button>
            ))}
          </div>

          {/* Booking list */}
          <div className="space-y-3">
            {filtered.length > 0 ? (
              filtered.map(b => (
                <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <BookingCard booking={b} onRate={handleRate} />
                </motion.div>
              ))
            ) : (
              <div className="card p-16 text-center">
                <div className="text-5xl mb-4">{activeTab === 'Upcoming' ? '📅' : activeTab === 'Completed' ? '✅' : '❌'}</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">No {activeTab.toLowerCase()} bookings</h3>
                <p className="text-slate-400 mb-6 text-sm">
                  {activeTab === 'Upcoming' ? "You don't have any upcoming sessions. Book a caregiver now!" : `No ${activeTab.toLowerCase()} bookings to show.`}
                </p>
                {activeTab === 'Upcoming' && (
                  <Link to="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold hover:opacity-90 shadow-md">
                    <Plus size={16} /> Book a Caregiver
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Rating modal */}
      {ratingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 w-full max-w-md">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Rate your experience</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">How was your session with <strong>{ratingModal.caregiver}</strong>?</p>
            <div className="flex justify-center gap-2 mb-5">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star size={36} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'} />
                </button>
              ))}
            </div>
            <textarea value={review} onChange={e => setReview(e.target.value)} className="input min-h-[100px] resize-none mb-4" placeholder="Share your experience (optional)…" />
            <div className="flex gap-3">
              <button onClick={() => setRatingModal(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Skip</button>
              <button onClick={submitReview} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold text-sm hover:opacity-90">Submit Review</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
