import React from "react";
import GoogleMap from "./googleMap";

const MainPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <GoogleMap showMachines={true} />
    </div>
  );
};

export default MainPage;
