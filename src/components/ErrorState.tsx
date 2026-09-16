interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center" role="alert">
      <p className="text-4xl" aria-hidden="true">⚠️</p>
      <p className="text-sm text-gray-600 max-w-xs">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
