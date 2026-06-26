import type { IAnnouncementRepository } from '../repository/AnnouncementRepository';
import type { Announcement, AlertLevel } from '../entities/Announcement';
import { AnnouncementRepositoryImpl } from '../../data/repository/AnnouncementRepositoryImpl';

const VALID_ALERT_LEVELS: AlertLevel[] = ['info', 'preventive', 'critical'];

/**
 * Caso de uso: publicar un nuevo comunicado, con validaciones de negocio.
 */
export function createCreateAnnouncementUseCase(
  repository: IAnnouncementRepository = AnnouncementRepositoryImpl
) {
  return async function createAnnouncementUseCase(
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<Announcement> {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      throw new Error('El título del comunicado es obligatorio.');
    }

    if (!trimmedDescription) {
      throw new Error('La descripción del comunicado es obligatoria.');
    }

    if (!VALID_ALERT_LEVELS.includes(alertLevel)) {
      throw new Error('El nivel de alerta seleccionado no es válido.');
    }

    if (!validUntil) {
      throw new Error('La fecha de vigencia es obligatoria.');
    }

    const validUntilDate = new Date(validUntil);
    if (Number.isNaN(validUntilDate.getTime())) {
      throw new Error('La fecha de vigencia no es válida.');
    }

    if (validUntilDate.getTime() <= Date.now()) {
      throw new Error('La fecha de vigencia debe ser posterior a la fecha actual.');
    }

    return repository.create(
      trimmedTitle,
      trimmedDescription,
      zones.trim(),
      alertLevel,
      validUntilDate.toISOString()
    );
  };
}

export const createAnnouncementUseCase = createCreateAnnouncementUseCase();