import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import db from '../../firebaseconfig';
import Admin from "../../layouts/Admin";
import PAdmin from "../../layouts/PharmecyAdmin";

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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const data = [];
    event.preventDefault();
    for (let [key, value] of formData.entries()) {
        data.push(value);
    }
    console.log(data[0]);
    db.collection('shops').get().then(function(querySnapshot) {
      if (!querySnapshot.empty) {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        let status=0;

        for(let i=0;i<tempDoc.length;i++){
          if(tempDoc[i].id == data[0] && tempDoc[i].password == data[1] && tempDoc[i]["admin permission"] == true){
            if(tempDoc[i]["Shop Catogary"] == "Grocery"){
              status=1;
            }
            else{
              status=2;
            }
          }
        }
        if(status == 1){
          localStorage.setItem('shopid', data[0]);
          ReactDOM.render(
            <BrowserRouter>
              <Switch>
                <Route path="/shopuser" component={Admin} />
                <Redirect from="/" to="/shopuser/grocerydashboard" />
              </Switch>
            </BrowserRouter>,
            document.getElementById("root")
          );
        }
        else if(status == 2){
          console.log("Move to pharmacy");
          localStorage.setItem('shopid', data[0]);
          ReactDOM.render(
            <BrowserRouter>
              <Switch>
                <Route path="/shopuser" component={PAdmin} />
                <Redirect from="/" to="/shopuser/pharmecydashboard" />
              </Switch>
            </BrowserRouter>,
            document.getElementById("root")
          );
        }
        else{
          console.log("Shop not exist or dont have admin priviledges");
        }
      }
      else {
          console.log("No Shops Exist");
      }
  });
    
}

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/shopuser/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}