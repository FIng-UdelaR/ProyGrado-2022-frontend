import React, { useEffect, useState, useRef } from "react";
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ProgressBar from "../common/progressBar/ProgressBar";
import { makeStyles } from "@mui/styles";
import { FaArrowCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  acordionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const WorkFlowRow = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState(props.order);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);

  const orderRef = useRef(0);
  const progressRef = useRef(0);

  const calculatePercent = (endDate, startDate) => {
    const dateNow = new Date().getTime();
    const estimatedDate = new Date(`${endDate}Z`).getTime();
    const startedDate = new Date(`${startDate}Z`).getTime();
    const date1 = (estimatedDate - startedDate) / (1000 * 60);
    const date2 = (dateNow - startedDate) / (1000 * 60);
    const percent = date2 / date1;
    return percent > 1 ? 1 : percent;
  };

  useEffect(() => {
    const { estimatedCompletionDate, arrivalDate } = props.order;
    setProgress(calculatePercent(estimatedCompletionDate, arrivalDate));
  }, []);

  useEffect(() => {
    orderRef.current = order;
    progressRef.current = progress;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (progressRef.current < 1) {
        const { estimatedCompletionDate, arrivalDate } = orderRef.current;
        setProgress(calculatePercent(estimatedCompletionDate, arrivalDate));
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <TableRow key={order.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaArrowAltCircleUp /> : <FaArrowCircleDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell align="right">
          <div width="200px">
            <ProgressBar color={"#000"} percent={progress} width={200} />
          </div>
        </TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Lista de impresoras atendiendo la orden
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.machines?.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell component="th" scope="row">
                        {m.name}
                      </TableCell>
                      <TableCell>{m.uri}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default WorkFlowRow;
