import type { IAnnouncementRepository } from '../../domain/repository/AnnouncementRepository';
import type { Announcement, AlertLevel } from '../../domain/entities/Announcement';
import { AnnouncementRemoteDataSource } from '../dataSources/AnnouncementRemoteDataSource';
import { AnnouncementMapper } from '../mappers/AnnouncementMapper';

export const AnnouncementRepositoryImpl: IAnnouncementRepository = {
  async create(
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<Announcement> {
    if (alertLevel === 'critical') {
      const dto = await AnnouncementRemoteDataSource.createEmergency({
        id_zona: zones,
        mensaje_adicional: description,
        fecha_vigencia: validUntil,
      });
      return AnnouncementMapper.toDomain(dto);
    } else {
      const contenido = AnnouncementMapper.buildContentField(description, zones, alertLevel);
      const dto = await AnnouncementRemoteDataSource.create({
        titulo: title,
        contenido,
        fecha_vigencia: validUntil,
      });
      return AnnouncementMapper.toDomain(dto);
    }
  },

  async getActive(): Promise<Announcement[]> {
    const dtos = await AnnouncementRemoteDataSource.getAll();
    const all = AnnouncementMapper.toDomainList(dtos);
    const now = new Date().getTime();
    return all.filter(a => new Date(a.validUntil).getTime() > now);
  },

  async getHistory(): Promise<Announcement[]> {
    const dtos = await AnnouncementRemoteDataSource.getAll();
    const all = AnnouncementMapper.toDomainList(dtos);
    const now = new Date().getTime();
    return all.filter(a => new Date(a.validUntil).getTime() <= now);
  },

  async delete(id: string): Promise<string> {
    return AnnouncementRemoteDataSource.delete(id);
  },

  async update(
    id: string,
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<Announcement> {
    const contenido = AnnouncementMapper.buildContentField(description, zones, alertLevel);
    const dto = await AnnouncementRemoteDataSource.update(id, {
      titulo: title,
      contenido,
      fecha_vigencia: validUntil,
    });
    return AnnouncementMapper.toDomain(dto);
  },
};