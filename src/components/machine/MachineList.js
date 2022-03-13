import { useEffect, useContext } from "react";
import MachineElement from "./MachineListElement";
import MachineContext from "../../context/machines/MachineContext";
import { Grid, Typography } from "@mui/material";

const MachineList = () => {
  const { getMachines, machines, error, loading } = useContext(MachineContext);

  useEffect(() => {
    getMachines();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          margin: 2,
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        Lista de Impresoras
      </Typography>

      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}

      {loading ? <p className="text-center">Cargando....</p> : null}

      <Grid container width={"80%"}>
        <Grid
          container
          sx={{
            margin: 2,
            width: "100%",
          }}
        >
          <Grid item xs={6}>
            <Typography variant="h6">Nombre</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">URL</Typography>
          </Grid>
        </Grid>
        {machines.length === 0
          ? "No hay máquinas"
          : machines.map((machine) => (
              <MachineElement key={machine.id} machine={machine} />
            ))}
      </Grid>
    </>
  );
};

export default MachineList;
