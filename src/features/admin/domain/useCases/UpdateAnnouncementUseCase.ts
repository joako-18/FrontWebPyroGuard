import type { IAnnouncementRepository } from '../repository/AnnouncementRepository';
import type { Announcement, AlertLevel } from '../entities/Announcement';
import { AnnouncementRepositoryImpl } from '../../data/repository/AnnouncementRepositoryImpl';

const repo: IAnnouncementRepository = AnnouncementRepositoryImpl;

export async function updateAnnouncementUseCase(
  id: string,
  title: string,
  description: string,
  zones: string,
  alertLevel: AlertLevel,
  validUntil: string
): Promise<Announcement> {
  if (!id) throw new Error("ID de comunicado requerido para actualizar");
  if (!validUntil) throw new Error("Fecha de vigencia requerida");

  return repo.update(id, title, description, zones, alertLevel, validUntil);
}
