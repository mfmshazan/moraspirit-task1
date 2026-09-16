export function MemberCardSkeleton() {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white"
      aria-hidden="true"
    >
      <div className="shrink-0 w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-2.5 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-2.5 bg-gray-200 rounded animate-pulse w-1/4" />
      </div>
    </div>
  );
}

export function SpinnerInline() {
  return (
    <span
      className="inline-block w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    />
  );
}
