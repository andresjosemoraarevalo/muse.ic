import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Iconos
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//Redux
import { connect } from 'react-redux';
import {
    likeEvento,
    unlikeEvento,
  } from "../redux/actions/dataActions";

export class LikeButtonE extends Component {
  

    likedEvento= () => {
        if (
          this.props.user.likesE &&
          this.props.user.likesE.find(
            (like) => like.postId === this.props.postId
          )
        )
          return true;
        else return false;
      };
      likeEvento = () => {
        this.props.likeEvento(this.props.postId);
      };
      unlikeEvento = () => {
        this.props.unlikeEvento(this.props.postId);
      };

  render() {
      const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like">
                    <FavoriteBorder color="primary"/>
            </MyButton>
        </Link>
    ) : (
        this.likedEvento() ? (
            <MyButton tip="Undo like" onClick={this.unlikeEvento}>
                <FavoriteIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likeEvento}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        )
    );

    return likeButton;
  }
}

LikeButtonE.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likeEvento: PropTypes.func.isRequired,
    unlikeEvento: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
    user: state.user
  });

const mapActionsToProps = {
    likeEvento,
    unlikeEvento
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButtonE);