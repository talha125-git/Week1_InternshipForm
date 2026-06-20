import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/registrations';

const TECH_SUGGESTIONS = [
  'MERN Stack',
  'React',
  'Node.js',
  'Python',
  'Java',
  'UI/UX Design',
  'Data Science',
  'Android Development',
  'Cloud Computing',
  'Cybersecurity',
];

const initialForm = { name: '', email: '', technology: '' };

export default function RegistrationForm({ onSuccess, onViewRegistrations }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.technology.trim()) {
      setStatus('error');
      setErrorMessage('Fill in your name, email, and technology to continue.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { data } = await axios.post(API_URL, form);
      setLastSubmitted(data);
      setForm(initialForm);
      setStatus('success');
      onSuccess?.(data);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err.response?.data?.message || 'Could not reach the server. Check that the backend is running.'
      );
    }
  };

  const startNewApplication = () => {
    setStatus('idle');
    setLastSubmitted(null);
  };

  if (status === 'success' && lastSubmitted) {
    return (
      <div className="rounded-xl border border-green/20 bg-green-50 p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green text-paper">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-ink">Application received</h3>
        <p className="mt-2 text-sm text-ink/60">
          Thanks, {lastSubmitted.name.split(' ')[0]} — we've logged your interest in{' '}
          <span className="font-medium text-ink">{lastSubmitted.technology}</span>.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onViewRegistrations}
            className="rounded-md bg-ink px-5 py-2.5 font-display text-sm font-semibold text-paper transition hover:bg-ink-light"
          >
            View all registrations
          </button>
          <button
            onClick={startNewApplication}
            className="rounded-md border border-ink/15 px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:bg-white"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-ink/10 bg-white p-8 shadow-card">
      {status === 'error' && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Aisha Khan"
            autoComplete="name"
            className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-ink/30 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="aisha@example.com"
            autoComplete="email"
            className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-ink/30 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </div>

        <div>
          <label htmlFor="technology" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50">
            Technology
          </label>
          <input
            id="technology"
            name="technology"
            type="text"
            list="tech-suggestions"
            value={form.technology}
            onChange={handleChange}
            placeholder="e.g. React, Python, UI/UX Design"
            className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-ink/30 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
          <datalist id="tech-suggestions">
            {TECH_SUGGESTIONS.map((tech) => (
              <option key={tech} value={tech} />
            ))}
          </datalist>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-display text-sm font-semibold text-ink transition hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit application'}
        {status !== 'submitting' && <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}
