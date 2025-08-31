// src/components/PharmacyLocations.tsx
import { PharmacyLocation } from "@/type";

interface Props {
  locations?: PharmacyLocation[];
}

export default function PharmacyLocations({ locations }: Props) {
  if (!locations || locations.length === 0) {
    return <p className="text-sm text-gray-500">Not available in any pharmacy</p>;
  }

  return (
    <div className="mt-2 space-y-2">
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
  );
}
