import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import TableCustomer from "components/Table/TableCustomer.js";
import CardBody from "components/Card/CardBody.js";
import Swal from 'sweetalert2'
var voucher_codes = require('voucher-code-generator');

import db from '../../firebaseconfig';

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

const columns = ["Customer ID", "Details", "Promo Code"];

const useStyles = makeStyles(styles);

export default function ReadyToDeliver() {
  const classes = useStyles();
  const [customerIdList, setCustomerIdList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  

  useEffect(() => {
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {
    db.collection('promo_codes').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents.');
      }
      else {
        console.log('Records available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id, ...doc.data()
          }
        })
        setCustomerIdList(tempDoc)

      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  const promobuttonclickaction = (cusid, key) => {

    const shopDetails = [];

    db.collection('Customer').doc(cusid).collection("Customer's Details").get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents for', cusid);
      }
      else {
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        
        console.log("data from promocode collection :", customerIdList[key]);
        const code = voucher_codes.generate({
          prefix: "Delivo-",
          length: 6
        });

        const shopids = [];

        for (var i = 0; i < customerIdList[key].shop_id.length; i++) {
          shopids.push(customerIdList[key].shop_id[i]);
          const shopid = customerIdList[key].shop_id[i];
          db.collection('shops').doc(shopid).get().then((shopsquery) => {
            if (shopsquery.empty) {
              console.log('No matching documents for', shopid);
            }
            else{
              
              console.log('Doc match for', shopid);
              shopDetails.push(shopsquery.data());
            }
          })
        }
        console.log(shopDetails);

        const multilineString = `Congratulations \n
          You have a Coupon from Delivo\n ${code[0]} \n
          You can use this coupon for ${shopids}\n .
          Also your minimum bill must be ${customerIdList[key].minimum_bill}. \n
          Happy Shopping !`;
        console.log(multilineString);
        console.log("mobile number : ", tempDoc[0]["Custumer's Mobile Number"]);
        console.log(customerIdList[key].id);
        db.collection("promo_codes").doc(customerIdList[key].id).set({
          promocode: code[0],
          promoactivestatus: false
      }, { merge: true })

        fetch(`http://www.textit.biz/sendmsg?id=94767113128&pw=1275&to=${tempDoc[0]["Custumer's Mobile Number"]}&text=${multilineString}`, { mode: 'no-cors' }).then(function (response) {
          console.log(response);
          console.log("Message sent");
          Swal.fire({
            icon: 'success',
            text: 'Message Sent'
          })
        })
          .catch(function (error) {
            console.log(error);
          });
      }
    })
  }

  const buttonclickaction = (cusid) => {
    console.log("details button clicked");
    db.collection('Customer').doc(cusid).collection("Customer's Details").get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents for', cusid);
      }
      else {
        console.log('Records available for ', cusid);
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        //setCustomerDetails(tempDoc)
        console.log(tempDoc[0]);
        Swal.fire({
          html: `<table className="viewTable" cellpadding="5" cellspacing="5">
                                <tr>
                                  <td align="left">Customer ID :</td>
                                  <td align="left" className="leftPad">${tempDoc[0].id}</td>
                                </tr>
                                <tr>
                                  <td align="left">Name :</td>
                                  <td align="left" className="leftPad">${tempDoc[0]["Custumer's Name"]}</td>
                                </tr>
                                <tr>
                                  <td align="left">Address :</td>
                                  <td align="left" className="leftPad">${tempDoc[0]["Custumer's Address"]}</td>
                                </tr>
                                <tr>
                                  <td align="left">Mobile :</td>
                                  <td align="left" className="leftPad">${tempDoc[0]["Custumer's Mobile Number"]}</td>
                                </tr>
                                <tr>
                                  <td align="left">Email :</td>
                                  <td align="left" className="leftPad">${tempDoc[0]["Custumer's Email"]}</td>
                                </tr>
                            </table>`,
          focusConfirm: false,
          confirmButtonText: `Close`
        });
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Customer list</h4>
            <p className={classes.cardCategoryWhite}>
              Customers
            </p>
          </CardHeader>
          <CardBody>
            <TableCustomer
              tableHeaderColor="primary"
              tableHead={columns}
              tableData={customerIdList}
              buttonAction={buttonclickaction}
              promobuttonAction={promobuttonclickaction}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
