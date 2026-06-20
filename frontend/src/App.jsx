import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';

export default function App() {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'registrations'
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [count, setCount] = useState(null);

  const handleRegistered = () => {
    setRefreshSignal((n) => n + 1);
  };

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-paper/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center  justify-center rounded-md bg-gold font-display text-sm font-bold text-ink">
              IR
            </div>
            <span className="font-display text-base font-semibold text-ink">Internship Registration</span>
          </div>

          <nav className="flex gap-1 rounded-full border border-ink/10 bg-white p-1">
            <button
              onClick={() => setActiveTab('apply')}
              className={`rounded-full px-4 py-1.5 font-display text-sm font-medium transition ${
                activeTab === 'apply' ? 'bg-ink text-paper' : 'text-ink/55 hover:text-ink'
              }`}
            >
              Apply
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`rounded-full px-4 py-1.5 font-display text-sm font-medium transition ${
                activeTab === 'registrations' ? 'bg-ink text-paper' : 'text-ink/55 hover:text-ink'
              }`}
            >
              Registrations{count !== null ? ` (${count})` : ''}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {activeTab === 'apply' ? (
          <section>
            <p className="font-mono text-xs uppercase tracking-widest text-green">Internship Program · 2026 Cohort</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Start your application
            </h1>
            <p className="mt-3 max-w-lg text-ink/60">
              Tell us who you are and what you want to build. It takes less than a minute, and
              you'll see your application appear in the registrations list right after.
            </p>

            <div className="mt-8 max-w-lg">
              <RegistrationForm
                onSuccess={handleRegistered}
                onViewRegistrations={() => setActiveTab('registrations')}
              />
            </div>
          </section>
        ) : (
          <section>
            <p className="font-mono text-xs uppercase tracking-widest text-green">Internship Program · 2026 Cohort</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Registrations</h1>
            <p className="mt-3 max-w-lg text-ink/60">Everyone who has applied so far, newest first.</p>

            <div className="mt-8">
              <RegistrationList
                refreshSignal={refreshSignal}
                onCountChange={setCount}
                onApplyClick={() => setActiveTab('apply')}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
