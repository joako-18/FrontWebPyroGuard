import type { Announcement, AlertLevel } from '../entities/Announcement';

export interface IAnnouncementRepository {
  create(
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<Announcement>;
  getActive(): Promise<Announcement[]>;
  getHistory(): Promise<Announcement[]>;
  delete(id: string): Promise<string>;
  update(
    id: string,
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<Announcement>;
}