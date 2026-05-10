'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import type { Zone } from '@/types/zones'

// Leaflet must not be SSR'd (uses browser APIs)
const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false })

interface ZoneMapProps {
  zones: Zone[]
}

// Approximate coordinates per city — à enrichir ou requêter Nominatim
const APPROX_COORDS: Record<string, [number, number]> = {
  Montpellier: [43.6108, 3.8767],
  Nîmes: [43.8367, 4.3601],
  Béziers: [43.3442, 3.2158],
  Sète: [43.4026, 3.6965],
  Lunel: [43.6741, 4.1329],
}

export default function ZoneMap({ zones }: ZoneMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Fix Leaflet default icon paths in Next.js
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[400px] bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
        Chargement de la carte...
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <MapContainer
        center={[43.7, 4.1]}
        zoom={9}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zones.map((zone) => {
          const coords = APPROX_COORDS[zone.ville]
          if (!coords) return null
          return (
            <Marker key={zone.id} position={coords}>
              <Popup>
                <strong>{zone.ville}</strong>
                <br />
                Département {zone.departement}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
