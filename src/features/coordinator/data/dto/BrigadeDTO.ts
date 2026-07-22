export interface BrigadeDTO {
  id_brigada: string;
  nombre: string;
  id_coordinador: string;
  coordinador_nombre?: string;
  activa: boolean;
  creado_en: string;
  brigadistas?: any[];
}

export interface CreateBrigadeRequestDTO {
  nombre: string;
  id_coordinador: string;
}

export interface AssignMemberRequestDTO {
  id_brigadista: string;
}
