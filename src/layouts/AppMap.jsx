import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "../apis/axios";

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
  const [center, setCenter] = useState({ lat: 25.197525, lng: 55.274288 });
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading indicator

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

  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (e.target.value) {
      setLoading(true); // Set loading to true when starting the API call
      setSearchResults([]);
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&components=country:AE&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ar&radius=50000`); // Added language parameter
        const results = response.data.predictions;
        setSearchResults(results); // Set search results
      } catch (error) {
        console.error("Error fetching location coordinates:", error);
      } finally {
        setLoading(false); // Set loading to false when the API call is complete
      }
    }
  };

  const handleSelect = async (result) => {
    // Fetch place details to get lat and lng
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
      const { lat, lng } = response.data.result.geometry.location; // Get lat and lng from the response
      setMarker({ lat, lng }); // Set marker to selected coordinates
      setCenter({ lat, lng }); // Update camera position to selected coordinates
      setSearchResults([]); // Clear search results
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          className="sm:text-sm bg-slate-100 rounded-lg p-1.5 mb-2"
          onClick={(e) => {
            handleSearchLocation(e); // Call handleSearchLocation on input change
          }}
          onBlur={()=> {setSearchResults([])}}
          placeholder="Enter location name"
        />
        {loading && <div className="p-2 text-gray-500">Loading...</div>}
      </div>
      {loading
      ? ""
      :(
        <ul className="border border-gray-300 rounded-lg bg-white absolute z-10">
          {searchResults.map((result) => (
            <li
              key={result.place_id}
              onClick={() => handleSelect(result)} // Call handleSelect on result click
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {result.status==="ZERO_RESULTS"
              ? "No Result Found"
              : result.structured_formatting.main_text}
            </li>
          ))}
        </ul>
      )}
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
