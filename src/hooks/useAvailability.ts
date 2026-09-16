import { useState } from 'react';
import { checkAvailability } from '../api/client';
import type { AvailabilityResult } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface State {
  status: Status;
  result: AvailabilityResult | null;
  error: string | null;
}

export function useAvailability() {
  const [state, setState] = useState<State>({
    status: 'idle',
    result: null,
    error: null,
  });

  const check = (mspId: string, date: string) => {
    setState({ status: 'loading', result: null, error: null });
    checkAvailability(mspId, date)
      .then((result) => setState({ status: 'success', result, error: null }))
      .catch((err: Error) =>
        setState({ status: 'error', result: null, error: err.message }),
      );
  };

  const reset = () => setState({ status: 'idle', result: null, error: null });

  return { ...state, check, reset };
}
