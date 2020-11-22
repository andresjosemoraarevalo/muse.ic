import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Publicacion from "../components/Publicacion";
import Evento from "../components/Evento";
import PostPublicacion from "../components/PostPublicacion";
import Profile from "../components/Profile";
import Menu from "../components/menu";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {
  getPublicaciones,
  getEventos,
  getUsuarios,
} from "../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostEvento from "../components/PostEvento";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
//import MenuUI from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CardHeader } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
//import Button from "@material-ui/core/Button";
// <Menu />
const styles = {
  root: {
    marginTop: "60px",
  },
  posts: {
    overflow: "scroll",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 200,
    marginBottom: 50,
  },
  eventos: {
    //padding: 10
  },
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

class buscar extends Component {
  state = {
    value: 0,
    buscar: ''
  };
  componentDidMount() {
    const query = this.props.match.params.query;
        
    if (query) this.setState({buscar: query});

    this.props.getPublicaciones();
    this.props.getEventos();
    this.props.getUsuarios();
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
    console.log(this.state.value);
  };

  render() {
    const {
      user: {
        credentials: { 
          //username, 
          artista 
        },
        loading,
        authenticated,
      },
      //
    } = this.props;
    const { publicaciones, eventos } = this.props.data;
    const { classes } = this.props;
    const { usuarios } = this.props.data;

    let filteredUsuarios = Array.from(usuarios).filter(
      (usuario) =>
      usuario.artista === false &&
      (usuario.username.toLowerCase().indexOf(this.state.buscar.trim().replace(/\s/g, "").toLowerCase()) !== -1
      ||  (usuario.gustos && (usuario.gustos.includes(this.state.buscar.trim().replace(/\s/g, ""))))
      )
    );
    let filteredArtistas = Array.from(usuarios).filter(
      (usuario) =>
        usuario.artista === true &&
        (usuario.username.toLowerCase().indexOf(this.state.buscar.trim().replace(/\s/g, "").toLowerCase()) !== -1
        ||  (usuario.gustos && (usuario.gustos.includes(this.state.buscar.trim().replace(/\s/g, ""))))
        )
    );
    let filteredPublicaciones = Array.from(publicaciones).filter(
      (publicacion) => 
        publicacion.postedBy.toLowerCase().indexOf(this.state.buscar.trim().replace(/\s/g, "").toLowerCase()) !== -1
        || publicacion.postBody.toLowerCase().indexOf(this.state.buscar.trim().toLowerCase()) !== -1
        || (publicacion.generos && (publicacion.generos.includes(this.state.buscar.trim().replace(/\s/g, ""))))
    );
    let filteredEventos = Array.from(eventos).filter(
      (evento) => 
      evento.postedBy.toLowerCase().indexOf(this.state.buscar.trim().replace(/\s/g, "").toLowerCase()) !== -1
      || evento.postBody.toLowerCase().indexOf(this.state.buscar.trim().toLowerCase()) !== -1
      || (evento.generos && (evento.generos.includes(this.state.buscar.trim().replace(/\s/g, ""))))
    )

    let homes = !loading ? (
      authenticated ? (
         
          <Grid container className={classes.root} spacing={3}>
            <Grid item sm={3}>
              <div>
                <Profile />
                <Menu />
                <PostPublicacion />
                {artista ? (
                  <PostEvento />
                ) : null}
              </div>
            </Grid>
            <Grid item sm={9}>
              <AppBar position="static" color="white">
                <Tabs
                  value={this.state.value}
                  onChange={(e, v) => {
                    this.handleChange(v);
                  }}
                  aria-label="wrapped label tabs example"
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Publicaciones" {...a11yProps(0)} />
                  <Tab label="Eventos" {...a11yProps(1)} />
                  <Tab label="Usuarios" {...a11yProps(2)} />
                  <Tab label="Artistas" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <div id="paneles" >
              <TabPanel value={this.state.value} index={0}>
                {filteredPublicaciones.length > 0 ? (
                  filteredPublicaciones.map((publicacion) => (
                    <Publicacion key={publicacion.postId} publicacion={publicacion} />
                  ))
                ) : (
                  <Typography variant="h4" color="primary">
                    {"Sin Resultados"}
                  </Typography>
                )
                }
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                {filteredEventos.length > 0 ? (
                  filteredEventos.map((evento) => (
                    <Evento key={evento.postId} evento={evento} />
                  ))
                ) : (
                  <Typography variant="h4" color="primary">
                    {"Sin Resultados"}
                  </Typography>
                )}
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                {filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((usuario) => (
                    <MenuItem
                      component={Link}
                      to={`/usuarios/${usuario.username}`}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            alt={usuario.username}
                            src={usuario.Fotolink}
                          />
                        }
                        title={
                          <Typography variant="h6" color="primary" name="chat">
                            {usuario.username}
                          </Typography>
                        }
                        subheader={
                          <Typography variant="body2" color="textSecondary">
                            {usuario.bio}
                          </Typography>
                        }
                      />
                    </MenuItem>
                  ))
                ) : (
                  <Typography variant="h4" color="primary">
                    {"Sin Resultados"}
                  </Typography>
                )}
              </TabPanel>
              <TabPanel value={this.state.value} index={3}>
              {filteredArtistas.length > 0 ? (
                  filteredArtistas.map((artista) => (
                    <MenuItem
                      component={Link}
                      to={`/usuarios/${artista.username}`}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            alt={artista.username}
                            src={artista.Fotolink}
                          />
                        }
                        title={
                          <Typography variant="h6" color="primary" name="chat">
                            {artista.username}
                          </Typography>
                        }
                        subheader={
                          <Typography variant="body2" color="textSecondary">
                            {artista.bio}
                          </Typography>
                        }

                      />
                    </MenuItem>
                  ))
                ) : (
                  <Typography variant="h4" color="primary">
                      {"Sin Resultados"}
                    </Typography>
                )}
              </TabPanel>
              </div>
            </Grid>
          </Grid>
      ) : (
        <p>Loading...</p>
      )
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    );

    return homes;
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

buscar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getPublicaciones: PropTypes.func.isRequired,
  getEventos: PropTypes.func.isRequired,
  getUsuarios: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  getPublicaciones,
  getEventos,
  getUsuarios,
})(withStyles(styles)(buscar));
