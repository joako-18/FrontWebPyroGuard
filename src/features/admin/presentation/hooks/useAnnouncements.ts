import { useState, useEffect } from 'react';
import { getActiveAnnouncementsUseCase } from '../../domain/useCases/GetActiveAnnouncementsUseCase';
import { getAnnouncementsHistoryUseCase } from '../../domain/useCases/GetAnnouncementsHistoryUseCase';
import { createAnnouncementUseCase } from '../../domain/useCases/CreateAnnouncementUseCase';
import { deleteAnnouncementUseCase } from '../../domain/useCases/DeleteAnnouncementUseCase';
import type { Announcement, AlertLevel } from '../../domain/entities/Announcement';
import { ApiError } from '../../../../shared/api/httpClient';

type ViewMode = 'active' | 'history';

export function useAnnouncements(initialMode: ViewMode = 'active') {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAnnouncements(mode: ViewMode = viewMode) {
    setIsLoading(true);
    setError(null);
    try {
      const data =
        mode === 'active' ? await getActiveAnnouncementsUseCase() : await getAnnouncementsHistoryUseCase();
      setAnnouncements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar la lista de comunicados.');
    } finally {
      setIsLoading(false);
    }
  }

  
  
  
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data =
          viewMode === 'active' ? await getActiveAnnouncementsUseCase() : await getAnnouncementsHistoryUseCase();
        if (isMounted) setAnnouncements(data);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'No se pudo cargar la lista de comunicados.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [viewMode]);

  async function createAnnouncement(
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ): Promise<boolean> {
    setError(null);
    try {
      const created = await createAnnouncementUseCase(title, description, zones, alertLevel, validUntil);
      
      
      setAnnouncements((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo publicar el comunicado.');
      }
      return false;
    }
  }

  async function deleteAnnouncement(id: string): Promise<boolean> {
    setError(null);
    try {
      await deleteAnnouncementUseCase(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo eliminar el comunicado.');
      }
      return false;
    }
  }

  return {
    announcements,
    isLoading,
    error,
    viewMode,
    setViewMode,
    fetchAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
  };
}