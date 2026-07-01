import type { IAnnouncementRepository } from '../repository/AnnouncementRepository';
import { AnnouncementRepositoryImpl } from '../../data/repository/AnnouncementRepositoryImpl';

export function createDeleteAnnouncementUseCase(
  repository: IAnnouncementRepository = AnnouncementRepositoryImpl
) {
  return async function deleteAnnouncementUseCase(id: string): Promise<string> {
    if (!id) {
      throw new Error('El identificador del comunicado es obligatorio.');
    }
    return repository.delete(id);
  };
}

export const deleteAnnouncementUseCase = createDeleteAnnouncementUseCase();