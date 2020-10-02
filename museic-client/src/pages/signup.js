import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import AppIcon from "../images/logo-blanco-03.png";
import imagenLogin from '../images/introimage.jpg';
import axios from "axios";
import { Link } from "react-router-dom";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    /*textAlign: 'center',*/
    textAlign: "center"
  },
  image: {
    backgroundImage: "url(" + imagenLogin + ")",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  paper: {
    margin: "64px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    margin: "20px",
  },
  submit: {
    margin: "24px 0px 16px",
    position: "relative",
  },
  progress: {
    position: "absolute",
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: '',
      username: '',
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username
    };
    axios
      .post("/signupUsuario", newUserData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/login");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <div className={classes.image}>
      <Grid container className={classes.root}>
        <Grid item sm />
        <Grid item sm={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src={AppIcon} alt="disco" width="200" heigth="150" />
            <Typography component="h1" variant="h4" className={classes.title}>
              Regístrate Gratis
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirmar Contraseña"
                id="confirmPassword"
                autoComplete="current-password"
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                type="text"
                label="Nombre de Usuario"
                id="username"
                autoComplete="userName"
                helperText={errors.username}
                error={errors.username ? true : false}
                value={this.state.username}
                onChange={this.handleChange}
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
                Registrarse
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <Grid item>
                  <Link href="#" to="/login" variant="body2">
                    {"Ya tienes una cuenta? Ingresa aquí"}
                  </Link>
                </Grid>
            </form>
          </div>
        </Grid>
        <Grid item sm />
      </Grid>
      </div>  
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(signup);
