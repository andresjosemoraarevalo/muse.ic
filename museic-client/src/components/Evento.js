import React, { Component } from "react";
import { CardHeader, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteEvento from './DeleteEvento';
import LikeButtonE from './likeButtomE';

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditEvento from './EditEvento';
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

class Evento extends Component {
  
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      evento: {
        postBody,
        postedBy,
        postDate,
        comentarios,
        likes,
        Fotolink,
        postId,
        fechaEvento,
        lugar,
        nombre,
        precio,
        generos
      },
      user: {
          authenticated,
          credentials: {
              username
          }
      }
    } = this.props;
    
    const deleteButton = authenticated && postedBy === username ? (
        <EditEvento postId={postId} evento={this.props.evento}/>
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
              to={'/user'}
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
        <Divider variant="middle" />

        <CardContent>
        <Typography variant="body1" color="textPrimary" component="p" className={classes.section1}>
           {nombre}
         </Typography>
          <Typography variant="body1" color="textSecondary"component="p" className={classes.section2}>
        {new Date(fechaEvento).toDateString()}{lugar} 
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.section2}>
         {precio}
         </Typography>
          <Divider variant="middle" />
         <Typography variant="body1" color="textPrimary" component="p" className={classes.section1}>
          {postBody}
        </Typography>
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
          <LikeButtonE postId = {postId}/>
          <span>{likes} Likes</span>
          <MyButton tip="Comentarios">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{comentarios} Comentarios</span>
        </CardContent>
      </Card>
    );
  }
}

Evento.propTypes = {
  likeEvento: PropTypes.func.isRequired,
  unlikeEvento: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  Evento: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});



export default connect(
  mapStateToProps
)(withStyles(styles)(Evento));
