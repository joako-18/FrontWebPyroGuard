import { useState, useEffect, useCallback } from 'react';
import type { Brigade } from '../../domain/entities/Brigade';
import { OperationsRepositoryImpl } from '../../data/repository/OperationsRepositoryImpl';
import { OperationsRemoteDataSource } from '../../data/dataSources/OperationsRemoteDataSource';

const repo = new OperationsRepositoryImpl(new OperationsRemoteDataSource());

export function useBrigades() {
  const [brigades, setBrigades] = useState<Brigade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrigades = useCallback(async () => {
    Promise.resolve().then(() => {
      setIsLoading(true);
      setError(null);
    });
    try {
      const data = await repo.getBrigades();
      setBrigades(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch brigades');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchBrigades, 0);
    return () => clearTimeout(timer);
  }, [fetchBrigades]);

  const createBrigade = useCallback(async (name: string, coordinatorId: string) => {
    const newBrigade = await repo.createBrigade(name, coordinatorId);
    setBrigades(prev => [...prev, newBrigade]);
    return newBrigade;
  }, []);

  const assignMember = useCallback(async (brigadeId: string, memberId: string) => {
    return repo.assignMember(brigadeId, memberId);
  }, []);

  const getBrigadistas = useCallback(async () => {
    return repo.getBrigadistas();
  }, []);

  return {
    brigades,
    isLoading,
    error,
    refetch: fetchBrigades,
    createBrigade,
    assignMember,
    getBrigadistas
  };
}
