import React, { Component } from "react";
import { CardHeader, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
//redux
import { connect } from "react-redux";
import {setChat,getMensajes} from "../redux/actions/dataActions";

const styles = {
  card: {
    marginBottom: 15,
    
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  section1: {
    margin: "24px 16px",
  },
  section2: {
    margin: "16px",
  },
  pedrito:{
      background:"black",
  }
};

class Usuario extends Component {
    state = {
        chat: "",
        errors: {},
      };
    handleClick = (username) => {
      console.log(username);
    }
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      usuario:{
          username,
          Fotolink,
          artista
      },
      
    } = this.props;
    //const {chat}=this.props.data;
    return (
      <MenuItem classes={classes} 
      onClick={() => this.handleClick(username)/*this.props.setChat(username)*/}
      
      >
        <CardHeader
          
          avatar={<Avatar alt={username} src={Fotolink}></Avatar>}
          title={
                <Typography
                variant="h6"
                color="primary"
                name="chat"
                //component={Link}
                //to={`/usuarios/${username}`}
                onClick={ console.log(username)/*this.props.setChat(username)*/}
              >
                {username}
              </Typography>
              
          }/>


      </MenuItem>
    );
  }
}

Usuario.propTypes = {
  setChat: PropTypes.func.isRequired,
  getMensajes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  usuario: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});



export default connect(
  mapStateToProps,{setChat,getMensajes}
)(withStyles(styles)(Usuario));
