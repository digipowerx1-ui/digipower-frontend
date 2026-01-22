"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Building2, Zap, MapPin } from 'lucide-react';

interface DataCenter {
  id: number;
  name: string;
  location: string;
  capacity: string;
  coordinates: [number, number];
  status: 'Operational' | 'Development';
}

const dataCenters: DataCenter[] = [
  {
    id: 1,
    name: 'North Tonawanda Power Plant',
    location: 'New York',
    capacity: '123 MW',
    coordinates: [43.0395, -78.8640],
    status: 'Operational',
  },
  {
    id: 2,
    name: 'Buffalo Hydropower Data Center',
    location: 'Buffalo, NY',
    capacity: '18.7 MW',
    coordinates: [42.8864, -78.8784],
    status: 'Operational',
  },
  {
    id: 3,
    name: 'Alabama Utility-Powered Facility',
    location: 'Alabama',
    capacity: '55 MW',
    coordinates: [32.3182, -86.9023],
    status: 'Operational',
  },
  {
    id: 4,
    name: 'North Carolina Development Site',
    location: 'North Carolina',
    capacity: '200 MW',
    coordinates: [35.7596, -79.0193],
    status: 'Development',
  },
];

export default function DataCenterMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Prevent double initialization
    if (mapInstanceRef.current) return;
    if (!mapRef.current) return;

    // Calculate center point
    const centerLat = dataCenters.reduce((sum, dc) => sum + dc.coordinates[0], 0) / dataCenters.length;
    const centerLng = dataCenters.reduce((sum, dc) => sum + dc.coordinates[1], 0) / dataCenters.length;

    // Create map
    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 5,
      scrollWheelZoom: false,
      dragging: true,
    });

    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers
    dataCenters.forEach((center) => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-2 bg-brand-cyan/20 rounded-full blur-xl animate-pulse"></div>
            <div class="relative w-12 h-12 bg-gradient-to-br from-brand-navy to-brand-cyan rounded-full shadow-xl flex items-center justify-center border-4 border-white transform transition-transform duration-300 hover:scale-125">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/>
                <path d="M8 6h.01"/>
                <path d="M16 6h.01"/>
                <path d="M12 6h.01"/>
                <path d="M12 10h.01"/>
                <path d="M12 14h.01"/>
                <path d="M16 10h.01"/>
                <path d="M16 14h.01"/>
                <path d="M8 10h.01"/>
                <path d="M8 14h.01"/>
              </svg>
            </div>
            ${center.status === 'Development' ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>' : ''}
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
      });

      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <div class="flex items-start gap-2 mb-2">
            <div class="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                <path d="M9 22v-4h6v4"></path>
                <path d="M8 6h.01"></path>
                <path d="M16 6h.01"></path>
                <path d="M12 6h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 10h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 10h.01"></path>
                <path d="M8 14h.01"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-base leading-tight">${center.name}</h3>
              <p class="text-xs text-slate-600 mt-1">
                <svg class="w-3 h-3 inline mr-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${center.location}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
            <svg class="w-4 h-4 text-brand-cyan" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            <span class="text-sm font-semibold text-slate-900">${center.capacity}</span>
            <span class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
              center.status === 'Operational'
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }">
              ${center.status}
            </span>
          </div>
        </div>
      `;

      L.marker(center.coordinates, { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200">
      <div ref={mapRef} className="w-full h-full z-0" />

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 z-[1000] border border-gray-200">
        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-cyan" />
          Data Center Locations
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-br from-brand-navy to-brand-cyan rounded-full"></div>
            <span className="text-slate-700">Operational Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-br from-brand-navy to-brand-cyan rounded-full relative">
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <span className="text-slate-700">In Development</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 z-[1000] border border-gray-200 max-w-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-brand-navy to-brand-cyan rounded-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{dataCenters.length}</p>
            <p className="text-xs text-slate-600">Active Locations</p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">400 MW</p>
            <p className="text-xs text-slate-600">Total Capacity</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .leaflet-popup-tip {
          display: none;
        }

        .leaflet-popup-content {
          margin: 0;
        }

        .leaflet-container {
          background: #f8fafc;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
