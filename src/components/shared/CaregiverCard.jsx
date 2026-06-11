import { Star, MapPin, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const colorMap = {
  'Registered Nurse': 'badge-blue',
  'Physiotherapist': 'badge-teal',
  'Elderly Attendant': 'badge-purple',
  'Post-Hospital Care Nurse': 'badge-green',
};

const avatarColors = [
  'from-primary-400 to-primary-600',
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
  'from-rose-400 to-rose-600',
  'from-amber-400 to-amber-600',
  'from-emerald-400 to-emerald-600',
];

export default function CaregiverCard({ caregiver, index = 0 }) {
  const {
    id, name, role, specializations, rating, reviews,
    experience, hourlyRate, location, available, verified, initials, completedBookings
  } = caregiver;

  const gradient = avatarColors[index % avatarColors.length];

  return (
    <div className="card-hover group overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-4">
          <div className={clsx(
            'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-md',
            gradient
          )}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">{name}</h3>
              {verified && (
                <CheckCircle size={15} className="text-primary-500 shrink-0" title="Verified" />
              )}
            </div>
            <span className={clsx('badge text-xs', colorMap[role] || 'badge-slate')}>{role}</span>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><MapPin size={11} />{location}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{experience} yrs</span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1 mb-1">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{rating}</span>
            </div>
            <span className="text-xs text-slate-400">({reviews} reviews)</span>
          </div>
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {specializations.slice(0, 3).map(s => (
            <span key={s} className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium">{s}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-100 dark:border-slate-700/50 p-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900 dark:text-white">₹{hourlyRate}</span>
            <span className="text-xs text-slate-400">/hr</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={clsx('w-1.5 h-1.5 rounded-full', available ? 'bg-emerald-500' : 'bg-slate-300')}></span>
            <span className={clsx('text-xs font-medium', available ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400')}>
              {available ? 'Available Now' : 'Unavailable'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/caregivers/${id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            View Profile <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 pb-4 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
        <span>{completedBookings}+ bookings</span>
        <span>•</span>
        <span>{experience} years exp.</span>
      </div>
    </div>
  );
}
