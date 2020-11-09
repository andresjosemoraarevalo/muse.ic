import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import dayjs from "dayjs";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import {
  unfollowProfile,
  followProfile,
} from "../redux/actions/dataActions";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 0 0",
    },
  },
  imagen: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  box: {
    backgroundColor: "#800080",
    color: "#FFFFFF",
    marginRight: 10
  },
  boxDiv: {
    marginTop: 20,
    marginBottom: 20,
  },
  seguidos: {
    marginTop: 20,
    marginBottom: 20,
    fontWeigth: 500
  },
  bio: {
    marginBottom: 20
  },
  boton: {
    margin: '8px',
    textTransform: "none"
  }
};

class StaticProfile extends Component {
  followedProfile = () => {
    if (
      this.props.user.seguidos &&
      this.props.user.seguidos.find(
        (seguido) => seguido.follows === this.props.profile.username
      )
    )
      return true;
    else return false;
  };
  followProfile = () => {
    this.props.followProfile(this.props.profile.username);
    this.props.profile.seguidores++;
    this.props.user.credentials.seguidos++;
  };
  unfollowProfile = () => {
    this.props.unfollowProfile(this.props.profile.username);
    this.props.profile.seguidores--;
    this.props.user.credentials.seguidos--;
  }
  render() {
  const {
    classes,
    profile: {
      username,
      fechaNacimiento,
      Fotolink,
      bio,
      seguidos,
      seguidores,
      website,
      gustos,
    }
  } = this.props;

  const seguirButton = this.followedProfile() ? (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={this.unfollowProfile}
      buttonStyle={{ borderRadius: 5 }}
      style={{ borderRadius: 5 }}
      className={classes.boton}
    >
      Dejar de Seguir
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={this.followProfile}
      buttonStyle={{ borderRadius: 5 }}
      style={{ borderRadius: 5 }}
      className={classes.boton}
    >
      Seguir
    </Button>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <div className={classes.paper}>
          <div className={classes.profile}></div>
          <div className="image-wrapper">
            <img
              src={Fotolink}
              alt="profile"
              className={classes.imagen}
              width="250"
              height="200"
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item >
              <Typography color="primary" variant="h4">
                {username}
              </Typography>
            </Grid>
            <Grid item>
              {seguirButton}
            </Grid>
            
          </Grid>
          <Grid container spacing={6}>
            <Grid item >
              
            <Typography variant="body1" className={classes.seguidos}>
                {seguidores}{" Seguidores"}
              </Typography>
            </Grid>
            <Grid item >
              <Typography variant="body1" className={classes.seguidos}>{seguidos}{" Seguidos"}</Typography>
            </Grid>
          </Grid>
          
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <div container></div>
            </Fragment>
          )}
          {bio && <Typography variant="body1" className={classes.bio}>{bio}</Typography>}
          <Grid container spacing={1}>
            <Grid item>
              <CalendarToday color="primary" />{" "}
            </Grid>
            <Grid item>
              <Typography variant="body1">{dayjs(fechaNacimiento).format("DD MMM YYYY")}</Typography>
            </Grid>
          </Grid>
          
          {gustos && (
            <Grid container className={classes.boxDiv}>
              {gustos.map((gusto) => (
                <Box
                  component="div"
                  display="inline"
                  borderRadius={8}
                  p={1}
                  color="primary"
                  className={classes.box}
                >
                  {gusto}
                </Box>
              ))}
            </Grid>
          )}
          
        </div>
      </Grid>
      <hr />
    </Grid>
    
  );
  }
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  followProfile: PropTypes.func.isRequired,
  unfollowProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  followProfile,
  unfollowProfile,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(StaticProfile));
