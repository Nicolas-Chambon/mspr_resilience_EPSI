import React, {useState} from "react";
import { Login } from "./pages/Login";
import { Helmet } from "react-helmet";
import { light } from "./theme";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './context/privateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/auth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  const existingTokens = localStorage.getItem("tokens") && JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    }
  }

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={light}>
        <CssBaseline />
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Router>
            <div className={classes.root}>
              <NavBar/>
            </div>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/admin" component={Admin} />
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}
