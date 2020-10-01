import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//components
import Navbar from "./components/Navbar";
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
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
        		<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={home} />
              <Route exact path="/intro" component={intro} />
							<Route exact path="/login" component={login} />
              <Route exact path="/artistLogin" component={artistlogin} />
							<Route exact path="/signup" component={signup} />
						</Switch>
					</div>
				</Router>
      		</div>
    	</MuiThemeProvider>
  );
}

export default App;
