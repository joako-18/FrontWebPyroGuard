export interface InterventionDTO {
  id_intervencion: string;
  id_brigada: string;
  id_zona: string;
  estado: string;
  observaciones: string;
  fecha_asignacion: string;
  fecha_completada: string | null;
}

export interface CreateInterventionRequestDTO {
  id_brigada: string;
  id_zona: string;
  estado: string;
  observaciones: string;
}

export interface UpdateInterventionRequestDTO {
  estado: string;
  observaciones: string;
}
