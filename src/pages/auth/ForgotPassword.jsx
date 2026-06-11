import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Reset link sent to your email!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="card p-8">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
              <Heart size={18} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">Care<span className="text-primary-500">24</span></span>
          </Link>

          {!sent ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-5">
                <Mail size={28} className="text-primary-500" />
              </div>
              <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">Forgot password?</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Enter your email and we'll send a link to reset your password.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="you@example.com" required />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-60"
                >
                  {loading ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    : <><span>Send Reset Link</span><ArrowRight size={16}/></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl">📬</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">We sent a password reset link to <strong className="text-slate-700 dark:text-slate-300">{email}</strong>. It expires in 15 minutes.</p>
              <button onClick={() => setSent(false)} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Didn't receive it? Send again</button>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <ArrowLeft size={15} /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
