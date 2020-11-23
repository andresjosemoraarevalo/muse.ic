import React, { Component, Fragment } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DialogContent, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { CardHeader} from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
//Iconos
import ShareIcon from '@material-ui/icons/Reply';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";

//Redux
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    sharePublicacion, 
    clearErrors,
    getPublicacion
  } from "../redux/actions/dataActions";


  const styles = {
    root: {
      position: "relative",
      float: 'right',
      
    },
    section1: {
      margin: "24px 16px",
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

  const options = ["Rock Alternativo", "Ambiente", "Clasica", "Country", "Cumbia", "Dance", "EDM", "Dancehall", "Deep House",
  "Disco", "Drum & Bass", "Dubstep", "Electrónica", "Folk", "Hip Hop y Rap", "House",
  "Indie", "Jazz y Blues", "Latina", "Metal", "Piano", "Pop", "R&B y Soul", "Reggae", 
  "Reguetón", "Rock", "Bandas Sonoras", "Techno", "Trance", "Trap", "Triphop", "Vallenato"];

export class ShareButtom extends Component {
  state = {
    open: false,
    errors: {},
    postBody2: "",
    generos:[],
  };
  
    componentWillReceiveProps(nextProps){
      if (this.props.openDialog) {
        this.handleOpen();
      }
      
    };
    handleOpen = () => {
      const { username, postId, generos } = this.props;
      this.setState({ open: true });
      this.props.getPublicacion(this.props.postId);
    };
    handleClose = () => {
      this.props.clearErrors();
      this.setState({ open: false, errors: {}, generos:[]});
    };
    sharePublicacion = () => {
      this.props.remixeado = `/usuarios/${this.props.username}/publicacion/${this.props.postId}`
        this.props.sharePublicacion({ postBody: this.state.postBody, generos: this.state.generos});
    }
    handleChange = (event) => {
        this.setState({ [event.target.name ]: event.target.value });
    };
    handleSubmit = (event) => {
        const { username, postId } = this.props;
        event.preventDefault();
        this.props.sharePublicacion({ postBody: this.state.postBody2 , remix: true , remixeado:this.props.postId, generos: this.state.generos })
    };

    onChangeGustos = (event, values) => {
      this.setState({
          generos: values
      });
    }
    
  render() {
    const { errors } = this.state;
    const { 
      classes, 
      publicacion: {
          postBody,
          postedBy,
          Fotolink,
          postId,
          remixeado,
          generos,
        },
              username,
      UI: { loading }
  } = this.props;
   

    return (
      <div  conteiner className={classes.root} >
        <Fragment >
        <MyButton tip="Remixear" onClick={this.handleOpen} >
            <ShareIcon color="primary" />
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
            <DialogTitle>Remixea esta publicacion</DialogTitle>
                  <Typography variant="body1" color="textPrimary" component="p" className={classes.section1} variant="h6"
                    component={Link}
                    to={`/usuarios/${username}/publicacion/${postId}`}>
                    {postBody}
                  </Typography>
            <DialogContent>
                <form onSubmit={this.handleSubmit}>
                <TextField
                    variant="outlined"
                    name="postBody2"
                    type="text"
                    label="Comenta algo sobre este remixeado"
                    multiline
                    rows="3"
                    placeholder="Remixea esta publicacion para tus seguidores"
                    error={errors.postBody2 ? true : false}
                    helperText={errors.postBody2}
                    onChange={this.handleChange}
                    fullWidth
                />

                <Autocomplete
                multiple
                id="combo-box-gustos"
                options={options}
                fullWidth
                defaultValue={this.state.gustos}
                filterSelectedOptions                             
                onChange={this.onChangeGustos}
                renderInput={(params) => <TextField {...params} label="Generos" placeholder="Generos" variant="outlined"/>}
               />
                  
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={loading}
                    onClick={this.handleClose}
                    
                >
                    Remixear
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
        </div>
        )
    
  }
}

ShareButtom.propTypes = {
    postId: PropTypes.string.isRequired,
    sharePublicacion: PropTypes.func.isRequired,
    getPublicacion: PropTypes.func.isRequired,
    publicacion: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
    publicacion: state.data.publicacion,
    user: state.user,
    UI: state.UI
  });


  const mapActionsToProps = {
    getPublicacion,
    clearErrors,
    sharePublicacion,
};
export default connect(
    mapStateToProps, 
    mapActionsToProps 
  )
  (
    withStyles(styles)
    (ShareButtom)
  );