import { useState } from 'react';
import type { Member } from './types';
import { useMembers } from './hooks/useMembers';
import { useAvailability } from './hooks/useAvailability';
import { MemberGrid } from './components/MemberGrid';
import { AvailabilityPanel } from './components/AvailabilityPanel';
import { ErrorState } from './components/ErrorState';
import { DatePicker } from './components/DatePicker';

const today = new Date().toISOString().split('T')[0];

export default function App() {
  const { members, loading: membersLoading, error: membersError, retry } = useMembers();
  const { status, result, error: availError, check, reset } = useAvailability();

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [date, setDate] = useState<string>(today);

  const handleMemberSelect = (member: Member) => {
    setSelectedMember((prev) => (prev?.id === member.id ? null : member));
    reset();
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    reset();
  };

  const handleCheck = () => {
    if (selectedMember && date) {
      check(selectedMember.id, date);
    }
  };

  const canCheck = !!selectedMember && !!date && status !== 'loading';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 text-xl font-bold">◈</span>
            <span className="text-lg font-bold text-gray-900 tracking-tight">MoraSpirit</span>
          </div>
          <p className="text-sm text-gray-500 hidden sm:block">Member Availability Dashboard</p>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-10">

        {/* Member List */}
        <section aria-labelledby="members-heading">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h2 id="members-heading" className="text-lg font-semibold text-gray-900">
                Organisation Members
              </h2>
              {!membersLoading && !membersError && (
                <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  {members.length}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">Click a card to select a member.</p>
          </div>

          {membersError ? (
            <ErrorState message={membersError} onRetry={retry} />
          ) : (
            <MemberGrid
              members={members}
              loading={membersLoading}
              selectedId={selectedMember?.id ?? null}
              onSelect={handleMemberSelect}
            />
          )}
        </section>

        {/* Availability Checker */}
        <section aria-labelledby="check-heading" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 id="check-heading" className="text-lg font-semibold text-gray-900 mb-5">
            Check Availability
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            {/* Selected member display */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                Selected Member
              </label>
              <div
                aria-live="polite"
                className={`px-3 py-2.5 rounded-lg border text-sm min-h-[42px] flex items-center ${
                  selectedMember
                    ? 'border-indigo-300 bg-indigo-50 text-gray-900 font-medium'
                    : 'border-gray-200 bg-gray-50 text-gray-400 italic'
                }`}
              >
                {selectedMember
                  ? `${selectedMember.name} (${selectedMember.id})`
                  : 'No member selected'}
              </div>
            </div>

            {/* Date picker */}
            <DatePicker value={date} onChange={handleDateChange} />

            {/* Check button */}
            <button
              onClick={handleCheck}
              disabled={!canCheck}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors h-[42px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              {status === 'loading' ? 'Checking…' : 'Check Availability'}
            </button>
          </div>

          <AvailabilityPanel status={status} result={result} error={availError} />
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-100">
        MoraSpirit Web Pillar · Member Availability Dashboard
      </footer>
    </div>
  );
}
