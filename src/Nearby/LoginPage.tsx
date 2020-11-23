import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login, signup, getLoginState } from "../API/API";
import styled from "styled-components";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Events Recommendation
      </Link>{" "}
      {/* {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}
//!!!!!did not logout after 30 min!!!

// Set-Cookie in Response Header not being created in browser - Using http POST

function FormInputField(id: string, label: string, onChange: any) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={id}
      autoComplete={id}
      autoFocus
      onChange={onChange}
    />
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function LoginPage(isLoginPage: boolean) {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleLogin = () => {
    login(email, password)
      .then(response => {
        console.log(response.data.logined);
        if (!response.data.logined) {
          setError("Incorrect email or password");
        } else {
          // Cookies.set("token", response.token)
          console.log("redirect");
          history.push("/NearbyEvents");
        }
      })
      .catch(() => setError("Login failed"));
  };

  const handleSignup = () => {
    if (!password || password.length < 8) {
      setError("Password should have at least 8 characters");
      return;
    }
    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError("The email is not valid");
      return;
    }
    signup(email, password, firstName, lastName)
      .then(response => {
        if (!response.data.logined) {
          setError("Sign up failed");
        } else {
          console.log("signup");
          // Cookies.set("token", response.token)
          history.push("/NearbyEvents");
        }
      })
      .catch(() => setError("Sign up failed"));
  };

  const handleSubmit = () => {
    if (isLoginPage) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  useEffect(() => {
    getLoginState().then(response => {
      if (response.data.logined) {
        setIsLoggedIn(true);
        setName(response.data.firstName);
      } else {
        setIsLoggedIn(false);
        setName("");
      }
    });
  }, []);

  return (
    <>
      <NavigationBar
        loggedIn={isLoggedIn}
        name={name}
        handleLogout={null}
      ></NavigationBar>
      {isLoggedIn ? (
        <Alert severity="error">Hi {name}, you have already logged in</Alert>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLoginPage ? "Log In" : "Sign Up"}
            </Typography>
            <form className={classes.form} noValidate>
              {/* <FormInputField id="email" label="Email Address" onchange={handleEmailChange}/> */}
              {!isLoginPage ? (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    onChange={handleFirstNameChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                    onChange={handleLastNameChange}
                  />
                </>
              ) : null}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              <Error> {error}</Error>
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                {isLoginPage ? "Log In" : "Sign Up"}
              </Button>
              <Grid container>
                {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                <Grid item>
                  <Link
                    href={isLoginPage ? "/Signup" : "/Login"}
                    variant="body2"
                  >
                    {isLoginPage
                      ? "Don't have an account? Sign Up"
                      : "Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
}

// export default withRouter(LoginPage);

const Error = styled.div`
  color: #b80f0a;
  list-style: none;
  // margin-left: 180px;
`;
