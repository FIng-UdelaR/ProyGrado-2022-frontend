import { Badge, Box, Switch, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { eventType, Status, WorkStatus } from "../../utils/enum";
import { FaBox, FaPalette } from "react-icons/fa";
import { colorHEX } from "../../utils/helpers";
import { IconContext } from "react-icons";

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
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    if (simulationLines.length) setLine(1);
  }, [simulationLines]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineRef.current > 0) {
        processNewLine(lineRef.current, simulationLinesRef.current);
        setLine((prevLine) => prevLine + 1);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const updateOrder = (action, workId) => {
    var index = workId.lastIndexOf("-");
    const orderId = workId.substr(0, index);
    const work = workId.substr(index + 1);
    switch (action) {
      case eventType.NEW_WORK_ADDED:
        console.log(
          "🚀 ~ file: SimulationPreview.js ~ line 51 ~ updateOrder ~ workId",
          workId
        );
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
      default:
        break;
    }
  };

  const processNewLine = (newLine, simulation) => {
    if (newLine < simulation?.length) {
      const row = simulation[newLine];
      const values = row?.split(";") || [];
      console.log(
        "🚀 ~ file: SimulationPreview.js ~ line 95 ~ processNewLine ~ values[2]",
        values[2]
      );

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
                status: [values[3]],
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
      console.log(lines.length);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={(e) => showFile(e)} />
      {orders &&
        Object.keys(orders).map((k) => (
          <Box
            margin="0.2rem 0"
            display="flex"
            justifyContent="space-between"
            flexWrap="no-wrap"
            key={k}
          >
            <IconContext.Provider
              value={{
                color: orders[k].color,
                className: "global-class-name",
              }}
            >
              <FaPalette style={{ margin: 5 }} />
            </IconContext.Provider>
            <Typography>{k}</Typography>
            <Badge style={{ width: "25rem" }}>{orders[k].color}</Badge>
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
          </Box>
        ))}
      {machines &&
        Object.keys(machines).map((k) => (
          <Box
            margin="0.5rem 0"
            display="flex"
            justifyContent="space-between"
            flexWrap="no-wrap"
            key={k}
          >
            <Typography>{k}</Typography>
            <Badge style={{ width: "25rem" }}>{machines[k].currentWork}</Badge>
            <Box
              width="15rem"
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
          </Box>
        ))}
    </div>
  );
};

export default SimulationPreview;
