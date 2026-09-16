interface Props {
  status: 'available' | 'busy';
}

export function StatusBadge({ status }: Props) {
  const isAvailable = status === 'available';
  return (
    <span
      aria-label={`Status: ${status}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${
        isAvailable
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`}
      />
      {isAvailable ? 'Available' : 'Busy'}
    </span>
  );
}
