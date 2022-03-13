import React, { useContext, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMap from "google-map-react";
import Marker from "./CustomMarker";
import CustomPopUp from "./CustomPopUp";
import MachineContext from "../../context/machines/MachineContext";
import MapContext from "../../context/googleMap/MapContext";

const CustomMapContainer = ({
  isScriptLoaded,
  isScriptLoadedSucceed,
  showMachines,
  isMarkable,
  setLocation,
  location,
  center,
}) => {
  console.log("🚀 ~ file: index.js ~ line 23 ~ location", location);
  const K_MARGIN_TOP = 30;
  const K_MARGIN_RIGHT = 30;
  const K_MARGIN_BOTTOM = 30;
  const K_MARGIN_LEFT = 30;
  const K_HOVER_DISTANCE = 30;

  const { getMachines, machines } = useContext(MachineContext);
  const {
    //state
    mapInfo,
    //actions
    changeBounds,
    markerHoverIndexChange,
    showPopup,
  } = useContext(MapContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMachine, setSelectedMachine] = React.useState(null);
  const [showMachineInfo, setShowMachineInfo] = React.useState(false);

  useEffect(() => {
    getMachines();
  }, []);

  const onBoundsChange = (center, zoom, bounds, marginBounds) => {
    if (changeBounds) {
      changeBounds({ center, zoom, bounds, marginBounds });
    }
  };

  const onMarkerClick = (machine) => (event) => {
    const markerId = machine.id;
    setSelectedMachine(machine);
    setShowMachineInfo(true);
    const index = machines.findIndex((m) => m.id === markerId);
    setAnchorEl(event.currentTarget);
    if (showPopup) {
      showPopup(index);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowMachineInfo(false);
  };

  const onPopupCloseClick = () => {
    if (showPopup) {
      showPopup(-1);
    }
  };

  const onSelectPosition = ({ lat, lng }) =>
    setLocation({
      lat,
      lng,
    });

  if (mapInfo) {
    return (
      <GoogleMap
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        center={center || mapInfo.center}
        zoom={mapInfo.zoom}
        onBoundsChange={onBoundsChange}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        hoverDistance={K_HOVER_DISTANCE}
        onClick={isMarkable ? onSelectPosition : () => {}}
        selectedLocation={location}
      >
        {showMachines &&
          machines.map((m) => {
            return (
              <Marker
                key={m.id}
                text={m.name}
                lat={m.latitude}
                lng={m.longitude}
                onClick={onMarkerClick(m)}
              />
            );
          })}

        {location && (
          <Marker text={"test"} lat={location.lat} lng={location.lng} />
        )}

        {machines && showMachineInfo && (
          <CustomPopUp
            // store={popupInfo}
            selectedMachine={selectedMachine}
            anchorEl={anchorEl}
            handleClose={handleClose}
            open={showMachineInfo}
            lat={machines[1].latitude}
            lng={machines[1].longitude}
          />
        )}
      </GoogleMap>
    );
  } else return <></>;
};
export default CustomMapContainer;
