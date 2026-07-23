import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Incident } from '../../domain/entities/Incident';
import './IncidentMap.css';

function parseWktPoint(wkt: string): [number, number] | null {
  const match = wkt.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
  if (match) {
    return [parseFloat(match[2]), parseFloat(match[1])]; 
  }
  return null;
}

function FitBounds({ incidents }: { incidents: Incident[] }) {
  const map = useMap();
  useEffect(() => {
    if (incidents.length === 0) return;
    const bounds = L.latLngBounds(
      incidents
        .map((i) => parseWktPoint(i.coordenadaWkt))
        .filter((c): c is [number, number] => c !== null)
        .map((c) => L.latLng(c[0], c[1]))
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [incidents, map]);
  return null;
}

interface Props {
  incidents: Incident[];
}

export default function IncidentMap({ incidents }: Props) {
  return (
    <div className="incident-map-wrapper">
      <MapContainer
        center={[16.3, -93.8]}
        zoom={8}
        className="incident-map"
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds incidents={incidents} />
        {incidents.map((inc) => {
          const coords = parseWktPoint(inc.coordenadaWkt);
          if (!coords) return null;
          return (
            <CircleMarker 
              key={inc.id} 
              center={coords}
              radius={6}
              pathOptions={{ 
                color: '#ffffff', 
                weight: 1, 
                fillColor: '#ef4444', 
                fillOpacity: 0.8 
              }}
            >
              <Popup>
                <div className="incident-popup">
                  <strong>{inc.fuente}</strong><br />
                  Zona: {inc.zona}<br />
                  Fecha: {new Date(inc.fecha).toLocaleDateString('es-MX')}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}