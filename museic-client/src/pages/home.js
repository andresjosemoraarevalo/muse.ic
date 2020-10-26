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
    const { publicaciones, loading } = this.props.data;
    let recentPublicacionesMarkup = !loading ? (
      publicaciones.map((publicacion) => (
        <Publicacion key={publicacion.postId} publicacion={publicacion} />
      ))
    ) : (
      <p>Loading...</p>
    );
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={3}>
          <Grid item sm={0}>
          
          </Grid>
        <Grid item sm={3}>
        <div id="homePerfil" >
            <Profile />
            <Menu/>
            <PostPublicacion />
         </div>   
        </Grid>
        <Grid item sm={7} >
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
        <Grid item sm={10} >
             
          
        </Grid>
        <Grid item sm={2}>
          
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

home.propTypes = {
  classes: PropTypes.object.isRequired,
  getPublicaciones: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getPublicaciones })(
  withStyles(styles)(home)
);
