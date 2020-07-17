import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from 'axios'
import { OTP_API_URL} from "../constants";
import {useAuth} from "../context/auth";
import {Alert, AlertTitle} from "@material-ui/lab";

export const PopUpOtp = (props) => {
  const { setAuthTokens } = useAuth();
  const { onClose, open, username, hibp } = props;
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  const handleClose = () => {
    onClose(false);
  };

  const handleValidate = () => {
    axios.post(OTP_API_URL, {
      username,
      token,
    }).then( result => {
      console.log(result);
      if (!result.data.error) {
        setAuthTokens(result.data);
        onClose(true);
      } else {
        setError(result.data.error);
        console.error('error : ', result.data.error);
      }
    }).catch(e => {
      console.error(e);
      setError(e.toString());
    });
  };

  return (
    <Dialog maxWidth="xs" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Container style={{marginTop: 20}}>
        {hibp && <Alert severity="info">
          <AlertTitle>Have I Been Pawned</AlertTitle>
          <strong>Une ou plusieurs failles ont été détectées</strong> — Un email d'information vous a été envoyé
        </Alert>}
      </Container>
      <DialogTitle id="simple-dialog-title">Authentification à deux facteurs</DialogTitle>
      <Container >
        {error && <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error — <strong>{error}</strong>
        </Alert>}
        <Typography variant={"body1"}>Entrez le code qui vous a été envoyé par email :</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="One time token"
          name="otp"
          value={token}
          onChange={e => setToken(e.target.value)}
          autoFocus
        />
        <Grid style={{margin: "15px 0"}} container direction="row" justify="space-between" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleClose}>Fermer</Button>
          <Button variant="contained" color="secondary" onClick={handleValidate}>Valider</Button>
        </Grid>
      </Container>
    </Dialog>
  );
}

PopUpOtp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  hibp: PropTypes.any,
};
