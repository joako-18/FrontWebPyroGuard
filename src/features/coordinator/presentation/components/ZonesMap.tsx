import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from 'react-leaflet';
import type { Zone } from '../../domain/entities/Zone';
import 'leaflet/dist/leaflet.css';
import './ZonesMap.css';

interface ZonesMapProps {
  zones: Zone[];
}

/** Centro por defecto: aproximadamente el centro geográfico de Chiapas */
const DEFAULT_CENTER: [number, number] = [16.75, -93.1];
const DEFAULT_ZOOM = 7;

function formatHectares(value: number): string {
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(value);
}

export default function ZonesMap({ zones }: ZonesMapProps) {
  const center: [number, number] =
    zones.length > 0 ? [zones[0].latitude, zones[0].longitude] : DEFAULT_CENTER;

  return (
    <div className="zones-map-wrapper">
      <MapContainer center={center} zoom={DEFAULT_ZOOM} className="zones-map">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {zones.map((zone) => {
          if (zone.geojson) {
            return (
              <GeoJSON
                key={`geojson-${zone.id}`}
                data={zone.geojson}
                pathOptions={{
                  color: '#ff6a00',
                  fillColor: '#ff6a00',
                  fillOpacity: 0.3,
                  weight: 2,
                }}
              >
                <Popup>
                  <strong>{zone.name}</strong>
                  <br />
                  Área: {formatHectares(zone.areaHectares)} ha
                </Popup>
              </GeoJSON>
            );
          }

          return (
            <CircleMarker
              key={`circle-${zone.id}`}
              center={[zone.latitude, zone.longitude]}
              radius={Math.max(10, Math.min(28, zone.areaHectares / 8000))}
              pathOptions={{
                color: '#ff6a00',
                fillColor: '#ff6a00',
                fillOpacity: 0.35,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{zone.name}</strong>
                <br />
                Área: {formatHectares(zone.areaHectares)} ha
                {!zone.hasRealCoordinates && (
                  <>
                    <br />
                    <em>Coordenada aproximada</em>
                  </>
                )}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}