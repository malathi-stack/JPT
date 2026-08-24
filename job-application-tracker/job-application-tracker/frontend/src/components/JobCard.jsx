import { MapPin, Calendar, ExternalLink, Pencil, Trash2, Banknote } from 'lucide-react';

const STATUS_META = {
  Wishlist: { color: '#8B7FD1', letter: 'WL' },
  Applied: { color: '#5B7FDE', letter: 'AP' },
  Interview: { color: '#E8A33D', letter: 'IV' },
  Offer: { color: '#2E9E6D', letter: 'OF' },
  Rejected: { color: '#C4573D', letter: 'RJ' },
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function JobCard({ job, onEdit, onDelete }) {
  const meta = STATUS_META[job.status] || STATUS_META.Applied;

  return (
    <div
      className="group rounded-2xl border border-ink/10 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-ink">
            {job.position}
          </h3>
          <p className="truncate text-sm text-inkSoft">{job.company}</p>
        </div>
        <span
          className="stamp"
          style={{ color: meta.color, borderColor: meta.color }}
          title={job.status}
        >
          {meta.letter}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-inkSoft/80">
        {job.location && (
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {job.location}
          </span>
        )}
        <span className="flex items-center gap-1 font-mono">
          <Calendar size={13} /> {formatDate(job.applicationDate)}
        </span>
        {job.salary && (
          <span className="flex items-center gap-1">
            <Banknote size={13} /> {job.salary}
          </span>
        )}
      </div>

      {job.notes && (
        <p className="mt-3 line-clamp-2 text-sm text-inkSoft/90">{job.notes}</p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
        <span className="rounded-full bg-paperDark px-2.5 py-1 text-[11px] font-medium text-inkSoft">
          {job.jobType}
        </span>
        <div className="flex items-center gap-1">
          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-inkSoft transition hover:bg-ink/5 hover:text-ink"
              aria-label="Open job listing"
            >
              <ExternalLink size={15} />
            </a>
          )}
          <button
            onClick={() => onEdit(job)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-inkSoft transition hover:bg-ink/5 hover:text-ink"
            aria-label="Edit application"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(job)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-inkSoft transition hover:bg-status-rejected/10 hover:text-status-rejected"
            aria-label="Delete application"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
