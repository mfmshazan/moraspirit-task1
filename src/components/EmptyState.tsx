interface Props {
  title: string;
  message: string;
  onRefresh?: () => void;
}

export function EmptyState({ title, message, onRefresh }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl border border-dashed border-gray-300 bg-white/50">
      <p className="text-4xl" aria-hidden="true">📭</p>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <p className="text-sm text-gray-500 max-w-xs">{message}</p>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="mt-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Refresh
        </button>
      )}
    </div>
  );
}
