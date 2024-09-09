import React, { useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "46vw",
  height: "300px",
};
const center = {
  lat: 25.197525, // default center location (e.g., San Francisco)
  lng: 55.274288,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function AppMap({marker, setMarker}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>
      {marker && (
        <div>
          <p className="mt-3">Latitude: <span className="bg-green-200 px-1 rounded-md mx-2">{marker.lat}</span>
          Longitude: <span className="bg-green-200 px-1 rounded-md mx-2">{marker.lng}</span></p>
        </div>
      )}
    </div>
  );
}
export default AppMap;
