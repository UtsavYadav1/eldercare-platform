import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, CheckCircle, Award, ChevronLeft, Calendar, MessageSquare, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { caregivers } from '../data/mockData';
import { useState } from 'react';

const reviewsData = [
  { name: 'Ananya S.', rating: 5, date: 'June 2026', text: 'Absolutely wonderful caregiver! Very professional, punctual, and my father was very comfortable with her.', initials: 'AS' },
  { name: 'Vikram T.', rating: 5, date: 'May 2026', text: 'Excellent expertise. She handled all the ICU-level care at home perfectly. Highly recommended.', initials: 'VT' },
  { name: 'Geeta M.', rating: 4, date: 'May 2026', text: 'Very thorough and caring. Would book again. Just wish scheduling was a bit more flexible.', initials: 'GM' },
];

const availabilitySlots = {
  'Mon': ['9 AM', '11 AM', '2 PM', '4 PM'],
  'Tue': ['10 AM', '1 PM', '3 PM'],
  'Wed': [],
  'Thu': ['9 AM', '11 AM', '2 PM', '5 PM'],
  'Fri': ['9 AM', '11 AM'],
  'Sat': ['10 AM', '2 PM', '4 PM'],
  'Sun': [],
};

const gradients = ['from-primary-400 to-primary-600', 'from-teal-400 to-teal-600', 'from-indigo-400 to-indigo-600', 'from-rose-400 to-rose-600', 'from-amber-400 to-amber-600', 'from-emerald-400 to-emerald-600'];

export default function CaregiverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caregiver = caregivers.find(c => c.id === Number(id)) || caregivers[0];
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const gradient = gradients[(caregiver.id - 1) % gradients.length];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-lg`}>
                  {caregiver.initials}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-3 mb-2">
                    <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white">{caregiver.name}</h1>
                    {caregiver.verified && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-bold">
                        <CheckCircle size={12} /> Verified
                      </span>
                    )}
                    <span className={`badge ${caregiver.available ? 'badge-green' : 'badge-slate'}`}>
                      {caregiver.available ? '● Available Now' : '● Unavailable'}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">{caregiver.role}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400 fill-amber-400" /><strong className="text-slate-900 dark:text-white">{caregiver.rating}</strong> ({caregiver.reviews} reviews)</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary-500" />{caregiver.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-teal-500" />{caregiver.experience} years experience</span>
                    <span className="flex items-center gap-1.5"><Award size={14} className="text-indigo-500" />{caregiver.completedBookings}+ completed</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {caregiver.languages.map(l => <span key={l} className="badge badge-slate">{l}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-3">About</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{caregiver.about}</p>
              <div className="mt-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {caregiver.specializations.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-sm font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Certifications & Qualifications</h2>
              <div className="space-y-3">
                {caregiver.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center shrink-0">
                      <Award size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cert}</span>
                    <CheckCircle size={15} className="ml-auto text-emerald-500 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Availability Calendar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-primary-500" /> Availability
              </h2>
              <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
                {Object.keys(availabilitySlots).map(day => (
                  <button key={day} onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                    className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedDay === day ? 'bg-primary-500 text-white shadow-md' : availabilitySlots[day].length === 0 ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-300'}`}
                  >{day}</button>
                ))}
              </div>
              {availabilitySlots[selectedDay].length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availabilitySlots[selectedDay].map(slot => (
                    <button key={slot} onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${selectedSlot === slot ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-300'}`}
                    >{slot}</button>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No slots available on {selectedDay}</p>
              )}
            </motion.div>

            {/* Reviews */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary-500" /> Patient Reviews
                </h2>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-900 dark:text-white">{caregiver.rating}</span>
                  <span className="text-slate-400 text-sm">({caregiver.reviews})</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviewsData.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{r.initials}</div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{r.name}</p>
                          <p className="text-xs text-slate-400">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} className="text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-6 sticky top-24">
              <div className="text-center mb-5 pb-5 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Hourly Rate</p>
                <p className="text-4xl font-black font-display text-slate-900 dark:text-white">₹{caregiver.hourlyRate}<span className="text-lg font-normal text-slate-400">/hr</span></p>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { label: 'Min. Session', value: '2 hours' },
                  { label: 'Response Time', value: '< 30 mins' },
                  { label: 'Cancellation', value: 'Free (2hrs prior)' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>

              {selectedSlot && (
                <div className="mb-4 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium text-center">
                  Selected: {selectedDay} at {selectedSlot}
                </div>
              )}

              <button
                onClick={() => navigate('/book', { state: { caregiver } })}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold text-base shadow-premium hover:opacity-90 transition-all mb-3"
              >
                Book Now
              </button>
              <button className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Send Message
              </button>

              <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={15} className="text-primary-500" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Care24 Guarantee</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Not satisfied? Get a full refund or free replacement caregiver, no questions asked.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
