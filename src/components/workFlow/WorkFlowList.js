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
    <FlexBox direction="column" justifyContent="flex-start">
      <h4>Orders</h4>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Machines</TableCell>
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
