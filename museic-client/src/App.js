import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute.js";
//Pages

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import artistlogin from "./pages/artistlogin";
import intro from "./pages/intro";
import user from "./pages/user";
import ProfileUser from "./components/ProfileUser";
import signupArt from "./pages/signupArtista";
import chat from "./pages/chats";
import buscar from "./pages/buscar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#990099",
      main: "#800080",
      dark: "#250025",
      contrastText: "#fff",
    },
    secondary: {
      light: "##03a9f4",
      main: "##03a9f4",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Helvetica",
    useNextVariants: true
  },
  
});

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/intro";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
              <Navbar />
              <div >
              <Switch>
                <Route exact path="/" component={home} />
                <Route
                  exact
                  path="/user"
                  component={ProfileUser}
                 // authenticated={authenticated}
                />
                <Route
                  exact
                  path="/chat"
                  component={chat}
                // authenticated={authenticated}
/>
                <AuthRoute
                  exact
                  path="/intro"
                  component={intro}

                />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                />
                <Route
                  exact
                  path="/usuarios/:username"
                  component={user}
                />
                <Route
                  exact
                  path="/usuarios/:username/publicacion/:postId"
                  component={user}
                />
                <Route
                  exact
                  path="/buscar/:query"
                  component={buscar}
                />
                <AuthRoute
                  exact
                  path="/artistLogin"
                  component={artistlogin}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                />
                <AuthRoute
                  exact
                  path="/signupA"
                  component={signupArt}
                />
              </Switch>
              </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
