import type { AvailabilityResult } from '../types';
import { StatusBadge } from './StatusBadge';
import { SpinnerInline } from './Skeleton';

interface Props {
  status: 'idle' | 'loading' | 'success' | 'error';
  result: AvailabilityResult | null;
  error: string | null;
}

export function AvailabilityPanel({ status, result, error }: Props) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="mt-6 rounded-xl border border-gray-200 bg-white min-h-32 flex items-center justify-center"
    >
      {status === 'idle' && (
        <div className="text-center text-gray-400 py-8 px-6">
          <p className="text-3xl mb-2" aria-hidden="true">📅</p>
          <p className="text-sm">Select a member and a date, then click <strong className="text-gray-600">Check Availability</strong>.</p>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex flex-col items-center gap-3 py-8 text-gray-500">
          <SpinnerInline />
          <p className="text-sm">Checking availability…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 py-8 px-6 text-center text-red-600" role="alert">
          <p className="text-2xl" aria-hidden="true">⚠️</p>
          <p className="text-sm">{error ?? 'Something went wrong. Please try again.'}</p>
        </div>
      )}

      {status === 'success' && result && (
        <div
          className={`w-full p-6 rounded-xl ${
            result.status === 'available'
              ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-base font-semibold text-gray-900">{result.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {result.role} · <span className="font-mono">{result.id}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(result.requested_date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <StatusBadge status={result.status} />
          </div>
          <p
            className={`text-sm leading-relaxed ${
              result.status === 'available' ? 'text-emerald-800' : 'text-red-800'
            }`}
          >
            {result.reason}
          </p>
        </div>
      )}
    </div>
  );
}
