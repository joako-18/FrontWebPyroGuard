import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import AnnouncementModal from '../components/AnnouncementModal';
import { useAnnouncements } from '../hooks/useAnnouncements';
import type { Announcement } from '../../domain/entities/Announcement';
import './AnnouncementsPage.css';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

export default function AnnouncementsPage() {
  const {
    announcements,
    isLoading,
    error,
    viewMode,
    setViewMode,
    createAnnouncement,
    deleteAnnouncement,
  } = useAnnouncements('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (announcement: Announcement) => {
    const confirmed = window.confirm(`¿Eliminar el comunicado "${announcement.title}"?`);
    if (!confirmed) return;

    setDeletingId(announcement.id);
    await deleteAnnouncement(announcement.id);
    setDeletingId(null);
  };

  return (
    <div className="announcements-page fade-up">
      <header className="page-header header-between">
        <h1 className="page-title">Comunicados</h1>
        <div className="header-actions">
          <div className="view-tabs">
            <button
              className={`view-tab ${viewMode === 'active' ? 'active' : ''}`}
              onClick={() => setViewMode('active')}
              type="button"
            >
              Vigentes
            </button>
            <button
              className={`view-tab ${viewMode === 'history' ? 'active' : ''}`}
              onClick={() => setViewMode('history')}
              type="button"
            >
              Historial
            </button>
          </div>
          <button className="btn-new" onClick={() => setIsModalOpen(true)}>
            Nuevo Comunicado
          </button>
        </div>
      </header>

      {error && (
        <div className="glass-card error-card" style={{ padding: '20px', textAlign: 'center', color: '#ff4d4f', margin: '20px 0' }}>
          <h3>No se pudieron cargar los comunicados</h3>
          <p>Ocurrió un error de conexión con el servidor. {error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '15px' }}>
            Reintentar
          </button>
        </div>
      )}

      {isLoading && (
        <div className="announcements-list">
          {[1, 2, 3].map((i) => (
            <div className="announcement-card glass-card" key={i}>
              <div className="card-header-top">
                <div className="title-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Skeleton circle width={12} height={12} />
                  <Skeleton width={150} height={20} />
                </div>
              </div>
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                <Skeleton count={2} />
              </div>
              <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="card-meta" style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <Skeleton width={80} />
                  <Skeleton width={100} />
                  <Skeleton width={120} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && announcements.length === 0 && (
        <div className="glass-card empty-card" style={{ padding: '40px', textAlign: 'center', opacity: 0.8, margin: '20px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>📭</div>
          <p style={{ fontSize: '1.1rem' }}>No hay comunicados {viewMode === 'active' ? 'vigentes' : 'en el historial'} en este momento.</p>
        </div>
      )}

      <div className="announcements-list">
        {!isLoading &&
          announcements.map((announcement) => (
            <div className="announcement-card glass-card" key={announcement.id}>
              <div className="card-header-top">
                <div className="title-group">
                  <span className={`status-dot dot-${announcement.alertLevel}`}></span>
                  <h3 className="card-title">{announcement.title}</h3>
                </div>
              </div>

              <p className="card-desc">{announcement.description}</p>

              <div className="card-footer">
                <div className="card-meta">
                  {announcement.zones && <span>Zonas: {announcement.zones}</span>}
                  <span>Publicado: {formatDate(announcement.publishedAt)}</span>
                  <span>Vigente hasta: {formatDate(announcement.validUntil)}</span>
                </div>

                <div className="action-buttons">
                  <button className="btn-icon-sq" title="Editar" disabled>
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="btn-icon-sq"
                    title="Eliminar"
                    onClick={() => handleDelete(announcement)}
                    disabled={deletingId === announcement.id}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createAnnouncement}
      />
    </div>
  );
}