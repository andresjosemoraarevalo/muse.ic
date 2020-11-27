import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Recomendacion from "../components/Recomendacion";
import Evento from "../components/Evento";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import { connect } from "react-redux";
import { getRecomendaciones } from "../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostEvento from '../components/PostEvento';
//import Button from "@material-ui/core/Button";
 // <Menu />
const styles = {
  root: {
    marginTop: "60px",
    marginRight: "10px"
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
  },
  sineventos: {
    display: "flex",
    flexDirection: "column",
    text: "center"
  }
};


class recomendacionesPage extends Component {
  componentDidMount() {
    this.props.getRecomendaciones(this.props.user.credentials.username);
  }
  render() {
    const { 
      user: {
        credentials: {
          username,
          artista,
        },
          loading,
          authenticated,
          seguidos
      }
     // 
       
    } = this.props;
    const {recomendaciones}= this.props.data;
    const { classes } = this.props;

    let recentRecomendaciones = !loading ? (
      recomendaciones.length > 0 ? (
        recomendaciones.map((recomendacion) => (
          <Recomendacion key={recomendacion.postId} recomendacion={recomendacion} />
        ))
      ) : (
        <Typography variant="h6" color="textPrimary">
          {"Hoy no tienes recomendaciones"}
        </Typography>
      )
    ) : (
      null
    );
    

    let homes = ! loading ?(
      authenticated ?(
        
          <Grid container className={classes.root} spacing={3}>
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion />
            {artista ? (
              <PostEvento />
            ) : null}
          </div>      
          </Grid>
          <Grid item sm={5} >
          
          <div id="homePublicaciones" >
          {recentRecomendaciones}
            </div>
          </Grid>
          <Grid item sm={4}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.eventos}
          >
            Eventos
          </Typography>
          <div id="homeEventos">
            {/*recentEventosMarkup*/}
          </div>
          </Grid>
          
          
        </Grid>
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

recomendacionesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getRecomendaciones: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getRecomendaciones})(
  withStyles(styles)(recomendacionesPage)
);
