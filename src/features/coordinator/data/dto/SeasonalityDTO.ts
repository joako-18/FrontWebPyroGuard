/**
 * DTO de la respuesta de GET /ml/api/v1/analitica/estacionalidad
 *
 * Forma: { [nombreZona]: { [mes: "1"-"12"]: cantidadIncendios } }
 * Los meses ausentes significan 0 incidentes registrados ese mes.
 */
export type SeasonalityDTO = Record<string, Record<string, number>>;