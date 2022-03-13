import { useState, useEffect, useContext } from "react";

// Actions de Redux
import AlertContext from "../../context/alert/AlertContext";
import WorkFlowContext from "../../context/workFlow/WorkFlowContext";
import { Material, Qualities, Sizes } from "../../utils/enum";
import { Box } from "@mui/system";
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import GoogleMap from "../googleMap";
import { useNavigate } from "react-router-dom";
import WorkFlowCard from "./WorkFlowCard";

const initialState = {
  material: "",
  size: "",
  quality: "",
  latitude: undefined,
  longitude: undefined,
};

const NewWorkFlows = () => {
  const [workFlow, setWorkFlow] = useState([]);
  const [task, setTask] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const { createNewWorkFlowAction, error, loading, success } =
    useContext(WorkFlowContext);
  const { createAlert, hideAlert, alert } = useContext(AlertContext);
  let navigate = useNavigate();

  const [location, setLocation] = useState({});

  const handleSelectChange = (name) => (event) => {
    const {
      target: { value },
    } = event;
    let values = typeof value === "string" ? value.split(",") : value;
    setTask((prevState) => ({ ...prevState, [name]: values }));
  };

  useEffect(() => {
    if (task.material !== "" && task.size !== "" && task.quality !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [task]);

  const addWorkFlow = (workFlow) => createNewWorkFlowAction(workFlow);

  const addTask = () => {
    setWorkFlow((prevState) => [...prevState, task]);
    setTask(initialState);
  };

  const submitNewWorkFlow = (e) => {
    e.preventDefault();

    // if (name.trim() === "") {
    //   const alert = {
    //     msg: "Ambos campos son obligatorios",
    //     classes: "alert alert-danger text-center text-uppercase p3",
    //   };
    //   dispatch(createAlert(alert));
    //   return;
    // }

    // si no hay errores
    hideAlert();

    const newWorkFlows = workFlow.map((w) => ({
      ...w,
      latitude: location.lat,
      longitude: location.lng,
    }));
    // crear el nuevo workFlow
    addWorkFlow(newWorkFlows);
  };

  return (
    <Grid container width={"80%"}>
      <Typography
        variant="h4"
        sx={{
          margin: 2,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Agregar nueva orden
      </Typography>

      {alert ? <p className={alert.classes}> {alert.msg} </p> : null}

      <Grid item xs={12}>
        <form onSubmit={submitNewWorkFlow}>
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="supportedMaterial-label">Material</InputLabel>
                <Select
                  labelId="supportedMaterial-label"
                  id="supportedMaterial"
                  onChange={handleSelectChange("material")}
                  autoWidth
                  label="Material"
                  value={task.material}
                >
                  {Object.keys(Material).map((m, index) => (
                    <MenuItem value={index}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="supportedMaterial-label">Tamaño</InputLabel>
                <Select
                  labelId="size-label"
                  id="size"
                  onChange={handleSelectChange("size")}
                  autoWidth
                  label="Size"
                  value={task.size}
                >
                  {Object.keys(Sizes).map((s, index) => (
                    <MenuItem value={index}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="quality-label">Calidad</InputLabel>
                <Select
                  labelId="quality-label"
                  id="quality"
                  onChange={handleSelectChange("quality")}
                  autoWidth
                  label="Quality"
                  value={task.quality}
                >
                  {Object.keys(Qualities).map((q, index) => (
                    <MenuItem value={index}>{q}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                style={{ width: "150px", height: "100%" }}
                variant="contained"
                disabled={isDisabled}
                onClick={addTask}
              >
                Agregar tarea
              </Button>
            </div>
            <Box
              sx={{
                m: 1,
                minWidth: "100%",
                minHeight: 150,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {workFlow.map((task) => {
                return <WorkFlowCard task={task} />;
              })}
            </Box>
            <Box
              component="form"
              sx={{ m: 1, minWidth: "100%", minHeight: 500 }}
            >
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

              <Button
                style={{ width: "45%" }}
                type="submit"
                variant="contained"
              >
                Agregar
              </Button>
            </Box>
          </Box>
        </form>
      </Grid>
      {loading ? <p>Cargando...</p> : null}

      {error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : null}
    </Grid>
  );
};

export default NewWorkFlows;
