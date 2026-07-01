import { useState, useEffect, useCallback, useRef } from 'react';
import type { Incident } from '../../domain/entities/Incident';
import type { ThresholdConfig } from '../../domain/entities/ThresholdConfig';
import type { Zone } from '../../domain/entities/Zone';
import { IncidentRepositoryImpl } from '../../data/repository/IncidentRepositoryImpl';
import { ThresholdRepositoryImpl } from '../../data/repository/ThresholdRepositoryImpl';
import { ZoneRepositoryImpl } from '../../data/repository/ZoneRepositoryImpl';
import { IncidentsRemoteDataSource } from '../../data/dataSources/IncidentsRemoteDataSource';
import { ThresholdsRemoteDataSource } from '../../data/dataSources/ThresholdsRemoteDataSource';
import { ZonesRemoteDataSource } from '../../data/dataSources/ZonesRemoteDataSource';

const incidentsRepo = new IncidentRepositoryImpl(new IncidentsRemoteDataSource());
const thresholdsRepo = new ThresholdRepositoryImpl(new ThresholdsRemoteDataSource());
const zonesRepo = new ZoneRepositoryImpl(new ZonesRemoteDataSource());

export function useZonesData() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [thresholds, setThresholds] = useState<ThresholdConfig | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let cancelled = false;

    const load = async () => {
      
      if (fetchKey > 0) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const [inc, thr, zon] = await Promise.all([
          incidentsRepo.getHistoricalIncidents(),
          thresholdsRepo.getThresholds(),
          zonesRepo.getZones(),
        ]);

        if (!cancelled && isMounted.current) {
          setIncidents(inc);
          setThresholds(thr);
          setZones(zon);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled && isMounted.current) {
          setError(err instanceof Error ? err.message : 'Error al cargar datos');
        }
      } finally {
        if (!cancelled && isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      isMounted.current = false;
    };
  }, [fetchKey]);

  const refetch = useCallback(() => {
    setFetchKey((k) => k + 1);
  }, []);

  const updateThresholds = async (config: ThresholdConfig) => {
    await thresholdsRepo.updateThresholds(config);
    setThresholds(config);
  };

  const createZone = async (nombre: string, geojsonPolygon: Record<string, unknown>) => {
    const newZone = await zonesRepo.createZone(nombre, geojsonPolygon);
    setZones((prev) => [...prev, newZone]);
    return newZone;
  };

  return {
    incidents,
    thresholds,
    zones,
    isLoading,
    error,
    refetch,
    updateThresholds,
    createZone,
  };
}