import type { IAnnouncementRepository } from '../repository/AnnouncementRepository';
import type { Announcement } from '../entities/Announcement';
import { AnnouncementRepositoryImpl } from '../../data/repository/AnnouncementRepositoryImpl';

export function createGetAnnouncementsHistoryUseCase(
  repository: IAnnouncementRepository = AnnouncementRepositoryImpl
) {
  return async function getAnnouncementsHistoryUseCase(): Promise<Announcement[]> {
    return repository.getHistory();
  };
}

export const getAnnouncementsHistoryUseCase = createGetAnnouncementsHistoryUseCase();