import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from "@material-ui/core/styles";




const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "calc(100vh-50px)",
    marginTop:50,
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
  card: {
    padding: 10,
    backgroundColor: "#556cd6",
    color: "#fff",
    lineHeight: "1.5 em",
    height: "100%"
  },
  helpCard: {
    margin: "60px",
  },
  contentWrap: {

  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.root} >
        <CardContent  >
          <div style={{textAlign: "center"}}>
            <img
              src="/public/logo.png"
              alt="logo"
            />
          </div>
          <Typography className={classes.title} gutterBottom>
            Projet Portail Résilience
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Djilali-Saiah Sid, Chambon Nicolas, Tran Delphine, Bassignani Théo, Delsol Antonin
          </Typography>
          <Typography  variant="h4" component="h2">
            Bienvenue sur notre mise en situation professionnelle !
          </Typography>
          <Typography variant="body2" className={classes.objectif} color="textSecondary" component="p">
            Notre objectif ?
          </Typography>
          <Typography variant="body2" className={classes.marginBottom} component="p">
            Créer un portail de connexion sécurisée pour une clinique avec des contraintes ainsi que des obligations.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <Typography variant="body2" component="p">
                  <strong>Les obligations</strong>
                  <ul>
                    <li>Vérification IP</li>
                    <li>Vérification navigateur</li>
                    <li>Double authentification</li>
                    <li>Système anti brute-force</li>
                    <li>Have I Been Pwnd</li>
                  </ul>
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <Typography variant="body2" component="p">
                  <strong>Les contraintes</strong>
                  <ul>
                    <li>Active directory</li>
                    <li>Sources hebergées sur le Windows Server</li>
                  </ul>
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <center>
            <Card className={classes.helpCard} >
              <img
                alt="guide-utilisateur"
                width='100%'
                src="/public/guide2.png"
              />
            </Card>
          </center>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
