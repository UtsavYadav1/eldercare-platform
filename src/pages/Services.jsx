import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { services } from '../data/mockData';

const iconMap = { 'Nursing Care': '🏥', 'Physiotherapy': '🦵', 'Elderly Attendant': '👴', 'Post-Hospital Care': '🩺' };

const detailMap = {
  'Nursing Care': {
    who: 'Registered Nurses with 3+ years clinical experience',
    process: ['Assessment of patient condition', 'Care plan creation', 'Skilled nursing procedures', 'Progress monitoring & reporting'],
    ideal: 'Post-surgery patients, bedridden patients, wound care, IV therapy, catheter care',
  },
  'Physiotherapy': {
    who: 'Licensed Physiotherapists with hospital experience',
    process: ['Initial mobility assessment', 'Personalized rehab plan', 'Daily exercise sessions', 'Progress evaluation & adjustment'],
    ideal: 'Joint replacement, stroke rehab, sports injuries, elderly mobility',
  },
  'Elderly Attendant': {
    who: 'Trained caregivers certified in elderly care',
    process: ['Daily living assistance', 'Medication reminders', 'Nutritious meal support', 'Companionship & wellness'],
    ideal: 'Seniors needing daily support, dementia patients, post-fall recovery',
  },
  'Post-Hospital Care': {
    who: 'Senior nurses specialized in discharge care',
    process: ['Discharge plan review', 'Medication management', 'Wound & drain monitoring', 'Doctor follow-up coordination'],
    ideal: 'Patients discharged after surgery, ICU, or major illness',
  },
};

const colorMap = {
  primary: { bg: 'bg-primary-50 dark:bg-primary-900/20', border: 'border-primary-100 dark:border-primary-800/30', badge: 'bg-primary-500', text: 'text-primary-600 dark:text-primary-400', btn: 'from-primary-500 to-primary-600' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-100 dark:border-teal-800/30', badge: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400', btn: 'from-teal-500 to-teal-600' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-100 dark:border-indigo-800/30', badge: 'bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', btn: 'from-indigo-500 to-indigo-600' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-800/30', badge: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', btn: 'from-emerald-500 to-emerald-600' },
};

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-600 to-teal-700 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-5">
              🏥 Comprehensive Home Healthcare
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-display text-white mb-4">
              Our Healthcare Services
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              From professional nursing to physiotherapy and elder care — a complete spectrum of certified home healthcare, delivered to your door.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-10">
          {services.map((svc, i) => {
            const colors = colorMap[svc.color];
            const detail = detailMap[svc.name];
            const isEven = i % 2 === 0;
            return (
              <motion.div key={svc.id} variants={fadeUp} className={`card overflow-hidden border ${colors.border}`}>
                <div className={`grid md:grid-cols-2 gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${colors.badge} flex items-center justify-center text-2xl shadow-md`}>
                        {iconMap[svc.name]}
                      </div>
                      {svc.tag && <span className={`badge badge-blue`}>{svc.tag}</span>}
                    </div>
                    <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-3">{svc.name}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">{svc.description}</p>

                    <div className="mb-5">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">What's included:</p>
                      <ul className="grid grid-cols-2 gap-1.5">
                        {svc.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <CheckCircle size={13} className={colors.text} /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Starting from</p>
                        <p className={`text-2xl font-black ${colors.text}`}>{svc.price}</p>
                      </div>
                    </div>

                    <Link to="/marketplace" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.btn} text-white font-bold hover:opacity-90 transition-all shadow-md`}>
                      Book {svc.name} <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Detail panel */}
                  <div className={`${colors.bg} p-8 space-y-5`}>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Who provides this</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{detail.who}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">How it works</p>
                      <ol className="space-y-2">
                        {detail.process.map((p, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <span className={`w-5 h-5 rounded-full ${colors.badge} text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5`}>{j + 1}</span>
                            {p}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Ideal for</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{detail.ideal}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-teal-600 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black font-display text-white mb-4">Not sure which service you need?</h2>
          <p className="text-primary-100 mb-8">Our care coordinators are available 24/7 to help you choose the right care plan.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/marketplace" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary-700 font-bold hover:bg-primary-50 transition-all shadow-lg">
              Browse Caregivers <ArrowRight size={18} />
            </Link>
            <a href="tel:1800XXXXXXX" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white font-bold border border-white/30 hover:bg-white/20 transition-all">
              📞 Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
