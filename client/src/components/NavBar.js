import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LocalHospitalTwoToneIcon from '@material-ui/icons/LocalHospitalTwoTone';
import {Link} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../context/auth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "uppercase",
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const {authTokens} = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <LocalHospitalTwoToneIcon className={classes.icon}/>
        <Typography variant="h6" className={classes.title}>
          Portail Résilience
        </Typography>
        <Button
          style={{marginRight: 10, color: "white"}}
          component={Link} to="/"
          startIcon={<HomeOutlinedIcon/>}>
          Accueil
        </Button>
        {authTokens ?
          <Button
            style={{marginRight: 10, color: "white"}}
            component={Link} to="/admin"
            startIcon={<AccountCircleOutlinedIcon/>}>
            Profil
          </Button> :
          <Button
            style={{marginRight: 10, color: "white"}}
            component={Link} to="/login"
            startIcon={<ExitToAppIcon/>}>
            Connexion
          </Button>}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
