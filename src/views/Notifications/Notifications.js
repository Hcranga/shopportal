/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Notifications() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = (place) => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function () {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function () {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function () {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function () {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function () {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Pharmacies</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"Shop owners should be able to create an account and enter some basic information. After creating an account, shop owners should be able to submit their business details and add information as needed."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"Among other things, the order management application should help pharmacies handle and manage orders, returns, refunds, and prescription verification."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"When a new order is received, the order notifications feature notifies pharmacy workers, which is crucial for efficient order processing."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"Prescription files should be accessible and verifiable by pharmacists."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"Customers will not be left alone with any troubles and should be able to contact administrators for clarification."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"A pharmacy should be able to take payments immediately through the app, obtain information on all active payments, and govern the flow of those funds."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"The order history provides pharmacy employees with access to all past orders."} />
          </GridItem>
        </GridContainer>
      </CardBody>
      <br />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Grocery, Electronics, Furniture Shops</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"When you make an order through the app, a notification is sent to the shop's dedicated app. The establishment can either accept or decline the order. When an order is approved, it is handled by staff, and a bill is automatically printed."} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          <SnackbarContent message={"When a restaurant employee checks an order, an automatic message is sent to the nearest delivery person, who then arrives at the shop to pick up the items."}/>
          </GridItem>
        </GridContainer>
      </CardBody>
      <br />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Contact us for any special cases</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <SnackbarContent message={"Email – info.delivo@gmai.com"} />
            <SnackbarContent message={"Phone – 076 384 8989"} />
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
