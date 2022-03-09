import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import ProgressBar from "../common/progressBar/ProgressBar";
import { makeStyles } from "@mui/styles";
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

  return (
    <TableRow key={order.id}>
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
  );
};

export default WorkFlowRow;
