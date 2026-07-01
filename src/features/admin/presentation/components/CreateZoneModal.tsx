import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import './CreateZoneModal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, geojson: Record<string, unknown>) => Promise<void>;
}

function DrawControl({ onCreated }: { onCreated: (geojson: Record<string, unknown>) => void }) {
  const map = useMap();

  useEffect(() => {
    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
      },
      edit: {
        featureGroup: new L.FeatureGroup(),
      },
    });

    map.addControl(drawControl);

    const handleCreated = (e: L.LeafletEvent) => {
      const event = e as unknown as L.DrawEvents.Created;
      const layer = event.layer;
      onCreated(layer.toGeoJSON() as Record<string, unknown>);
      
      
    };

    map.on(L.Draw.Event.CREATED, handleCreated);

    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, handleCreated);
    };
  }, [map, onCreated]);

  return null;
}

export default function CreateZoneModal({ isOpen, onClose, onSave }: Props) {
  const [zoneName, setZoneName] = useState('');
  const [geoJson, setGeoJson] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleCreated = useCallback((geojson: Record<string, unknown>) => {
    setGeoJson(geojson);
  }, []);

  const handleSave = async () => {
    if (!zoneName.trim() || !geoJson) return;
    setSaving(true);
    try {
      await onSave(zoneName.trim(), geoJson);
      setZoneName('');
      setGeoJson(null);
      onClose();
    } catch {
      // error manejado por el padre
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setZoneName('');
    setGeoJson(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content zone-modal">
        <h2 className="modal-title">Crear Nueva Zona de Monitoreo</h2>
        <div className="zone-name-input">
          <label>Nombre de la zona:</label>
          <input
            type="text"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            placeholder="Ej. Reserva El Triunfo"
          />
        </div>
        <div className="map-draw-wrapper">
          <MapContainer
            center={[16.3, -93.8]}
            zoom={8}
            className="zone-draw-map"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <DrawControl onCreated={handleCreated} />
          </MapContainer>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={handleClose} disabled={saving}>
            Cancelar
          </button>
          <button
            className="btn-create-zone"
            onClick={handleSave}
            disabled={!zoneName.trim() || !geoJson || saving}
          >
            {saving ? 'Creando...' : 'Crear Zona'}
          </button>
        </div>
      </div>
    </div>
  );
}