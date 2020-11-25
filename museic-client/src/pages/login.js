import React, { Component } from "react";
import { DialogContent, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import imagenLogin from "../images/loginimage.jpg";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import ResetContrasena from '../components/ResetContrasena';

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
//redux stuff
import { connect } from 'react-redux';
import { loginUser, resetContrasena } from '../redux/actions/userActions';


const styles = {
  root: {
    /*textAlign: 'center',*/
    height: "100vh",
  },
  image: {
    backgroundImage: "url(" + imagenLogin + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  paper: {
    margin: "64px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: "8px",
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#03a9f4",
  },
  submit: {
    margin: "24px 0px 16px",
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10px",
  },
  customSuccess: {
    color: "green",
    fontSize: "0.8rem",
    marginTop: "10px",
  },
  progress: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "2%",
  },
  submitButton: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
    float: "right",
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailReset: "",
      password: "",
      errors: {},
      open: false
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors: nextProps.UI.errors });
    }
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
  }
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleSubmitReset = (event) => {
    event.preventDefault();
    this.props.resetContrasena(this.state.email);
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                label="Contraseña"
                id="password"
                autoComplete="current-password"
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Ingresar
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <ResetContrasena />
                </Grid>
                <Grid item>
                  <Link href="#" to="/signup" variant="body2">
                    {"¿No tienes una cuenta? Registrate aquí"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  resetContrasena
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
