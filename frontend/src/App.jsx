import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';

export default function App() {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'registrations'
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [count, setCount] = useState(null);
  const [editingRegistration, setEditingRegistration] = useState(null);

  const handleSaved = () => {
    setRefreshSignal((n) => n + 1);
    setEditingRegistration(null);
  };

  const handleEdit = (registration) => {
    setEditingRegistration(registration);
    setActiveTab('apply');
  };

  const handleCancelEdit = () => {
    setEditingRegistration(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row sm:gap-0 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 font-display text-sm font-bold text-white shadow-card">
              IR
            </div>
            <div className="space-y-1">
              <p className="font-display text-base font-semibold text-slate-900">Internship Registration</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Week 2 project</p>
            </div>
          </div>

          <nav className="flex w-full sm:w-auto justify-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('apply')}
              className={`flex-1 sm:flex-none rounded-full px-4 py-1.5 font-display text-sm font-medium transition ${activeTab === 'apply' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Apply
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex-1 sm:flex-none rounded-full px-4 py-1.5 font-display text-sm font-medium transition ${activeTab === 'registrations' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Registrations{count !== null ? ` (${count})` : ''}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {activeTab === 'apply' ? (
          <section>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-500">Internship Program · 2026 Cohort</p>
              <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                {editingRegistration ? 'Edit application' : 'Start your application'}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                {editingRegistration
                  ? 'Update the submitted registration and save your changes to the list.'
                  : 'Tell us who you are and what you want to build. It takes less than a minute, and your submission will appear in the registrations list.'}
              </p>
            </div>

            <div className="mt-8 max-w-2xl">
              <RegistrationForm
                onSuccess={handleSaved}
                onViewRegistrations={() => setActiveTab('registrations')}
                editingRegistration={editingRegistration}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </section>
        ) : (
          <section>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-500">Internship Program · 2026 Cohort</p>
              <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">Registrations</h1>
              <p className="mt-3 max-w-2xl text-slate-600">Everyone who has applied so far, newest first. Search, edit, or remove records instantly.</p>
            </div>

            <div className="mt-8">
              <RegistrationList
                refreshSignal={refreshSignal}
                onCountChange={setCount}
                onApplyClick={() => setActiveTab('apply')}
                onEdit={handleEdit}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
