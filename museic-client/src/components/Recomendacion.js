import React, { Component } from "react";
import axios from 'axios';
import { CardHeader, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import EditPublicacion from './EditPublicacion';
import LikeButton from './LikeButtom';
import DontLikeButton from './DontLikeButtom'
import ShareButtom from './ShareButtom';
import PublicacionDialog from './PublicacionDialog';
import { getPublicacion, clearErrors } from "../redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";

//redux
import { connect } from "react-redux";
import DontLikeButtom from "./DontLikeButtom";


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
  box: {
    backgroundColor: "#373737",
    color: "#FFFFFF",
    marginRight: 10
  },
};
//{this.mostrarremixeado()}
class Recomendacion extends Component {
  state = {
    publicacion2: {},
  }
  
  /*hadlePublicacion(publicacion){
    const postId = publicacion.remixeado;
    axios.get(`/publicaciones/${postId}`)
        .then(res => {
            this.setState({
                publicacion2: res.data
            });
        
            //console.log(this.state.publicacion2);
        })
        .catch(err => console.log(err));

}*/
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      recomendacion: {
        postId,
        postBody,
        postedBy,
       puntuacion,
       Fotolink,
      },
      user: {
          authenticated,
          credentials: {
              username
          }
          
      },
    } = this.props;
    
    

    return (
      
        <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar alt={postedBy} src={Fotolink}></Avatar>}
          
          title={
            
            postedBy === username ? (
              <Typography
              variant="h6"
              color="primary"
              component={Link}
              to={`/usuarios/${postedBy}`}
            >
              {postedBy}
            </Typography>
            ) : (
              <Typography
              variant="h6"
              color="primary"
              component={Link}
              to={`/usuarios/${postedBy}`}
            >
              {postedBy}
            </Typography>
            )
            
            
          }
          
          
        />

        <Divider variant="middle"/>
        
        <CardContent>
          
          <Typography 
          variant="body1" 
          color="textPrimary" 
          component="p" 
          className={classes.section1}
          component={Link}
            to={`/usuarios/${postedBy}/publicacion/${postId}`}
          >
            {postBody}
          </Typography>


          <div className={classes.section2}>

            </div>
          
        </CardContent>
      </Card>
      )
  }
}

Recomendacion.propTypes = {
  
  user: PropTypes.object.isRequired,
  recomendacion: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});


export default connect(
  mapStateToProps,
)(withStyles(styles)(Recomendacion));
