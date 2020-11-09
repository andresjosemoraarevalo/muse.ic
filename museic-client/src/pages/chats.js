
import React, { Component , Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Usuario from "../components/Usuario";
import Evento from "../components/Evento";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import { connect } from "react-redux";
import { getPublicaciones, getEventos, getUsuarios } from "../redux/actions/dataActions";
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


class chat extends Component {
  componentDidMount() {
    this.props.getUsuarios();
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
     // 
       
    } = this.props;
    
    const {usuarios}= this.props.data;
    let recentUsuariosMarkup = !loading ? (
        usuarios.map((usuario) => (
          <Usuario key={usuario.username} usuario={usuario} />
        ))
      ) : (
        <p>Loading...</p>
      );
      const { classes } = this.props;
    let chats = ! loading ?(
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
              {recentUsuariosMarkup}
            </div>
          </Grid>
          <Grid item sm={3}>
            <Typography
              variant="h5"
              color="primary"
            >
              Chat
            </Typography>
            <div id="homePublicaciones">
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
          <div className={classes.search}>
            </div>
          <div id="homePublicaciones" >
          <Typography
                variant="h5"
                color="primary"
            >
            Usuarios
            </Typography>   
          {recentUsuariosMarkup}
            </div>
          </Grid>
          <Grid item sm={3}>
          <Typography
            variant="h5"
            color="primary"
          >
            Chat
          </Typography>
          <div id="homePublicaciones">
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

    return chats;
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

chat.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
 
  getUsuarios: PropTypes.func.isRequired,
  
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getUsuarios })(
  withStyles(styles)(chat)
);
