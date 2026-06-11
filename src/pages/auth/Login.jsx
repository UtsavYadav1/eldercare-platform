import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const features = [
  'Verified nurses & caregivers',
  'Book in under 2 minutes',
  '24/7 emergency support',
  '100% satisfaction guarantee',
];

export default function Login() {
  const [form, setForm] = useState({ email: 'ramesh@example.com', password: 'password123', role: 'user' });
  const [showPass, setShowPass] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.email, form.password, form.role);
    if (ok) {
      toast.success('Welcome back! 👋');
      if (form.role === 'admin') navigate('/admin');
      else if (form.role === 'caregiver') navigate('/caregiver-dashboard');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-700 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
        </div>
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Heart size={20} className="text-white fill-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">Care24</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-black font-display text-white mb-4 leading-tight">
            Trusted Home Healthcare<br />for Your Family
          </h2>
          <p className="text-primary-100 mb-8 text-lg">Join 12,000+ families who trust Care24 for professional nursing and caregiving services.</p>
          <div className="space-y-3">
            {features.map(f => (
              <div key={f} className="flex items-center gap-3 text-white/90">
                <CheckCircle size={18} className="text-teal-300 shrink-0" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-4 p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
          <div className="flex -space-x-2">
            {['RG','AK','SS','KS'].map((initials, i) => (
              <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
            ))}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">12,000+ happy families</p>
            <div className="flex items-center gap-1">
              {Array.from({length:5}).map((_,i) => <span key={i} className="text-amber-300 text-xs">★</span>)}
              <span className="text-white/70 text-xs ml-1">4.9/5 average</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-900">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
              <Heart size={18} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">Care<span className="text-primary-500">24</span></span>
          </Link>

          <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to manage your healthcare bookings</p>

          {/* Role switcher */}
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
            {['user','caregiver','admin'].map(r => (
              <button key={r} onClick={() => setForm(f => ({...f, role: r}))}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${form.role === r ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              >{r === 'user' ? 'Family' : r}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} className="input pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <input type="checkbox" className="rounded border-slate-300" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold shadow-premium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                : <><span>Sign In</span><ArrowRight size={16}/></>}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center"><span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {['Google','Apple'].map(p => (
              <button key={p} type="button" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                {p === 'Google' ? '🇬' : '🍎'} {p}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            New to Care24?{' '}
            <Link to="/signup" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
