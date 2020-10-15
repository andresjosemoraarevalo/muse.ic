import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Publicacion from "../components/Publicacion";
import PostPublicacion from '../components/PostPublicacion';

import { connect } from "react-redux";
import { getPublicaciones } from "../redux/actions/dataActions";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    marginTop: "80px",
  },
  posts: {
      overflow: 'scroll'
  }
};

class home extends Component {
<<<<<<< Updated upstream
    state = {
        publicaciones: null
    }
    componentDidMount(){
        axios.get('/getPublicaciones')
         .then(res=>{
             console.log(res.data)
             this.setState({
                 publicaciones: res.data
             })
         })
         .catch(err => console.log(err));
    }
    render(){
        let recentPublicacionesMarkup = this.state.publicaciones ? (
<<<<<<< Updated upstream
            this.state.publicaciones.map((publicacion) => <Publicacion key={publicacion.postId} publicacion={publicacion}/>)
=======
            this.state.publicaciones.map((publicacion) => <Publicacion publicacion={publicacion}/>)
>>>>>>> Stashed changes
        ) : (
            <p>Loading...</p>
        );
        const {classes} = this.props;
        return (
            <Grid container className={classes.root} spacing={3} alignItems="center">
<<<<<<< Updated upstream
                <Grid item xs={8}>
                    <p>Crear Publicacion</p>
                    <Paper>Crear</Paper>
                </Grid>
                <Grid item xs={4}>
                    Chat...
                </Grid>
                <Grid item xs={8}>
                    {recentPublicacionesMarkup}
                </Grid>
                
                
=======
                <Grid item sm={11} xs={12}>
                    <p>Crear Publicacion</p>
                    <Paper>Crear</Paper>
                </Grid>
                <Grid item sm={11} xs={12}>
                    {recentPublicacionesMarkup}
                </Grid>
>>>>>>> Stashed changes
            </Grid>
        );
    }
=======
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
>>>>>>> Stashed changes
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
