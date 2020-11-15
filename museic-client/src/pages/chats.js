
import React, { Component , Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import { CardHeader, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Usuario from "../components/Usuario";
import Evento from "../components/Evento";
import PostPublicacion from '../components/PostPublicacion';
import Profile from '../components/Profile';
import Menu from '../components/menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { getPublicaciones, getEventos, getUsuarios } from "../redux/actions/dataActions";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PostEvento from '../components/PostEvento';
import Chatbox from "../components/chatbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {setChat,getMensajes, postMensaje} from "../redux/actions/dataActions";
//import Button from "@material-ui/core/Button";
 // <Menu />
const styles = {
  root: {
    marginTop: "90px",
  },
  chatbox:{
    width: "450px",
    height:"350px",
   
    background: "white",
    
    top: "150px",
    overflow: "auto",
  },
  text:{
    marginTop: "5px",
    width: "350px",
    height:"60px",
    position: "relative",
  },
  submitButton: {
    top: "5px",
    position: "relative",
    width: "90px",
    height:"50px",
  },
  users:{
  width: "440px",
  position: "absolute",
  bottom: "20px",
  top: "150px",
  overflow: "auto"
  }
};


class chat extends Component {
  state = {
    chatUser: '',
    postBody:'',
  }
  componentDidMount() {
    this.props.getUsuarios();
    
  };
  handleClick = (username) => {
    console.log(username);
    this.props.getMensajes(username);
    this.props.setChat(username);
    this.setState({ chatUser: username });
    
  };
  handleClick2 = ()=>{
    this.props.postMensaje({username2: this.state.chatUser , postBody: this.state.postBody});
    

  };
  handleChange = (event) => {
    this.setState({ [event.target.name ]: event.target.value });
    
    
    
};
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
    
    const {usuarios,chat}= this.props.data;
    let recentUsuariosMarkup = !loading ? (
        usuarios.map((usuario) => (
          <MenuItem onClick={() => this.handleClick(usuario.username)}>
            
            <CardHeader
              avatar={<Avatar alt={usuario.username} src={usuario.Fotolink}/>}
              title={
                <Typography
                variant="h6"
                color="primary"
                name="chat"
                //component={Link}
                //to={`/usuarios/${username}`}
              >
                {usuario.username}
              </Typography>
              }/>
          </MenuItem>
        ))
      ) : (
        <p>Loading...</p>
      );
      const { classes } = this.props;
    let chats = ! loading ?(
      authenticated ?(
          <Grid container className={classes.root} spacing={3}>
          
          <Grid item sm={3}>
          <div >
            <Profile />
            <Menu/>
            <PostPublicacion />
          </div>      
          </Grid>
          <Grid item sm={4} >
          <Typography
                variant="h5"
                color="primary"
            >
            Usuarios
            </Typography>   
          <div className={classes.users}> 
          <MenuList>
            {recentUsuariosMarkup}
          </MenuList>
            </div>
          </Grid>
          <Grid item sm={5}>
          <Typography
            variant="h5"
            color="primary"
          >
            Chat
          </Typography>
          <div className={classes.chatbox}>
              <Chatbox />
          </div>
          <TextField
            variant="outlined"
            name="postBody"
            type="text"
            multiline
            placeholder= {`Enviale un mensaje a ${this.state.chatUser}`}
            //error={errors.nombre ? true : false}
            //helperText={errors.nombre}
            onChange={this.handleChange}
            className={classes.text}

        />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading}
            onClick={() => this.handleClick2()}
            >
            {/*Publicar
            {loading && (
                <CircularProgress
                size={30}
                className={classes.progressSpinner}
                />
            )}*/}
            enviar 
            </Button>
          </Grid>
          
        </Grid>
        
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
  setChat: PropTypes.func.isRequired,
  getMensajes: PropTypes.func.isRequired,
  postMensaje: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
 
  getUsuarios: PropTypes.func.isRequired,
  
  data: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getUsuarios , setChat,getMensajes, postMensaje})(
  withStyles(styles)(chat)
);
