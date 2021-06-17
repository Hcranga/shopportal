import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';

import Button from "components/CustomButtons/Button.js"

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, buttonAction, setcomissionText, comissionInput } = props;
  return (
    <div className={classes.tableResponsive}>
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
                      {prop1["item Name"]}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {prop1.amount}
                    </TableCell>
                    <TableCell className={classes.tableCell} >
                      {prop1.realPrice}
                    </TableCell>
                    <TableCell className={classes.tableCell} >
                        <TextField id="comission" name="comission" onChange={(event) => {setcomissionText(event.target.value)}} value={comissionInput} style = {{width: 70}}/>
                    </TableCell>
                    <TableCell className={classes.tableCell} >
                      <Button onClick={() => buttonAction(prop1)} color="danger" size="sm" ret>Update</Button>
                    </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
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
