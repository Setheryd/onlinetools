'use client';

import React, { useEffect, useRef, useState } from 'react';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

function geocodeAddress(address) {
  const params = new URLSearchParams({
    q: address,
    format: 'json',
    limit: '1',
  });
  return fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { Accept: 'application/json' },
  })
    .then((r) => r.json())
    .then((arr) => {
      if (Array.isArray(arr) && arr.length > 0) {
        const { lat, lon } = arr[0];
        return [parseFloat(lat), parseFloat(lon)];
      }
      return null;
    });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const OSRM_ROUTE_URL = 'https://router.project-osrm.org/route/v1/driving';

/** Fetch driving route geometry between two points (OSRM). Returns array of [lat, lon] or null. */
async function fetchRouteGeometry(lon1, lat1, lon2, lat2) {
  const coords = `${lon1},${lat1};${lon2},${lat2}`;
  const url = `${OSRM_ROUTE_URL}/${coords}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const coordsList = data?.routes?.[0]?.geometry?.coordinates;
  if (!Array.isArray(coordsList) || coordsList.length === 0) return null;
  return coordsList.map(([lon, lat]) => [lat, lon]);
}

function bboxFromCoords(coords, paddingPercent = 0.15) {
  if (!coords.length) return null;
  const lats = coords.map((c) => c[0]);
  const lons = coords.map((c) => c[1]);
  let minLat = Math.min(...lats);
  let maxLat = Math.max(...lats);
  let minLon = Math.min(...lons);
  let maxLon = Math.max(...lons);
  const padLat = Math.max((maxLat - minLat) * paddingPercent, 0.01);
  const padLon = Math.max((maxLon - minLon) * paddingPercent, 0.01);
  return { minLat: minLat - padLat, maxLat: maxLat + padLat, minLon: minLon - padLon, maxLon: maxLon + padLon };
}

/** Wait for element to have non-zero size (e.g. after layout). */
function waitForSize(el, maxWaitMs = 2000) {
  return new Promise((resolve) => {
    if (!el) return resolve(false);
    if (el.offsetWidth > 0 && el.offsetHeight > 0) return resolve(true);
    const start = Date.now();
    const check = () => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) return resolve(true);
      if (Date.now() - start >= maxWaitMs) return resolve(false);
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });
}

export default function RouteMap({ orderedAddresses, legs }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [geocodeError, setGeocodeError] = useState('');
  const [geocoding, setGeocoding] = useState(true);
  const [placedCount, setPlacedCount] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [osmLink, setOsmLink] = useState(null);

  // Load Leaflet CSS from same origin (no CSP block)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'leaflet-styles';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = '/leaflet/leaflet.css';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!orderedAddresses?.length) return;
    setUseFallback(false);

    let cancelled = false;

    const run = async () => {
      const coords = [];
      for (let i = 0; i < orderedAddresses.length; i++) {
        if (cancelled) return;
        const addr = orderedAddresses[i];
        try {
          const c = await geocodeAddress(addr);
          if (cancelled) return;
          if (c) coords.push({ latlng: c, address: addr, index: i + 1 });
          await delay(400);
        } catch {
          if (!cancelled) setGeocodeError('Some addresses could not be placed on the map.');
        }
      }
      if (cancelled || coords.length === 0) return;
      setPlacedCount(coords.length);
      setGeocoding(false);

      const bbox = bboxFromCoords(coords.map((c) => c.latlng));
      if (bbox) {
        const bboxStr = `${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}`;
        setEmbedUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bboxStr)}&layer=mapnik`);
        setOsmLink(`https://www.openstreetmap.org/?bbox=${encodeURIComponent(bboxStr)}`);
      }

      try {
        const L = (await import('leaflet')).default;
        if (cancelled) return;
        const el = containerRef.current;
        if (!el) {
          setUseFallback(true);
          return;
        }
        const hasSize = await waitForSize(el);
        if (cancelled || !hasSize) {
          setUseFallback(true);
          return;
        }

        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
          iconUrl: '/leaflet/images/marker-icon.png',
          shadowUrl: '/leaflet/images/marker-shadow.png',
        });

        const map = L.map(el).setView([39.5, -98.5], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
        mapRef.current = map;

        const group = L.layerGroup();
        layerRef.current = group;

        coords.forEach(({ latlng, address, index }) => {
          const marker = L.marker(latlng, {
            icon: L.divIcon({
              className: 'route-stop-marker',
              html: `<span class="route-stop-number">${index}</span>`,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            }),
          });
          marker.bindPopup(`<strong>Stop ${index}</strong><br/>${address.replace(/</g, '&lt;')}`);
          marker.addTo(group);
        });

        if (coords.length >= 2) {
          const allLatLngs = [];
          for (let i = 0; i < coords.length - 1; i++) {
            if (cancelled) break;
            const [lat1, lon1] = coords[i].latlng;
            const [lat2, lon2] = coords[i + 1].latlng;
            try {
              const geometry = await fetchRouteGeometry(lon1, lat1, lon2, lat2);
              if (geometry && geometry.length > 0) {
                if (allLatLngs.length > 0) allLatLngs.pop();
                allLatLngs.push(...geometry);
              } else {
                allLatLngs.push(coords[i].latlng, coords[i + 1].latlng);
              }
              await delay(150);
            } catch {
              allLatLngs.push(coords[i].latlng, coords[i + 1].latlng);
            }
          }
          if (allLatLngs.length >= 2) {
            L.polyline(allLatLngs, { color: '#2563eb', weight: 4, opacity: 0.8 }).addTo(group);
          }
        }

        group.addTo(map);
        const bounds = L.latLngBounds(coords.map((c) => c.latlng));
        map.fitBounds(bounds.pad(0.15));
      } catch (err) {
        if (!cancelled) setUseFallback(true);
      }
    };

    const t = setTimeout(run, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
      if (layerRef.current) layerRef.current.clearLayers();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [orderedAddresses]);

  const showFallback = useFallback && embedUrl;

  return (
    <div
      className="route-map-wrapper rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
      style={{ isolation: 'isolate', filter: 'none' }}
    >
      <div
        ref={containerRef}
        className="w-full h-[400px] min-h-[400px] relative z-0"
        style={{ filter: 'none', display: showFallback ? 'none' : 'block' }}
      />
      {showFallback && (
        <>
          <iframe
            title="Route map"
            src={embedUrl}
            className="w-full h-[400px] border-0 block"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="px-3 py-2 text-sm bg-white border-t border-gray-200">
            <a href={osmLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Open in OpenStreetMap ↗
            </a>
          </div>
        </>
      )}
      <div className="px-3 py-2 text-sm text-gray-600 bg-white border-t border-gray-200 flex flex-wrap items-center gap-2">
        {(geocoding || geocodeError) && (
          <span>
            {geocoding && 'Placing stops on map…'}
            {geocodeError && ` ${geocodeError}`}
          </span>
        )}
        {placedCount > 0 && !showFallback && (
          <span className="font-medium text-gray-800">
            {placedCount} stop{placedCount !== 1 ? 's' : ''} on map
          </span>
        )}
        {placedCount > 0 && showFallback && (
          <span className="font-medium text-gray-800">
            {placedCount} stop{placedCount !== 1 ? 's' : ''} · viewing in OpenStreetMap
          </span>
        )}
      </div>
    </div>
  );
}
