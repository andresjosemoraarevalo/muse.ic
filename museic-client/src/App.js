import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from 'jwt-decode';
//components
import Navbar from "./components/Navbar";
import AuthRoute from './util/AuthRoute.js';
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import artistlogin from "./pages/artistlogin";
import intro from "./pages/intro";

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
    fontFamily: "Helvetica"
  }
});

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/intro'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
        		<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={home} />
              <AuthRoute exact path="/intro" component={intro} authenticated={authenticated}/>
							<AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path="/artistLogin" component={artistlogin} authenticated={authenticated}/>
							<AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
						</Switch>
					</div>
				</Router>
      		</div>
    	</MuiThemeProvider>
  );
}

export default App;
