import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
//import ProfileSkeleton from '../../util/ProfileSkeleton';

//MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = {
  paper: {
    padding: 10,
  },
  profile: {
    margin: 20
  },
  
};

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
          username,
          Fotolink,
          
        },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
          <div className={classes.profile}>
            <Grid container>
              <Grid item sm={4}>
              <Avatar alt={username} src={Fotolink}></Avatar>
              </Grid>
              <Grid item sm={8}>
                <Typography
                variant="h5"
                color="primary"
                component={Link}
                to={'/user'}
              >
                {username}
              </Typography>
              </Grid>
            </Grid>
          </div>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Ingresar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Registrarse
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p> Loading... </p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps 
)(withStyles(styles)(Profile));
