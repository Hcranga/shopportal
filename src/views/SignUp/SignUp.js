import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Swal from 'sweetalert2'

import firebase from 'firebase'

import db from '../../firebaseconfig';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [shopCategory, setShopCategory] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nic, setNIC] = useState('');
    const [shoplogo, setShopLogo] = useState("");
    const [certificate, setCertificate] = useState("");

    const imageInputRef1 = React.useRef();
    const imageInputRef2 = React.useRef();

    const submitButtonAction = (e) => {
        e.preventDefault();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (shoplogo.length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Please Upload Shop Logo'
            });
        }
        else if (certificate.length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Please Upload Shop Certificate'
            });
        }
        else if (isNaN(mobileNumber)) {
            Swal.fire({
                icon: 'info',
                title: 'Check Mobile Number'
            });
        }
        else if (reg.test(email) === false) {
            Swal.fire({
                icon: 'info',
                title: 'Invalid Email'
            });
        }
        else if (password.length < 6) {
            Swal.fire({
                icon: 'info',
                title: 'Password too short'
            });
        }
        else {
            var latitude = 0;
            var longitude = 0;
            navigator.geolocation.getCurrentPosition(function (position) {
                latitude = position.coords.latitude
                longitude = position.coords.longitude

            });
            let storageRef = firebase.storage().ref();
            let uploadTask = storageRef.child(email + "/" + "logo").put(shoplogo);
            let uploadTask2 = storageRef.child(email + "/" + "certificate").put(certificate);

            uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("upload is " + progress + " % done.");
                },
                function (error) {
                    console.log("Something went wrong..." + error);
                },
                function (complete) {
                    uploadTask2.snapshot.ref.getDownloadURL().then(function (certificateURL) {

                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                            function (snapshot) {
                                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log("upload is " + progress + " % done.");
                            },
                            function (error) {
                                console.log("Something went wrong..." + error);
                            },
                            function (complete) {
                                uploadTask.snapshot.ref.getDownloadURL().then(function (logoURL) {
                                    var shopData = {
                                        email: email,
                                        "Shop Name": shopName,
                                        "Address": shopAddress,
                                        "Mobile Number": mobileNumber,
                                        "Shop Category": shopCategory,
                                        "nic": nic,
                                        password: password,
                                        ShopDp: logoURL,
                                        "admin permission": false,
                                        "location latitude": latitude,
                                        "location longtude": longitude,
                                        "certificate url": certificateURL
                                    }
                                    db.collection('shops').doc(email).set(shopData)
                                        .then(function () {
                                            console.log("record added");
                                            resetbutton();

                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Sign Up Completed'
                                            });
                                        }).catch(err => {
                                            console.log("Server error " + err);
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Sign up failed'
                                            });
                                        });
                                });
                            }
                        );
                    });
                }
            );
        }

    }

    const handleShopName = (e) => {
        setShopName(e.target.value);
    }

    const handleShopAddress = (e) => {
        setShopAddress(e.target.value);
    }

    const handleMobileNumber = (e) => {
        setMobileNumber(e.target.value);
    }

    const handleShopCategory = (e) => {
        setShopCategory(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleNIC = (e) => {
        setNIC(e.target.value);
    }

    const handleShopLogoChange = (e) => {
        setShopLogo(e.target.files[0]);
    }

    const handleCertificatesChange = (e) => {
        setCertificate(e.target.files[0]);
    }

    const resetbutton = () => {
        setShopName('');
        setShopAddress('');
        setMobileNumber('');
        setShopCategory('');
        setEmail('');
        setPassword('');
        setNIC('');
        setShopLogo("");
        imageInputRef1.current.value = "";
        imageInputRef2.current.value = "";
        setCertificate("");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up Shop
        </Typography>
                <form className={classes.form} onSubmit={submitButtonAction}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="shopName"
                                name="shopName"
                                variant="outlined"
                                required
                                value={shopName}
                                onChange={handleShopName}
                                fullWidth
                                id="shopName"
                                label="Shop Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="shopAddress"
                                name="shopAddress"
                                variant="outlined"
                                required
                                value={shopAddress}
                                onChange={handleShopAddress}
                                fullWidth
                                id="shopAddress"
                                label="Shop Address"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="mobileNumber"
                                name="mobileNumber"
                                variant="outlined"
                                required
                                value={mobileNumber}
                                onChange={handleMobileNumber}
                                fullWidth
                                id="mobileNumber"
                                label="Mobile Number"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl} style={{ width: "100%" }}>
                                <InputLabel htmlFor="outlined-age-native-simple">Shop Category</InputLabel>
                                <Select
                                    native
                                    required
                                    label="Category"
                                    onChange={handleShopCategory}
                                    value={shopCategory}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="Grocery">Grocery</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="nic"
                                value={nic}
                                onChange={handleNIC}
                                label="NIC"
                                name="nic"
                                autoComplete="nic"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                value={email}
                                onChange={handleEmail}
                                label="Email ID"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                onChange={handlePassword}
                                value={password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label>
                                Please Upload Your Shop Logo
                            </label>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="file"
                                ref={imageInputRef1}
                                onChange={handleShopLogoChange}
                                type="file"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label>
                                Please Upload Relevent Certificates
                            </label>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="files"
                                ref={imageInputRef2}
                                onChange={handleCertificatesChange}
                                type="file"
                            />

                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={resetbutton}
                        color="primary"
                        className={classes.submit}
                    >
                        Reset
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/shopuser/signin" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}