import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import dayjs from "dayjs";
import { connect } from "react-redux";
import EditarDetalles from "../components/EditarDetalles";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";
import MenuList from '@material-ui/core/MenuList';

import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import CloseIcon from "@material-ui/icons/Close";
import {
  unfollowProfile,
  followProfile,
} from "../redux/actions/dataActions";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

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
    marginRight: 10,
    marginBottom: 10
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
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
};

class StaticProfile extends Component {
  state = {
    openSeguidos: false,
    openSeguidores: false
  }
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
  followProfile = (usuario) => {
    this.props.followProfile(usuario);
    this.props.profile.seguidos++;
    this.props.user.credentials.seguidos++;
  };
  unfollowProfile = (usuario) => {
    this.props.unfollowProfile(usuario);
    this.props.profile.seguidos--;
    this.props.user.credentials.seguidos--;
  }
  followUser = () => {
    this.props.followProfile(this.props.profile.username);
    this.props.profile.seguidores++;
    this.props.user.credentials.seguidos++;
  }
  unfollowUser = () => {
    this.props.unfollowProfile(this.props.profile.username);
    this.props.profile.seguidores--;
    this.props.user.credentials.seguidos--;
  }
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
  handleOpenSeguidos = () => {
    this.setState({ openSeguidos: true });
  };
  handleOpenSeguidores = () => {
    this.setState({ openSeguidores: true });
  };
  handleClose = () => {
    this.setState({ openSeguidos: false, openSeguidores: false });
  };
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
    },
    user
  } = this.props;

  const seguidosMarkup = user.seguidos !== null ? (
    user.seguidos.map((seguido) => 
      <Grid container>
        <Grid item sm={9}>
          <MenuItem>
            <Typography
              variant="h6"
              color="primary"
              component={Link}
              to={`/usuarios/${seguido.follows}`}
            >
              {seguido.follows}
            </Typography>
          </MenuItem>
        </Grid>
        <Grid item sm={3}>
          {user.seguidos.find((seguidoo) => seguidoo.follows === seguido.follows) ? (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => this.unfollowProfile(seguido.follows)}
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
              onClick={() => this.followProfile(seguido.follows)}
              buttonStyle={{ borderRadius: 5 }}
              style={{ borderRadius: 5 }}
              className={classes.boton}
            >
              Seguir
            </Button>
          )
          }
        </Grid>
      </Grid>
      )
  ) : (
    <p>No tiene usuarios seguidos</p>
  );
  const seguidoresMarkup = user.seguidores !== null ? (
    user.seguidores.map((seguidor) => 
      <Grid container>
        <Grid item sm={9}>
          <MenuItem>
            <Typography
              variant="h6"
              color="primary"
              component={Link}
              to={`/usuarios/${seguidor.username}`}
            >
              {seguidor.username}
            </Typography>

          </MenuItem>
        </Grid>
        <Grid item sm={3}>
          {user.seguidos.find((seguidoo) => seguidoo.follows === seguidor.username) ? (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => this.unfollowProfile(seguidor.username)}
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
              onClick={() => this.followProfile(seguidor.username)}
              buttonStyle={{ borderRadius: 5 }}
              style={{ borderRadius: 5 }}
              className={classes.boton}
            >
              Seguir
            </Button>
          )
          }
        </Grid>
      </Grid>
        )
  ) : (
    <p>No tiene usuarios seguidores</p>
  );

  const seguirButton = this.followedProfile() ? (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={this.unfollowUser}
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
      onClick={this.followUser}
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
              src={username !== this.props.user.credentials.username ? (
                Fotolink
              ) : (
                this.props.user.credentials.Fotolink
              )}
              alt="profile"
              className={classes.imagen}
              width="250"
              height="200"
            />
            {username !== this.props.user.credentials.username ? (
                null
              ) : (
                <div>
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <MyButton
                  tip="Editar Foto de Perfil"
                  onClick={this.handleEditPicture}
                  btnClassName="button"
                >
                  <EditIcon color="primary" />
                </MyButton>
                </div>
                )
              }
            
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
              {username !== this.props.user.credentials.username ? (
                <div>{seguirButton}</div>
              ) : (
              <div><EditarDetalles /></div>
                )
              }
            </Grid>
            
          </Grid>
          <Grid container spacing={6}>
            <Grid item >
              {username !== this.props.user.credentials.username ? (
                <Typography variant="body1" className={classes.seguidos}>
                  {seguidores}{" Seguidores"}
                </Typography>
              ) : (
                <Link href="#" onClick={this.handleOpenSeguidores} color="inherit">
                  <Typography variant="body1" className={classes.seguidos}>
                    {seguidores}{" Seguidores"}
                  </Typography>
                </Link>
                
                )
              }
              <Dialog
                  open={this.state.openSeguidores}
                  onClose={this.handleClose}
                  fullWidth
                  maxWidth="sm">
                    <MyButton
                      tip="Cerrar"
                      onClick={this.handleClose}
                      tipClassName={classes.closeButton}
                    >
                      <CloseIcon />
                    </MyButton>
                    <DialogTitle>Lista de Seguidores</DialogTitle>
                    <DialogContent>
                      <MenuList>
                        {seguidoresMarkup}
                      </MenuList>
                    </DialogContent>
                  </Dialog>
            </Grid>
            <Grid item >
              {username !== this.props.user.credentials.username ? (
                <Typography variant="body1" className={classes.seguidos}>
                  {seguidos}{" Seguidos"}
                </Typography>
              ) : (
                <Link href="#" onClick={this.handleOpenSeguidos} color="inherit">
                  <Typography variant="body1" className={classes.seguidos}>
                    {seguidos}{" Seguidos"}
                  </Typography>
                </Link>
                )
              }
              <Dialog
                  open={this.state.openSeguidos}
                  onClose={this.handleClose}
                  fullWidth
                  maxWidth="sm">
                    <MyButton
                      tip="Cerrar"
                      onClick={this.handleClose}
                      tipClassName={classes.closeButton}
                    >
                      <CloseIcon />
                    </MyButton>
                    <DialogTitle>Lista de Seguidos</DialogTitle>
                    <DialogContent>
                      <MenuList>
                        {seguidosMarkup}
                      </MenuList>
                    </DialogContent>
                  </Dialog>
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
          {username !== this.props.user.credentials.username ? (
            gustos && (
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
            )
          ) : (
            this.props.user.credentials.gustos && (
              <Grid container className={classes.boxDiv}>
                {this.props.user.credentials.gustos.map((gusto) => (
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
            )
          )}
          
          
        </div>
      </Grid>
      
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
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  followProfile,
  unfollowProfile,
  logoutUser,
  uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(StaticProfile));
