import { useState, useEffect } from 'react';
import { OperationsRemoteDataSource } from '../../data/dataSources/OperationsRemoteDataSource';
import type { TechnicalReportDTO } from '../../data/dataSources/OperationsRemoteDataSource';

export function useTechnicalReports(selectedZone: string) {
  const [reports, setReports] = useState<TechnicalReportDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async (silent = false) => {
    if (!selectedZone) {
      setReports([]);
      return;
    }
    if (!silent) setIsLoading(true);
    if (!silent) setError(null);
    try {
      const ds = new OperationsRemoteDataSource();
      const data = await ds.getTechnicalReportsByZone(selectedZone);
      setReports(data);
    } catch (err) {
      if (!silent) setError(err instanceof Error ? err.message : 'Error al cargar reportes técnicos');
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedZone]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    const hasProcessing = reports.some(r => r.estado === 'Procesando');
    if (hasProcessing) {
      interval = setInterval(() => {
        fetchReports(true);
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [reports, selectedZone]);

  const requestReport = async () => {
    if (!selectedZone) return;
    setIsRequesting(true);
    setError(null);
    try {
      const ds = new OperationsRemoteDataSource();
      await ds.requestTechnicalReport(selectedZone);
      await fetchReports(); // Refetch to show the new 'Procesando' report
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al solicitar reporte');
    } finally {
      setIsRequesting(false);
    }
  };

  return {
    reports,
    isLoading,
    isRequesting,
    error,
    requestReport,
    refetch: fetchReports
  };
}
