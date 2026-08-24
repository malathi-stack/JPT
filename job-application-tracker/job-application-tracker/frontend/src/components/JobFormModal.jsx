import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STATUS_OPTIONS = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];
const TYPE_OPTIONS = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'];

const EMPTY_FORM = {
  company: '',
  position: '',
  location: '',
  jobType: 'Full-time',
  status: 'Applied',
  applicationDate: new Date().toISOString().slice(0, 10),
  salary: '',
  jobUrl: '',
  contactPerson: '',
  notes: '',
};

export default function JobFormModal({ open, onClose, onSubmit, initialData, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...EMPTY_FORM,
        ...initialData,
        applicationDate: initialData.applicationDate
          ? new Date(initialData.applicationDate).toISOString().slice(0, 10)
          : EMPTY_FORM.applicationDate,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.company.trim() || !form.position.trim()) {
      setError('Company and position are required.');
      return;
    }
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-paper p-5 shadow-cardHover sm:max-w-lg sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {initialData ? 'Edit application' : 'Log a new application'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-inkSoft hover:bg-ink/5"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-status-rejected/10 px-3 py-2 text-sm text-status-rejected">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Company *
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Position *
              </label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Frontend Engineer"
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Remote / Mumbai"
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Salary
              </label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="₹18–24 LPA"
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Job type
              </label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Date applied
              </label>
              <input
                type="date"
                name="applicationDate"
                value={form.applicationDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Job posting URL
              </label>
              <input
                name="jobUrl"
                value={form.jobUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                Contact person
              </label>
              <input
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                placeholder="Recruiter name"
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-inkSoft/70">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Interview prep, referral details, follow-up dates..."
              className="w-full resize-none rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-amber"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-ink/15 py-2.5 text-sm font-medium text-inkSoft"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-full bg-ink py-2.5 text-sm font-medium text-paper transition hover:bg-inkSoft disabled:opacity-60"
            >
              {submitting ? 'Saving...' : initialData ? 'Save changes' : 'Add application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
