import React, { Component } from 'react';
import { DialogContent, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import imagenLogin from "../images/loginimage.jpg";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";

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
}

class ResetContrasena extends Component {
    state = {
        errors: {},
        emailReset: "",
        open: false
    }
    handleOpen = () => {
      this.setState({
        open: true,
      });
    }
    handleClose = () => {
      this.setState({ open: false, errors: {} });
    };
    handleSubmitReset = (event) => {
      event.preventDefault();
      this.props.resetContrasena(this.state.emailReset);
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
            <div>
            <Link href="#" variant="body2" onClick={this.handleOpen}>
                    ¿Olvidaste tu contraseña?
            </Link>
            <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                  >
                    <MyButton
                      tip="Cerrar"
                      onClick={this.handleClose}
                      tipClassName={classes.closeButton}
                    >
                      <CloseIcon />
                    </MyButton>
                    <DialogTitle>¿Olvidaste tu contraseña?</DialogTitle>
                    <DialogContent>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                      className={classes.section1}
                      variant="body1"
                    >
                      Ingresa tu correo electronico y te mandaremos un correo para que realices el cambio de tu contraseña
                    </Typography>
                      
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="emailReset"
                          label="Correo"
                          name="emailReset"
                          type="email"
                          autoComplete="email"
                          autoFocus
                          helperText={errors.error}
                          error={errors.error ? true : false}
                          value={this.state.emailReset}
                          onChange={this.handleChange}
                        />
                        
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.submitButton}
                          disabled={loading}
                          onClick={this.handleSubmitReset}
                        >
                          Enviar
                          {loading && (
                            <CircularProgress
                              size={30}
                              className={classes.progress}
                            />
                          )}
                        </Button>
                    </DialogContent>
                  </Dialog>
                  </div>
        )
    }
}
ResetContrasena.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ResetContrasena));