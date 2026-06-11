import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Star, Clock, Heart, Activity, Users, ShieldCheck,
  CheckCircle, ChevronDown, ChevronUp, Play, Award, Phone, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { testimonials, faqs, services } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const iconMap = { Heart, Activity, Users, ShieldCheck };

const serviceColors = {
  primary: { card: 'from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-900/10 border-primary-100 dark:border-primary-800/30', icon: 'bg-primary-500', text: 'text-primary-600 dark:text-primary-400' },
  teal: { card: 'from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-900/10 border-teal-100 dark:border-teal-800/30', icon: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400' },
  indigo: { card: 'from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-900/10 border-indigo-100 dark:border-indigo-800/30', icon: 'bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400' },
  emerald: { card: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-900/10 border-emerald-100 dark:border-emerald-800/30', icon: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
};

const steps = [
  { step: '01', title: 'Browse & Search', desc: 'Search verified caregivers by service type, location, and availability. Filter by ratings, price, and specialization.', icon: '🔍' },
  { step: '02', title: 'Book Instantly', desc: 'Choose your preferred caregiver, select date & time, and confirm your booking in minutes — all from the app.', icon: '📅' },
  { step: '03', title: 'Care at Your Door', desc: 'Your verified caregiver arrives on time. Track their location, monitor care logs, and stay updated in real time.', icon: '🏠' },
];

const trustBadges = [
  { icon: Shield, label: '100% Verified', sub: 'Background checked' },
  { icon: Star, label: '4.9★ Rating', sub: '12,000+ reviews' },
  { icon: Clock, label: '2-hr Response', sub: 'Emergency care' },
  { icon: Award, label: 'NABH Certified', sub: 'Quality assured' },
];

const benefits = [
  { icon: '🏥', title: 'Clinically Trained', desc: 'All caregivers are trained at top medical institutions and hold valid certifications.' },
  { icon: '🔒', title: 'Safe & Trusted', desc: 'Triple-verified with police clearance, credential check, and identity verification.' },
  { icon: '⚡', title: 'On-Demand Service', desc: 'Book in minutes. Emergency slots available 24/7, including holidays.' },
  { icon: '📱', title: 'Real-Time Tracking', desc: 'Track your caregiver, get care updates, and stay in control from your phone.' },
  { icon: '💳', title: 'Transparent Pricing', desc: 'No hidden fees. Upfront pricing with easy online payment and EMI options.' },
  { icon: '⭐', title: '100% Satisfaction', desc: "Not satisfied? We'll replace the caregiver free of charge, no questions asked." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-white text-sm pr-4">{q}</span>
        {open ? <ChevronUp size={18} className="text-primary-500 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center hero-gradient dark:hero-gradient-dark overflow-hidden pt-24 pb-16">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="section-tag">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow"></span>
                  Trusted by 12,000+ families across India
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
                Premium Home
                <span className="block gradient-text mt-1">Healthcare Care,</span>
                <span className="block text-slate-700 dark:text-slate-200">Delivered 24/7</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                Connect with <strong className="text-slate-800 dark:text-slate-100">verified nurses, physiotherapists,</strong> and <strong className="text-slate-800 dark:text-slate-100">elderly caregivers</strong> right at your doorstep. Professional healthcare, trusted by families across India.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/marketplace"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold text-base shadow-premium hover:opacity-90 active:scale-95 transition-all"
                >
                  Find a Caregiver <ArrowRight size={18} />
                </Link>
                <Link to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-base border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-card"
                >
                  <Play size={16} className="text-primary-500 fill-primary-500" /> Watch How It Works
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trustBadges.map(b => {
                  const Icon = b.icon;
                  return (
                    <div key={b.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm">
                      <Icon size={18} className="text-primary-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{b.label}</p>
                        <p className="text-xs text-slate-400">{b.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              {/* Hero card */}
              <div className="relative glass rounded-3xl p-6 shadow-glass mx-auto max-w-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">PS</div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-900 dark:text-white">Dr. Priya Sharma</p>
                      <CheckCircle size={15} className="text-primary-500" />
                    </div>
                    <p className="text-sm text-slate-500">Registered Nurse · 8 yrs exp.</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-900 dark:text-white">4.9</span>
                    </div>
                    <p className="text-xs text-slate-400">128 reviews</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {['ICU Care', 'Wound Care', 'IV Therapy'].map(s => (
                    <div key={s} className="text-center p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                      <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">{s}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Rate</p>
                    <p className="font-bold text-slate-900 dark:text-white">₹450<span className="text-slate-400 text-xs font-normal">/hr</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Availability</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Available Now</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Bookings</p>
                    <p className="font-bold text-slate-900 dark:text-white">312+</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/book')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold text-sm shadow-md hover:opacity-90 transition-all"
                >
                  Book Now — ₹450/hr
                </button>

                {/* Live activity */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span>3 people are viewing this caregiver</span>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-2.5 shadow-glass">
                <p className="text-xs font-bold text-slate-800 dark:text-white">⭐ 4.9/5 Rating</p>
                <p className="text-xs text-slate-400">12,000+ happy families</p>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-2.5 shadow-glass">
                <p className="text-xs font-bold text-slate-800 dark:text-white">🛡️ 100% Verified</p>
                <p className="text-xs text-slate-400">Background checked</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-gradient-to-r from-primary-600 to-teal-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
            {[
              { value: '12,000+', label: 'Families Served' },
              { value: '842', label: 'Verified Caregivers' },
              { value: '38,920', label: 'Successful Bookings' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-black font-display mb-1">{s.value}</p>
                <p className="text-primary-100 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.div variants={fadeUp}><span className="section-tag mb-4">Our Services</span></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white mb-4">
              Healthcare Solutions for <span className="gradient-text">Every Need</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              From professional nursing to physiotherapy and companionship — we offer a complete spectrum of home healthcare services.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(svc => {
              const Icon = iconMap[svc.icon];
              const colors = serviceColors[svc.color];
              return (
                <motion.div key={svc.id} variants={fadeUp}>
                  <div className={`h-full rounded-3xl border bg-gradient-to-br ${colors.card} p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300 hover:shadow-card-hover cursor-pointer`}>
                    {svc.tag && (
                      <span className="self-start mb-3 px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-800/50 text-xs font-bold text-slate-600 dark:text-slate-300">
                        {svc.tag}
                      </span>
                    )}
                    <div className={`w-12 h-12 rounded-2xl ${colors.icon} bg-gradient-to-br flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      {Icon && <Icon size={22} className="text-white" />}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{svc.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{svc.description}</p>
                    <ul className="space-y-1.5 mb-5">
                      {svc.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle size={13} className={colors.text} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between">
                      <span className={`font-bold ${colors.text}`}>{svc.price}</span>
                      <Link to="/marketplace" className={`text-xs font-semibold ${colors.text} hover:underline flex items-center gap-1`}>
                        Book Now <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.div variants={fadeUp}><span className="section-tag mb-4">Process</span></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white mb-4">
              Care at Your Door in <span className="gradient-text">3 Simple Steps</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 to-teal-200 dark:from-primary-800 dark:to-teal-800" />

            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-3xl mx-auto mb-5 shadow-premium">
                  {step.icon}
                </div>
                <div className="absolute top-0 right-6 md:right-auto md:left-1/2 -translate-x-1/2 -translate-y-1/3 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border-2 border-primary-500 flex items-center justify-center text-xs font-black text-primary-600">
                  {i + 1}
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/marketplace" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold shadow-premium hover:opacity-90 transition-all">
              Get Started Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.div variants={fadeUp}><span className="section-tag mb-4">Why Care24</span></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white mb-4">
              Healthcare You Can <span className="gradient-text">Truly Trust</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} className="card p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.div variants={fadeUp}><span className="section-tag mb-4">Testimonials</span></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white mb-4">
              Loved by <span className="gradient-text">12,000+ Families</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(t => (
              <motion.div key={t.id} variants={fadeUp} className="card p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location} · {t.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-6">
              <Zap size={13} className="text-amber-300" /> Limited Time: 20% off first booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4">
              Your Loved Ones Deserve the Best Care
            </h2>
            <p className="text-primary-100 mb-8 text-lg">Join 12,000+ families who trust Care24 for home healthcare. Book your first session today.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary-700 font-bold hover:bg-primary-50 transition-all shadow-lg">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <a href="tel:1800XXXXXXX" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white font-bold border border-white/30 hover:bg-white/20 transition-all">
                <Phone size={18} /> Call 1800-XXX-XXXX
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.div variants={fadeUp}><span className="section-tag mb-4">FAQ</span></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-black font-display text-slate-900 dark:text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((item, i) => <FAQItem key={i} {...item} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
