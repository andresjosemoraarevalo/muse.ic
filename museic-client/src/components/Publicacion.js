import React, { Component } from "react";
import { CardHeader, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeletePublicacion from './DeletePublicacion';

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//redux
import { connect } from "react-redux";
import {
  likePublicacion,
  unlikePublicacion,
} from "../redux/actions/dataActions";

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
};

class Publicacion extends Component {
  likedPublicacion = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.publicacion.postId
      )
    )
      return true;
    else return false;
  };
  likePublicacion = () => {
    this.props.likePublicacion(this.props.publicacion.postId);
  };
  unlikePublicacion = () => {
    this.props.unlikePublicacion(this.props.publicacion.postId);
  };
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
        postId
      },
      user: {
          authenticated,
          credentials: {
              username
          }
      }
    } = this.props;
    const likeButton = !authenticated ? (
        <MyButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary"/>
            </Link>
        </MyButton>
    ) : (
        this.likedPublicacion() ? (
            <MyButton tip="Undo like" onClick={this.unlikePublicacion}>
                <FavoriteIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likePublicacion}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        )
    );
    const deleteButton = authenticated && postedBy === username ? (
        <DeletePublicacion postId={postId}/>
    ) : null
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar alt={postedBy} src={Fotolink}></Avatar>}
          title={
            <Typography
              variant="h6"
              color="primary"
              component={Link}
              to={`/usuarios/${postedBy}`}
            >
              {postedBy}
            </Typography>
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
            {postBody}
          </Typography>
          {likeButton}
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

Publicacion.propTypes = {
  likePublicacion: PropTypes.func.isRequired,
  unlikePublicacion: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  publicacion: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePublicacion,
  unlikePublicacion,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Publicacion));
