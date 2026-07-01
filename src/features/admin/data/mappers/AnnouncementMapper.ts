import type { AnnouncementDTO } from '../dto/AnnouncementDTO';
import type { Announcement, AlertLevel } from '../../domain/entities/Announcement';

const META_SEPARATOR = '---META---';
const VALID_ALERT_LEVELS: AlertLevel[] = ['info', 'preventive', 'critical'];

function buildContent(description: string, zones: string, alertLevel: AlertLevel): string {
  return [
    description.trim(),
    META_SEPARATOR,
    `zones=${zones.trim()}`,
    `alertLevel=${alertLevel}`,
  ].join('\n');
}

function parseContent(raw: string): { description: string; zones: string; alertLevel: AlertLevel } {
  const [descriptionPart, metaPart] = raw.split(META_SEPARATOR);

  if (!metaPart) {
    
    return { description: raw.trim(), zones: '', alertLevel: 'info' };
  }

  const zonesMatch = metaPart.match(/zones=(.*)/);
  const levelMatch = metaPart.match(/alertLevel=(.*)/);

  const rawLevel = levelMatch?.[1]?.trim() as AlertLevel | undefined;
  const alertLevel = VALID_ALERT_LEVELS.includes(rawLevel as AlertLevel) ? (rawLevel as AlertLevel) : 'info';

  return {
    description: descriptionPart.trim(),
    zones: zonesMatch?.[1]?.trim() ?? '',
    alertLevel,
  };
}

export const AnnouncementMapper = {
  toDomain(dto: AnnouncementDTO): Announcement {
    const { description, zones, alertLevel } = parseContent(dto.contenido);
    return {
      id: dto.id_comunicado,
      title: dto.titulo,
      description,
      zones,
      alertLevel,
      authorId: dto.id_autor,
      publishedAt: dto.fecha_publicacion,
      validUntil: dto.fecha_vigencia,
    };
  },

  toDomainList(dtos: AnnouncementDTO[]): Announcement[] {
    return dtos.map(AnnouncementMapper.toDomain);
  },

    buildContentField(description: string, zones: string, alertLevel: AlertLevel): string {
    return buildContent(description, zones, alertLevel);
  },
};