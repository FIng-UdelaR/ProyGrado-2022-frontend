import {
  Badge,
  Box,
  Grid,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { eventType, Status, WorkStatus } from "../../utils/enum";
import { FaBox, FaPalette, FaExclamationTriangle } from "react-icons/fa";
import { colorHEX } from "../../utils/helpers";
import { IconContext } from "react-icons";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SimulationPreview = (props) => {
  const [simulationLines, setSimulationLines] = useState([]);
  const [line, setLine] = useState(0);
  const [machines, setMachines] = useState({});
  const [orders, setOrders] = useState({});
  const [worksStatus, setWorksStatus] = useState({});

  const lineRef = useRef(0);
  const simulationLinesRef = useRef([]);
  const machinesRef = useRef({});
  const ordersRef = useRef({});
  const worksStatusRef = useRef({});

  useEffect(() => {
    lineRef.current = line;
    simulationLinesRef.current = simulationLines;
    machinesRef.current = machines;
    ordersRef.current = orders;
    worksStatusRef.current = worksStatus;
  });

  useEffect(() => {
    if (simulationLines.length) setLine(1);
  }, [simulationLines]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineRef.current > 0) {
        processNewLine(lineRef.current, simulationLinesRef.current);
        setLine((prevLine) => prevLine + 1);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const updateOrder = (action, workId) => {
    var index = workId.lastIndexOf("-");
    const orderId = workId.substr(0, index);
    const work = workId.substr(index + 1);
    switch (action) {
      case eventType.NEW_WORK_ADDED:
        setOrders((prevState) => ({
          ...prevState,
          [orderId]: {
            color: prevState[orderId] ? prevState[orderId].color : colorHEX(),
            works: prevState[orderId]
              ? [...prevState[orderId].works, workId]
              : [workId],
          },
        }));
        setWorksStatus((prevState) => ({
          ...prevState,
          [workId]: WorkStatus.PENDING,
        }));
        break;
      case eventType.NEW_WORK_STARTED:
        setWorksStatus((prevState) => ({
          ...prevState,
          [workId]: WorkStatus.IN_PROGRESS,
        }));
        break;
      case eventType.WORK_FINISHED:
        setWorksStatus((prevState) => ({
          ...prevState,
          [workId]: WorkStatus.FINISHED,
        }));
        break;
      case eventType.WORK_REMOVED:
        setWorksStatus((prevState) => ({
          ...prevState,
          [workId]: WorkStatus.PENDING,
        }));
        break;
      default:
        break;
    }
  };

  const processNewLine = (newLine, simulation) => {
    if (newLine < simulation?.length) {
      const row = simulation[newLine];
      const values = row?.split(";") || [];
      if (values.length) {
        switch (values[2]) {
          case eventType.MACHINE_CREATED:
            setMachines((prevState) => ({
              ...prevState,
              [values[1]]: {
                status: "pending",
                workload: [],
                currentWork: "",
              },
            }));
            break;
          case eventType.MACHINE_STATUS_CHANGED:
            setMachines((prevState) => ({
              ...prevState,
              [values[1]]: {
                ...prevState[values[1]],
                status: values[3],
              },
            }));
            break;
          case eventType.NEW_WORK_ADDED:
            setMachines((prevState) => ({
              ...prevState,
              [values[1]]: {
                ...prevState[values[1]],
                workload: [
                  ...prevState[values[1]].workload,
                  values[4].replace("\r", ""),
                ],
              },
            }));
            updateOrder(eventType.NEW_WORK_ADDED, values[4].replace("\r", ""));
            break;
          case eventType.NEW_WORK_STARTED:
            setMachines((prevState) => ({
              ...prevState,
              [values[1]]: {
                ...prevState[values[1]],
                currentWork: values[3],
              },
            }));
            updateOrder(eventType.NEW_WORK_STARTED, values[3]);
            break;
          case eventType.WORK_FINISHED:
            const index = machinesRef.current[values[1]]?.workload?.indexOf(
              values[3]
            );
            {
              if (index >= 0)
                setMachines((prevState) => ({
                  ...prevState,
                  [values[1]]: {
                    ...prevState[values[1]],
                    currentWork: prevState[values[1]].workload?.splice(
                      index,
                      1
                    ),
                  },
                }));
            }
            updateOrder(eventType.WORK_FINISHED, values[3]);

            break;
          case eventType.WORK_REMOVED:
            const index2 = machinesRef.current[values[1]]?.workload?.indexOf(
              values[3]
            );
            {
              if (index2 >= 0)
                setMachines((prevState) => ({
                  ...prevState,
                  [values[1]]: {
                    ...prevState[values[1]],
                    currentWork: prevState[values[1]].workload?.splice(
                      index2,
                      1
                    ),
                  },
                }));
            }
            updateOrder(eventType.WORK_REMOVED, values[3]);

            break;
        }
      }
    }
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      setSimulationLines(lines);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <Grid container padding={5}>
      <Grid item xs={12}>
        <input type="file" onChange={(e) => showFile(e)} />
      </Grid>
      <Grid item xs={6} padding={2}>
        <Typography width={"100%"} variant="h5" textAlign={"center"}>
          Listado de Impresoras
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Última tarea procesada</StyledTableCell>
                <StyledTableCell>Tareas pendientes</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machines &&
                Object.keys(machines).map((k) => (
                  <StyledTableRow key={k}>
                    <StyledTableCell component="th" scope="row">
                      {machines[k].status === "OFFLINE" ? (
                        <Box display={"flex"}>
                          <IconContext.Provider
                            value={{
                              color: "darkRed",
                              className: "global-class-name",
                            }}
                          >
                            <FaExclamationTriangle
                              style={{
                                margin: 5,
                              }}
                            />
                          </IconContext.Provider>
                          <Typography color={"darkRed"}>{k}</Typography>
                        </Box>
                      ) : (
                        <Typography>{k}</Typography>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        width={180}
                      >
                        {machines[k].currentWork}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Box
                        width="200px"
                        display="flex"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                      >
                        {machines[k].workload?.map((w) => {
                          const orderId = w.substring(0, w.length - 2);
                          const order = orders[orderId];
                          return (
                            <IconContext.Provider
                              value={{
                                color: order?.color || "red",
                                className: "global-class-name",
                              }}
                            >
                              <FaBox
                                style={{
                                  margin: 5,
                                }}
                              />
                            </IconContext.Provider>
                          );
                        })}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6} padding={2}>
        <Typography width={"100%"} variant="h5" textAlign={"center"}>
          Listado de órdenes
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Identificador de orden</StyledTableCell>
                <StyledTableCell>Tareas</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                Object.keys(orders).map((k) => (
                  <StyledTableRow key={k}>
                    <StyledTableCell component="th" scope="row">
                      <IconContext.Provider
                        value={{
                          color: orders[k].color,
                          className: "global-class-name",
                        }}
                      >
                        <FaPalette style={{ margin: 5 }} />
                      </IconContext.Provider>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        width={200}
                      >
                        {k}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Box
                        width="15rem"
                        display="flex"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                      >
                        {orders[k].works?.map((w) => {
                          return (
                            <IconContext.Provider
                              value={{
                                color:
                                  worksStatus[w] === WorkStatus.FINISHED
                                    ? "green"
                                    : worksStatus[w] === WorkStatus.FINISHED
                                    ? "red"
                                    : "",
                                className: "global-class-name",
                              }}
                            >
                              <FaBox style={{ margin: 5 }} />
                            </IconContext.Provider>
                          );
                        })}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default SimulationPreview;
