import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import Button from "components/CustomButtons/Button.js"

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, showbuttonAction, readybuttonAction, onVehicleTypeChange } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={classes.tableResponsive}>
      <TableContainer>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop1, key1) => {
              return (
                <TableRow key={key1} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {prop1.customerId}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {prop1.status}
                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    {prop1.total_bill}
                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    <Button onClick={() => showbuttonAction(prop1.mainid)} color="white" size="sm" ret>Show</Button>
                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        name="vehicletype"
                        onChange={onVehicleTypeChange}
                        className={classes.selectEmpty}
                      >
                        <option value="">None</option>
                        <option value="Bike">Bike</option>
                        <option value="Lorry">Lorry</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    <Button onClick={() => readybuttonAction(prop1.mainid)} color="warning" size="sm" ret>Ready</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
