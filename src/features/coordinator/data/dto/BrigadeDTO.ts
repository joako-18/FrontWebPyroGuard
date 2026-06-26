export interface BrigadeDTO {
  id_brigada: string;
  nombre: string;
  id_coordinador: string;
  activa: boolean;
  creado_en: string;
}

export interface CreateBrigadeRequestDTO {
  nombre: string;
  id_coordinador: string;
}

export interface AssignMemberRequestDTO {
  id_brigadista: string;
}
