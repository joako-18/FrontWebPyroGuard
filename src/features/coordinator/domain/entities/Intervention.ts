export interface Intervention {
  id: string;
  brigadeId: string;
  zoneId: string;
  status: string;
  notes: string;
  assignedAt: string;
  completedAt: string | null;
}
