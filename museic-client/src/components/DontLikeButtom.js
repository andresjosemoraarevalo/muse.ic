import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Iconos
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
//Redux
import { connect } from 'react-redux';
import {
    DontlikePublicacion,
    undoDontlikePublicacion,
  } from "../redux/actions/dataActions";

export class DontLikeButton extends Component {
  

    DontlikedPublicacion = () => {
        if (
          this.props.user.dislikes &&
          this.props.user.dislikes.find(
            (nolike) => nolike.postId === this.props.postId
          )
        )
          return true;
        else return false;
      };
      DontlikePublicacion = () => {
        this.props.DontlikePublicacion(this.props.postId);
      };
      undoDontlikePublicacion = () => {
        this.props.undoDontlikePublicacion(this.props.postId);
      };

  render() {
    const { authenticated } = this.props.user;
    const DontlikeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Dislike">
                    <ThumbDownOutlinedIcon color="primary"/>
            </MyButton>
        </Link>
    ) : (
        this.DontlikedPublicacion() ? (
            <MyButton tip="Quitar Dislike" onClick={this.undoDontlikePublicacion}>
                <ThumbDownIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip="Dislike" onClick={this.DontlikePublicacion}>
                <ThumbDownOutlinedIcon color="primary"/>
            </MyButton>
        )
    );

    return DontlikeButton;
  }
}

DontLikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    DontlikePublicacion: PropTypes.func.isRequired,
    undoDontlikePublicacion: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
    user: state.user
  });

const mapActionsToProps = {
    DontlikePublicacion,
    undoDontlikePublicacion
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(DontLikeButton);