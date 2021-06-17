import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Swal from 'sweetalert2'

import avatar from "assets/img/faces/marc.jpg";
import db from '../../firebaseconfig';

import firebase from 'firebase'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function AddItem() {
  const classes = useStyles();
  const shopid = localStorage.getItem('shopid');
  const [item, setItem] = React.useState({
    itemName: "",
    manufacturer: "",
    itemPrice: "",
    realPrice: "",
    amount: "",
    description: ""
  })
  const [image,setImage] = useState("");

  const submitButtonAction = (e) => {
    e.preventDefault();

    let storageRef = firebase.storage().ref();

    let uploadTask = storageRef.child("products/" + shopid+image.name).put(image);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + " % done.");
        },
        function (error) {
            console.log("Something went wrong..." + error);
        },
        function (complete) {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              setImage(downloadURL);
              var itemData = {
                "image url":downloadURL,
                "item Name":item.itemName,
                "item manufacture":item.manufacturer,
                "itemPrice" : item.itemPrice,
                "description":item.description,
                "amount":item.amount,
                "admin_permission":false
              }
              db.collection('shops').doc(shopid).collection('Listed Items').add(itemData)
                .then(ref => {
                  console.log('Added Product with ID: ', ref.id);
                  Swal.fire({
                    icon: 'success',
                    title: 'Product Added!'
                  });
                })
                .catch(err => {
                  console.log("product add error " + err);
                  Swal.fire({
                    icon: 'info',
                    title: 'Product Added Failed!'
                  });
                })
            });
        }
    );
    
  }

  const handleItem = (evt) => {
    const value = evt.target.value;
    setItem({
      ...item,
      [evt.target.name]: value
    });
  }

  const handleItemImages = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Item</h4>
              <p className={classes.cardCategoryWhite}>Fill Details of the Item</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Item Name"
                    name="itemName"
                    val={item.itemName}
                    handleChange={handleItem}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Manufacturer"
                    name="manufacturer"
                    val={item.manufacturer}
                    handleChange={handleItem}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Item Price"
                    name="itemPrice"
                    val={item.itemPrice}
                    handleChange={handleItem}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Amount/Quantity"
                    name="amount"
                    val={item.amount}
                    handleChange={handleItem}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Description"
                    name="description"
                    val={item.description}
                    handleChange={handleItem}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <label>
                    Upload Item Images
                            </label>
                  <input
                    accept="image/*"
                    onChange={handleItemImages}
                    className={classes.input}
                    id="file"
                    type="file"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={submitButtonAction} color="primary">Add Item</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
