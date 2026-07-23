import { useState, useEffect, useCallback, useRef } from 'react';
import type { CitizenReport } from '../../domain/entities/CitizenReport';
import { CitizenReportRepositoryImpl } from '../../data/repository/CitizenReportRepositoryImpl';
import { CitizenReportRemoteDataSource } from '../../data/dataSources/CitizenReportRemoteDataSource';

const repo = new CitizenReportRepositoryImpl(new CitizenReportRemoteDataSource());

export function useCitizenReports() {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await repo.getAll();
      if (isMounted.current) {
        setReports(data);
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        if (err && typeof err === 'object' && 'status' in err && (err as any).status === 404) {
          setReports([]);
        } else {
          setError(err instanceof Error ? err.message : 'Error al cargar reportes');
        }
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const timer = setTimeout(fetchReports, 0);
    return () => {
      clearTimeout(timer);
      isMounted.current = false;
    };
  }, [fetchReports]);

  return { reports, isLoading, error, refetch: fetchReports };
}