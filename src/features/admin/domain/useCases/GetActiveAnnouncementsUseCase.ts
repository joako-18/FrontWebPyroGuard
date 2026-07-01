import type { IAnnouncementRepository } from '../repository/AnnouncementRepository';
import type { Announcement } from '../entities/Announcement';
import { AnnouncementRepositoryImpl } from '../../data/repository/AnnouncementRepositoryImpl';

export function createGetActiveAnnouncementsUseCase(
  repository: IAnnouncementRepository = AnnouncementRepositoryImpl
) {
  return async function getActiveAnnouncementsUseCase(): Promise<Announcement[]> {
    return repository.getActive();
  };
}

export const getActiveAnnouncementsUseCase = createGetActiveAnnouncementsUseCase();