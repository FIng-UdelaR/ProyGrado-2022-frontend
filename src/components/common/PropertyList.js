import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { InputLabel } from "@mui/material";

const Demo = styled("div")(({ theme }) => {
  return {
    backgroundColor: "#fff",
  };
});

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1.3rem",
    position: "inherit",
    marginBottom: ".2rem",
    "&.light": {
      color: "#000",
    },
    "&.bold": {
      fontWeight: "bolder",
    },
  },
}));

export default function PropertyList({ elements, title, align }) {
  const classes = useStyles();
  return (
    <Box
      sx={{ width: "42%", display: "flex", flexDirection: "column", margin: 3 }}
    >
      <InputLabel shrink className={classes.root}>
        {title}
      </InputLabel>
      <Demo>
        <List>
          {elements.map((e, index) => (
            <>
              <ListItem>
                <ListItemText primary={e} />
              </ListItem>
              {index !== elements.length - 1 && (
                <Divider style={{ width: 200 }} />
              )}
            </>
          ))}
        </List>
      </Demo>
    </Box>
  );
}
