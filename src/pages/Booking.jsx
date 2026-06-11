import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ChevronRight, ChevronLeft, Heart, Calendar, Clock, User, CreditCard, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import { services, caregivers } from '../data/mockData';
import toast from 'react-hot-toast';

const STEPS = ['Select Service', 'Choose Caregiver', 'Schedule', 'Patient Info', 'Confirm'];

const serviceIcons = { 'Nursing Care': '🏥', 'Physiotherapy': '🦵', 'Elderly Attendant': '👴', 'Post-Hospital Care': '🩺' };
const gradients = ['from-primary-400 to-primary-600', 'from-teal-400 to-teal-600', 'from-indigo-400 to-indigo-600', 'from-rose-400 to-rose-600', 'from-amber-400 to-amber-600', 'from-emerald-400 to-emerald-600'];

const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilled = location.state?.caregiver;

  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({
    service: null,
    caregiver: prefilled || null,
    date: '',
    time: '',
    duration: '2',
    patientName: '',
    patientAge: '',
    address: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key, value) => setBooking(b => ({ ...b, [key]: value }));

  const canProceed = () => {
    if (step === 0) return !!booking.service;
    if (step === 1) return !!booking.caregiver;
    if (step === 2) return booking.date && booking.time;
    if (step === 3) return booking.patientName && booking.patientAge && booking.address;
    return true;
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    toast.success('🎉 Booking confirmed! Your caregiver will arrive soon.');
    navigate('/bookings');
  };

  const total = booking.caregiver ? booking.caregiver.hourlyRate * Number(booking.duration) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-primary-500 text-white shadow-lg ring-4 ring-primary-100 dark:ring-primary-900/50' : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700'}`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i === step ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <div className={`hidden sm:block absolute h-0.5 transition-all duration-500`} />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full"
              animate={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Select Service */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">What service do you need?</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Select the type of home healthcare service</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map(svc => (
                  <button key={svc.id} onClick={() => set('service', svc)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${booking.service?.id === svc.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-700'}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{serviceIcons[svc.name]}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{svc.name}</span>
                      {booking.service?.id === svc.id && <CheckCircle size={16} className="ml-auto text-primary-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{svc.description}</p>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{svc.price}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Choose Caregiver */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">Choose a caregiver</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">All caregivers are verified and background-checked</p>
              <div className="space-y-3">
                {caregivers.filter(c => c.available).map((c, i) => (
                  <button key={c.id} onClick={() => set('caregiver', c)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${booking.caregiver?.id === c.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white font-bold shrink-0`}>{c.initials}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</span>
                        {c.verified && <CheckCircle size={13} className="text-primary-500" />}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{c.role} · {c.experience} yrs · {c.location}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs"><Star size={11} className="text-amber-400 fill-amber-400" />{c.rating} ({c.reviews})</span>
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">₹{c.hourlyRate}/hr</span>
                      </div>
                    </div>
                    {booking.caregiver?.id === c.id && <CheckCircle size={18} className="text-primary-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">Schedule your session</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Pick a date, time, and duration</p>
              <div className="card p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><Calendar size={15} className="text-primary-500" /> Date</label>
                  <input type="date" value={booking.date} onChange={e => set('date', e.target.value)} className="input" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><Clock size={15} className="text-primary-500" /> Time Slot</label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => set('time', t)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all ${booking.time === t ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-300'}`}
                      >{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Duration</label>
                  <div className="flex gap-2">
                    {['2', '4', '6', '8', '12'].map(d => (
                      <button key={d} onClick={() => set('duration', d)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${booking.duration === d ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-300'}`}
                      >{d}h</button>
                    ))}
                  </div>
                </div>
                {booking.caregiver && booking.duration && (
                  <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{booking.duration} hrs × ₹{booking.caregiver.hourlyRate}/hr</span>
                    <span className="text-lg font-black text-primary-700 dark:text-primary-400">₹{booking.caregiver.hourlyRate * Number(booking.duration)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Patient Info */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">Patient details</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Tell us about who needs care</p>
              <div className="card p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Patient Name</label>
                    <input value={booking.patientName} onChange={e => set('patientName', e.target.value)} className="input" placeholder="Full name of patient" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Age</label>
                    <input type="number" value={booking.patientAge} onChange={e => set('patientAge', e.target.value)} className="input" placeholder="e.g. 72" min={1} max={120} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Gender</label>
                    <select className="input text-sm">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Home Address</label>
                    <textarea value={booking.address} onChange={e => set('address', e.target.value)} className="input min-h-[80px] resize-none" placeholder="Full address with landmark…" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Special Instructions / Medical Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                    <textarea value={booking.notes} onChange={e => set('notes', e.target.value)} className="input min-h-[80px] resize-none" placeholder="Any conditions, medications, or special requirements…" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">Confirm your booking</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Review details before confirming</p>
              <div className="card p-6 space-y-5">
                {/* Summary rows */}
                {[
                  { icon: '🏥', label: 'Service', value: booking.service?.name },
                  { icon: '👩‍⚕️', label: 'Caregiver', value: `${booking.caregiver?.name} · ${booking.caregiver?.role}` },
                  { icon: '📅', label: 'Date & Time', value: `${booking.date} at ${booking.time}` },
                  { icon: '⏱', label: 'Duration', value: `${booking.duration} hours` },
                  { icon: '👴', label: 'Patient', value: `${booking.patientName}, Age ${booking.patientAge}` },
                  { icon: '📍', label: 'Address', value: booking.address },
                ].map(row => (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="text-lg shrink-0">{row.icon}</span>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{row.value}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500 dark:text-slate-400">Session charges</span>
                    <span className="text-slate-700 dark:text-slate-300">₹{total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500 dark:text-slate-400">Platform fee</span>
                    <span className="text-slate-700 dark:text-slate-300">₹50</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-500 dark:text-slate-400">Taxes (GST 18%)</span>
                    <span className="text-slate-700 dark:text-slate-300">₹{Math.round(total * 0.18)}</span>
                  </div>
                  <div className="flex items-center justify-between font-black text-lg border-t border-slate-100 dark:border-slate-700 pt-3">
                    <span className="text-slate-900 dark:text-white">Total</span>
                    <span className="text-primary-600 dark:text-primary-400">₹{total + 50 + Math.round(total * 0.18)}</span>
                  </div>
                </div>

                {/* Payment method */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2"><CreditCard size={15} className="text-primary-500" /> Payment Method</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['UPI', 'Card', 'Net Banking'].map(pm => (
                      <button key={pm} className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all first:border-primary-500 first:bg-primary-50 dark:first:bg-primary-900/20 first:text-primary-700 dark:first:text-primary-400">
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={16} /> {step === 0 ? 'Cancel' : 'Back'}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold text-sm shadow-md hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold shadow-premium hover:opacity-90 transition-all disabled:opacity-60"
            >
              {submitting ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Processing…</> : <><CheckCircle size={16} /> Confirm Booking</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
