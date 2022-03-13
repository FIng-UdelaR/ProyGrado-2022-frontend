import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CustomTypography from "../CustomTypography";
import { PropsList, textList } from "../../utils/enum";
import PropertyList from "../common/PropertyList";
import MachineContext from "../../context/machines/MachineContext";
import GoogleMap from "../googleMap";

const MachineDetail = () => {
  const { getMachineDetail, machine } = useContext(MachineContext);

  const [name, setName] = useState("");
  let params = useParams();
  let navigate = useNavigate();
  const [location, setLocation] = useState({
    lng: -56.164532,
    lat: -34.901112,
  });
  useEffect(() => {
    const uriEncoded = params.uri;
    const name = params.name;
    setName(name);
    const uri = window.atob(uriEncoded.slice(1));
    const loadMachine = () => getMachineDetail(uri);
    loadMachine();
  }, []);

  useEffect(() => {
    if (machine) {
      const latlng = machine[PropsList.MachineLocation];
      setLocation({ lng: latlng.Longitude, lat: latlng.Latitude });
    }
  }, [machine]);

  const renderByType = (machineProp) => {
    switch (machineProp) {
      case PropsList.MachineSupportedQualities:
      case PropsList.MachineSupportedSizes:
        return (
          <PropertyList
            title={textList[machineProp]}
            elements={machine[machineProp]}
            align="flex-start"
          />
        );
      case PropsList.MachineSupportedMaterial:
        return (
          <CustomTypography
            label={textList[machineProp]}
            value={machine[machineProp]}
            id={machineProp}
            select
          />
        );
      case PropsList.MachineStatus:
        return (
          <CustomTypography
            label={textList[machineProp]}
            value={machine[machineProp]}
            id={machineProp}
          />
        );
    }
  };

  return (
    <Grid container style={{ display: "flex", justifyContent: "center" }}>
      <Typography
        textAlign="center"
        width="100%"
        variant="h3"
        component="div"
        marginBottom="50px"
      >
        Detalles de {name}
      </Typography>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexWrap="wrap">
          {machine && Object.keys(machine).map((m) => renderByType(m))}
        </Box>
      </Grid>
      <Box sx={{ m: 1, minWidth: "80%", minHeight: 300 }}>
        <GoogleMap
          location={location}
          center={location}
          setLocation={() => {}}
        />
      </Box>
      <Box sx={{ m: 1, minWidth: "80%", minHeight: 300 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{ marginTop: 5 }}
        >
          Atras
        </Button>
      </Box>
    </Grid>
  );
};

export default MachineDetail;
