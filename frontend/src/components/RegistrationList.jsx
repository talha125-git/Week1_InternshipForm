import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend/api/registrations' : 'http://localhost:5000/api/registrations');

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ticketId(numberInSeries) {
  return `Form-${String(numberInSeries).padStart(2, '0')}`;
}

export default function RegistrationList({ refreshSignal, onCountChange, onApplyClick, onEdit }) {
  const [registrations, setRegistrations] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function fetchRegistrations() {
      setStatus('loading');
      try {
        const { data } = await axios.get(API_URL);
        if (!isCurrent) return;
        setRegistrations(data);
        setStatus('loaded');
        onCountChange?.(data.length);
      } catch (err) {
        if (!isCurrent) return;
        setErrorMessage(
          err.response?.data?.message || 'Could not load registrations. Check that the backend is running.'
        );
        setStatus('error');
      }
    }

    fetchRegistrations();
    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSignal]);

  const filteredRegistrations = useMemo(() => {
    if (!searchTerm.trim()) return registrations;
    const query = searchTerm.toLowerCase();
    return registrations.filter((reg) =>
      [reg.name, reg.email, reg.technology].some((field) => field.toLowerCase().includes(query))
    );
  }, [registrations, searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration?')) {
      return;
    }

    setBusyId(id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRegistrations((prev) => prev.filter((registration) => registration._id !== id));
      onCountChange?.(registrations.length - 1);
    } catch (err) {
      window.alert(err.response?.data?.message || 'Unable to delete this registration. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  if (status === 'loading') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl border border-ink/10 bg-white/60" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {errorMessage}
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink/20 bg-white/50 px-8 py-14 text-center">
        <p className="font-display text-lg font-semibold text-ink">No applications yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
          Be the first to apply — it takes less than a minute.
        </p>
        <button
          onClick={onApplyClick}
          className="mt-6 rounded-md bg-gold px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:bg-gold-dark"
        >
          Start an application
        </button>
      </div>
    );
  }

  const sortedRegistrations = [...filteredRegistrations].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-ink/10 bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-ink">Search registrations</p>
          <p className="text-sm text-ink/60">
            Filter by name, email, or technology. Showing {filteredRegistrations.length} of {registrations.length}.
          </p>
        </div>
        <div className="relative w-full sm:w-[320px]">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search applications"
            className="w-full rounded-full border border-ink/15 bg-gray-100 px-4 py-3 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </div>
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 bg-white/50 px-8 py-14 text-center">
          <p className="font-display text-lg font-semibold text-ink">No matching registrations</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
            Try another search term, or clear the filter to see all applications.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => setSearchTerm('')}
              className="rounded-md bg-ink px-5 py-2.5 font-display text-sm font-semibold text-paper transition hover:bg-ink-light"
            >
              Clear search
            </button>
            <button
              onClick={onApplyClick}
              className="rounded-md border border-ink/10 bg-white px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:bg-gray-50"
            >
              New application
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {sortedRegistrations.map((reg, index) => (
            <article
              key={reg._id}
              className="relative overflow-visible rounded-3xl border border-ink/10 bg-white shadow-card"
            >
              <div className="flex flex-col gap-4 px-5 pt-5 pb-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-display text-base font-semibold leading-tight text-ink">{reg.name}</p>
                    <p className="mt-1 text-sm text-ink/55">{reg.email}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green">
                    {reg.technology}
                  </span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onEdit?.(reg)}
                      className="rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-ink/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reg._id)}
                      disabled={busyId === reg._id}
                      className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {busyId === reg._id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                  <div className="text-right text-xs text-ink/40">
                    <div>{ticketId(index + 1)}</div>
                    <div>{formatDate(reg.createdAt)}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
