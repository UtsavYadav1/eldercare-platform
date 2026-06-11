import clsx from 'clsx';

export default function StatCard({ label, value, icon: Icon, trend, color = 'primary', subtitle }) {
  const colorMap = {
    primary: 'from-primary-500 to-primary-600 text-primary-50',
    teal: 'from-teal-500 to-teal-600 text-teal-50',
    indigo: 'from-indigo-500 to-indigo-600 text-indigo-50',
    emerald: 'from-emerald-500 to-emerald-600 text-emerald-50',
    amber: 'from-amber-500 to-amber-600 text-amber-50',
    rose: 'from-rose-500 to-rose-600 text-rose-50',
  };

  const bgMap = {
    primary: 'bg-primary-50 dark:bg-primary-900/20',
    teal: 'bg-teal-50 dark:bg-teal-900/20',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    amber: 'bg-amber-50 dark:bg-amber-900/20',
    rose: 'bg-rose-50 dark:bg-rose-900/20',
  };

  const trendColors = {
    primary: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30',
    teal: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30',
  };

  return (
    <div className="card p-5 flex items-start justify-between gap-4 hover:shadow-card-hover transition-shadow">
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        {trend && (
          <span className={clsx('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mt-2', trendColors[color])}>
            {trend.startsWith('+') ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      {Icon && (
        <div className={clsx('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0', colorMap[color])}>
          <Icon size={20} />
        </div>
      )}
    </div>
  );
}
