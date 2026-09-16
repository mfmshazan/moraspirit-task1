import type { AvailabilityResult, MembersResponse } from '../types';

const BASE_URL = 'https://task.moraspirit.com';

export async function getMembers(): Promise<MembersResponse> {
  const res = await fetch(`${BASE_URL}/api/members`);
  if (!res.ok) throw new Error(`Failed to fetch members (${res.status})`);
  return res.json();
}

export async function checkAvailability(
  mspId: string,
  date: string,
): Promise<AvailabilityResult> {
  const res = await fetch(`${BASE_URL}/api/availability/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msp_id: mspId, date }),
  });
  if (!res.ok) throw new Error(`Availability check failed (${res.status})`);
  return res.json();
}
