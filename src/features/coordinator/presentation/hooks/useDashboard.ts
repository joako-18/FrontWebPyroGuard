import { useState, useEffect } from 'react';
import { getZonesUseCase } from '../../domain/useCases/GetZonesUseCase';
import { getSeasonalityUseCase } from '../../domain/useCases/GetSeasonalityUseCase';
import type { Zone } from '../../domain/entities/Zone';
import type { SeasonalityRecord } from '../../domain/entities/SeasonalityRecord';

/**
 * Hook de presentación: orquesta la carga de zonas y estacionalidad
 * para el dashboard del coordinador. Ambas peticiones corren en paralelo.
 */
export function useDashboard() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [seasonality, setSeasonality] = useState<SeasonalityRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [zonesData, seasonalityData] = await Promise.all([
          getZonesUseCase(),
          getSeasonalityUseCase(),
        ]);
        if (isMounted) {
          setZones(zonesData);
          setSeasonality(seasonalityData);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'No se pudo cargar la información del dashboard.'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { zones, seasonality, isLoading, error };
}