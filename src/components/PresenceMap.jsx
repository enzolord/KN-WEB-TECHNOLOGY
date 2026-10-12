import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { FaEarthAfrica, FaPlane } from 'react-icons/fa6';
import { cities, internationalReach } from '../data/nav';
import { useTheme } from '../context/ThemeContext';
import Reveal from './Reveal';
import { useT } from '../i18n/LanguageContext';
import 'leaflet/dist/leaflet.css';
import './PresenceMap.css';

const HQ = cities.find((c) => c.primary) || cities[0];
const OTHER_CITIES = cities.filter((c) => c !== HQ);

const TILE_URLS = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png',
};

function cityIcon(city) {
  return divIcon({
    className: 'city-marker-wrap',
    html: `
      <span class="city-marker ${city.primary ? 'is-hq' : ''}">
        <span class="city-marker-core"></span>
      </span>
      <span class="city-marker-label ${city.primary ? 'is-hq' : ''}">${city.name}</span>
    `,
    iconSize: [1, 1],
    iconAnchor: [0, 0],
  });
}

export default function PresenceMap() {
  const { theme } = useTheme();
  const t = useT();

  const bounds = useMemo(() => cities.map((c) => [c.lat, c.lng]), []);

  return (
    <Reveal className="presence-map-wrap">
      <div className="presence-map-shell">
        <div className="presence-map-leaflet">
          <MapContainer
            key={theme}
            bounds={bounds}
            boundsOptions={{ padding: [48, 48] }}
            scrollWheelZoom={false}
            dragging={true}
            zoomControl={true}
            className="presence-leaflet-container"
          >
            <TileLayer
              url={TILE_URLS[theme] || TILE_URLS.dark}
              subdomains="abcd"
              maxZoom={19}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {OTHER_CITIES.map((city) => (
              <Polyline
                key={`line-${city.name}`}
                positions={[
                  [HQ.lat, HQ.lng],
                  [city.lat, city.lng],
                ]}
                pathOptions={{ className: 'flow-line' }}
              />
            ))}

            {cities.map((city) => (
              <Marker key={city.name} position={[city.lat, city.lng]} icon={cityIcon(city)}>
                <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                  <strong>{city.name}</strong> — {city.descKey ? t(`presence.cityDesc.${city.descKey}`) : city.desc}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="presence-intl-panel">
          <div className="presence-intl-head">
            <FaEarthAfrica size={16} />
            <span>{t('presence.intlTitle')}</span>
          </div>
          <p className="presence-intl-sub">{t('presence.intlSub')}</p>
          <div className="presence-intl-list">
            {internationalReach.map((r) => (
              <div className="presence-intl-card" key={r.region}>
                <span className="presence-intl-line" aria-hidden="true" />
                <FaPlane size={13} className="presence-intl-icon" />
                <div>
                  <strong>{r.key ? t(`presence.regions.${r.key}.name`) : r.region}</strong>
                  <small>{r.key ? t(`presence.regions.${r.key}.desc`) : r.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
