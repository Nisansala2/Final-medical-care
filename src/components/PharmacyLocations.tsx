'use client';

import { PharmacyLocation } from "@/type";
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';

interface Props {
  locations?: PharmacyLocation[];
}

const MarkerComponent = ({ loc, onClick, lat, lng }: { loc: PharmacyLocation; onClick: () => void; lat: number; lng: number }) => (
  <div
    className="cursor-pointer"
    onClick={onClick}
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'red',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold'
    }}
  >
    P
  </div>
);

const GoogleMapComponent = ({ locations }: { locations: PharmacyLocation[] }) => {
  const [selectedLocation, setSelectedLocation] = useState<PharmacyLocation | null>(null);

  const center = locations.length > 0 ? {
    lat: locations[0].latitude,
    lng: locations[0].longitude
  } : { lat: 0, lng: 0 };

  const handleChildClick = (key: any, childProps: any) => {
    setSelectedLocation(childProps.loc);
  };

  return (
    <div className="h-96 w-full relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }}
        defaultCenter={center}
        defaultZoom={12}
        onChildClick={handleChildClick}
      >
        {locations.map((loc, idx) => (
          <MarkerComponent
            key={idx}
            lat={loc.latitude}
            lng={loc.longitude}
            loc={loc}
            onClick={() => setSelectedLocation(loc)}
          />
        ))}
      </GoogleMapReact>
      {selectedLocation && (
        <div className="absolute top-2 left-2 bg-white p-2 rounded shadow-lg z-10 max-w-xs">
          <button
            className="absolute top-1 right-1 text-gray-500"
            onClick={() => setSelectedLocation(null)}
          >
            ×
          </button>
          <h3 className="font-semibold">{selectedLocation.name}</h3>
          <p className="text-sm">{selectedLocation.address}</p>
          <p className="text-xs">Stock: {selectedLocation.stock}</p>
          {selectedLocation.phone && <p className="text-xs">Phone: {selectedLocation.phone}</p>}
        </div>
      )}
    </div>
  );
};

export default function PharmacyLocations({ locations }: Props) {
  if (!locations || locations.length === 0) {
    return <p className="text-sm text-gray-500">Not available in any pharmacy</p>;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="mt-2">
        <p className="text-sm text-red-500 mb-2">Google Maps API key not configured</p>
        <div className="space-y-2">
          {locations.map((loc, idx) => (
            <div key={idx} className="border rounded-lg p-2 shadow-sm bg-white">
              <p className="font-semibold">{loc.name}</p>
              <p className="text-sm text-gray-600">{loc.address}</p>
              <p className="text-xs text-gray-500">
                Stock: {loc.stock} | Lat: {loc.latitude}, Lng: {loc.longitude}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="mb-4">
        <GoogleMapComponent locations={locations} />
      </div>
      <div className="space-y-2">
        {locations.map((loc, idx) => (
          <div key={idx} className="border rounded-lg p-2 shadow-sm bg-white">
            <p className="font-semibold">{loc.name}</p>
            <p className="text-sm text-gray-600">{loc.address}</p>
            <p className="text-xs text-gray-500">
              Stock: {loc.stock} | Lat: {loc.latitude}, Lng: {loc.longitude}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
