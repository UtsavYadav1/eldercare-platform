import clsx from 'clsx';

const statusConfig = {
  upcoming: { label: 'Upcoming', cls: 'badge-blue' },
  completed: { label: 'Completed', cls: 'badge-green' },
  cancelled: { label: 'Cancelled', cls: 'badge-red' },
  ongoing: { label: 'Ongoing', cls: 'badge-amber' },
};

export default function BookingCard({ booking, onRate }) {
  const { id, caregiver, caregiverInitials, service, patient, date, time, duration, status, amount } = booking;
  const s = statusConfig[status] || statusConfig.upcoming;

  return (
    <div className="card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-card-hover transition-shadow">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
        {caregiverInitials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-semibold text-slate-900 dark:text-white text-sm">{caregiver}</span>
          <span className={clsx('badge', s.cls)}>{s.label}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{service} · {patient}</p>
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>📅 {date}</span>
          <span>🕐 {time}</span>
          <span>⏱ {duration}</span>
        </div>
      </div>

      {/* Amount & actions */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="font-bold text-slate-900 dark:text-white">₹{amount.toLocaleString()}</span>
        <span className="text-xs font-mono text-slate-400">{id}</span>
        {status === 'completed' && onRate && (
          <button onClick={() => onRate(booking)} className="text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline">⭐ Rate & Review</button>
        )}
        {status === 'upcoming' && (
          <button className="text-xs text-red-500 font-medium hover:underline">Cancel</button>
        )}
      </div>
    </div>
  );
}
