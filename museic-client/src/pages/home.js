import React, { Component , Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Publicacion from "../components/Publicacion";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import { connect } from "react-redux";
import { getPublicaciones } from "../redux/actions/dataActions";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PostEvento from '../components/PostEvento';
//import Button from "@material-ui/core/Button";
 // <Menu />
const styles = {
  root: {
    marginTop: "80px",
  },
  posts: {
      overflow: 'scroll'
  }
};


class home extends Component {
  componentDidMount() {
    this.props.getPublicaciones();
  }
  render() {
    const { 
      user: {
        credentials: {
          username,
          artista,},
          loading,
          authenticated
      }
       
       
    } = this.props;
    const {publicaciones}= this.props.data;
    let recentPublicacionesMarkup = !loading ? (
      publicaciones.map((publicacion) => (
        <Publicacion key={publicacion.postId} publicacion={publicacion} />
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
          <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon style={{fill: "black"},{ fontSize: 20 }} />
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              </div>
            </div>
          <div id="homePublicaciones" >
          {recentPublicacionesMarkup}
            </div>
          </Grid>
          <Grid item sm={3}>
                <p>recomendaciones...</p>
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
          <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon style={{fill: "black"},{ fontSize: 20 }} />
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              </div>
            </div>
          <div id="homePublicaciones" >
          {recentPublicacionesMarkup}
            </div>
          </Grid>
          <Grid item sm={3}>
                <p>recomendaciones...</p>
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
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getPublicaciones })(
  withStyles(styles)(home)
);
