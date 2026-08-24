const STAT_CONFIG = [
  { key: 'Applied', label: 'Applied', color: 'text-status-applied', dot: 'bg-status-applied' },
  { key: 'Interview', label: 'Interviewing', color: 'text-status-interview', dot: 'bg-status-interview' },
  { key: 'Offer', label: 'Offers', color: 'text-status-offer', dot: 'bg-status-offer' },
  { key: 'Rejected', label: 'Rejected', color: 'text-status-rejected', dot: 'bg-status-rejected' },
];

export default function StatsBar({ stats }) {
  const byStatus = stats?.byStatus || {};
  const total = stats?.total ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <div className="col-span-2 rounded-2xl border border-ink/10 bg-white p-4 shadow-card sm:col-span-1">
        <p className="font-mono text-3xl font-medium text-ink">{String(total).padStart(2, '0')}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-inkSoft/70">
          Total tracked
        </p>
      </div>
      {STAT_CONFIG.map((s) => (
        <div key={s.key} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            <p className={`font-mono text-2xl font-medium ${s.color}`}>
              {String(byStatus[s.key] ?? 0).padStart(2, '0')}
            </p>
          </div>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-inkSoft/70">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
