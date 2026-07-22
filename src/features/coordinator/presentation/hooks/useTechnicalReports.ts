import { useState, useEffect } from 'react';
import { OperationsRemoteDataSource } from '../../data/dataSources/OperationsRemoteDataSource';
import type { TechnicalReportDTO } from '../../data/dataSources/OperationsRemoteDataSource';

export function useTechnicalReports(selectedZone: string) {
  const [reports, setReports] = useState<TechnicalReportDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    if (!selectedZone) {
      setReports([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const ds = new OperationsRemoteDataSource();
      const data = await ds.getTechnicalReportsByZone(selectedZone);
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar reportes técnicos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedZone]);

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
