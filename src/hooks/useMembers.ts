import { useEffect, useState } from 'react';
import { getMembers } from '../api/client';
import type { Member } from '../types';

interface State {
  members: Member[];
  loading: boolean;
  error: string | null;
}

export function useMembers() {
  const [state, setState] = useState<State>({
    members: [],
    loading: true,
    error: null,
  });

  const load = () => {
    setState({ members: [], loading: true, error: null });
    getMembers()
      .then(({ members }) => setState({ members, loading: false, error: null }))
      .catch((err: Error) =>
        setState({ members: [], loading: false, error: err.message }),
      );
  };

  useEffect(() => { load(); }, []);

  return { ...state, retry: load };
}
