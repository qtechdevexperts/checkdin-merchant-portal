import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Map = ({ setPosition }: any) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center: any = {
    lat: -25.363,
    lng: 131.044,
  };

  const [markerPosition, setMarkerPosition] = useState(null);

  const mapOptions = {
    clickableIcons: false,
  };

  const handleMarkerClick = () => {
    setMarkerPosition(center);
  };

  const handleMapClick = (event: any) => {
    setMarkerPosition(event.latLng.toJSON());
    setPosition(event.latLng.toJSON());
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBUYUSLiHDE7SZurjNe2um_i4hy7hVajjw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onClick={handleMapClick}
        options={mapOptions}
      >
        {markerPosition && (
          <Marker position={markerPosition} onClick={handleMarkerClick} />
        )}
        {markerPosition && (
          <InfoWindow position={markerPosition}>
            <div>
              Latitude: {markerPosition?.lat}, Longitude: {markerPosition?.lng}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
