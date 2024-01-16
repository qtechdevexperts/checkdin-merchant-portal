import React, { useState,useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";

const Map = ({ setPosition, setAddress }: any) => {
  const [data, setData] = useState("");
  //our default data

  useEffect(() => {
    data === "" ? setData("") : setData(data);
  }, [data]);
  // updating our default data
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center: any = {
    lat: -25.363,
    lng: 131.044,
  };

  const [markerPosition, setMarkerPosition] = useState<any>(null);

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

  const handlePlaceSelect = async (result: any) => {
    // debugger;
    try {
      const placeId = result.value.place_id;
      const response = await geocodeByPlaceId(placeId);
      const coordinates = await getLatLng(response[0]);
      console.warn('result.description', response[0].formatted_address)
      setMarkerPosition(coordinates);
      setPosition(coordinates); 
      setAddress(response[0].formatted_address); 
    } catch (error) {
      console.error("Error fetching location details", error);
    }
  };

  return (
    <>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBdSky2nI8jY7zxpQF-cWGj2Ol2cT-_r1s"
        autocompletionRequest={{
          componentRestrictions: {
            country: ["us"], //to set the specific country
          },
        }}
        selectProps={{
          defaultInputValue: data, //set default value
          onChange: handlePlaceSelect, //save the value gotten from google
          placeholder: "Search Location",
          styles: {
            input: (provided) => ({
              ...provided,
              color: "#222222"
            }),
            option: (provided) => ({
              ...provided,
              color: "#222222"
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#222222"
            })
          }
        }}
        onLoadFailed={(error) => {
          console.log(error);
        }}
      />
      {markerPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={14}
          options={mapOptions}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} onClick={handleMarkerClick} />
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
