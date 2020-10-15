import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Publicacion from "../components/Publicacion";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';

import { connect } from "react-redux";
import { getPublicaciones } from "../redux/actions/dataActions";
//import Button from "@material-ui/core/Button";

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
          <Grid item sm={1}>
          
        </Grid>
        <Grid item sm={4}>
            <Profile />
            <PostPublicacion />
        </Grid>
        <Grid item sm={6} >
          {recentPublicacionesMarkup}
        </Grid>
        <Grid item sm={1}>
          
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
