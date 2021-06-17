import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Button from 'components/CustomButtons/Button.js'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/ListedItemTable";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Swal from 'sweetalert2'


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

const columns = ["Item Name", "Amount", "Real Price", "Commission", "Action"];

const useStyles = makeStyles(styles);

export default function Account() {
    const classes = useStyles();
    const [allshopDetails, setShopDetails] = useState([]);
    const [listedItemDetails, setListedItemDetails] = useState([]);
    const [comissionText, setcomissionText] = useState('');
    const [shopID, setShopId] = useState('');

    useEffect(() => {
        getDataFromDb();
    }, []);

    const getDataFromDb = () => {
        db.collection('shops').get().then((querySnapshot) => {
            if (querySnapshot.empty) {
              console.log('No matching documents.');
            }
            else {
              console.log('Records available');
              const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
              })
              setShopDetails(tempDoc)
            }
      
          }).catch(err => {
            console.log("Items action error " + err);
          })
    }

    const getListedItemForShop = (event,value) => {
        
        if(value){
            setcomissionText('');
            setShopId(value.id);
            db.collection('shops').doc(value.id).collection("Listed Items").get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log('No listed items for', value.id);
                    Swal.fire({
                        icon: 'info',
                        title: 'No items for the shop!'
                      });
                }
                else{
                    console.log('listed items avalibale for', value.id);
                    const tempDoc = querySnapshot.docs.map((doc) => {
                        return { itemid: doc.id, ...doc.data() }
                    })
                    setListedItemDetails(tempDoc)
                    console.log(tempDoc);
                }
            })
        }
    }

    const buttonclickaction = (rowData) => {
        //console.log(comissionText);
        //console.log(rowData.realPrice);
        var value1 = parseFloat(comissionText);
        var value2 = parseFloat(rowData.realPrice);
        var priceWithComission = value1+value2;
        console.log(priceWithComission);

        db.collection("shops").doc(shopID).collection("Listed Items").doc(rowData.itemid).set({
            priceWithComission: priceWithComission,
            admin_permission: true
        }, { merge: true })
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Autocomplete
                    onChange={(event, value) => getListedItemForShop(event,value)}
                    id="combo-box-demo"
                    options={allshopDetails}
                    getOptionLabel={(option) => option.id}
                    style={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Search Shop Name" variant="outlined" />}
                />
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Listed Items</h4>
                        <p className={classes.cardCategoryWhite}>
                            By Shop
            </p>
                    </CardHeader>

                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={columns}
                            tableData={listedItemDetails}

                            buttonAction={buttonclickaction}
                            setcomissionText={setcomissionText}
                            comissionInput={comissionText}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
