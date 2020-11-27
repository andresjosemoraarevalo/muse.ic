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
    dislikeEvento,
    undislikeEvento,
  } from "../redux/actions/dataActions";

export class DisLikeButtonE extends Component {
  

    DontlikedEvento = () => {
        if (
          this.props.user.dislikesE &&
          this.props.user.dislikesE.find(
            (nolike) => nolike.postId === this.props.postId
          )
        )
          return true;
        else return false;
      };
      DontlikeEvento = () => {
        this.props.dislikeEvento(this.props.postId);
      };
      undoDontlikeEvento = () => {
        this.props.undislikeEvento(this.props.postId);
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
        this.DontlikedEvento() ? (
            <MyButton tip="Quitar Dislike" onClick={this.undoDontlikeEvento}>
                <ThumbDownIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip="Dislike" onClick={this.DontlikeEvento}>
                <ThumbDownOutlinedIcon color="primary"/>
            </MyButton>
        )
    );

    return DontlikeButton;
  }
}

DisLikeButtonE.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    dislikeEvento: PropTypes.func.isRequired,
    undislikeEvento: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
    user: state.user
  });

const mapActionsToProps = {
    dislikeEvento,
    undislikeEvento
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(DisLikeButtonE);