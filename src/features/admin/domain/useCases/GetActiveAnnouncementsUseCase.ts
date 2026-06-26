import type { IAnnouncementRepository } from '../repository/AnnouncementRepository';
import type { Announcement } from '../entities/Announcement';
import { AnnouncementRepositoryImpl } from '../../data/repository/AnnouncementRepositoryImpl';

/**
 * Caso de uso: obtener solo los comunicados vigentes (no vencidos).
 */
export function createGetActiveAnnouncementsUseCase(
  repository: IAnnouncementRepository = AnnouncementRepositoryImpl
) {
  return async function getActiveAnnouncementsUseCase(): Promise<Announcement[]> {
    return repository.getActive();
  };
}

export const getActiveAnnouncementsUseCase = createGetActiveAnnouncementsUseCase();