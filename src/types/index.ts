export interface Member {
  id: string;
  name: string;
  role: string;
}

export interface MembersResponse {
  count: number;
  members: Member[];
}

export interface AvailabilityResult {
  requested_date: string;
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy';
  reason: string;
}
