import React, { Component , Fragment} from "react";
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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PostEvento from '../components/PostEvento';
//import Button from "@material-ui/core/Button";
 // <Menu />
const styles = {
  root: {
    marginTop: "60px",
  },
  posts: {
      overflow: 'scroll'
  }
};


class home extends Component {
  componentDidMount() {
    this.props.getPublicaciones();
    this.props.getEventos();
  }
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
          <Grid item sm={1}>
          </Grid>
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion/>
            <PostEvento />
          </div>      
          </Grid>
          <Grid item sm={4} >
          
          <div id="homePublicaciones" >
          {recentPublicacionesMarkup}
            </div>
          </Grid>
          <Grid item sm={3}>
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
          <Grid item sm={1}>
          </Grid>
        </Grid>
        ):(
          <Grid container className={classes.root} spacing={3}>
          <Grid item sm={1}>
          </Grid>
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion />
          </div>      
          </Grid>
          <Grid item sm={4} >
          
          <div id="homePublicaciones" >
          {recentPublicacionesMarkup}
            </div>
          </Grid>
          <Grid item sm={3}>
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
          <Grid item sm={1}>
          </Grid>
        </Grid>
        )
      ):(
        <p>Loading...</p>
      )
    ):(
      <p>Loading...</p>
    );

    return homes;
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getPublicaciones: PropTypes.func.isRequired,
  getEventos: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getPublicaciones, getEventos })(
  withStyles(styles)(home)
);
