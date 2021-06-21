/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import { Link } from 'react-router-dom'

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/shopuser/additem">Add Item</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            <Link to="/shopuser/orders">Orders</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            <Link to="/shopuser/earnings">Earnings</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            <Link to="/shopuser/help">Help</Link>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
