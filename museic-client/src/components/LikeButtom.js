import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Iconos
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
//Redux
import { connect } from 'react-redux';
import {
    likePublicacion,
    unlikePublicacion,
  } from "../redux/actions/dataActions";

export class LikeButton extends Component {
  

    likedPublicacion = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.postId === this.props.postId
          )
        )
          return true;
        else return false;
      };
      likePublicacion = () => {
        this.props.likePublicacion(this.props.postId);
      };
      unlikePublicacion = () => {
        this.props.unlikePublicacion(this.props.postId);
      };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Quitar like">
                    <ThumbUpOutlinedIcon color="primary"/>
            </MyButton>
        </Link>
    ) : (
        this.likedPublicacion() ? (
            <MyButton tip="Quitar Like" onClick={this.unlikePublicacion}>
                <ThumbUpIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likePublicacion}>
                <ThumbUpOutlinedIcon color="primary"/>
            </MyButton>
        )
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePublicacion: PropTypes.func.isRequired,
    unlikePublicacion: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
    user: state.user
  });

const mapActionsToProps = {
    likePublicacion,
    unlikePublicacion
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);