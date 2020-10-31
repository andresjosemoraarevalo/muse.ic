//import React from 'react';
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
//MUI stuff
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


//botones 
import MyButton from "../util/MyButton";
import PersonIcon from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import HelpOutline from '@material-ui/icons/HelpOutline';
import People from '@material-ui/icons/People';
import MusicNote from '@material-ui/icons/MusicNote';
import SendIcon from '@material-ui/icons/Send';

//redux 
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link"
const styles = {
    paper: {
      padding: 20,
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  };
class Menu extends Component {
  render(){
    const {
        classes, user:{
            credentials: {
                username,    
            },
            loading,
            authenticated,
        },    
        
        
        } = this.props;
        let menu = !loading ? (
            authenticated ?  (    <Paper className={classes.paper}>
        
                <MenuList>
                      <MenuItem component={Link}
                            to={'/user'}>

                         <MyButton>
                             <PersonIcon style={{fill: "secondary"}}/>
                         </MyButton>
                         <Typography variant="inherit">
                            Perfil
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <MyButton tip="Perfil">
                            <SendIcon style={{fill: "secondary"}} />
                        </MyButton>
                            <Typography variant="inherit">Mensajes</Typography>     
                        </MenuItem>
                        <MenuItem>
                        <MyButton tip="Perfil">
                            <Notifications style={{fill: "secondary"}} />
                        </MyButton>
                            <Typography variant="inherit">Notificaciones</Typography>     
                        </MenuItem>
                        <MenuItem>
                            <MyButton tip="Perfil">
                                <People style={{fill: "secondary"}} />
                            </MyButton>
                                <Typography variant="inherit">Grupos de interes</Typography>     
                        </MenuItem>
                        <MenuItem>
                            <MyButton tip="Perfil">
                                <MusicNote  style={{fill: "secondary"}} />
                            </MyButton>
                                <Typography variant="inherit">Eventos</Typography>     
                        </MenuItem>
                        <MenuItem>
                        <MyButton tip="Perfil">
                            <HelpOutline style={{fill: "secondary"}} />
                        </MyButton>
                            <Typography variant="inherit">Ayuda</Typography>     
                        </MenuItem>
                </MenuList>
                </Paper>
            ):(
                <Paper className={classes.paper}>
                    <MenuList>
                        <MenuItem>
                        <MyButton tip="Perfil">
                            <HelpOutline style={{fill: "secondary"}} />
                        </MyButton>
                            <Typography variant="inherit">Ayuda</Typography>     
                        </MenuItem>
                </MenuList>
                </Paper>
            )
        ):(
            <p> Loading... </p>
        );     
            return menu;       
  }    
}

const mapStateToProps = (state) => ({
    user: state.user,
  });
  
 
  Menu.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  export default connect(
    mapStateToProps
  )(withStyles(styles)(Menu));
  