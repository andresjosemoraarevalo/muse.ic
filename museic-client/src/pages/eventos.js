import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Evento from "../components/Evento";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import { connect } from "react-redux";
import { getEventos } from "../redux/actions/dataActions";
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
    marginTop: 10,
    marginBottom: 10

  }
};


class eventos extends Component {
  componentDidMount() {
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
          authenticated,
          seguidos
      }
     // 
       
    } = this.props;
    const {eventos}= this.props.data;
    
    let recentEventosMarkup = !loading ? (
      Array.from(eventos).map((evento) => (
        <Evento key={evento.postId} evento={evento} />
      ))
    ) : (
      <Typography variant="h5" color="primary">
        {"Empieza a seguir Artistas para ver sus eventos!"}
      </Typography>
    );
    const { classes } = this.props;

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
          
          <Grid item sm={9}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.eventos}
          >
            Eventos
          </Typography>
          <div id="soloEventos">
            {recentEventosMarkup}
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

eventos.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getEventos: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getEventos })(
  withStyles(styles)(eventos)
);
