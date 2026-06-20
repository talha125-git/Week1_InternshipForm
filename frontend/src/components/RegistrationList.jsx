import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/registrations';

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ticketId(numberInSeries) {
  return `Form-${String(numberInSeries).padStart(0, '0')}`;
}

export default function RegistrationList({ refreshSignal, onCountChange, onApplyClick }) {
  const [registrations, setRegistrations] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const [errorMessage, setErrorMessage] = useState('');

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

  const total = registrations.length;
  const sortedRegistrations = [...registrations].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {sortedRegistrations.map((reg, index) => (
        <article
          key={reg._id}
          className="relative overflow-visible rounded-xl border border-ink/10 bg-white shadow-card"
        >
          <div className="flex items-start justify-between px-5 pt-5">
            <div>
              <p className="font-display text-base font-semibold leading-tight text-ink">{reg.name}</p>
              <p className="mt-0.5 text-sm text-ink/55">{reg.email}</p>
            </div>
            <span className="rounded-full bg-green-50 px-3 py-1 font-mono text-xs font-medium text-green">
              {reg.technology}
            </span>
          </div>

          {/* Ticket-stub perforation */}
          <div className="relative my-4 border-t border-dashed border-ink/15">
            <span className="absolute -left-2.5 -top-3 h-5 w-5 rounded-full bg-paper" />
            <span className="absolute -right-2.5 -top-3 h-5 w-5 rounded-full bg-paper" />
          </div>

          <div className="flex items-center justify-between px-5 pb-5">
            <span className="font-mono text-xs tracking-wide text-ink/40">{ticketId(index + 1)}</span>
            <span className="text-xs text-ink/40">{formatDate(reg.createdAt)}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
