import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import ReCAPTCHA from "react-google-recaptcha";
import { PopUpOtp } from "../components/PopUpOtp";
import axios from 'axios';
import {LOGIN_API_URL} from "../constants";
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {useHistory} from "react-router-dom";
import HelpDialog from "../components/HelpDialog";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "150px",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    textAlign: "center",
    marginBottom: theme.spacing(2)
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 900,
    marginBottom: theme.spacing(2)
  },
  form: {
    marginTop: theme.spacing(1)
  },
  error: {
    marginBottom: 10
  },
  submit: {
    margin: theme.spacing(3, 0, 0)
  },
  reCaptcha: {
    margin: theme.spacing(3, 4, 2),
  },
  help: {
    direction: "rtl",
  },
}));

export const Login = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [hibp, setHibp] = useState(null);
  const history = useHistory();
  const navigator = (window.navigator.userAgent).replace(/\s/g, '-');

  const handleOpenHelp = () => {
    setOpenHelp(true);
  };

  const handleCloseHelp = (value) => {
    setOpenHelp(false);
  };

  const handleOpenPopUp = () => {
    setOpen(true);
  };

  const handleClosePopUp = (value) => {
    console.log('handleClosePopUp : ', value);
    setOpen(false);
    if (value) {
      history.push('/admin');
    }
  };

  const onLogin = async () => {
    setError(null);
    setConfirm(null);
    try {
      const result = await axios.post(LOGIN_API_URL, {username, password, navigator})
      if (result.status === 201) {
        setConfirm(result.data);
      } else if (result.status === 200 && !result.data.error) {
        setConfirm(null);
        setError(null);
        if (result.data) {
          setHibp(result.data);
        }
        handleOpenPopUp();
      } else {
        setConfirm(null);
        setError(result.data?.error);
        console.error('error : ', result.data?.error);
      }
    } catch (e) {
      console.error(e);
      setError(e.toString());
    }
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <CssBaseline />
      <Card elevation={3}>
        <div className={classes.help}>
          <IconButton onClick={handleOpenHelp} color="secondary" aria-label="help">
            <HelpOutlineIcon fontSize={"large"}/>
          </IconButton>
        </div>
        <HelpDialog open={openHelp} onClose={handleCloseHelp}/>
        <CardContent>
          <div className={classes.paper}>
            <div className={classes.icon}>
              <img
                src="/public/logo.png"
                alt="logo"
              />
            </div>
            <form className={classes.form} noValidate>
              {confirm && <Alert className={classes.error} severity="warning">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>{confirm}</strong>
              </Alert>}
              {error && <Alert className={classes.error} severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error — <strong>{error}</strong>
              </Alert>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <ReCAPTCHA
                sitekey="6Le3HvcUAAAAAMSWo4jwDwPP2FX1bsRgkdmqcA4z"
                onChange={() => setCaptchaValid(true)}
                onErrored={() => setCaptchaValid(false)}
                onExpired={() => setCaptchaValid(false)}
                className={classes.reCaptcha}
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={onLogin}
                disabled={!captchaValid}
              >
                Connexion
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <PopUpOtp open={open} onClose={handleClosePopUp} username={username} hibp={hibp}/>
    </Container>
  );
}
