export interface CitizenReport {
  id: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  fotoUrl: string | null;
  estado: string;
  creadoEn: string;
}