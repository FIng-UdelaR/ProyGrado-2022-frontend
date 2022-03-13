import React, { useState, useContext } from "react";

// Actions de Redux
import { Material, Qualities, Sizes } from "../../utils/enum";
import GoogleMap from "../googleMap";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TextField,
  Container,
} from "@mui/material";
import MachineContext from "../../context/machines/MachineContext";
import AlertContext from "../../context/alert/AlertContext";
import { useNavigate } from "react-router-dom";

const NewMachines = () => {
  const [name, setName] = useState("");
  const [machine, setMachine] = useState(undefined);
  const [location, setLocation] = useState({});
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const { createNewMachine, error, loading } = useContext(MachineContext);
  const { createAlert, hideAlert } = useContext(AlertContext);
  let navigate = useNavigate();

  // const handleSelectChange = (name) => (e) => {
  //   let value = Array.from(e.target.selectedOptions, (option) =>
  //     Number(option.value)
  //   );
  //   if (name === "supportedMaterial") value = value[0];
  //   setMachine((prevState) => ({ ...prevState, [name]: value }));
  // };

  const handleSelectChange = (name) => (event) => {
    const {
      target: { value },
    } = event;
    let values = typeof value === "string" ? value.split(",") : value;
    setMachine((prevState) => ({ ...prevState, [name]: values }));
  };

  const handleChange = (name) => (e) => {
    let value = Number(e.target.value);
    setMachine((prevState) => ({ ...prevState, [name]: value }));
  };

  const addMachine = (machine) => {
    createNewMachine({
      ...machine,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const submitNewMachine = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      const alert = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      createAlert(alert);

      return;
    }

    hideAlert();

    addMachine({
      machineName: name,
      ...machine,
    });

    // navigate("/");
  };

  return (
    <Container>
      <h2 className="text-center mb-4 font-weight-bold">
        Agregar nueva impresora
      </h2>

      {alert ? <p className={alert.classes}> {alert.msg} </p> : null}
      <form onSubmit={submitNewMachine}>
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ m: 1, minWidth: "25%", minHeight: 300 }}>
            <Box
              sx={{
                "& > :not(style)": { m: 1, minWidth: 300 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="machine-name"
                label="Nombre de impresora"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
              />
            </Box>

            <div>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="supportedMaterial-label">
                  Materiales soportados
                </InputLabel>
                <Select
                  labelId="supportedMaterial-label"
                  id="supportedMaterial"
                  onChange={handleSelectChange("supportedMaterial")}
                  autoWidth
                  label="Supported material"
                >
                  {Object.keys(Material).map((m, index) => (
                    <MenuItem value={index}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="supportedSizes-label">
                  Tamaños soportados
                </InputLabel>
                <Select
                  labelId="supportedSizes-label"
                  id="supportedSizes"
                  multiple
                  value={machine?.supportedSizes || []}
                  onChange={handleSelectChange("supportedSizes")}
                  label="Supported sizes"
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Supported sizes"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        return (
                          <Chip key={value} label={Object.keys(Sizes)[value]} />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {Object.keys(Sizes).map((s, index) => (
                    <MenuItem key={s} value={index}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="supportedQualities-label">
                  Calidades soportadas
                </InputLabel>
                <Select
                  labelId="supportedQualities-label"
                  id="supportedQualities"
                  multiple
                  value={machine?.supportedQualities || []}
                  onChange={handleSelectChange("supportedQualities")}
                  label="Supported qualities"
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Supported qualities"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={Object.keys(Qualities)[value]}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {Object.keys(Qualities).map((q, index) => (
                    <MenuItem key={q} value={index}>
                      {q}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Box>

          <Box component="form" sx={{ m: 1, minWidth: "65%", minHeight: 300 }}>
            <GoogleMap
              location={location}
              setLocation={setLocation}
              isMarkable={true}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "flex-end",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              style={{ width: "45%" }}
              onClick={() => navigate("/")}
              variant="contained"
            >
              Atras
            </Button>

            <Button style={{ width: "45%" }} type="submit" variant="contained">
              Agregar
            </Button>
          </Box>
        </Box>
      </form>
      {loading ? <p>Cargando...</p> : null}

      {error ? (
        <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>
      ) : null}
    </Container>
  );
};

export default NewMachines;
