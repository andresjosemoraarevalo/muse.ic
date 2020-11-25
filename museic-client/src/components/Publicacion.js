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
class Publicacion extends Component {
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
      publicacion: {
        postBody,
        postedBy,
        postDate,
        comentarios,
        likes,
        Fotolink,
        postId,
        remixBody,
        remixUsername,
        remixId,
        remix,
        generos
      },
      user: {
          authenticated,
          credentials: {
              username
          }
          
      },
    } = this.props;
    
    const deleteButton = authenticated && postedBy === this.props.user.credentials.username ? (
        <EditPublicacion postId={postId} publicacion={this.props.publicacion}/>
    ) : null
    const mensajeRemixeado = remix ? ( 
      <Typography variant="body1" color="textPrimary" component="p" className={classes.section1}>
        <Typography
              variant="h6"
              color="primary"
              component={Link}
              to={`/usuarios/${remixUsername}`}
              className={classes.section1}
            >
              {remixUsername}
          </Typography>

          <Typography 
            variant="body1" 
            color="textPrimary" 
            component={Link}
            to={`/usuarios/${remixUsername}/publicacion/${remixId}`}
            >
              {remixBody}
        
      </Typography>
      </Typography>
    ) : null

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
          action={
            deleteButton
          }
          
          subheader={
            <Typography variant="body2" color="textSecondary">
              {dayjs(postDate).fromNow()}
            </Typography>
          }
          
          
        />

        <Divider variant="middle"/>
        
        <CardContent>
          
          <Typography variant="body1" color="textPrimary" component="p" className={classes.section1}>
            {postBody}
          </Typography>

          {remix ? (
            mensajeRemixeado
          ) : null}

          <div className={classes.section2}>

          {generos && (
              <Grid container className={classes.boxDiv}>
                {generos.map((genero) => (
                  <Box
                    component="div"
                    display="inline"
                    borderRadius={8}
                    p={1}
                    color="primary"
                    className={classes.box}
                  >
                    {genero}
                  </Box>
                ))}
              </Grid>
            )}
            </div>
          <LikeButton postId = {postId}/>
          <span>{likes} Likes</span>
          <MyButton tip="Comentarios">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{comentarios} Comentarios</span>
          <ShareButtom publicacion={this.props.publicacion} remixId={postId} remixUsername={postedBy} remixBody={postBody}/>
          <PublicacionDialog postId={postId} username={postedBy} openDialog={this.props.openDialog}/>
          
        </CardContent>
      </Card>
      )
  }
}

Publicacion.propTypes = {
  likePublicacion: PropTypes.func.isRequired,
  unlikePublicacion: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  publicacion: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  data: PropTypes.object.isRequired,
  getPublicacion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});
const mapActionsToProps = {
  getPublicacion,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(Publicacion));
