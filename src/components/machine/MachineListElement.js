import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const MachineListElement = ({ machine }) => {
  const { name, uri, id } = machine;

  const navigate = useNavigate();

  const redirectToDetails = () => {
    navigate(`/machine/detail/:${window.btoa(uri)}/:${name}`);
  };

  return (
    <Grid
      container
      sx={{
        margin: 2,
        width: "100%",
      }}
    >
      <Grid item xs={6}>
        <Typography sx={{ textAlign: "left" }}>{name}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>
          <Link href={uri} color="inherit">
            {uri}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={2} spacing={2}>
        <Button variant="contained" onClick={redirectToDetails}>
          Detalles
        </Button>
      </Grid>
    </Grid>
  );
};

export default MachineListElement;
