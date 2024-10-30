import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios'; // Import axios for making API requests

const libraries = ["places"];
const mapContainerStyle = {
  width: "46vw",
  height: "300px",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function AppMap({marker, setMarker}) {
  const [locationName, setLocationName] = useState(""); // State for location name
  const [center, setCenter] = useState({ lat: 25.197525, lng: 55.274288 });
  // const [formattedAddress, setFormattedAddress] = useState("");
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, [setMarker]);

  const handleBlur = async () => {
    if (locationName) {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&components=country:AE&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`); // Added components parameter
        const { lat, lng } = response.data.results[0].geometry.location; // Get coordinates from response
        // setFormattedAddress(response.data.results[0].formatted_address)
        if(response.data.results[0].address_components.length>1){
          setMarker({ lat, lng }); // Set marker to new coordinates
          setCenter({ lat, lng }); // Update camera position to new coordinates
        }
      } catch (error) {
        console.error("Error fetching location coordinates:", error);
      }
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <input
        type="text"
        className="sm:text-sm bg-slate-100 rounded-lg p-2.5 mb-2"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)} // Update location name state
        placeholder="Enter location name"
      />
      <button
        onClick={handleBlur} // Call handleBlur on button click
        className="bg-primary-color text-white rounded-lg p-2.5 mb-2"
      >
        Search Location
      </button>
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
          {/* <p className="bg-green-200 px-1 mt-3">{formattedAddress}</p> */}
          <a
            href={`https://www.google.com/maps?q=${marker.lat},${marker.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
          >
            Share Location
          </a>
        </div>
      )}
    </div>
  );
}
export default AppMap;
