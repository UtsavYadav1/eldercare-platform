import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', agree: false });
  const [showPass, setShowPass] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) { toast.error('Please accept the terms'); return; }
    const ok = await signup(form);
    if (ok) { toast.success('Account created! Welcome to Care24 🎉'); navigate('/dashboard'); }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-teal-600 via-teal-700 to-primary-700 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        </div>
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Heart size={20} className="text-white fill-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">Care24</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-black font-display text-white mb-4">Start Your Care Journey Today</h2>
          <p className="text-teal-100 mb-8">Create a free account and book your first home healthcare service in minutes.</p>
          <div className="space-y-4">
            {[
              { icon: '🆓', title: 'Free to join', desc: 'No subscription fees or hidden charges' },
              { icon: '⚡', title: 'Instant booking', desc: 'Get a caregiver within 2 hours' },
              { icon: '🛡️', title: 'Fully insured', desc: 'All services are covered under Care24 guarantee' },
            ].map(b => (
              <div key={b.title} className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{b.title}</p>
                  <p className="text-teal-100 text-xs mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-teal-100 text-sm">
          Already using Care24?{' '}
          <Link to="/login" className="text-white font-semibold hover:underline">Sign in →</Link>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-900 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md py-8">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
              <Heart size={18} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">Care<span className="text-primary-500">24</span></span>
          </Link>

          <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-1">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Join 12,000+ families. It's free.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={set('name')} className="input" placeholder="Ramesh Gupta" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={set('email')} className="input" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={set('phone')} className="input" placeholder="+91 98100 XXXXX" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} className="input pr-10" placeholder="Min. 8 characters" required minLength={6} />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-1 mt-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${form.password.length >= i*3 ? i <= 2 ? 'bg-amber-400' : 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  ))}
                </div>
              )}
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={form.agree} onChange={e => setForm(f=>({...f,agree:e.target.checked}))} className="mt-0.5 rounded border-slate-300" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                I agree to Care24's{' '}
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>
              </span>
            </label>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold shadow-premium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading
                ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                : <><span>Create Account</span><ArrowRight size={16}/></>}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center"><span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400">or sign up with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {['Google','Apple'].map(p => (
              <button key={p} type="button" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                {p === 'Google' ? '🇬' : '🍎'} {p}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
