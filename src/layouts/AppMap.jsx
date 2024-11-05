import React, { useCallback, useState, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { axiosPrivate } from "../apis/axios";
import AppLoading from '../utils/AppLoading'

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
  const queryRef = useRef(); // Added useRef for query

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    loading: { async: true },
  });

  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, [setMarker]);

  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (queryRef.current.value) {
      setLoading(true); 
      setSearchResults([]);
      try {
        const response = await axiosPrivate.get(`/vendors/search/location/${queryRef.current.value}`)
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
    setLoading(true); 
    try {
      const response = await axiosPrivate.get(`/vendors/place/details/${result.place_id}`);
      const { lat, lng } = response.data.result.geometry.location; // Get lat and lng from the response
      setMarker({ lat, lng }); // Set marker to selected coordinates
      setCenter({ lat, lng }); // Update camera position to selected coordinates
      setSearchResults([]);
      setLoading(false);  // Clear search results
    } catch (error) {
      setLoading(false); 
      setSearchResults([]); // Clear search results
      console.error("Error fetching place details:", error);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          ref={queryRef}
          className="sm:text-sm bg-slate-100 rounded-lg p-1.5 mb-2"
          placeholder="Enter location name"
        />
        <button
          type="submit"
          onClick={(e)=>handleSearchLocation(e)}
          className="ms-2 bg-primary-color text-white rounded-lg p-0.5"
        >
          Search
        </button>
        {loading && <AppLoading width={"w-16"}/>}
      </div>
      {loading ? ""
      :(
        <ul className="border border-gray-300 rounded-lg bg-white absolute z-10">
          {searchResults.map((result) => (
            <li
              key={result.place_id}
              onClick={() => handleSelect(result)} // Call handleSelect on result click
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {<div className="text-sm">
                <p>{result.structured_formatting.main_text}</p>
                <p>{result.structured_formatting.secondary_text}</p>
                <hr className="my-0" />
              </div>}
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
