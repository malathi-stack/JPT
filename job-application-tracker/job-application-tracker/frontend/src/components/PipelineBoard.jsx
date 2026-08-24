import { useState } from 'react';
import JobCard from './JobCard';
import { Inbox } from 'lucide-react';

const COLUMNS = [
  { key: 'Wishlist', label: 'Wishlist', color: '#8B7FD1' },
  { key: 'Applied', label: 'Applied', color: '#5B7FDE' },
  { key: 'Interview', label: 'Interview', color: '#E8A33D' },
  { key: 'Offer', label: 'Offer', color: '#2E9E6D' },
  { key: 'Rejected', label: 'Rejected', color: '#C4573D' },
];

function EmptyColumn() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 py-10 text-inkSoft/50">
      <Inbox size={20} />
      <p className="text-xs">Nothing here yet</p>
    </div>
  );
}

export default function PipelineBoard({ jobs, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('Applied');

  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col.key] = jobs.filter((j) => j.status === col.key);
    return acc;
  }, {});

  return (
    <div>
      {/* Mobile: tab selector, one column at a time */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 sm:hidden">
        {COLUMNS.map((col) => (
          <button
            key={col.key}
            onClick={() => setActiveTab(col.key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              activeTab === col.key
                ? 'border-ink bg-ink text-paper'
                : 'border-ink/10 bg-white text-inkSoft'
            }`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: activeTab === col.key ? '#E8A33D' : col.color }}
            />
            {col.label}
            <span className="font-mono text-[10px] opacity-70">{grouped[col.key].length}</span>
          </button>
        ))}
      </div>
      <div className="space-y-3 sm:hidden">
        {grouped[activeTab].length === 0 ? (
          <EmptyColumn />
        ) : (
          grouped[activeTab].map((job) => (
            <JobCard key={job._id} job={job} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>

      {/* Desktop / tablet: full pipeline, all columns side by side */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
        {COLUMNS.map((col) => (
          <div key={col.key} className="min-w-0">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
              <h3 className="font-display text-sm font-semibold text-ink">{col.label}</h3>
              <span className="ml-auto font-mono text-xs text-inkSoft/60">
                {grouped[col.key].length}
              </span>
            </div>
            <div className="space-y-3">
              {grouped[col.key].length === 0 ? (
                <EmptyColumn />
              ) : (
                grouped[col.key].map((job) => (
                  <JobCard key={job._id} job={job} onEdit={onEdit} onDelete={onDelete} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
