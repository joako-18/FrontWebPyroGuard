import { useState, useCallback } from 'react';
import type { Intervention } from '../../domain/entities/Intervention';
import { OperationsRepositoryImpl } from '../../data/repository/OperationsRepositoryImpl';
import { OperationsRemoteDataSource } from '../../data/dataSources/OperationsRemoteDataSource';

const repo = new OperationsRepositoryImpl(new OperationsRemoteDataSource());

export function useInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInterventionsByZone = useCallback(async (zoneId: string, limit = 5) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await repo.getInterventionsByZone(zoneId, limit);
      setInterventions(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch interventions');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createIntervention = async (brigadeId: string, zoneId: string, notes: string) => {
    const newIntervention = await repo.createIntervention(brigadeId, zoneId, notes);
    return newIntervention;
  };

  const updateIntervention = async (interventionId: string, status: string, notes: string) => {
    const updated = await repo.updateIntervention(interventionId, status, notes);
    setInterventions(prev => prev.map(i => i.id === interventionId ? updated : i));
    return updated;
  };

  return {
    interventions,
    isLoading,
    error,
    fetchInterventionsByZone,
    createIntervention,
    updateIntervention
  };
}
