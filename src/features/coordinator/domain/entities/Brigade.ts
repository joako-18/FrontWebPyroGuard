export interface Brigade {
  id: string;
  name: string;
  coordinatorId: string;
  coordinatorName?: string;
  isActive: boolean;
  createdAt: string;
  membersCount?: number;
}
