import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Publicacion from "../components/Publicacion";
import Evento from "../components/Evento";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import { connect } from "react-redux";
import { getPublicaciones, getEventos } from "../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostEvento from '../components/PostEvento';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";
//import Button from "@material-ui/core/Button";
 // <Menu />
const styles = {
  root: {
    marginTop: "60px",
  },
  posts: {
      overflow: 'scroll'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 50
  },
  eventos: {
    //padding: 10
  }
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
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
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


class buscar extends Component {
  state = {
    value: 0
  }
  componentDidMount() {
    this.props.getPublicaciones();
    this.props.getEventos();
  }
  handleChange = (value) => {
    this.setState({
      value
    });
    console.log(this.state.value);
  };

  render() {
    const { 
      user: {
        credentials: {
          username,
          artista,
        },
          loading,
          authenticated
      }
     // 
       
    } = this.props;
    const {publicaciones,eventos}= this.props.data;
    let recentPublicacionesMarkup = !loading ? (
      publicaciones.map((publicacion) => (
        <Publicacion key={publicacion.postId} publicacion={publicacion} />
      ))
    ) : (
      <p>Loading...</p>
    );
    let recentEventosMarkup = !loading ? (
      eventos.map((evento) => (
        <Evento key={evento.postId} evento={evento} />
      ))
    ) : (
      <p>Loading...</p>
    );
    const { classes } = this.props;
    
    let homes = ! loading ?(
      authenticated ?(
        artista ?(
          <Grid container className={classes.root} spacing={3}>
          <Grid item sm={0}>
          </Grid>
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion/>
            <PostEvento />
          </div>      
          </Grid>
          <Grid item sm={3} >
          
          <div id="homePublicaciones" >
          {recentPublicacionesMarkup}
            </div>
          </Grid>
          <Grid item sm={4}>
            <Typography
              variant="h5"
              color="primary"
            >
              Eventos
            </Typography>
            <div id="homePublicaciones">
              {recentEventosMarkup}
            </div>
          </Grid>
          <Grid item sm={0}>
          </Grid>
        </Grid>
        ):(
          <Grid container className={classes.root} spacing={3}>
          
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion />
          </div>      
          </Grid>
          <Grid item sm={9}>
            <AppBar position="static" color="white">
              <Tabs 
                value={this.state.value} 
                onChange={(e, v) => {this.handleChange(v)}} 
                aria-label="wrapped label tabs example" 
                indicatorColor="primary"
                textColor="primary"
                centered>
                <Tab label="Publicaciones" {...a11yProps(0)} />
                <Tab label="Eventos" {...a11yProps(1)} />
                <Tab label="Usuarios" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
              Publicaciones
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              Eventos
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              Usuarios
            </TabPanel>
          </Grid>
          
          
          
        </Grid>
        )
      ):(
        <p>Loading...</p>
      )
    ):(
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
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getPublicaciones, getEventos })(
  withStyles(styles)(buscar)
);
