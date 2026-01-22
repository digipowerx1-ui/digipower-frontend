"use client";

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon, Map as LeafletMap } from 'leaflet';
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

interface LeafletMapProps {
    dataCenters: DataCenter[];
    center: [number, number];
}

// Custom marker component
const CustomMarker = ({ center }: { center: DataCenter }) => {
    // Create custom HTML marker
    const customIcon = new DivIcon({
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

    return (
        <Marker position={center.coordinates} icon={customIcon}>
            <Popup>
                <div className="p-2 min-w-[200px]">
                    <div className="flex items-start gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-slate-900 text-base leading-tight">{center.name}</h3>
                            <p className="text-xs text-slate-600 mt-1">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {center.location}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                        <Zap className="w-4 h-4 text-brand-cyan" />
                        <span className="text-sm font-semibold text-slate-900">{center.capacity}</span>
                        <span
                            className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${center.status === 'Operational'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                                }`}
                        >
                            {center.status}
                        </span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default function LeafletMapComponent({ dataCenters, center }: LeafletMapProps) {
    const mapRef = useRef<LeafletMap | null>(null);

    // Cleanup map on unmount to prevent reinitialization issues
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <MapContainer
                ref={mapRef}
                center={center}
                zoom={5}
                scrollWheelZoom={false}
                dragging={true}
                className="w-full h-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dataCenters.map((dc) => (
                    <CustomMarker key={dc.id} center={dc} />
                ))}
            </MapContainer>

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
        </>
    );
}
