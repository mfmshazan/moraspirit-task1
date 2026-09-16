import type { Member } from '../types';

interface Props {
  member: Member;
  selected: boolean;
  onClick: (member: Member) => void;
}

export function MemberCard({ member, selected, onClick }: Props) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <button
      onClick={() => onClick(member)}
      aria-pressed={selected}
      aria-label={`Select ${member.name}, ${member.role}`}
      className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        selected
          ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
      }`}
    >
      <div
        aria-hidden="true"
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
          selected
            ? 'bg-indigo-600 text-white'
            : 'bg-indigo-100 text-indigo-700'
        }`}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
        <p className="text-xs text-gray-500 truncate">{member.role}</p>
        <p className="text-xs text-indigo-400 font-mono mt-0.5">{member.id}</p>
      </div>

      {selected && (
        <span aria-hidden="true" className="shrink-0 text-indigo-600 text-base">✓</span>
      )}
    </button>
  );
}
