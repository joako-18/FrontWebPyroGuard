
export type AlertLevel = 'info' | 'preventive' | 'critical';

export interface Announcement {
  id: string;
  title: string;
    description: string;
  zones: string;
  alertLevel: AlertLevel;
  authorId: string;
  publishedAt: string;
  validUntil: string;
}