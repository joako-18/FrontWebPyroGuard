import type { IAnnouncementRepository } from '../../domain/repository/AnnouncementRepository';
import type { Announcement, AlertLevel } from '../../domain/entities/Announcement';
import { AnnouncementRemoteDataSource } from '../dataSources/AnnouncementRemoteDataSource';
import { AnnouncementMapper } from '../mappers/AnnouncementMapper';

/**
 * Implementación concreta: orquesta dataSource + mapper.
 */
export const AnnouncementRepositoryImpl: IAnnouncementRepository = {
  async create(
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<Announcement> {
    const contenido = AnnouncementMapper.buildContentField(description, zones, alertLevel);
    const dto = await AnnouncementRemoteDataSource.create({
      titulo: title,
      contenido,
      fecha_vigencia: validUntil,
    });
    return AnnouncementMapper.toDomain(dto);
  },

  async getActive(): Promise<Announcement[]> {
    const dtos = await AnnouncementRemoteDataSource.getActive();
    return AnnouncementMapper.toDomainList(dtos);
  },

  async getHistory(): Promise<Announcement[]> {
    const dtos = await AnnouncementRemoteDataSource.getHistory();
    return AnnouncementMapper.toDomainList(dtos);
  },

  async delete(id: string): Promise<string> {
    return AnnouncementRemoteDataSource.delete(id);
  },
};