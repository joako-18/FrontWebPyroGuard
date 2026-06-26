import { useState, useEffect } from 'react';
import { OperationsRemoteDataSource } from '../../data/dataSources/OperationsRemoteDataSource';
import type { ObservationDTO } from '../../data/dataSources/OperationsRemoteDataSource';
import { AnalyticsRemoteDataSource } from '../../data/dataSources/AnalyticsRemoteDataSource';

export function useObservations() {
  const [zones, setZones] = useState<{id_zona: string, nombre: string}[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [observations, setObservations] = useState<ObservationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const ds = new AnalyticsRemoteDataSource();
        const data = await ds.getSimpleZones();
        setZones(data);
      } catch (err) {
        console.error("Error fetching zones", err);
      }
    };
    fetchZones();
  }, []);

  useEffect(() => {
    if (!selectedZone) {
      setObservations([]);
      return;
    }

    const fetchObservations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const ds = new OperationsRemoteDataSource();
        const data = await ds.getObservationsByZone(selectedZone);
        setObservations(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar observaciones');
      } finally {
        setIsLoading(false);
      }
    };
    fetchObservations();
  }, [selectedZone]);

  return {
    zones,
    selectedZone,
    setSelectedZone,
    observations,
    isLoading,
    error
  };
}
