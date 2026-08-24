import { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import StatsBar from '../components/StatsBar';
import PipelineBoard from '../components/PipelineBoard';
import JobFormModal from '../components/JobFormModal';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = useCallback(async (searchTerm = '') => {
    setLoading(true);
    try {
      const params = searchTerm ? { search: searchTerm } : {};
      const { data } = await api.get('/jobs', { params });
      setJobs(data.jobs);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    const { data } = await api.get('/jobs/stats');
    setStats(data);
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [fetchJobs, fetchStats]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchJobs(search), 350);
    return () => clearTimeout(timeout);
  }, [search, fetchJobs]);

  const handleAddClick = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete the application for ${job.position} at ${job.company}?`)) return;
    await api.delete(`/jobs/${job._id}`);
    await Promise.all([fetchJobs(search), fetchStats()]);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob._id}`, formData);
      } else {
        await api.post('/jobs', formData);
      }
      await Promise.all([fetchJobs(search), fetchStats()]);
      setModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper pb-16">
      <Navbar onAddClick={handleAddClick} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            Your pipeline
          </h1>
          <p className="text-sm text-inkSoft/70">
            Every application, from first send to signed offer.
          </p>
        </div>

        <div className="mb-6">
          <StatsBar stats={stats} />
        </div>

        <div className="mb-5 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-inkSoft/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, role, or location..."
            className="w-full rounded-full border border-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none focus:border-amber sm:max-w-md"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-amber" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 py-16 text-center">
            <p className="font-display text-base font-medium text-ink">No applications yet</p>
            <p className="mt-1 text-sm text-inkSoft/70">
              Log your first application to start filling the pipeline.
            </p>
            <button
              onClick={handleAddClick}
              className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
            >
              Log application
            </button>
          </div>
        ) : (
          <PipelineBoard jobs={jobs} onEdit={handleEditClick} onDelete={handleDelete} />
        )}
      </main>

      <JobFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingJob}
        submitting={submitting}
      />
    </div>
  );
}
