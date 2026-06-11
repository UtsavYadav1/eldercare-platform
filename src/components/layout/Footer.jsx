import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Globe, ArrowRight } from 'lucide-react';

const socialLinks = [
  { label: 'Facebook', icon: '𝕗', href: '#' },
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'Instagram', icon: '📸', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
];

const footerLinks = {
  Services: [
    { label: 'Nursing Care', href: '/services' },
    { label: 'Physiotherapy', href: '/services' },
    { label: 'Elderly Attendant', href: '/services' },
    { label: 'Post-Hospital Care', href: '/services' },
  ],
  Company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center shadow-lg">
                <Heart size={20} className="text-white fill-white" />
              </div>
              <span className="font-display font-bold text-2xl text-white">Care<span className="text-primary-400">24</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted home healthcare platform. Connecting families with verified nurses, caregivers, and physiotherapists since 2023.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={15} className="text-primary-400 shrink-0" />
                <span>1800-XXX-XXXX (Toll Free, 24/7)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={15} className="text-primary-400 shrink-0" />
                <span>support@care24.in</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={15} className="text-primary-400 shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors text-xs font-bold text-slate-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-slate-400 hover:text-primary-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border border-slate-700/60 rounded-2xl p-6 mb-10 bg-slate-800/50 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-1">Stay updated with healthcare tips</h4>
            <p className="text-sm text-slate-400">Get weekly insights on elderly care right in your inbox.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-primary-500" />
            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-teal-500 text-white text-sm font-semibold hover:opacity-90 transition flex items-center gap-1.5">
              Subscribe <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>© 2026 Care24. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All systems operational</span>
          </div>
          <span>Made with ❤️ for India's elderly</span>
        </div>
      </div>
    </footer>
  );
}
