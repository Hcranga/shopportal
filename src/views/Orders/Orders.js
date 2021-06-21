import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table1 from "components/Table/OrderTable.js";
import Table2 from "components/Table/OrderTable2.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Swal from 'sweetalert2'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import db from '../../firebaseconfig';

const useStylesForModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    overflowY: 'scroll',
    height: '200px',
    width:'300px',
    maxWidth: '300px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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

const columns = ["Customer ID", "Order Status", "Bill", "Ordered Items", "Vehicle Type", "Action"];
const allOrderColumns = ["Customer ID", "Order Status", "Bill", "Ordered Items"];

const useStyles = makeStyles(styles);

export default function Orders() {
  const classes = useStyles();
  const classesForModal = useStylesForModal();
  const shopid = localStorage.getItem('shopid');
  console.log(shopid);
  const [processingorderDetails, setProcessingOrderDetails] = useState([]);
  const [allOrderDetails, setAllOrderDetails] = useState([]);
  const [vehicleType, setVehicleType] = useState('');

  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    getDataFromDb();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    setModalData(data.itemsData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDataFromDb = () => {
    //get ongoing orders
    db.collection('orders').where("shopId", "==", shopid).where("status", "==", "processing").get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No processing orders');
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'No New Orders available',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        console.log('processing orders available');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'New Orders available',
          showConfirmButton: false,
          timer: 1500
        })
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { mainid: doc.id, ...doc.data() }
        })
        setProcessingOrderDetails(tempDoc)
        console.log(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })

    //get all orders
    db.collection('orders').where("shopId", "==", shopid).get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No orders for the shop');
      }
      else {
        console.log('orders available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { mainid: doc.id, ...doc.data() }
        })
        setAllOrderDetails(tempDoc)
        console.log(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  const handleVehicleType = (e) => {
    setVehicleType(e.target.value);
    console.log(e.target.value);
  }

  const buttonclickaction = (rowid) => {
    console.log(rowid);
    //get order details
    db.collection('orders').doc(rowid).get().then((querySnapshot) => {
      handleOpen(querySnapshot.data());
    }).catch(err => {
      console.log("Failed to retrive order details " + err);
    })
  }

  const showFromAllOrderedItems = (rowid) => {
    console.log(rowid);
    buttonclickaction(rowid);
  }

  const ReadyButtonAction = (rowid) => {
    if (vehicleType.length == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Select Vehicle Type'
      });
    }
    else {
      db.collection("orders").doc(rowid).set({
        status: "ready",
        assignedVehicleType: vehicleType
      }, { merge: true }).then(function () {
        Swal.fire({
          icon: 'success',
          title: 'Order Updated'
        });
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Server Error'
        });
      });
    }

  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>Order list</h4>
            <p className={classes.cardCategoryWhite}>
              Ongoing
            </p>
          </CardHeader>
          <CardBody>
            <Table1
              tableHeaderColor="primary"
              tableHead={columns}
              tableData={processingorderDetails}
              showbuttonAction={buttonclickaction}
              readybuttonAction={ReadyButtonAction}
              onVehicleTypeChange={handleVehicleType}
            />
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classesForModal.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classesForModal.paper}>
                  {modalData.map(itemDetails => <div>
                    <p>Item Name : {itemDetails.item_name}</p>
                    <p>Manufacturer : {itemDetails.item_manufacture}</p>
                    <p>Amount : {itemDetails.amount}</p>
                    <p>Description : {itemDetails.description}</p><br />
                  </div>)}
                </div>
              </Fade>
            </Modal>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Order list</h4>
            <p className={classes.cardCategoryWhite}>
              All
            </p>
          </CardHeader>
          <CardBody>
            <Table2
              tableHeaderColor="primary"
              tableHead={allOrderColumns}
              tableData={allOrderDetails}
              showbuttonAction={showFromAllOrderedItems}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
