import React from "react";
import { useAuth } from "../context/auth";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop:50,
        height:"75vh"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 34,
        textAlign:"center"

    },
    pos: {
        marginBottom: 12,
        textAlign:"center"
    },
    objectif:{
        marginBottom: 12,
    },
    marginBottom:{
        marginBottom:48
    },
    marginBottomTitle:{
        marginBottom:20
    },
    card: {
        padding: 10,
        backgroundColor: "#19857b",
        color: "#fff",
        lineHeight: "1.5 em",
        height: "100%"
    },

});

const Admin = () => {
  const { setAuthTokens } = useAuth();
  const classes = useStyles();

  function logOut() {
    localStorage.removeItem('tokens');
    setAuthTokens(null);
    window.location.replace("/");
  }

  return (

<Container>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    Profile
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Bonjour à vous utilisateur et bienvenu sur notre portail de connexion !
                </Typography>

                <Typography variant="body2" className={classes.objectif} color="textSecondary" component="p">
                    Etapes du processus de connexion
                </Typography>
                <Typography variant="body2" className={classes.marginBottom} component="p">
                    Une fois la tentative de connexion effectué, l'application va réaliser plusieurs étapes :
                </Typography>

                <Grid container spacing={3} className={classes.marginBottom}>

                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant="h5" className={classes.marginBottomTitle} >
                                Active Directory
                            </Typography>
                            <Typography variant="body2" component="p">
                                Vérification de l'existence des identifiants de connexion dans l'active directory
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant="h5" className={classes.marginBottomTitle} >
                                IP & Navigateur
                            </Typography>
                            <Typography variant="body2" component="p">
                                Vérification de l'adresse IP et du navigateur
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant="h5" className={classes.marginBottomTitle} >
                                Have I Been Pwnd
                            </Typography>
                            <Typography variant="body2" component="p">
                                Vérification des potientielles failles de sécurité lié à l'adresse email
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant="h5" className={classes.marginBottomTitle} >
                                OTP
                            </Typography>
                            <Typography variant="body2" component="p" >
                                Double authentification
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    style={{padding: 20 , borderRadius: '45px'}}
                    variant="contained"
                    color="primary"
                    onClick={logOut}>
                    Log out
                </Button>
            </CardContent>
        </Card>
    </Container>
  );
}

export default Admin;
