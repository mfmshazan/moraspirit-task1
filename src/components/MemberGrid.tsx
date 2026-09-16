import type { Member } from '../types';
import { MemberCard } from './MemberCard';
import { MemberCardSkeleton } from './Skeleton';

interface Props {
  members: Member[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (member: Member) => void;
}

export function MemberGrid({ members, loading, selectedId, onSelect }: Props) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        aria-busy="true"
        aria-label="Loading members"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <MemberCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      role="list"
      aria-label="Organisation members"
    >
      {members.map((member) => (
        <div key={member.id} role="listitem">
          <MemberCard
            member={member}
            selected={member.id === selectedId}
            onClick={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
