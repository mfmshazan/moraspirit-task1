import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface Props {
  value: string; // yyyy-MM-dd
  onChange: (value: string) => void;
}

function toDate(str: string): Date | undefined {
  if (!str) return undefined;
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplay(str: string): string {
  const d = toDate(str);
  if (!d) return 'Pick a date';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = toDate(value);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
        Date
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 h-10.5 min-w-40 hover:border-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
      >
        <svg
          className="w-4 h-4 text-indigo-500 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {formatDisplay(value)}
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-3
            [--rdp-accent-color:#4f46e5] [--rdp-accent-background-color:#eef2ff]
            [--rdp-today-color:#4f46e5] [--rdp-day-height:2.25rem] [--rdp-day-width:2.25rem]
            [&_.rdp-day_button]:rounded-lg [&_.rdp-chevron]:fill-indigo-500
            [&_.rdp-caption_label]:text-sm [&_.rdp-caption_label]:font-semibold"
        >
          <DayPicker
            mode="single"
            selected={selected}
            defaultMonth={selected}
            onSelect={(day) => {
              if (day) {
                onChange(toStr(day));
                setOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
