import React, { Component, Fragment } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DialogContent, withStyles } from "@material-ui/core";
//Iconos
import ShareIcon from '@material-ui/icons/Reply';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CloseIcon from "@material-ui/icons/Close";

//Redux
import { connect } from 'react-redux';
import {
    sharePublicacion, 
    clearErrors
  } from "../redux/actions/dataActions";


const styles = {
    root: {
      marginTop: 15
    },
    submitButton: {
      position: "relative",
      marginTop: 20,
      marginBottom: 10,
      float: 'right',
      
    },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      position: "absolute",
      left: "91%",
      top: "6%",
    },
  };

export class ShareButtom extends Component {
    state = {
        open: false,
        postBody: "",
        errors: {}
    };

    sharedPublicacion = () => {
        if (
          this.props.user.remixeados &&
          this.props.user.remixeados.find(
            (remixeado) => remixeado.postId === this.props.postId
          )
        )
          return true;
        else return false;
    };
    componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors: nextProps.UI.errors
          });
      };
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ postBody: '', open: false, errors: {}});
      }
  };
    sharePublicacion = () => {
        this.props.sharePublicacion(this.props.postId);
    };
    handleChange = (event) => {
        this.setState({ [event.target.name ]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.sharePublicacion({ postBody: this.state.postBody })
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
      };

  render() {
    const { errors, authenticated } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    const shareButtom = authenticated ? (
    
        <Fragment>
        <MyButton tip="Remixear" onClick={this.handleOpen}>
            <ShareIcon color="primary"/>
        </MyButton>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Cerrar"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
                <CloseIcon />
            </MyButton>
            <DialogTitle>Crea una nueva publicacion</DialogTitle>
            <DialogContent>
                <form onSubmit={this.handleSubmit}>
                <TextField
                    variant="outlined"
                    name="postBody"
                    type="text"
                    label="Escribe algo musical"
                    multiline
                    rows="3"
                    placeholder="Crea una nueva publicacion para tus seguidores"
                    error={errors.postBody ? true : false}
                    helperText={errors.postBody}
                    onChange={this.handleChange}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={loading}
                >
                    Publicar
                    {loading && (
                    <CircularProgress
                        size={30}
                        className={classes.progressSpinner}
                    />
                    )}
                </Button>
                </form>
            </DialogContent>
            </Dialog>
        </Fragment>
        ):(
            <Link to="/login">
             <MyButton tip="remixear">
                     <share color="primary"/>
             </MyButton>
            </Link>

        );
    return (shareButtom);
    
  }
}

ShareButtom.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    sharePublicacion: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
    user: state.user
  });

const mapActionsToProps = {
    sharePublicacion
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(ShareButtom);