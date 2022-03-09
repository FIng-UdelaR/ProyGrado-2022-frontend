import React, { useEffect, useState } from "react";
import { eventType, Status, WorkStatus } from "../../utils/enum";
import { Typography } from "@material-ui/core";

const SimulationsProcess = (props) => {
  const [validFiles, setValidFiles] = useState(0);
  const [maxConst, setMax] = useState(0);
  const [minConst, setMin] = useState(0);

  const [averageConst, setAverageConst] = useState(0);
  const [invalidFilesNames, setInvalidFilesNames] = useState([]);

  const [processedFiles, setProcessedFiles] = useState(0);

  const [machines, setMachines] = useState({});

  const processLines = (lines) => {
    let machines = {};
    let orders = {};
    let worksStatus = {};
    let test = 0;
    for (let line of lines) {
      test = test + 1;
      const values = line?.split(";") || [];
      const date = values[0];
      const machine = values[1];
      const event = values[2];
      switch (event) {
        case eventType.MACHINE_CREATED:
          machines[machine] = {
            status: Status.AVAILABLE,
            workload: [],
            currentWork: "",
            createdDate: date,
            changes: [],
          };
          break;
        case eventType.MACHINE_STATUS_CHANGED:
          machines[machine] = {
            ...machines[machine],
            status: [values[3]],
            changes: {
              ...machines[machine]?.changes,
              [date]: eventType.MACHINE_STATUS_CHANGED,
            },
          };
          break;
        case eventType.NEW_WORK_ADDED:
          const workId = values[4].replace("\r", "");
          const index = workId.lastIndexOf("-");
          const orderId = workId.substr(0, index);
          machines[machine] = {
            ...machines[machine],
            workload: [...machines[values[1]]?.workload, workId],
            changes: {
              ...machines[machine]?.changes,
              [date]: eventType.NEW_WORK_ADDED,
            },
          };
          orders[orderId] = {
            ...orders[orderId],
            works: orders[orderId]
              ? [...orders[orderId].works, workId]
              : [workId],
          };
          worksStatus[workId] = WorkStatus.PENDING;
          break;
        case eventType.WORK_REMOVED:
          const removedWorkId = values[3].replace("\r", "");
          const removedIndex = removedWorkId.lastIndexOf("-");
          const removedOrderId = removedWorkId.substr(0, removedIndex);
          const removedMachineIndex = machines[machine]?.workload?.indexOf(
            values[3]
          );
          const orderIndex = orders[removedOrderId]?.works?.indexOf(values[3]);
          if (removedIndex >= 0) {
            machines[machine] = {
              ...machines[machine],
              status: Status.AVAILABLE,
              workload: machines[machine].workload?.splice(
                removedMachineIndex,
                1
              ),
              changes: {
                ...machines[machine]?.changes,
                [date]: eventType.NEW_WORK_STARTED,
              },
            };
          }
          if (orderIndex >= 0) {
            delete worksStatus[values[3]];
            orders[removedOrderId]?.works?.splice(orderIndex, 1);
          }
          break;
        case eventType.NEW_WORK_STARTED:
          machines[machine] = {
            ...machines[machine],
            currentWork: values[3],
            status: Status.WORKING,
            changes: {
              ...machines[machine]?.changes,
              [date]: eventType.NEW_WORK_STARTED,
            },
          };
          worksStatus[values[3]] = WorkStatus.IN_PROGRESS;
          break;
        case eventType.WORK_FINISHED:
          const machineIndex = machines[machine]?.workload?.indexOf(values[3]);
          if (index >= 0) {
            machines[machine] = {
              ...machines[machine],
              status: Status.AVAILABLE,
              changes: {
                ...machines[machine]?.changes,
                [date]: eventType.NEW_WORK_STARTED,
              },
            };
            machines[machine].workload?.splice(machineIndex, 1);
          }
          worksStatus[values[3]] = WorkStatus.FINISHED;
          break;
      }
      orders = setOrdersTimeState(date, orders, worksStatus, test);
      machines = setMachinesTimeState(date, machines);
    }

    return {
      ordersData: getOrdersData(orders),
      machinesData: getMachinesData(machines),
      worksStatus: worksStatus,
    };
    // setOrders(orders);
    // setMachines(machines);
  };

  const setMachinesTimeState = (date, machines) => {
    let newMachines = { ...machines };
    for (let key in machines) {
      newMachines[key].timeStates = {
        ...newMachines[key].timeStates,
        [date]: newMachines[key].status,
      };
    }
    return newMachines;
  };

  const setOrdersTimeState = (date, orders, worksStatus, test) => {
    let newOrders = { ...orders };
    for (let key in orders) {
      const isInProgress = newOrders[key].works?.some(
        (w) => worksStatus[w] === WorkStatus.IN_PROGRESS
      );
      const isFinished = newOrders[key].works?.every(
        (w) => worksStatus[w] === WorkStatus.FINISHED
      );
      const status = isInProgress
        ? WorkStatus.IN_PROGRESS
        : isFinished
        ? WorkStatus.FINISHED
        : WorkStatus.PENDING;
      if (test === 100) {
      }
      newOrders[key].timeStates = {
        ...newOrders[key].timeStates,
        [date]: status,
      };
    }
    return newOrders;
  };

  const processFiles = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    let i = 0;
    let max = 0;
    let min = 50000;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const lines = text.split("\n");
        const { ordersData, machinesData, worksStatus } = processLines(lines);
        setProcessedFiles((prevState) => prevState + 1);
        let isValid = Object.values(ordersData).every((o) => o < 50000);
        let average = Object.values(ordersData).reduce(
          (acc, v) => (acc = acc + v / Object.values(ordersData).length),
          0
        );
        for (let element of Object.values(ordersData)) {
          if (element > max) max = element;
          if (element < min) min = element;
        }
        setMax(max);
        setMin(min);
        setAverageConst((prevState) => prevState + average / 30);
        if (!isValid) {
          setInvalidFilesNames((prevState) => [...prevState, file.name]);
        } else {
          setValidFiles((prevState) => prevState + 1);
        }
      };
      reader.readAsText(file);
    }
  };

  const getMachinesData = (machinesCopy = {}) => {
    const machinesData = Object.keys(machinesCopy).reduce((acc, machine) => {
      const { timeStates } = machinesCopy[machine];
      const dates =
        timeStates && Object.keys(timeStates).filter((t) => t !== "");
      let intervalFirstValue = 0;
      let intervalLastValue = 0;
      let result = {};
      for (let i = 0; i < dates.length; i++) {
        if (i === 0) {
          intervalFirstValue = dates[i];
        }
        if (i + 1 === dates.length) {
          intervalLastValue = dates[i];
          if (result[timeStates[dates[i]]]) {
            result[timeStates[dates[i]]] =
              result[timeStates[dates[i]]] +
              getDateDifference(intervalLastValue, intervalFirstValue);
          } else {
            result[timeStates[dates[i]]] = getDateDifference(
              intervalLastValue,
              intervalFirstValue
            );
          }
        } else {
          let date = dates[i];
          let nextDate = dates[i + 1];
          if (timeStates[date] !== timeStates[nextDate]) {
            intervalLastValue = dates[i];

            if (result[timeStates[dates[i]]]) {
              result[timeStates[dates[i]]] =
                result[timeStates[dates[i]]] +
                getDateDifference(intervalLastValue, intervalFirstValue);
            } else {
              result[timeStates[dates[i]]] = getDateDifference(
                intervalLastValue,
                intervalFirstValue
              );
            }
            intervalFirstValue = dates[i + 1];
          }
        }
      }
      acc[machine] = result;
      return acc;
    }, {});
    return machinesData;
  };

  const getDateDifference = (date1, date2) => {
    const milisecondDifference = Math.abs(new Date(date1) - new Date(date2));
    return milisecondDifference / 1000;
  };

  const getOrdersData = (ordersCopy = {}) => {
    const ordersData = Object.keys(ordersCopy).reduce((acc, order) => {
      const { timeStates } = ordersCopy[order];
      const dates =
        timeStates && Object.keys(timeStates).filter((t) => t !== "");
      let intervalFirstValue = dates[0];
      let intervalLastValue = 0;
      for (let i = 0; i < dates.length; i++) {
        let date = dates[i];
        if (timeStates[date] === WorkStatus.FINISHED) {
          intervalLastValue = dates[i];
          break;
        }
      }
      acc[order] = getDateDifference(intervalLastValue, intervalFirstValue);
      return acc;
    }, {});
    return ordersData;
  };

  // useEffect(() => {
  //   getMachinesData();
  // }, [machines]);

  // useEffect(() => {
  //   getOrdersData();
  // }, [orders]);

  return (
    <div>
      <input type="file" multiple onChange={processFiles} />
      <p>{`Valid Files: ${validFiles}`}</p>
      <p>{`Processed Files: ${processedFiles}`}</p>
      {invalidFilesNames?.map((fn) => (
        <p>{fn}</p>
      ))}
      <p>{averageConst}</p>
      <p>{`Max value: ${maxConst}`}</p>
      <p>{`Min value: ${minConst}`}</p>
    </div>
  );
};

export default SimulationsProcess;
