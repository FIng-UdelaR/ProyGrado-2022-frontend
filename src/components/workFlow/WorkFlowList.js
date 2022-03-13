import { useEffect, useContext } from "react";
import WorkFlowRow from "./WorkFlowRow";
import { FlexBox } from "../common/StyledComponents";
import WorkFlowContext from "../../context/workFlow/WorkFlowContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const WorkFlowList = (props) => {
  const classes = useStyles();
  const { getWorkFlowsAction, error, loading, success, orders } =
    useContext(WorkFlowContext);

  useEffect(() => {
    const loadOrders = () => getWorkFlowsAction();
    loadOrders();
  }, []);

  return (
    <FlexBox direction="column" justifyContent="flex-start" width={"90%"}>
      <Typography
        variant="h4"
        sx={{
          margin: 2,
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        Lista de órdenes
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Progreso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.data?.data?.map((order) => {
              return <WorkFlowRow order={order} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </FlexBox>
  );
};

export default WorkFlowList;
