import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditarDetalles from "../components/EditarDetalles";
import Publicacion from "../components/Publicacion";
//MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MyButton from "../util/MyButton";
import Box from "@material-ui/core/Box";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";
//Iconos
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";
import { getUserData } from '../redux/actions/dataActions';

const styles = {
  root: {
    padding: '80px 300px 0px',
  },
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
    marginTop: 15,
    marginBottom: 15,
  },
  seguidos: {
    marginTop: 15,
    marginBottom: 10,
    fontWeigth: 500
  },
  bio: {
    marginBottom: 15
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

class ProfileUser extends Component {
  state = {
    openSeguidos: false,
    openSeguidores: false
  };
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
      user: {
        credentials: {
          username,
          fechaNacimiento,
          seguidos,
          seguidores,
          Fotolink,
          bio,
          website,
          gustos
        },
        loading,
        authenticated,
        publicaciones,
        
      },
      user
    } = this.props;

    const seguidosMarkup = user.seguidos !== null ? (
      user.seguidos.map((seguido) => <MenuItem>{seguido.follows}</MenuItem>)
    ) : (
      <p>No tiene usuarios seguidos</p>
    );
    const seguidoresMarkup = user.seguidores !== null ? (
      user.seguidores.map((seguidor) => <MenuItem>{seguidor.username}</MenuItem>)
    ) : (
      <p>No tiene usuarios seguidores</p>
    );

    const publicacionesMarkup = loading ? (
      <p> </p>
    ) : publicaciones === null ? (
        <p>Sin publicaciones</p>
    ) : (
        publicaciones.map((publicacion) => <Publicacion key={publicacion.postId} publicacion={publicacion}/>)
    )
    let profileMarkup = !loading ? (
      authenticated ? (
        <div container className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className={classes.paper}>
                <div className="image-wrapper">
                  <img
                    src={Fotolink}
                    alt="profile"
                    className={classes.imagen}
                    width="250"
                    height="200"
                  />
                  <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                  />
                  <MyButton
                    tip="Edit profile picture"
                    onClick={this.handleEditPicture}
                    btnClassName="button"
                  >
                    <EditIcon color="primary" />
                  </MyButton>
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
                <Grid item >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    //onClick={this.followProfile}
                    buttonStyle={{ borderRadius: 5 }}
                    style={{ borderRadius: 5 }}
                    className={classes.boton}
                  >
                    Editar perfil
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={6}>
                <Grid item >
                  <Link href="#" onClick={this.handleOpenSeguidores} color="inherit">
                    <Typography variant="body1" className={classes.seguidos}>
                      {seguidores}{" Seguidores"}
                    </Typography>
                  </Link>
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
                  <Link onClick={this.handleOpenSeguidos} color="inherit" underline="always">
                    <Typography variant="body1" className={classes.seguidos}>
                      {seguidos}{" Seguidos"}
                    </Typography>
                  </Link>
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
              {bio && (
                <Typography variant="body1" className={classes.bio}>
                  {bio} <EditarDetalles />
                </Typography>
              )}
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
          </Grid>
          <div>
            {publicacionesMarkup}
          </div>

        </div>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center" textSize="20">
            Cerro sesión
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <div>Cargando..</div>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data
});

const mapActionToProps = { logoutUser, uploadImage, getUserData };

ProfileUser.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ProfileUser));
